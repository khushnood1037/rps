import { Form, Formik, useFormikContext } from "formik";
import { useEffect, useMemo, useRef, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import * as Yup from "yup";
import { EthTokenIcon, UsdcTokenIcon, UsdtTokenIcon } from "../../../../assets/svgImgs/SvgImgs";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useDispatch, useSelector } from "react-redux";
import CommonButton from "../../../common/button/CommonButton";
import Countdown from "../../../common/countdown/Countdown";
import Toast from "../../../common/Toast";
import FormControl from "../../../ui/formik/FormControl";
import "./BuyCard.scss";
import {
    buyTokens,
    calculateTokens,
    getDevnetQuoteProgram,
    getProgram,
    resolveIcoState,
} from "../../../../solana/phasedIco/anchor";
import { fetchSolanaIcoSnapshot, setSolanaIcoAddresses } from "../../../../redux/Slices/token.slice";
import type { AppDispatch, RootState } from "../../../../redux/Store";
import { PublicKey } from "@solana/web3.js";
import useDebounce from "../../../../hooks/useDebounce";
import {
    errorToString,
    formatSolFromLamports,
    formatUnits,
    pickCountdownPhase,
    solToLamports,
} from "../../../../services/common.service";
interface BuyCardFormValues {
    solAmount: string;
    rockAmount: string;
}

const QuoteWatcher = ({
    icoStateAddress,
    rockDecimals,
}: {
    icoStateAddress: string;
    rockDecimals: number;
}) => {
    const { values, setFieldValue } = useFormikContext<BuyCardFormValues>();
    const [isQuoting, setIsQuoting] = useState(false);
    const [maxLamportsOk, setMaxLamportsOk] = useState<bigint | null>(null);
    const [overflowWarned, setOverflowWarned] = useState(false);

    const isMathOverflow = (msg: string) => msg.toLowerCase().includes("math overflow");

    const tryQuote = async (lamports: bigint): Promise<bigint> => {
        // Always use devnet RPC for quoting (independent of wallet connection)
        const program = await getDevnetQuoteProgram();
        return await calculateTokens({
            program,
            icoState: new PublicKey(icoStateAddress),
            solAmount: lamports,
        });
    };

    const findMaxLamportsWithoutOverflow = async (): Promise<bigint | null> => {
        // If even 1 lamport overflows, quoting is effectively broken on-chain.
        try {
            await tryQuote(1n);
        } catch (e) {
            const m = errorToString(e, "");
            if (isMathOverflow(m)) return null;
            // not an overflow; don't treat as max-search case
            throw e;
        }

        // Exponential search for upper bound
        let lo = 1n;
        let hi = 1n;
        const U64_MAX = 18446744073709551615n;
        while (hi < U64_MAX / 2n) {
            const next = hi * 2n;
            try {
                await tryQuote(next);
                lo = next;
                hi = next;
            } catch (e) {
                const m = errorToString(e, "");
                if (isMathOverflow(m)) {
                    hi = next;
                    break;
                }
                throw e;
            }
        }

        if (hi === lo) return lo;

        // Binary search between lo..hi for max ok
        let left = lo;
        let right = hi;
        for (let i = 0; i < 32; i++) {
            if (right - left <= 1n) break;
            const mid = left + (right - left) / 2n;
            try {
                await tryQuote(mid);
                left = mid;
            } catch (e) {
                const m = errorToString(e, "");
                if (isMathOverflow(m)) {
                    right = mid;
                } else {
                    throw e;
                }
            }
        }
        return left;
    };

    useDebounce(
        () => {
            (async () => {
                try {
                    if (!icoStateAddress) return;

                    const lamports = solToLamports(values.solAmount);
                    if (lamports <= 0n) {
                        setFieldValue("rockAmount", "0");
                        return;
                    }

                    setIsQuoting(true);
                    let tokens: bigint;
                    try {
                        const capped = maxLamportsOk ? (lamports > maxLamportsOk ? maxLamportsOk : lamports) : lamports;
                        tokens = await tryQuote(capped);
                        if (maxLamportsOk && lamports > maxLamportsOk && !overflowWarned) {
                            setOverflowWarned(true);
                            Toast.error(
                                `Quote limited: contract math overflows above ${(Number(maxLamportsOk) / 1e9).toFixed(6)} SOL.`,
                                "calc-tokens"
                            );
                        }
                    } catch (inner) {
                        const innerMsg = errorToString(inner, "");
                        if (isMathOverflow(innerMsg)) {
                            // Determine max safe lamports once, then retry.
                            const maxOk = await findMaxLamportsWithoutOverflow().catch(() => null);
                            setMaxLamportsOk(maxOk);
                            if (!maxOk) {
                                setFieldValue("rockAmount", "0");
                                Toast.error(
                                    "On-chain quote currently overflows for this phase. Try again when phase config is updated.",
                                    "calc-tokens"
                                );
                                return;
                            }
                            const capped = lamports > maxOk ? maxOk : lamports;
                            tokens = await tryQuote(capped);
                            if (lamports > maxOk && !overflowWarned) {
                                setOverflowWarned(true);
                                Toast.error(
                                    `Quote limited: contract math overflows above ${(Number(maxOk) / 1e9).toFixed(6)} SOL.`,
                                    "calc-tokens"
                                );
                            }
                        } else {
                            throw inner;
                        }
                    }
                    setFieldValue("rockAmount", formatUnits(tokens, rockDecimals));
                } catch (e) {
                    const raw = errorToString(e, "Failed to calculate tokens");
                    // If the program decides to error when sale is inactive, don't spam console/toasts.
                    if (raw.toLowerCase().includes("phase not active")) {
                        setFieldValue("rockAmount", "0");
                        return;
                    }
                    // Invalid amount is an expected contract-side guard; don't spam console.
                    if (raw.toLowerCase().includes("invalid amount")) {
                        setFieldValue("rockAmount", "0");
                        Toast.error("Enter a valid SOL amount for the current phase.", "calc-tokens");
                        return;
                    }

                    // eslint-disable-next-line no-console
                    console.error("calculateTokens error", e, (e as any)?.simulationResponse);

                    if (raw.includes("DEVNET_QUOTE_PAYER_UNFUNDED:")) {
                        Toast.error(raw, "calc-tokens");
                        setFieldValue("rockAmount", "0");
                        return;
                    }
                    if (raw.includes("DEVNET_QUOTE_RPC_RATE_LIMITED:")) {
                        Toast.error(
                            "Devnet RPC is rate-limiting requests right now. Please retry in a bit or switch to another devnet RPC.",
                            "calc-tokens"
                        );
                        setFieldValue("rockAmount", "0");
                        return;
                    }

                    const msg = raw.includes("AccountNotFound")
                        ? "Cannot quote tokens on devnet right now (simulation fee payer not funded / airdrop blocked). Try again or fund the devnet quote payer."
                        : raw.toLowerCase().includes("math overflow")
                            ? "Amount too large for current on-chain math. Try a smaller SOL amount."
                            : raw;

                    Toast.error(msg, "calc-tokens");
                    setFieldValue("rockAmount", "0");
                } finally {
                    setIsQuoting(false);
                }
            })();
        },
        400,
        [values.solAmount, icoStateAddress]
    );

    useEffect(() => {
        if (isQuoting) setFieldValue("rockAmount", "Calculating...");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isQuoting]);

    return null;
};
const BuyCard = () => {
    const { connection } = useConnection();
    const wallet = useWallet();
    const { setVisible: setWalletModalVisible } = useWalletModal();
    const dispatch = useDispatch<AppDispatch>();
    const currentPhase = useSelector((state: RootState) => state.token.currentPhaseinfo);
    const icoState = useSelector((state: RootState) => state.token.icoState);
    const rockDecimals = useSelector((state: RootState) => state.token.rockDecimals);
    const solanaLoading = useSelector((state: RootState) => state.token.solanaLoading);
    const solanaError = useSelector((state: RootState) => state.token.solanaError);
    const icoStateAddress = useSelector((state: RootState) => state.token.icoStateAddress);
    const receiverAddress = useSelector((state: RootState) => state.token.receiverAddress);
    const [walletSol, setWalletSol] = useState("0");
    const [_walletLamports, setWalletLamports] = useState(0);
    const walletKey = wallet.publicKey?.toBase58() || "";
    const lastSnapshotKeyRef = useRef<string>("");
    const lastCountdownRefreshAtRef = useRef<number>(0);
    const [selectedPayment, setSelectedPayment] = useState<"SOL" | "USDT" | "USDC">("SOL");
    const initialValues: BuyCardFormValues = {
        solAmount: "0.0",
        rockAmount: "0.0",
    };
    const countdown = useMemo(() => pickCountdownPhase(icoState), [icoState]);

    // Debug countdown inputs/outputs (logs only when icoState / countdown changes).
    useEffect(() => {
        // eslint-disable-next-line no-console
        console.log("[ICO Countdown][debug] icoStateAddress:", icoStateAddress);
        // eslint-disable-next-line no-console
        console.log("[ICO Countdown][debug] currentPhase:", currentPhase);
        // eslint-disable-next-line no-console
        console.log("[ICO Countdown][debug] countdown:", countdown);

        const phases = (icoState as any)?.phases;
        if (Array.isArray(phases)) {
            // eslint-disable-next-line no-console
            console.log(
                "[ICO Countdown][debug] phases:",
                phases.map((p: any) => ({
                    phaseId: p?.phaseId ?? p?.phase_id,
                    isActive: p?.isActive ?? p?.is_active,
                    startTime: p?.startTime ?? p?.start_time,
                    endTime: p?.endTime ?? p?.end_time,
                }))
            );
        } else {
            // eslint-disable-next-line no-console
            console.log("[ICO Countdown][debug] phases: <missing or not array>", phases);
        }
    }, [icoState, icoStateAddress, currentPhase, countdown]);

    // Ensure devnet ICO addresses are available even when wallet is disconnected (needed for devnet quoting).
    useEffect(() => {
        if (icoStateAddress) return;
        (async () => {
            try {
                const program = await getDevnetQuoteProgram();
                const resolved = await resolveIcoState(program);
                dispatch(
                    setSolanaIcoAddresses({
                        icoStateAddress: resolved.icoStateAddress,
                        receiverAddress: resolved.receiverAddress,
                    })
                );
            } catch (e) {
                // eslint-disable-next-line no-console
                console.error("Failed to resolve devnet ICO state for quoting", e);
            }
        })();
    }, [dispatch, icoStateAddress]);
    // Progress calculation
    const raised = 326873.93;
    const target = 469965;
    const progressPercentage = (raised / target) * 100;
    const paymentMethods = [
        { id: "SOL" as const, icon: <EthTokenIcon />, label: "SOL" },
        // { id: "USDT" as const, icon: <UsdtTokenIcon />, label: "USDT" },
        // { id: "USDC" as const, icon: <UsdcTokenIcon />, label: "USDC" },
    ];
    const getPaymentIcon = () => {
        switch (selectedPayment) {
            case "SOL":
                return <EthTokenIcon />;
            case "USDT":
                return <UsdtTokenIcon />;
            case "USDC":
                return <UsdcTokenIcon />;
            default:
                return <EthTokenIcon />;
        }
    };

    useEffect(() => {
        // Avoid re-fetch loops caused by unstable PublicKey object references.
        // Only re-fetch when the wallet address actually changes (base58).
        if (solanaLoading) return;
        if (lastSnapshotKeyRef.current === walletKey && icoStateAddress) return;
        lastSnapshotKeyRef.current = walletKey;

        dispatch(
            fetchSolanaIcoSnapshot({
                connection,
                wallet,
            })
        )
            .unwrap()
            .catch((e) => {
                // eslint-disable-next-line no-console
                console.error("fetchSolanaIcoSnapshot error", e);
                const msg = errorToString(e, "Failed to load ICO state");
                Toast.error(msg, "ico-snapshot");
            });
    }, [connection, dispatch, walletKey, solanaLoading, icoStateAddress, wallet]);

    useEffect(() => {
        let mounted = true;
        async function loadBal() {
            try {
                if (!wallet.publicKey) {
                    if (mounted) setWalletSol("0");
                    if (mounted) setWalletLamports(0);
                    return;
                }
                const lamports = await connection.getBalance(wallet.publicKey, "confirmed");
                if (mounted) setWalletSol(formatSolFromLamports(lamports));
                if (mounted) setWalletLamports(lamports);
            } catch {
                if (mounted) setWalletSol("0");
                if (mounted) setWalletLamports(0);
            }
        }
        loadBal();
        return () => {
            mounted = false;
        };
    }, [connection, walletKey, wallet.publicKey]);
    return (
        <div className="buy_card">
            <div className="buy_card_header">
                <h2>Buy Now</h2>
            </div>
            <div className="buy_card_countdown_section">
                <p className="buy_card_countdown_label">
                    {countdown?.label || "Next Price Change"}
                </p>
                {countdown ? (
                    <Countdown
                        className="buy_card_countdown"
                        startTimestamp={countdown.startTimestamp}
                        expiryTimestamp={countdown.expiryTimestamp}
                        callBack={() => {
                            // refresh state when countdown flips (start->end or end->next)
                            const nowSec = Math.floor(Date.now() / 1000);
                            // Guard against immediate-expire loops / repeated refreshes
                            if (solanaLoading) return;
                            if (countdown.expiryTimestamp <= nowSec + 1) return;
                            const nowMs = Date.now();
                            if (nowMs - lastCountdownRefreshAtRef.current < 15_000) return;
                            lastCountdownRefreshAtRef.current = nowMs;

                            dispatch(fetchSolanaIcoSnapshot({ connection, wallet })).catch(() => {});
                        }}
                    />
                ) : (
                    <Countdown
                        className="buy_card_countdown"
                        startTimestamp={Math.floor(Date.now() / 1000)}
                        expiryTimestamp={Math.floor(Date.now() / 1000)}
                    />
                )}
            </div>
            <CommonButton
                className="buy_card_price_btn"
                title="ROCK Next Big Price Change"
            />
            <div className="buy_card_progress">
                <div className="buy_card_progress_value">
                    <p>USD RAISED</p>
                    <p className="yellowclr">${raised.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / ${target.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
                <ProgressBar now={progressPercentage} className="buy_card_progress_bar" />
            </div>
            <div className="buy_card_info_boxes">
                <div className="buy_card_info_box">
                    <p className="buy_card_info_label">Current Phase</p>
                    <p className="buy_card_info_value">
                        {solanaLoading ? "Loading..." : (currentPhase ?? "-")}
                    </p>
                </div>
                <div className="buy_card_info_box">
                    <p className="buy_card_info_label">Available Balance:</p>
                    <p className="buy_card_info_value">{walletSol} SOL</p>
                </div>
            </div>
            {solanaError ? (
                <p style={{ color: "#ff6b6b", marginTop: "8px", fontSize: "12px" }}>
                    {solanaError}
                </p>
            ) : null}
            <div className="buy_card_payment_methods">
                {paymentMethods.map((method) => (
                    <button
                        key={method.id}
                        className={`buy_card_payment_btn ${selectedPayment === method.id ? 'active' : ''}`}
                        onClick={() => setSelectedPayment(method.id)}
                    >
                        {method.icon}
                        <span>{method.label}</span>
                    </button>
                ))}
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                    solAmount: Yup.string(),
                    rockAmount: Yup.string(),
                })}
                onSubmit={async (values) => {
                    try {
                        if (!wallet.publicKey) {
                            setWalletModalVisible(true);
                            return;
                        }
                        const snapshot = await dispatch(
                            fetchSolanaIcoSnapshot({
                                connection,
                                wallet,
                            })
                        ).unwrap();

                        const icoState = new PublicKey(snapshot.icoStateAddress || icoStateAddress);
                        const receiver = new PublicKey(snapshot.receiverAddress || receiverAddress);
                        if (!wallet.publicKey) throw new Error("Connect wallet");
                        // Default to lamports; if quotes switched to SOL-unit mode, user can still buy by SOL input,
                        // but for now we keep buy in lamports to match typical SOL transfers.
                        const solAmount = solToLamports(values.solAmount);
                        if (solAmount <= 0n) throw new Error("Enter SOL amount");

                        Toast.promise(
                            () =>
                                buyTokens({
                                    program: getProgram(connection, wallet),
                                    icoState,
                                    receiver,
                                    user: wallet.publicKey!,
                                    solAmount,
                                }),
                            {
                                loading: "Submitting transaction...",
                                success: "Purchase submitted",
                                error: "Purchase failed",
                            },
                            "buy-tokens"
                        );
                    } catch (e) {
                        // eslint-disable-next-line no-console
                        console.error("buyTokens submit error", e);
                        const raw = errorToString(e, "Purchase failed");
                        const msg =
                            raw.toLowerCase().includes("blockhash is invalid") ||
                            raw.toLowerCase().includes("cannot be validated")
                                ? `Wallet rejected the transaction blockhash. This usually means your wallet network doesn't match the app RPC (current RPC: ${connection.rpcEndpoint}). Switch Phantom to the same network (devnet/mainnet) and try again.`
                                : raw;
                        Toast.error(msg, "buy-tokens-error");
                    }
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                }) => (
                    <Form>
                        <QuoteWatcher
                            icoStateAddress={icoStateAddress}
                            rockDecimals={rockDecimals}
                        />
                        <div className="buy_card_inputs">
                            <div className="buy_card_input_group">
                                <FormControl
                                    label={`${selectedPayment} you pay`}
                                    name="solAmount"
                                    type="number"
                                    placeholder="0.0"
                                    value={values.solAmount}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    rightIcon={getPaymentIcon()}
                                    error={touched.solAmount && errors.solAmount ? errors.solAmount : ""}
                                />
                            </div>
                            <div className="buy_card_input_group">
                                <FormControl
                                    label="ROCK you receive"
                                    name="rockAmount"
                                    type="text"
                                    placeholder="0"
                                    value={values.rockAmount}
                                    disabled
                                    error={touched.rockAmount && errors.rockAmount ? errors.rockAmount : ""}
                                />
                            </div>
                        </div>
                        {wallet.publicKey ? (
                            <CommonButton
                                type="submit"
                                className="buy_card_proceed_btn"
                                title="Proceed to pay"
                                fluid
                            />
                        ) : (
                            <CommonButton
                                type="button"
                                className="buy_card_proceed_btn"
                                title="Connect Wallet"
                                onClick={() => setWalletModalVisible(true)}
                                fluid
                            />
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    );
};
export default BuyCard;

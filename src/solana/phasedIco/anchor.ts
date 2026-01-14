import { AnchorProvider, BN, Program } from "@coral-xyz/anchor";
import type { Idl } from "@coral-xyz/anchor";
import type { Connection, PublicKey } from "@solana/web3.js";
import { Connection as Web3Connection, Keypair, clusterApiUrl } from "@solana/web3.js";
import { PublicKey as Web3PublicKey } from "@solana/web3.js";
import type { WalletContextState } from "@solana/wallet-adapter-react";
import { SystemProgram } from "@solana/web3.js";
import idlJson from "../../abi/phased.ico.json";
import { PROGRAM_ID as PROGRAM_ID_STR, RPC_URL } from "../../Utills/Constant";

const PROGRAM_ID = new Web3PublicKey(String(PROGRAM_ID_STR).replace(/\s+/g, ""));
const IDL = idlJson as unknown as Idl;

export function getProgram(connection: Connection, wallet: WalletContextState): Program {
  // AnchorProvider expects a wallet that can sign; wallet-adapter wallets satisfy this at runtime.
  const provider = new AnchorProvider(connection, wallet as never, {});
  // Anchor (browser) constructor expects: (idl, provider)
  return new Program(IDL, provider);
}

// -----------------------------
// Quote program (devnet) - for calculate_tokens without wallet connection
// -----------------------------

type AnchorKeypairWallet = {
  publicKey: PublicKey;
  signTransaction: <T>(tx: T) => Promise<T>;
  signAllTransactions: <T>(txs: T[]) => Promise<T[]>;
};

let _devnetConn: Web3Connection | null = null;
let _quoteKp: Keypair | null = null;
let _lastAirdropAttemptAtMs = 0;
let _lastAirdropError: string | null = null;
const QUOTE_PAYER_STORAGE_KEY = "rps-ico-devnet-quote-payer-v1";

function getDevnetConnection(): Web3Connection {
  if (_devnetConn) return _devnetConn;
  // Allow override via env for hosted devnet RPCs. Falls back to public devnet.
  const url = RPC_URL || clusterApiUrl("devnet");
  _devnetConn = new Web3Connection(url, "confirmed");
  return _devnetConn;
}

function getDevnetRpcUrl(): string {
  const conn = getDevnetConnection();
  return (conn as any)?.rpcEndpoint ? String((conn as any).rpcEndpoint) : RPC_URL || clusterApiUrl("devnet");
}

function getQuoteKeypair(): Keypair {
  if (_quoteKp) return _quoteKp;

  // Persist quote payer across refreshes so you only need to fund it once.
  // This is safe here because this keypair is ONLY used for devnet quote simulation.
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const raw = window.localStorage.getItem(QUOTE_PAYER_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { secretKey: number[] };
        if (Array.isArray(parsed?.secretKey) && parsed.secretKey.length) {
          _quoteKp = Keypair.fromSecretKey(Uint8Array.from(parsed.secretKey));
          return _quoteKp;
        }
      }
    }
  } catch {
    // ignore and regenerate
  }

  _quoteKp = Keypair.generate();
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(
        QUOTE_PAYER_STORAGE_KEY,
        JSON.stringify({ secretKey: Array.from(_quoteKp.secretKey) })
      );
    }
  } catch {
    // ignore
  }
  return _quoteKp;
}

export function getDevnetQuotePayerAddress(): string {
  return getQuoteKeypair().publicKey.toBase58();
}

function makeKeypairWallet(kp: Keypair): AnchorKeypairWallet {
  return {
    publicKey: kp.publicKey,
    async signTransaction(tx) {
      // Anchor view() uses legacy tx signing for simulation fee payer
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      (tx as any).partialSign?.(kp);
      return tx;
    },
    async signAllTransactions(txs) {
      for (const tx of txs) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        (tx as any).partialSign?.(kp);
      }
      return txs;
    },
  };
}

async function ensureDevnetQuotePayerFunded(connection: Web3Connection, pubkey: PublicKey) {
  try {
    const bal = await connection.getBalance(pubkey, "confirmed");
    if (bal > 0) return;

    const now = Date.now();
    if (now - _lastAirdropAttemptAtMs < 30_000) return;
    _lastAirdropAttemptAtMs = now;

    // Devnet faucet can be flaky/rate-limited; retry once quickly before giving up.
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const sig = await connection.requestAirdrop(pubkey, 50_000_000); // 0.05 SOL
        const bh = await connection.getLatestBlockhash("confirmed");
        await connection.confirmTransaction({ signature: sig, ...bh }, "confirmed");
        break;
      } catch (inner) {
        _lastAirdropError =
          (inner && typeof inner === "object" && "message" in inner ? String((inner as any).message) : String(inner)) ||
          "Airdrop failed";
        if (attempt === 0) await new Promise((r) => setTimeout(r, 750));
      }
    }
  } catch (e) {
    // record error for better UX; caller may choose to surface it
    _lastAirdropError =
      (e && typeof e === "object" && "message" in e ? String((e as any).message) : String(e)) ||
      "Airdrop failed";
  }
}

/**
 * Devnet Program instance that can run `.view()` methods without a connected wallet.
 * This is used for `calculate_tokens` quotes irrespective of wallet connection.
 */
export async function getDevnetQuoteProgram(): Promise<Program> {
  const conn = getDevnetConnection();
  const kp = getQuoteKeypair();
  await ensureDevnetQuotePayerFunded(conn, kp.publicKey);
  // If still not funded, fail early with a clear actionable error.
  let bal = 0;
  try {
    // Use processed so freshly-funded balances show up quickly.
    bal = await conn.getBalance(kp.publicKey, "processed");
  } catch (e) {
    const msg =
      (e && typeof e === "object" && "message" in e ? String((e as any).message) : String(e)) || "getBalance failed";
    // If the RPC is rate limiting, surface a dedicated error (otherwise we can mistakenly think payer is unfunded).
    if (msg.includes("429") || msg.toLowerCase().includes("rate")) {
      const rpc = getDevnetRpcUrl();
      const payer = kp.publicKey.toBase58();
      throw new Error(`DEVNET_QUOTE_RPC_RATE_LIMITED: ${rpc} (payer: ${payer}). ${msg}`);
    }
  }

  if (!bal) {
    const rpc = getDevnetRpcUrl();
    const payer = kp.publicKey.toBase58();
    const extra = _lastAirdropError ? ` Airdrop error: ${_lastAirdropError}` : "";
    throw new Error(
      `DEVNET_QUOTE_PAYER_UNFUNDED: ${payer} (rpc: ${rpc}). Fund this address on devnet (make sure your sender wallet is on devnet) or use an RPC that supports requestAirdrop.${extra}`
    );
  }
  const provider = new AnchorProvider(conn, makeKeypairWallet(kp) as never, {});
  return new Program(IDL, provider);
}

export async function resolveIcoState(program: Program): Promise<{
  icoStateAddress: string;
  adminAddress: string;
  receiverAddress: string;
}> {
  // This uses Anchor account querying, no manual discriminators/decoders.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const all = (await (program.account as any).icoState.all()) as Array<{
    publicKey: PublicKey;
    account: { admin: PublicKey; receiver: PublicKey };
  }>;

  if (!all.length) throw new Error("No icoState account found");
  if (all.length > 1) {
    throw new Error(`Multiple icoState accounts found (${all.length})`);
  }

  return {
    icoStateAddress: all[0].publicKey.toBase58(),
    adminAddress: all[0].account.admin.toBase58(),
    receiverAddress: all[0].account.receiver.toBase58(),
  };
}

export function deriveCurrentPhaseFromIcoState(icoState: unknown): number | null {
  const state = icoState as any;
  const phases: any[] | undefined = state?.phases;
  if (!Array.isArray(phases) || phases.length === 0) return null;

  const now = Math.floor(Date.now() / 1000);
  const pick =
    phases.find((p) => {
      const isActive = p?.isActive ?? p?.is_active;
      if (!isActive) return false;
      const start = Number(p?.startTime ?? p?.start_time ?? 0);
      const end = Number(p?.endTime ?? p?.end_time ?? 0);
      if (start === 0 && end === 0) return true;
      return now >= start && now <= end;
    }) ?? phases.find((p) => (p?.isActive ?? p?.is_active) === true);

  if (!pick) return null;
  const phaseId = pick?.phaseId ?? pick?.phase_id;
  const n = Number(phaseId);
  return Number.isFinite(n) ? n : null;
}

export function userPurchasePda(programId: PublicKey, user: PublicKey): PublicKey {
  const [pda] = Web3PublicKey.findProgramAddressSync(
    [Buffer.from("user-purchase"), user.toBuffer()],
    programId
  );
  return pda;
}

export async function buyTokens(params: {
  program: Program;
  icoState: PublicKey;
  receiver: PublicKey;
  user: PublicKey;
  solAmount: bigint;
}): Promise<string> {
  const programId = (params.program.programId as PublicKey) ?? PROGRAM_ID;
  const userState = userPurchasePda(programId, params.user);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const sig = await (params.program.methods as any)
    .buyTokens(new BN(params.solAmount.toString()))
    .accounts({
      icoState: params.icoState,
      userState,
      user: params.user,
      receiver: params.receiver,
      systemProgram: SystemProgram.programId,
    })
    .rpc();

  return String(sig);
}

export async function calculateTokens(params: {
  program: Program;
  icoState: PublicKey;
  solAmount: bigint;
}): Promise<bigint> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const out = await (params.program.methods as any)
    .calculateTokens(new BN(params.solAmount.toString()))
    .accounts({ icoState: params.icoState })
    .view();

  // Anchor returns BN/number-like
  return BigInt(out.toString());
}

export async function fetchIcoState(program: Program, icoState: PublicKey): Promise<unknown> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  return (program.account as any).icoState.fetch(icoState);
}

export async function fetchUserPurchaseState(
  program: Program,
  user: PublicKey
): Promise<unknown> {
  const programId = (program.programId as PublicKey) ?? PROGRAM_ID;
  const pda = userPurchasePda(programId, user);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  return (program.account as any).userPurchaseState.fetch(pda);
}

export async function updateAdmin(params: {
  program: Program;
  icoState: PublicKey;
  admin: PublicKey;
  newAdmin: PublicKey;
}): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const sig = await (params.program.methods as any)
    .updateAdmin(params.newAdmin)
    .accounts({
      icoState: params.icoState,
      admin: params.admin,
    })
    .rpc();
  return String(sig);
}

export async function updateReceiver(params: {
  program: Program;
  icoState: PublicKey;
  admin: PublicKey;
  newReceiver: PublicKey;
}): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const sig = await (params.program.methods as any)
    .updateReceiver(params.newReceiver)
    .accounts({
      icoState: params.icoState,
      admin: params.admin,
    })
    .rpc();
  return String(sig);
}



import { Col, Row } from "react-bootstrap";
import { useEffect, useMemo, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import CommonButton from "../../../common/button/CommonButton";
import Toast from "../../../common/Toast";
import InputField from "../../../ui/formik/inputField/InputField";
import "./Settings.scss";
import {
  fetchIcoState,
  getProgram,
  resolveIcoState,
  updateAdmin,
  updateReceiver,
} from "../../../../solana/phasedIco/anchor";

const Settings = () => {
  const { connection } = useConnection();
  const wallet = useWallet();

  const [icoStateAddress, setIcoStateAddress] = useState<string>("");
  const [currentAdmin, setCurrentAdmin] = useState<string>("");
  const [currentReceiver, setCurrentReceiver] = useState<string>("");

  const [newAdmin, setNewAdmin] = useState<string>("");
  const [newReceiver, setNewReceiver] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [submittingAdmin, setSubmittingAdmin] = useState(false);
  const [submittingReceiver, setSubmittingReceiver] = useState(false);

  const walletAddress = wallet.publicKey?.toBase58() ?? "";
  const isWalletAdmin = useMemo(() => !!walletAddress && !!currentAdmin && walletAddress === currentAdmin, [
    walletAddress,
    currentAdmin,
  ]);

  const refresh = async () => {
    if (!wallet.publicKey) return;
    setLoading(true);
    try {
      const program = getProgram(connection, wallet);
      const resolved = await resolveIcoState(program);
      setIcoStateAddress(resolved.icoStateAddress);
      setCurrentReceiver(resolved.receiverAddress);
      setCurrentAdmin(resolved.adminAddress);

      // Also fetch full icoState for consistency (in case resolve uses cached/partial view in future).
      const state = (await fetchIcoState(program, new PublicKey(resolved.icoStateAddress))) as any;
      if (state?.admin?.toBase58) setCurrentAdmin(state.admin.toBase58());
      if (state?.receiver?.toBase58) setCurrentReceiver(state.receiver.toBase58());
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Settings: failed to load ICO state", e);
      Toast.error("Failed to load ICO settings", "settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection, wallet.publicKey?.toBase58()]);

  const submitUpdateAdmin = async () => {
    if (!wallet.publicKey) return Toast.error("Please connect wallet", "settings");
    if (!icoStateAddress) return Toast.error("ICO state not loaded", "settings");
    if (!isWalletAdmin) return Toast.error("Only current admin can update admin", "settings");
    if (!newAdmin.trim()) return Toast.error("Enter new admin address", "settings");

    let pk: PublicKey;
    try {
      pk = new PublicKey(newAdmin.trim());
    } catch {
      return Toast.error("Invalid Solana address", "settings");
    }

    setSubmittingAdmin(true);
    try {
      const program = getProgram(connection, wallet);
      await Toast.promise(
        () =>
          updateAdmin({
            program,
            icoState: new PublicKey(icoStateAddress),
            admin: wallet.publicKey!,
            newAdmin: pk,
          }),
        { loading: "Updating admin...", success: "Admin updated", error: "Failed to update admin" },
        "update-admin"
      );
      setNewAdmin("");
      await refresh();
    } finally {
      setSubmittingAdmin(false);
    }
  };

  const submitUpdateReceiver = async () => {
    if (!wallet.publicKey) return Toast.error("Please connect wallet", "settings");
    if (!icoStateAddress) return Toast.error("ICO state not loaded", "settings");
    if (!isWalletAdmin) return Toast.error("Only current admin can update receiver", "settings");
    if (!newReceiver.trim()) return Toast.error("Enter new receiver address", "settings");

    let pk: PublicKey;
    try {
      pk = new PublicKey(newReceiver.trim());
    } catch {
      return Toast.error("Invalid Solana address", "settings");
    }

    setSubmittingReceiver(true);
    try {
      const program = getProgram(connection, wallet);
      await Toast.promise(
        () =>
          updateReceiver({
            program,
            icoState: new PublicKey(icoStateAddress),
            admin: wallet.publicKey!,
            newReceiver: pk,
          }),
        { loading: "Updating receiver...", success: "Receiver updated", error: "Failed to update receiver" },
        "update-receiver"
      );
      setNewReceiver("");
      await refresh();
    } finally {
      setSubmittingReceiver(false);
    }
  };

  return (
    <div className="settings">
      <Row className="setting_row">
        {/* ICO Owner */}
        <Col lg={6}>
          <div className="settings_inner">
            <Row>
              <Col lg={12}>
                <InputField
                  label="Current ICO Owner Address"
                  value={loading ? "Loading..." : currentAdmin || "-"}
                  disabled
                />
              </Col>
              <Col lg={12}>
                <InputField
                  label="New ICO Owner Address"
                  placeholder="Enter New ICO Owner Address"
                  value={newAdmin}
                  onChange={(e) => setNewAdmin(e.target.value)}
                  disabled={loading || submittingAdmin}
                />
              </Col>
              <div className="setting_actions_btns">
                <CommonButton
                  title={submittingAdmin ? "Submitting..." : "Submit"}
                  onClick={submitUpdateAdmin}
                  disabled={loading || !wallet.publicKey || !isWalletAdmin || submittingAdmin}
                />
              </div>
            </Row>
          </div>
        </Col>

        {/* ICO Receiver */}
        <Col lg={6}>
          <div className="settings_inner">
            <Row>
              <Col lg={12}>
                <InputField
                  label="Current ICO Receiver Address"
                  value={loading ? "Loading..." : currentReceiver || "-"}
                  disabled
                />
              </Col>
              <Col lg={12}>
                <InputField
                  label="New ICO Receiver Address"
                  placeholder="Enter New ICO Receiver Address"
                  value={newReceiver}
                  onChange={(e) => setNewReceiver(e.target.value)}
                  disabled={loading || submittingReceiver}
                />
              </Col>
              <div className="setting_actions_btns">
                <CommonButton
                  title={submittingReceiver ? "Submitting..." : "Submit"}
                  onClick={submitUpdateReceiver}
                  // disabled={loading || !wallet.publicKey || !isWalletAdmin || submittingReceiver}
                  disabled={loading || submittingReceiver}
                />
              </div>
            </Row>
          </div>
        </Col>

      </Row>
    </div>
  );
};

export default Settings;

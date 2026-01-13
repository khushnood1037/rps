// @ts-expect-error WalletMultiButton is not typed
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
// @ts-expect-error useWallet is not typed
import { useWallet } from "@solana/wallet-adapter-react";
import './ConnetWallet.scss';
export default function ConnectWalletBtn() {
  const { publicKey } = useWallet();

  return (
    <WalletMultiButton>
      {!publicKey
        ? "Connect Wallet"
        : `${publicKey.toBase58().slice(0, 4)}...${publicKey
            .toBase58()
            .slice(-4)}`}
    </WalletMultiButton>
  );
}

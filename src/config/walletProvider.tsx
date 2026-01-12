import { type FC, type ReactNode, useMemo } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";

interface SolanaProviderProps {
  children: ReactNode;
}

function parseNetwork(network?: string): WalletAdapterNetwork | undefined {
  switch ((network || "").toLowerCase()) {
    case "devnet":
      return WalletAdapterNetwork.Devnet;
    case "testnet":
      return WalletAdapterNetwork.Testnet;
    case "mainnet-beta":
    case "mainnet":
      return WalletAdapterNetwork.Mainnet;
    default:
      return undefined;
  }
}

export const SolanaProvider: FC<SolanaProviderProps> = ({ children }) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network =
    parseNetwork(import.meta.env.VITE_SOLANA_NETWORK) ??
    WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => {
    const envEndpoint = (import.meta.env.VITE_SOLANA_RPC_URL || "").trim();
    return envEndpoint || clusterApiUrl(network);
  }, [network]);

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};


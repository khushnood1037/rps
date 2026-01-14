import { type FC, type ReactNode, useMemo } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import {
  type Adapter,
  type WalletError,
  WalletAdapterNetwork,
  WalletNotReadyError,
} from "@solana/wallet-adapter-base";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { FilteredWalletModalProvider } from "./FilteredWalletModalProvider";
import Toast from "../components/common/Toast";

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

  const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter()], []);

  const autoConnect = useMemo(() => {
    return async (adapter: Adapter) => {
      // Only auto-connect if the injected provider already considers itself connected.
      // This avoids triggering wallet popups / user-gesture restrictions on page load.
      if (typeof window === "undefined") return false;

      try {
        if (adapter.name === "Phantom") {
          const phantom = (window as any).phantom?.solana || (window as any).solana;
          return Boolean(phantom?.isPhantom && phantom?.isConnected);
        }

        if (adapter.name === "Solflare") {
          const solflare = (window as any).solflare;
          return Boolean(solflare?.isSolflare && solflare?.isConnected);
        }
      } catch {
        // ignore
      }

      return false;
    };
  }, []);

  const onWalletError = (error: WalletError, adapter?: Adapter) => {
    const adapterName = adapter?.name ?? "Unknown wallet";
    const underlying = (error as WalletError).error;
    const underlyingMessage =
      underlying && typeof underlying === "object" && "message" in underlying
        ? String((underlying as { message?: unknown }).message)
        : undefined;
    const underlyingCode =
      underlying && typeof underlying === "object" && "code" in underlying
        ? (underlying as { code?: unknown }).code
        : undefined;

    if (error instanceof WalletNotReadyError && adapter?.url && typeof window !== "undefined") {
      window.open(adapter.url, "_blank");
    }

    if (underlyingCode === 4001) {
      Toast.error("Wallet connection request was rejected.", "wallet");
    } else if (underlyingCode === -32002) {
      Toast.error("A wallet request is already pending. Open your wallet and approve it.", "wallet");
    } else if (error instanceof WalletNotReadyError) {
      Toast.error("Wallet not detected. Install/unlock your wallet and refresh.", "wallet");
    } else {
      Toast.error(`Wallet error (${adapterName}): ${underlyingMessage || error.message || error.name}`, "wallet");
    }

    // eslint-disable-next-line no-console
    console.warn(
      `[Solana wallet] ${adapterName}: ${error.name}${error.message ? `: ${error.message}` : ""}${
        underlyingMessage ? ` (cause: ${underlyingMessage})` : ""
      }`
    );
  };

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider
        wallets={wallets}
        // Safe autoConnect: reconnect on refresh only if the wallet is already connected in the extension.
        autoConnect={autoConnect}
        // Avoid collisions with other Solana apps on the same origin that also use the default `walletName` key.
        localStorageKey="rps-ico-walletName"
        onError={onWalletError}
      >
        <FilteredWalletModalProvider>{children}</FilteredWalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};


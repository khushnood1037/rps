/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SOLANA_NETWORK?: string;
  readonly VITE_SOLANA_RPC_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Some dependencies ship CSS entrypoints with bare module specifiers; eslint/ts
// sometimes fails to resolve them without an explicit declaration.
declare module "@solana/wallet-adapter-react-ui/styles.css";

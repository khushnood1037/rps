import { Buffer } from "buffer";

// Solana/web3.js + bn.js expect Buffer in the browser.
if (!(globalThis as any).Buffer) (globalThis as any).Buffer = Buffer;



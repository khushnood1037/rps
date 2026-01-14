import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Connection } from "@solana/web3.js";
import { PROGRAM_ID } from "../../Utills/Constant";
import type { WalletContextState } from "@solana/wallet-adapter-react";
import { PublicKey as Web3PublicKey } from "@solana/web3.js";
import {
  fetchIcoState,
  fetchUserPurchaseState,
  getProgram,
  deriveCurrentPhaseFromIcoState,
  resolveIcoState,
} from "../../solana/phasedIco/anchor";

/**ICO SLICE */
interface TokenState {
  rockSymbol: string;
  rockDecimals: number;
  usdtSymbol: string;
  usdtDecimals: number;
  usdcSymbol: string;
  usdcDecimals: number;
  ethDecimals: number;
  usdDecimals: number;
  currentPhaseinfo: number | null;
  phaseInfo?: unknown;
  referralCode: string | null;

  /** Solana ICO reusable cache */
  solanaProgramId: string;
  icoStateAddress: string;
  receiverAddress: string;
  icoState: unknown | null;
  userPurchaseState: unknown | null;
  solanaError: string | null;
  solanaLoading: boolean;
}

const initialState: TokenState = {
  rockSymbol: "ROCK",
  // Solana SPL tokens commonly use 9 decimals; ROCK is 9.
  rockDecimals: 9,
  usdtSymbol: "",
  usdtDecimals: 6,
  usdcSymbol: "",
  usdcDecimals: 6,
  ethDecimals: 18,
  usdDecimals: 8,
  currentPhaseinfo: null,
  referralCode: "",

  solanaProgramId: PROGRAM_ID,
  icoStateAddress: "",
  receiverAddress: "",
  icoState: null,
  userPurchaseState: null,
  solanaError: null,
  solanaLoading: false,
};

export const fetchSolanaIcoSnapshot = createAsyncThunk(
  "token/fetchSolanaIcoSnapshot",
  async (args: { connection: Connection; wallet: WalletContextState }) => {
    const program = getProgram(args.connection, args.wallet);
    const { icoStateAddress, receiverAddress } = await resolveIcoState(program);

    const icoStatePk = new Web3PublicKey(icoStateAddress);

    const icoState = await fetchIcoState(program, icoStatePk);
    const currentPhase = deriveCurrentPhaseFromIcoState(icoState);

    let userPurchaseState: unknown | null = null;
    if (args.wallet.publicKey) {
      try {
        userPurchaseState = await fetchUserPurchaseState(program, args.wallet.publicKey);
      } catch {
        userPurchaseState = null;
      }
    }

    return {
      programId: PROGRAM_ID,
      icoStateAddress,
      receiverAddress,
      currentPhase: currentPhase,
      icoState,
      userPurchaseState,
    };
  }
);

export const TokenSlice = createSlice({
  name: "token",
  initialState: initialState,
  reducers: {
    setRockSymbol: (state, action: PayloadAction<string>) => {
      state.rockSymbol = action.payload;
    },
    setRockDecimals: (state, action: PayloadAction<number>) => {
      state.rockDecimals = action.payload;
    },
    setUsdtSymbol: (state, action: PayloadAction<string>) => {
      state.usdtSymbol = action.payload;
    },
    setUsdtDecimals: (state, action: PayloadAction<number>) => {
      state.usdtDecimals = action.payload;
    },
    setUsdcSymbol: (state, action: PayloadAction<string>) => {
      state.usdcSymbol = action.payload;
    },
    setUsdcDecimals: (state, action: PayloadAction<number>) => {
      state.usdcDecimals = action.payload;
    },
    setEthDecimals: (state, action: PayloadAction<number>) => {
      state.ethDecimals = action.payload;
    },
    setPhaseInfo: (state, action: PayloadAction<unknown>) => {
      state.phaseInfo = action.payload;
    },
    setCurrentPhaseInfo: (state, action: PayloadAction<number>) => {
      state.currentPhaseinfo = action.payload;
    },
    setReferralCode: (state, action: PayloadAction<string>) => {
      state.referralCode = action.payload;
    },
    setSolanaIcoAddresses: (
      state,
      action: PayloadAction<{ icoStateAddress: string; receiverAddress: string }>
    ) => {
      state.icoStateAddress = action.payload.icoStateAddress;
      state.receiverAddress = action.payload.receiverAddress;
    },
    clearToken: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSolanaIcoSnapshot.pending, (state) => {
        state.solanaLoading = true;
        state.solanaError = null;
      })
      .addCase(fetchSolanaIcoSnapshot.fulfilled, (state, action) => {
        state.solanaLoading = false;
        state.solanaProgramId = action.payload.programId;
        state.icoStateAddress = action.payload.icoStateAddress;
        state.receiverAddress = action.payload.receiverAddress;
        state.currentPhaseinfo = action.payload.currentPhase ?? null;
        state.icoState = action.payload.icoState;
        state.userPurchaseState = action.payload.userPurchaseState;
      })
      .addCase(fetchSolanaIcoSnapshot.rejected, (state, action) => {
        state.solanaLoading = false;
        state.solanaError = action.error.message || "Failed to load Solana ICO data";
      });
  },
});

// ACTIONS FOR SLICE
export const {
  setRockSymbol,
  setRockDecimals,
  setUsdtSymbol,
  setUsdtDecimals,
  setPhaseInfo,
  clearToken,
  setUsdcDecimals,
  setUsdcSymbol,
  setCurrentPhaseInfo,
  setReferralCode,
  setSolanaIcoAddresses,
} = TokenSlice.actions;

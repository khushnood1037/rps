import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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
}

const initialState: TokenState = {
  rockSymbol: "ROCK",
  rockDecimals: 18,
  usdtSymbol: "",
  usdtDecimals: 6,
  usdcSymbol: "",
  usdcDecimals: 6,
  ethDecimals: 18,
  usdDecimals: 8,
  currentPhaseinfo: null,
  referralCode: "",
};

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
    clearToken: () => initialState,
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
} = TokenSlice.actions;

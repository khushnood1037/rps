import { createSlice } from "@reduxjs/toolkit";

/**LOADER SLICE */
const initialState = {
  isLoading: false,
  globalLoading: false,
  isWalletLoading: false,
  buttonLoaderDetails: {},
};
export const LoaderSlice = createSlice({
  name: "loader",
  initialState: initialState,
  reducers: {
    loader: (state, param) => {
      const { payload } = param;
      state.isLoading = payload;
    },
    globalLoader: (state, param) => {
      const { payload } = param;
      state.globalLoading = payload;
    },
    walletLoader: (state, param) => {
      const { payload } = param;
      state.isWalletLoading = payload;
    },
    buttonLoader: (state, param) => {
      const { payload } = param;
      state.buttonLoaderDetails = {
        ...state.buttonLoaderDetails,
        ...payload,
      };
    },

    resetLoader: () => initialState,
  },
});

/**ACTION FOR SLICE*/
export const { loader, walletLoader, buttonLoader, resetLoader, globalLoader } =
  LoaderSlice.actions;

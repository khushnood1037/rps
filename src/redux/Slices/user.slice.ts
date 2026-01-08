import { createSlice } from "@reduxjs/toolkit";
import type { LoginResponseData } from "../../types/api.types";

/**USER DETAILS SLICE */
interface UserState {
  walletAddress: string;
  temporaryRole: string | null;
  userData: LoginResponseData | null;
}

const initialState: UserState = {
  walletAddress: "",
  temporaryRole: "",
  userData: null,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setWalletAddress: (state, param: { payload: string }) => {
      const { payload } = param;
      state.walletAddress = payload;
    },
    setTemporaryRole: (state, param: { payload: string }) => {
      const { payload } = param;
      state.temporaryRole = payload;
    },
    setUserData: (state, param: { payload: LoginResponseData | null }) => {
      const { payload } = param;
      state.userData = payload;
    },

    logoutUser: () => initialState,
  },
});

/**ACTIONS FOR SLICE*/

export const { setWalletAddress, logoutUser, setUserData, setTemporaryRole } =
  UserSlice.actions;

import { createSlice } from "@reduxjs/toolkit";

/**ADMIN DETAILS SLICE */
interface AdminData {
  [key: string]: unknown;
}

const initialState = {
  isAdmin: false,
  adminType: [] as string[],
  adminData: {} as AdminData,
  adminWalletAddress: "",
};

export const AdminSlice = createSlice({
  name: "admin",
  initialState,

  reducers: {
    setIsAdmin: (state, param) => {
      const { payload } = param;
      state.isAdmin = payload;
    },
    setAdminType: (state, param) => {
      const { payload } = param;
      state.adminType = payload;
    },
    setAdminData: (state, param) => {
      const { payload } = param;
      state.adminData = payload;
    },

    setAdminWalletAddress: (state, param) => {
      const { payload } = param;
      state.adminWalletAddress = payload;
    },

    logoutAdmin: () => initialState,
  },
});

/**ACTIONS FOR SLICE*/
export const {
  setAdminWalletAddress,
  setIsAdmin,
  logoutAdmin,
  setAdminType,
  setAdminData,
} = AdminSlice.actions;

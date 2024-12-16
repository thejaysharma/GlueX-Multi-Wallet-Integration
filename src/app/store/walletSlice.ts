import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    connectedWallet: null,
    walletType: null,
};

export const walletSlice = createSlice({
    name: "GuleX_wallet",
    initialState,
    reducers: {
        connectWallet: (state, action) => {
            state.connectedWallet = action.payload.address;
            state.walletType = action.payload.type;
        },
        disconnectWallet: (state) => {
            state.connectedWallet = null;
            state.walletType = null;
        },
    },
});

export const { connectWallet, disconnectWallet } = walletSlice.actions;
export default walletSlice.reducer;

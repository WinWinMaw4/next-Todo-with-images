/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
	isAuthenticated: boolean;
	userData: any;
	token: string | null;
}

const initialState: AuthState = {
	isAuthenticated: false,
	userData: null,
	token: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action) => {
			state.isAuthenticated = true;
			state.userData = action.payload;
		},
		logout: () => initialState,
		setToken: (state, action) => {
			state.token = action.payload;
		},
	},
});

export const {
	login,
	logout,
	setToken,
} = authSlice.actions;
export default authSlice.reducer;

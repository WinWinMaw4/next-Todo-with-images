/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import authReducer from './slices/authSlice';
import authReducer from './slices/authSlice'

import { apiSlice } from "@/services/apiSlice";
import errorHandlingMiddleware from "@/services/errorHandlingMiddleware";


// import errorHandlingMiddleware from "@services/errorHandlingMiddleware";

// Type declaration for persistConfig
interface PersistConfigType {
	key: string;
	storage: any;
	whitelist: string[];
}

// Persist configuration
const persistConfig: PersistConfigType = {
	key: "root",
	storage,
	whitelist: ["auth", "theme"],
};

// Combine all reducers
const rootReducer = combineReducers({
    auth: authReducer,
	[apiSlice.reducerPath]: apiSlice.reducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Redux store
export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				// Disable serializable check for Redux Persist middleware only
				ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
			},
		}).concat(apiSlice.middleware, errorHandlingMiddleware),
});

// Create persistor
export const persistor = persistStore(store);

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

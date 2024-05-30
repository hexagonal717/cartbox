import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE,} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSliceDataReducer from "./userSlice.js";
import loginSliceDataReducer from "./loginSlice.js";

const persistConfig = {
    key: "calvinmern",
    version: 1,
    storage,
};

const rootReducer = combineReducers({userSlice: userSliceDataReducer, loginSlice: loginSliceDataReducer});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);

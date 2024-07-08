import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSliceReducer from "./userSlice.js";
import adminSliceReducer from "./adminSlice.js";
import userLoginSliceReducer from "./userLoginSlice.js";
import adminLoginSliceReducer from "./adminLoginSlice.js";
import otpSliceReducer from "./otpSlice.js";

const persistConfig = {
  key: "calvinmern",
  version: 1,
  storage,
  whitelist: ["userSlice", "adminSlice", "userLoginSlice", "adminLoginSlice"],
};

const rootReducer = combineReducers({
  userSlice: userSliceReducer,
  adminSlice: adminSliceReducer,
  userLoginSlice: userLoginSliceReducer,
  adminLoginSlice: adminLoginSliceReducer,
  otpSlice: otpSliceReducer,
});

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

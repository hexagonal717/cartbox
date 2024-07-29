import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import adminAuthSliceReducer from '../features/admin/redux/adminAuthSlice.js';
import adminOtpSliceReducer from '../features/admin/redux/adminOtpSlice.js';
import adminProfileSliceReducer from '../features/admin/redux/adminProfileSlice.js';
import cartSliceReducer from '../features/customer/redux/cartSlice.js';
import customerAuthSliceReducer from '../features/customer/redux/customerAuthSlice.js';
import customerOtpSliceReducer from '../features/customer/redux/customerOtpSlice.js';
import customerProfileSliceReducer from '../features/customer/redux/customerProfileSlice.js';
import superAdminAuthSliceReducer from '../features/superAdmin/redux/superAdminAuthSlice.js';
import superAdminOtpSliceReducer from '../features/superAdmin/redux/superAdminOtpSlice.js';
import superAdminProfileSliceReducer from '../features/superAdmin/redux/superAdminProfileSlice.js';

const persistConfig = {
  key: 'hexagonal717-cartbox',
  version: 1,
  storage,
  whitelist: [
    'customerAuthSlice',
    'customerProfileSlice',
    'adminAuthSlice',
    'adminProfileSlice',
    'superAdminAuthSlice',
    'superAdminProfileSlice',
    'cartSlice',
  ],
};

const rootReducer = combineReducers({
  customerAuthSlice: customerAuthSliceReducer,
  customerProfileSlice: customerProfileSliceReducer,
  customerOtpSlice: customerOtpSliceReducer,
  adminAuthSlice: adminAuthSliceReducer,
  adminProfileSlice: adminProfileSliceReducer,
  adminOtpSlice: adminOtpSliceReducer,
  superAdminAuthSlice: superAdminAuthSliceReducer,
  superAdminProfileSlice: superAdminProfileSliceReducer,
  superAdminOtpSlice: superAdminOtpSliceReducer,
  cartSlice: cartSliceReducer,
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

import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import IndexReducer from './Reducers/IndexSlices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import {setupListeners} from '@reduxjs/toolkit/query';
import {baseApi} from './services/api';
import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();
export const reduxStorage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};
const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['user', 'User_Reducer', 'userType'],
  autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, IndexReducer);
const Store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([baseApi.middleware]),
});
const persistedStore = persistStore(Store);
setupListeners(Store.dispatch);

export {Store, persistedStore};

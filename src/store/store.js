import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import settingReducer from './slices/setting';
import bottomSheetReducer from './slices/bottomSheet';
import langReducer from './slices/lang';

const rootReducer = combineReducers({
  setting: settingReducer,
  bottomSheet: bottomSheetReducer,
  lang: langReducer,
});
// const reducer = {
//   setting: settingReducer,
//   bottomSheet: bottomSheetReducer,
//   lang: langReducer,
// };

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const store = configureStore({
  // reducer,
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export const pStore = persistStore(store);
export default store;

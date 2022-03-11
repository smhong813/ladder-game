import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import settingReducer from './slices/setting';
import bottomSheetReducer from './slices/bottomSheet';
import langReducer from './slices/lang';

const reducer = {
  setting: settingReducer,
  bottomSheet: bottomSheetReducer,
  lang: langReducer,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

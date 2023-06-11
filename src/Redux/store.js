import { configureStore } from '@reduxjs/toolkit';
import { createStore, combineReducers } from 'redux';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from './userReducer';
import postsReducer from './postsReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
};
const rootReducer = combineReducers({
  posts: postsReducer,
  user: userReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer);

// export const store = configureStore({
//   persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });
export const persistor = persistStore(store);

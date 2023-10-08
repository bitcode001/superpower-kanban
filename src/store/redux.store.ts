import { configureStore, combineReducers } from '@reduxjs/toolkit';
import counterSlice from './slice/counter.slice';

const rootReducer = combineReducers({
	counter: counterSlice
});

import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfiguration = {
	key: 'sk-root',
	storage
	// version: 1,
};

const persistedReducer = persistReducer(persistConfiguration, rootReducer);

export const reduxStore = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		})
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;

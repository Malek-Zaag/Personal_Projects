import { combineReducers, configureStore } from '@reduxjs/toolkit'
import itemReducer from './cartAdder'
import counterReducer from './counter'
import valueReducer from './value'
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const reducers = combineReducers({
    itemReducer: itemReducer,
    counterReducer: counterReducer,
    valueReducer: valueReducer
})


const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})
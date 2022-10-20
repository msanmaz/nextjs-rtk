import { configureStore,combineReducers } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import productSlice from '../slice/testSlice';
import logger from 'redux-logger'


const makeStore = () => {
  let store = configureStore({ 
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
    reducer: {
        productSlice: productSlice,
    }
  });

  return store;
}

export const wrapper = createWrapper(makeStore);
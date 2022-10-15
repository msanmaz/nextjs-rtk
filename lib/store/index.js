import { configureStore,combineReducers } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import productSlice from '../slice/testSlice';


const makeStore = () => {
  let store = configureStore({
    reducer: {
        productSlice: productSlice,
    }
  });

  return store;
}

export const wrapper = createWrapper(makeStore);
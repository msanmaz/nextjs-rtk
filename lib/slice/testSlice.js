// store/categorySlice.js

import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const getUsers = createAsyncThunk(
    'productSlice/getUsers',
    async () => {
      return await fetch('https://fakestoreapi.com/products').
        then(res => res.json());
    }
  );

  export const getUserId = createAsyncThunk(
    'productSlice/getUsers',
    async (id) => {
      return await fetch(`https://fakestoreapi.com/products/${id}`).
        then(res => res.json());
    }
  );
  

const initialState = {
    products: [],
    singleProduct:[],
    status:'idle',
    error:null
}

const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        setProducts(state, action) {
            state.products = action.payload;
        },

    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return state = {
                ...state,
                ...action.payload.productSlice
            };
        },
        [getUsers.pending]:(state,action)=>{
            state.status='loading';
        },
        [getUsers.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.products = action.payload;
          },
      
          [getUsers.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          },
          [getUserId.pending]:(state,action)=>{
            state.status='loading';
        },
        [getUserId.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.singleProduct = action.payload;
          },
      
          [getUserId.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          },
    },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
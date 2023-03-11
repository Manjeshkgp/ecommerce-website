import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state,action) => {
      if(state.products.some((obj)=>obj._id===action.payload._id)){
        let itemToUpdate = action.payload;
        let indexOfObj = state.products.findIndex(obj => obj._id === itemToUpdate._id);
        let updatedObj = state.products[indexOfObj];
        updatedObj.numberOfProducts += 1;
        return;
      }
      state.products.push(action.payload)
    },
    decrement: (state,action) => {
        let itemToRemove = action.payload;
        let indexOfProduct = state.products.findIndex(obj=>obj._id === itemToRemove._id);
        
        if (indexOfProduct > -1) {
          state.products.splice(indexOfProduct, 1);
        }
    },
    incrementByOne: (state, action) => {
    },
    decrementByOne: (state, action) => {
        let itemToUpdate = action.payload;
        let indexOfObj = state.products.findIndex(obj => obj._id === itemToUpdate._id);
        let updatedObj = state.products[indexOfObj];
        updatedObj.numberOfProducts -= 1;
    },
  },
})

export const { increment, decrement, incrementByOne, decrementByOne } = cartSlice.actions

export default cartSlice.reducer
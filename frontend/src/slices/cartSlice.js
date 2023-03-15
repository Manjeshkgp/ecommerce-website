import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';

const initialState = {
  products: [],
}

const jwt = Cookies.get("jwt");
const email = Cookies.get("email");
const updateCart = async(cart) => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/users/${email}/update-cart`,{
    method:"POST",
    headers:{
      Authorization:`Bearer ${jwt}`,
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      cart:cart?.products
    })
  });
  await res.json();
  if(res.status===200){
    console.log(cart)
  }
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
      updateCart(state)
    },
    decrement: (state,action) => {
        let itemToRemove = action.payload;
        let indexOfProduct = state.products.findIndex(obj=>obj._id === itemToRemove._id);
        
        if (indexOfProduct > -1) {
          state.products.splice(indexOfProduct, 1);
          updateCart(state)
        }
    },
    incrementByOne: (state, action) => {
      let itemToUpdate = action.payload;
        let indexOfObj = state.products.findIndex(obj => obj._id === itemToUpdate._id);
        let updatedObj = state.products[indexOfObj];
        updatedObj.numberOfProducts += 1;
        updateCart(state)
    },
    decrementByOne: (state, action) => {
        let itemToUpdate = action.payload;
        let indexOfObj = state.products.findIndex(obj => obj._id === itemToUpdate._id);
        let updatedObj = state.products[indexOfObj];
        if(updatedObj.numberOfProducts===1){
          state.products.splice(updatedObj,1);
          updateCart(state);
          return;
        }
        updatedObj.numberOfProducts -= 1;
        updateCart(state)
    },
    setCart: (state,action)=>{
      state.products = action.payload;
    },
    removeAllandUpdate: (state,action) => {
      state.products = initialState.products
      updateCart(initialState.products);
    }
  },
})

export const { increment, decrement, incrementByOne, decrementByOne, setCart, removeAllandUpdate } = cartSlice.actions

export default cartSlice.reducer
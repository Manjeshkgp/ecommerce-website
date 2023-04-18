import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';

const initialState = {
  products: [],
}


const updateWishlist = async(wishlist) => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/users/update-wishlist`,{
    method:"POST",
    headers:{
      Authorization:`Bearer ${Cookies.get("jwt")}`,
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      wishlist:wishlist?.products
    })
  });
  await res.json();
  if(res.status===200){
    console.log(wishlist)
  }
}

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addOrRemove: (state,action) => {
      let indexOfObj = state.products.findIndex(obj => obj._id === action.payload._id);
      if (indexOfObj > -1) {
        state.products.splice(indexOfObj, 1);
        updateWishlist(state);
        return;
      }
      state.products.push(action.payload)
      updateWishlist(state)
    },
    setWishlist: (state,action)=>{
      state.products = action.payload;
    },
    removeAllandUpdate: (state,action) => {
      state.products = initialState.products
      updateWishlist(initialState.products);
    }
  },
})

export const { addOrRemove,setWishlist,removeAllandUpdate } = wishlistSlice.actions

export default wishlistSlice.reducer
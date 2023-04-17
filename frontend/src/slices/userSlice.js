import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user:{},
  authenticated:false,
  admin:false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser:(state,action)=>{
        state.user = action.payload;
        state.authenticated = true;
    },
    removeUser:(state,action)=>{
        state.user = initialState.user;
        state.authenticated = false;
        window.location.reload()
    },
    makeAdmin:(state,action)=>{
      state.admin = true;
    },
    addAddress:(state,action)=>{
      const newAddress = action.payload;
      state.user.addresses.push(newAddress);
    }
  },
})

export const { addUser,removeUser,makeAdmin,addAddress } = userSlice.actions

export default userSlice.reducer
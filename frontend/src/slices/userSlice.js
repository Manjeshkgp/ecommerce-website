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
    },
    makeAdmin:(state,action)=>{
      state.admin = true;
    }
  },
})

export const { addUser,removeUser,makeAdmin } = userSlice.actions

export default userSlice.reducer
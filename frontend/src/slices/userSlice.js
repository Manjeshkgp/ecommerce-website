import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user:{},
  authenticated:false,
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
    }
  },
})

export const { addUser } = userSlice.actions

export default userSlice.reducer
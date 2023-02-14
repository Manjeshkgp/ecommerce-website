import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice.js";
import userReducer from "./slices/userSlice.js"

let store = configureStore({
  reducer: {
    cart:cartReducer,
    user:userReducer,
  },
});
export default store;

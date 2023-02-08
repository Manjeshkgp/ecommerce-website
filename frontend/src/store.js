import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice.js";

let store = configureStore({
  reducer: {
    cart:cartReducer,
  },
});
export default store;

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice.js";
import userReducer from "./slices/userSlice.js"
import wishlistReducer from "./slices/wishlistSlice.js";

let store = configureStore({
  reducer: {
    cart:cartReducer,
    user:userReducer,
    wishlist:wishlistReducer,
  },
});
export default store;

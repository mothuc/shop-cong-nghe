import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import formSlice from "./formSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    order: formSlice,
  },
});

export default store;

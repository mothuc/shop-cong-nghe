import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    orderId: "",
    fullname: "",
    phone: "",
    email: "",
    address: "",
    totalCost: "",
  },
  reducers: {
    updateFullname: (state, action) => {
      state.fullname = action.payload;
    },
    updatePhone: (state, action) => {
      state.phone = action.payload;
    },
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    updateAddress: (state, action) => {
      state.address = action.payload;
    },
    updateOrderId: (state, action) => {
      state.orderId = action.payload;
    },
    updateTotalCost: (state, action) => {
      state.totalCost = action.payload;
    },
  },
});

export const {
  updateTotalCost,
  updateOrderId,
  updateFullname,
  updatePhone,
  updateEmail,
  updateAddress,
} = formSlice.actions;

export default formSlice.reducer;

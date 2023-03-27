import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    totalCost: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const index = state.products.findIndex((p) => p && p.id === product.id);

      if (index === -1) {
        // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới sản phẩm vào giỏ hàng
        state.products.push({ ...product, quantity });
      } else {
        // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng sản phẩm lên
        state.products[index].quantity += quantity;
      }

      // Tính tổng giá trị trong giỏ hàng
      state.totalCost = state.products.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
    },
    removeFromCart: (state, action) => {
      const index = state.products.findIndex((p) => p.id === action.payload);
      if (index !== -1) {
        // Nếu sản phẩm có trong giỏ hàng, xóa sản phẩm khỏi giỏ hàng
        state.products.splice(index, 1);
      }

      // Tính tổng giá trị trong giỏ hàng
      state.totalCost = state.products.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const index = state.products.findIndex((p) => p.id === productId);

      if (index !== -1) {
        // Nếu sản phẩm có trong giỏ hàng, cập nhật số lượng sản phẩm
        state.products[index].quantity += quantity;

        // Nếu số lượng sản phẩm bằng 0, xóa sản phẩm khỏi giỏ hàng
        if (state.products[index].quantity === 0) {
          state.products.splice(index, 1);
        }
      }
      // Tính tổng giá trị trong giỏ hàng
      state.totalCost = state.products.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;

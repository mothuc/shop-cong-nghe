import axiosClient from "./axiosClient";

export const searchProducts = {
  async search(keywordDebounce) {
    const result = await axiosClient.get(`/products?q=${keywordDebounce}`);
    return result.data;
  },
};

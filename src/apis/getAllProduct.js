import axiosClient from "./axiosClient";

export const getAllProducts = {
  async getAll() {
    const result = await axiosClient.get("/products");
    return result.data;
  },
};

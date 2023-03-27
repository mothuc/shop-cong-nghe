import axiosClient from "./axiosClient";

export const getProductFiltered = {
  async getFiltered(selectedBrand) {
    const result = await axiosClient.get(`/products?name_like=${selectedBrand}`);
    return result.data;
  },
};

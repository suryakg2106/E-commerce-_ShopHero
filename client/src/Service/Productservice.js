import Api from "./Api";

export const getAllProducts = async (filters = {}) => {
  try {
    const cleanedFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== "" && v !== undefined)
    );

    const params = new URLSearchParams(cleanedFilters).toString();
    const res = await Api.get(`/getAllProduct?${params}`);

    return res.data;
  } catch (error) {
    console.error("Frontend getAllProducts error:", error);
    return { Success: false, Products: [] };
  }
};

import axios from "axios";

export const createProduct = async (data) => {
  try {
    const res = await axios.post(
      "http://localhost:4000/createProduct",
      data,
      {
        withCredentials: true,
      }
    );

    return res.data;
  } catch (error) {
    console.log("Frontend createProduct error:", error.response?.data);
    return error.response?.data;
  }
};

export const myProduct = async () => {
  const respons = await Api.get("/my-product");
  return respons.data;
}

export const getProductDetils = async (id) => {
  const response = await Api.get(`/product/${id}`);
  return response.data;
};

export const updateProduct = async (id, data) => {
  const response = await Api.put(
    `/product/edit/${id}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};


export const deleteProduct = async (id) => {
  const response = await Api.delete(`/product/delete/${id}`);
  return response.data;
};


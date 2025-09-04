// src/redux/features/products/productSlice.js
import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";

// Axios instance
const instance = axios.create({
  baseURL: "http://localhost:5000", // আপনার backend URL
});

// Axios baseQuery
const axiosBaseQuery = async ({ url, method, data }) => {
  try {
    const result = await instance({ url, method, data });
    return { data: result.data };
  } catch (error) {
    return {
      error: {
        status: error.response?.status,
        data: error.response?.data || error.message,
      },
    };
  }
};

// RTK Query Slice
export const productSlice = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery,
  tagTypes: ["Products", "Users", "Cart"],
  endpoints: (builder) => ({
    // Users
    getUsers: builder.query({
      query: () => ({ url: "/users", method: "GET" }),
      providesTags: ["Users"],
    }),

    // Products
    getProducts: builder.query({
      query: () => ({ url: "/products", method: "GET" }),
      providesTags: ["Products"],
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: "/products",
        method: "POST",
        data: product,
      }),
      invalidatesTags: ["Products"],
    }),

    // Cart
    addToCart: builder.mutation({
      query: (cartItem) => ({
        url: "/carts",
        method: "POST",
        data: cartItem,
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
    getCart: builder.query({
      query: (email) => ({ url: `/carts?email=${email}`, method: "GET" }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((item) => ({ type: "Cart", id: item._id })),
              { type: "Cart", id: "LIST" },
            ]
          : [{ type: "Cart", id: "LIST" }],
    }),
    updateCart: builder.mutation({
      query: ({ id, data }) => ({ url: `/carts/${id}`, method: "PUT", data }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Cart", id },
        { type: "Cart", id: "LIST" },
      ],
    }),
    deleteCart: builder.mutation({
      query: (id) => ({ url: `/carts/${id}`, method: "DELETE" }),
      invalidatesTags: (result, error, id) => [
        { type: "Cart", id },
        { type: "Cart", id: "LIST" },
      ],
    }),
  }),
});

// Export hooks
export const {
  useGetUsersQuery,
  useGetProductsQuery,
  useAddProductMutation,
  useAddToCartMutation,
  useGetCartQuery,
  useUpdateCartMutation,
  useDeleteCartMutation,
} = productSlice;

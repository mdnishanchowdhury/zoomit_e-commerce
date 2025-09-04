// src/redux/features/products/productSlice.js
import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";

// Axios instance
const instance = axios.create({
  baseURL: "http://localhost:5000",
});

// Axios baseQuery for RTK Query
const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await instance({ url: baseUrl + url, method, data, params, headers });
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
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Products", "Users", "Cart", "Orders"],
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
      pollingInterval: 10000, // auto-refresh every 10s
    }),
    addProduct: builder.mutation({
      query: (productData) => ({
        url: "/products",
        method: "POST",
        data: productData, // JSON data
        headers: { "Content-Type": "application/json" }, // sending JSON instead of multipart
      }),
      invalidatesTags: ["Products"], // auto-refresh getProducts
    }),

    // Cart
    addToCart: builder.mutation({
      query: (cartItem) => ({ url: "/carts", method: "POST", data: cartItem }),
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
      pollingInterval: 5000, // auto-refresh cart every 5s
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

    // Orders
    placeOrder: builder.mutation({
      query: ({ email, items, total }) => ({
        url: "/orders",
        method: "POST",
        data: { email, items, total },
      }),
      invalidatesTags: ["Cart", "Orders"], // auto-refresh cart and orders
    }),
    getOrders: builder.query({
      query: (email) => ({ url: `/orders?email=${email}`, method: "GET" }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((order) => ({ type: "Orders", id: order._id })),
              { type: "Orders", id: "LIST" },
            ]
          : [{ type: "Orders", id: "LIST" }],
      pollingInterval: 5000, // auto-refresh orders every 5s
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
  usePlaceOrderMutation,
  useGetOrdersQuery,
} = productSlice;

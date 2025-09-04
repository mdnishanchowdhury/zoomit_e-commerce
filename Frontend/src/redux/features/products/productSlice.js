import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
    async ({ url, method, data }) => {
      try {
        const result = await instance({
          url: baseUrl + url,
          method,
          data,
        });
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

export const productSlice = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: "" }),
  tagTypes: ["Products", "Cart"],
  endpoints: (builder) => ({
    // product
    getProducts: builder.query({
      query: () => ({ url: "/products", method: "GET" }),
      providesTags: ["Products"],
    }),

    //  cart
    addToCart: builder.mutation({
      query: (cartItem) => ({
        url: "/carts",
        method: "POST",
        data: cartItem,
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
    // identify card
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
    // update cart
    updateCart: builder.mutation({
      query: ({ id, data }) => ({
        url: `/carts/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Cart", id },
        { type: "Cart", id: "LIST" },
      ],
    }),
    // delete cart
    deleteCart: builder.mutation({
      query: (id) => ({ url: `/carts/${id}`, method: "DELETE" }),
      invalidatesTags: (result, error, id) => [
        { type: "Cart", id },
        { type: "Cart", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddToCartMutation,
  useGetCartQuery,
  useUpdateCartMutation,
  useDeleteCartMutation,
} = productSlice;

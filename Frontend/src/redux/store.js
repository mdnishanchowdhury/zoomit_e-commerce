import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./features/products/productSlice";

export const store = configureStore({
  reducer: { [productSlice.reducerPath]: productSlice.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productSlice.middleware),
});

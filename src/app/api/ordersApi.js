import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: APP_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = JSON.parse(localStorage.getItem("alexAuth"))?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchOrders: builder.query({
      query: (status) => ({
        url: `/orders/show/my/store?status_id=${status || ""}`,
      }),
    }),
    updateOrder: builder.mutation({
      query: () => ({
        url: ``,
        method: "POST",
      }),
    }),
    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: ``,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useFetchOrdersQuery } = ordersApi;

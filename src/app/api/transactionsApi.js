import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export const transactionsApi = createApi({
  reducerPath: "transactionsApi",
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
    fetchTransactions: builder.query({
      query: () => ({
        url: `/transaction/index`,
      }),
    }),
    fetchMyTransactions: builder.query({
      query: () => ({
        url: `/transaction/my`,
      }),
    }),
    updateOrder: builder.mutation({
      query: () => ({
        url: ``,
        method: "POST",
      }),
    }),
    cancleTransaction: builder.mutation({
      query: (body) => ({
        url: `/transaction/cancle_recieve_order`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useFetchTransactionsQuery,
  useFetchMyTransactionsQuery,
  useCancleTransactionMutation,
} = transactionsApi;

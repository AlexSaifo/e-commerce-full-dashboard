import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export const itemsApi = createApi({
  reducerPath: "itemsApi",
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
    fetchItemsByStoreId: builder.query({
      query: ({ page = "1", type = "sell", storeId }) => ({
        url: `/item/store/index?page=${page}&type=${type}&store=${storeId}`,
      }),
    }),
    fetchItemById: builder.query({
      query: (itemId) => ({
        url: `/item/show/${itemId}`,
      }),
    }),
    createItem: builder.mutation({
      query: (body) => ({
        url: `/item/create`,
        method: "POST",
        body,
      }),
    }),
    updateItem: builder.mutation({
      query: ({ body, categoryId }) => ({
        url: `categories/update/${categoryId}`,
        method: "POST",
        body,
      }),
    }),
    deleteItem: builder.mutation({
      query: (itemId) => ({
        url: `/item/delete/${itemId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchItemsByStoreIdQuery,
  useFetchItemByIdQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = itemsApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const APP_BASE_URL = "http://127.0.0.1:8000/api";

const baseQuery = fetchBaseQuery({ baseUrl: APP_BASE_URL });

const token = JSON.parse(localStorage.getItem("alexAuth"))?.token;
const headers = {
  Authorization: `Bearer ${token}`,
};

export const storesApi = createApi({
  reducerPath: "storesApi",
  baseQuery,
  endpoints: (builder) => ({
    fetchStores: builder.query({
      query: () => ({
        url: "/store/status/2",
        headers, 
      }),
    }),
    showStore: builder.query({
      query: (storeId) => ({
        url: `/store/show/${storeId}`,
      }),
    }),
    addNewStore: builder.mutation({
      query: (data) => ({
        url: "/employee/add_store",
        method: "POST",
        headers,
        body: data,
      }),
    }),
    removeStore: builder.mutation({
      query: (storeId) => ({
        url: `/store/delete/${storeId}`,
        method: "POST",
        headers
      }),
    }),
    updateStore: builder.mutation({
      query: (body) => ({
        url: `store/update-account-info`,
        method: "POST",
        headers,
        body
      }),
    }),
  }),
});

export const {
  useFetchStoresQuery,
  useShowStoreQuery,
  useAddNewStoreMutation,
  useRemoveStoreMutation,
  useUpdateStoreMutation
} = storesApi;

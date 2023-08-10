import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;

const baseQuery = fetchBaseQuery({ baseUrl: APP_BASE_URL });

const token = JSON.parse(localStorage.getItem("alexAuth"))?.token;
const headers = {
  Authorization: `Bearer ${token}`,
};

export const deliveriesApi = createApi({
  reducerPath: "deliveriesApi",
  baseQuery,
  endpoints: (builder) => ({
    fetchDeliveries: builder.query({
      query: () => ({
        url: "/delivary/show_mine",
        headers,
      }),
    }),
    addNewDelivery: builder.mutation({
      query: (data) => ({
        url: "/store/raise_to_delivary",
        method: "POST",
        headers,
        body: data,
      }),
    }),
    removeDelivery: builder.mutation({
      query: (delivary_id) => ({
        url: `/delivary/delete/${delivary_id}`,
        method: "POST",
        headers,
      }),
    }),
  }),
});

export const {
  useAddNewDeliveryMutation,
  useFetchDeliveriesQuery,
  useRemoveDeliveryMutation,
} = deliveriesApi;

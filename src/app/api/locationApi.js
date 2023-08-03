import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const APP_BASE_URL = "http://127.0.0.1:8000/api";

const baseQuery = fetchBaseQuery({ baseUrl: APP_BASE_URL });

const token = JSON.parse(localStorage.getItem("alexAuth"))?.token;
const headers = {
  Authorization: `Bearer ${token}`,
};

export const locationApi = createApi({
  reducerPath: "locationApi",
  baseQuery,
  endpoints: (builder) => ({
    fetchCities: builder.query({
      query: () =>({
        url: "/city/index",
      }),
    }),
    fetchState: builder.query({
        query: () =>({
          url: "/state/index",
        }),
      }),
      fetchStateByID: builder.query({
        query: (cityId) =>({
          url: `/state/city/${cityId}`,
        }),
      }),
      fetchStreet: builder.query({
        query: () =>({
          url: "/street/index",
        }),
      }),
      fetchStreetById: builder.query({
        query: (stateId) =>({
            url: `/street/state/${stateId}`,
        }),
      }),
  }),
});

export const {
    useFetchCitiesQuery,
    useFetchStateQuery,
    useFetchStateByIDQuery,
    useFetchStreetQuery,
    useFetchStreetByIdQuery
} = locationApi;

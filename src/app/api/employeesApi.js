import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;

const baseQuery = fetchBaseQuery({ baseUrl: APP_BASE_URL });

const token = JSON.parse(localStorage.getItem("alexAuth"))?.token;
const headers = {
  Authorization: `Bearer ${token}`,
};

export const employeesApi = createApi({
  reducerPath: "employeesApi",
  baseQuery,
  endpoints: (builder) => ({
    fetchEmployees: builder.query({
      query: () =>({
        url: "/employee/index",
        headers
      }),
    }),
    addNewEmployee: builder.mutation({
      query: (data) => ({
        url: "/admin/raise_to_employee",
        method: "POST",
        headers,
        body: data,
      }),
    }),
    removeEmployee: builder.mutation({
      query: (employeeId) => ({
        url: `/employees/${employeeId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchEmployeesQuery,
  useAddNewEmployeeMutation,
  useRemoveEmployeeMutation,
} = employeesApi;

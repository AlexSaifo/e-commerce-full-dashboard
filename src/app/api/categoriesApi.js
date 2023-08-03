import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL


export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
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
    fetchCategoriesByStoreId: builder.query({
      query: () => ({
        url: `categories/index`,
      }),
    }),
    fetchCategoryId: builder.query({
      query: ({ storeId, categoryId }) => ({
        url: `/admin/restaurants/${storeId}/categories/${categoryId}`,
      }),
    }),
    createCategory: builder.mutation({
      query: (body) => ({
        url: `categories/create`,
        method: "POST",
        body,
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ body, categoryId }) => ({
        url: `categories/update/${categoryId}`,
        method: "POST",
        body,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `/categories/delete/${categoryId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesByStoreIdQuery,
  useFetchCategoryIdQuery,
  useUpdateCategoryMutation,
} = categoriesApi;

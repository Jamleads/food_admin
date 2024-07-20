import { api } from "./api";

export const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => ({
        url: "/product-category",
        method: "GET",
      }),
    }),
    addCategory: builder.mutation({
      query: (data) => ({
        url: "/product-category",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useGetCategoryQuery, useAddCategoryMutation } = categoryApi;

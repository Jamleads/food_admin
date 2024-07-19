import { setCategories } from "../features/apiSlice";
import { api } from "./api";

export const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => ({
        url: "/product-category",
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCategories(data));
        } catch (error) {
          console.error("Failed to fetch categories:", error);
        }
      },
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

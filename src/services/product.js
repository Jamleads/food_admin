import { api } from "./api";

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: () => ({
        url: "/product",
        method: "GET",
      }),
    }),
    getFeaturedProduct: builder.query({
      query: () => ({
        url: "/product/featured-products",
        method: "GET",
      }),
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
    }), //TODO: UNUSED YET!
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/product/create",
        method: "POST",
        body: data,
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ data, id }) => ({
        url: `/product/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetFeaturedProductQuery,
  useGetProductByIdQuery,
} = productApi;

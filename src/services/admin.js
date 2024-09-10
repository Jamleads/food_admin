import { api } from "./api";

export const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllAdmin: builder.query({
      query: () => ({
        url: "/admin",
        method: "GET",
      }),
    }),
    // getOneOrderInfo: builder.query({
    //   query: (id) => ({
    //     url: `/order/${id}`,
    //     method: "GET",
    //   }),
    // }),
    // updateOrderStatus: builder.mutation({
    //   query: ({ id, data }) => ({
    //     url: `/order/${id}`,
    //     method: "PUT",
    //     body: data,
    //   }),
    // }),
  }),
});
export const { useGetAllAdminQuery } = adminApi;

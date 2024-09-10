import { api } from "./api";

export const customerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCustomers: builder.query({
      query: () => ({
        url: "/user",
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
export const { useGetAllCustomersQuery } = customerApi;

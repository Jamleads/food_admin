import { api } from "./api";

export const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: "/order",
        method: "GET",
      }),
    }),
    getOneOrderInfo: builder.query({
      query: (id) => ({
        url: `/order/${id}`,
        method: "GET",
      }),
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/order/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOneOrderInfoQuery,
  useUpdateOrderStatusMutation,
} = orderApi;

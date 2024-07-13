import { api } from "./api";

export const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: "/auth/login",
        method: "POST",
      }),
    }),
  }),
});

export const { useGetAllOrdersQuery } = orderApi;

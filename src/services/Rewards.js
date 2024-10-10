import { api } from "./api";

const rewardsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createDiscount: builder.mutation({
      query: (data) => ({
        url: "/discount/create",
        method: "POST",
        body: data,
      }),
    }),
    updateDiscount: builder.mutation({
      query: (data) => ({
        url: `/discount/${data.id}`,
        method: "POST",
        body: data,
      }),
    }),
    deleteDiscount: builder.mutation({
      query: (id) => ({
        url: `/discount/${id}`,
        method: "DELETE",
      }),
    }),
    getDiscount: builder.query({
      query: () => ({
        url: "/discount",
        method: "GET",
      }),
    }),
    getReferalPercent: builder.query({
      query: () => ({
        url: "/discount/referral/rewards-percentage",
        method: "GET",
      }),
    }),
    createReferralPercent: builder.mutation({
      query: (data) => ({
        url: "/discount/set-referral-rewards-percentage",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetDiscountQuery,
  useCreateDiscountMutation,
  useGetReferalPercentQuery,
  useCreateReferralPercentMutation,
  useUpdateDiscountMutation,
  useDeleteDiscountMutation,
} = rewardsApi;

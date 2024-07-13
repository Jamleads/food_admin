import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
const accessToken = "bvcfdstryugh";
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.foodsbymomi.com/",
    prepareHeaders: (headers, { getState }) => {
      const token = accessToken; // getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Orders", "ProductCategory", "Products"],
  endpoints: () => ({}),
});

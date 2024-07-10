import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://web-newsletter-7d7b9de4bde2.herokuapp.com/api",
    baseUrl: "http://0.0.0.0:7020/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Orders", "ProductCategory", "Products"],
  endpoints: () => ({}),
});

// https://newsletter.esdiacapp.com/api/v1
// https://web-newsletter-7d7b9de4bde2.herokuapp.com

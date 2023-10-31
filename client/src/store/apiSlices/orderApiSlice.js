import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderApiSlice = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getMyOrders: builder.query({
      query: () => "/orders/my-orders",
      providesTags: ["orders"]
    }),

    getMySingleOrder: builder.query({
      query: (id) => `/orders/my-orders/${id}`,
      providesTags: ["orders"]
    })
  })
});

export const { useGetMyOrdersQuery, useGetMySingleOrderQuery } = orderApiSlice;
export default orderApiSlice;

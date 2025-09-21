import { baseApi } from "@/redux/baseApi";

export const  walletApi= baseApi.injectEndpoints({
 endpoints: (builder) => ({
    deposit: builder.mutation({
     query: (payload: { amount: number }) => ({
        url: "/wallet/deposit",
        method: "POST",
        data: payload, // ✅ must be wrapped inside an object
    }),
    invalidatesTags: ["WALLET"],
    }),
  withdraw: builder.mutation({
      query:(payload: { amount: number }) => ({
        url: "/wallet/withdraw",
        method: "POST",
        data: payload, // must be wrapped in an object
      }),
      invalidatesTags: ["WALLET"],
    }),
 getWallet: builder.query({
  query: (userId: string) => ({
    url: `/wallet/${userId}`,
    method: "GET",
  }),
}),
    }),
});

export const { useDepositMutation, useGetWalletQuery,useWithdrawMutation  } = walletApi;
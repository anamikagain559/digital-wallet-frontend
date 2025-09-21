import { baseApi } from "@/redux/baseApi";

export const  walletApi= baseApi.injectEndpoints({
 endpoints: (builder) => ({
    deposit: builder.mutation({
    query: (amount: number) => ({
        url: "/wallet/deposit",
        method: "POST",
        body: { amount }, // ✅ must be wrapped inside an object
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

export const { useDepositMutation, useGetWalletQuery } = walletApi;
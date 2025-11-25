import { baseApi } from "@/redux/baseApi";

export const agentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAgentOverview: builder.query({
      query: () => ({
        url: "/wallet/overview",
        method: "GET",
      }),
      providesTags: ["TRANSACTIONS", "WALLET"],
      transformResponse: (response) => response.data,
    }),


    getAgentTransactions: builder.query({
      query: (params) => ({
        url: "/agent/transactions",
        method: "GET",
        params, 
      }),
      providesTags: ["TRANSACTIONS"],
      transformResponse: (response) => response.data,
    }),


    agentCashIn: builder.mutation({
      query: (payload: { agentId: string; userId: string; amount: number }) => ({
        url: "/wallet/agent/cash-in",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["WALLET", "TRANSACTIONS"],
    }),



    agentCashOut: builder.mutation({
      query: (payload: { agentId: string; amount: number ; userId : string  }) => ({
        url: "/wallet/agent/cash-out",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["WALLET", "TRANSACTIONS"],
    }),
    getMyWallet: builder.query({
          query: () => ({
            url: "/wallet/me",
            method: "GET",
          }),
        }),

    getCommissionHistory: builder.query({
      query: (params) => ({
        url: "/agent/commissions",
        method: "GET",
        params,
      }),
      providesTags: ["TRANSACTIONS"],
      transformResponse: (response) => response.data,
    }),


    updateAgentProfile: builder.mutation({
      query: (payload) => ({
        url: "/agent/profile",
        method: "PUT",
        data: payload,
      }),
      invalidatesTags: ["USER"],
    }),
    getAgentProfile: builder.query({
  query: () => ({
    url: "/agent/profile",
    method: "GET",
  }),
  
  providesTags: ["USER"],
  transformResponse: (response) => response.data,
}),
  }),
  
});

export const {
  useGetAgentOverviewQuery,
  useGetAgentTransactionsQuery,
  useAgentCashInMutation,
  useAgentCashOutMutation,
  useGetCommissionHistoryQuery,
  useUpdateAgentProfileMutation,
  useGetAgentProfileQuery,
  useGetMyWalletQuery 

} = agentApi;

import { baseApi } from "@/redux/baseApi";

export const agentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // -----------------------------
    // 1) Agent Overview
    // -----------------------------
    getAgentOverview: builder.query({
      query: () => ({
        url: "/agent/overview",
        method: "GET",
      }),
      providesTags: ["TRANSACTIONS", "WALLET"],
      transformResponse: (response) => response.data,
    }),

    // -----------------------------
    // 2) Agent Transactions (filterable + paginated)
    // -----------------------------
    getAgentTransactions: builder.query({
      query: (params) => ({
        url: "/agent/transactions",
        method: "GET",
        params, // example: { page, limit, q, type }
      }),
      providesTags: ["TRANSACTIONS"],
      transformResponse: (response) => response.data,
    }),

    // -----------------------------
    // 3) Cash In (Agent → User)
     // ⭐⭐⭐ NEW: Agent Cash-In
    agentCashIn: builder.mutation({
      query: (payload: { agentId: string; userId: string; amount: number }) => ({
        url: "/wallet/agent/cash-in",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["WALLET", "TRANSACTIONS"],
    }),


    // ⭐⭐⭐ NEW: Agent Cash-Out
    agentCashOut: builder.mutation({
      query: (payload: { userId: string; amount: number }) => ({
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
    // -----------------------------
    // 5) Commission History
    // -----------------------------
    getCommissionHistory: builder.query({
      query: (params) => ({
        url: "/agent/commissions",
        method: "GET",
        params,
      }),
      providesTags: ["TRANSACTIONS"],
      transformResponse: (response) => response.data,
    }),

    // -----------------------------
    // 6) Profile Update
    // -----------------------------
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

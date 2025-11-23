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
    // -----------------------------
    agentCashIn: builder.mutation({
      query: ({ agentId, userId, amount }) => ({
        url: "/agent/cash-in",
        method: "POST",
        data: { agentId, userId, amount },
      }),
      invalidatesTags: ["WALLET", "TRANSACTIONS"],
    }),

    // -----------------------------
    // 4) Cash Out (Agent → User)
    // -----------------------------
    agentCashOut: builder.mutation({
      query: ({ agentId, userId, amount }) => ({
        url: "/agent/cash-out",
        method: "POST",
        data: { agentId, userId, amount },
      }),
      invalidatesTags: ["WALLET", "TRANSACTIONS"],
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
  }),
});

export const {
  useGetAgentOverviewQuery,
  useGetAgentTransactionsQuery,
  useAgentCashInMutation,
  useAgentCashOutMutation,
  useGetCommissionHistoryQuery,
  useUpdateAgentProfileMutation,
} = agentApi;

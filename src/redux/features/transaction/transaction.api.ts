import { baseApi } from "@/redux/baseApi";

export interface Transaction {
  _id: string;
  type: string;
  amount: number;
  fee: number;
  status: string;
  description?: string;
  createdAt: string;
}

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ==============================
    // 🔹 GET LOGGED-IN USER TRANSACTIONS
    // ==============================
    getMyTransactions: builder.query<
      {
        data: Transaction[];
        pagination: { page: number; limit: number; total: number };
      },
      {
        page?: number;
        limit?: number;
        type?: string;
        startDate?: string;
        endDate?: string;
      }
    >({
      query: ({ page = 1, limit = 10, type, startDate, endDate }) => {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        if (type) params.append("type", type);
        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);

        return {
          url: `/transaction/me?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["TRANSACTIONS"],
    }),

    // ==============================
    // 🔹 ADMIN — GET ALL TRANSACTIONS
    // ==============================
    getAllTransactions: builder.query<
      {
        data: Transaction[];
        pagination: { page: number; limit: number; total: number };
      },
      {
        page?: number;
        limit?: number;
        type?: string;
        status?: string;
        initiatedBy?: string;
        fromWallet?: string;
        toWallet?: string;
        minAmount?: number;
        maxAmount?: number;
        startDate?: string;
        endDate?: string;
        search?: string;
      }
    >({
      query: ({
        page = 1,
        limit = 10,
        type,
        status,
        initiatedBy,
        fromWallet,
        toWallet,
        minAmount,
        maxAmount,
        startDate,
        endDate,
        search,
      }) => {
        const params = new URLSearchParams();

        params.append("page", page.toString());
        params.append("limit", limit.toString());

        if (type) params.append("type", type);
        if (status) params.append("status", status);
        if (initiatedBy) params.append("initiatedBy", initiatedBy);
        if (fromWallet) params.append("fromWallet", fromWallet);
        if (toWallet) params.append("toWallet", toWallet);

        if (minAmount !== undefined) params.append("minAmount", minAmount.toString());
        if (maxAmount !== undefined) params.append("maxAmount", maxAmount.toString());

        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);

        if (search) params.append("search", search);

        return {
          url: `/transaction?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["TRANSACTIONS"],
    }),
    deleteTransaction: builder.mutation<
        { message: string },
        string
      >({
        query: (id) => ({
          url: `/transaction/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["TRANSACTIONS"],
      }),
  }),
});

export const {
  useGetMyTransactionsQuery,
  useGetAllTransactionsQuery,
  useDeleteTransactionMutation,
} = transactionApi;

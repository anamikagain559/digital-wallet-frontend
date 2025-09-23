// src/redux/features/transaction/transaction.api.ts
import { baseApi } from "@/redux/baseApi";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyTransactions: builder.query<
      {
        data: Transaction[];
        page: number;
        limit: number;
        total: number;
      },
      { page?: number; limit?: number }>
    
    ({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/transaction/me?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["TRANSACTIONS"],
    }),
  }),
});

export const { useGetMyTransactionsQuery } = transactionApi;

// Types
export interface Transaction {
  _id: string;
  type: string;
  amount: number;
  fee: number;
  status: string;
  description?: string;
  createdAt: string;
}

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
        if (type) params.append("type", type); // send lowercase or match DB
        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);

        return {
          url: `/transaction/me?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["TRANSACTIONS"],
    }),
  }),
});

export const { useGetMyTransactionsQuery } = transactionApi;

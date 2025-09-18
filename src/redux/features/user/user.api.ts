import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    GetAllUser: builder.query({
      query: () => ({
        url: "/user/all-users",
        method: "GET", // change to POST if your backend requires it
      }),
      providesTags: ["USER"],
    }),
  }),
});

export const { useGetAllUserQuery } = userApi;

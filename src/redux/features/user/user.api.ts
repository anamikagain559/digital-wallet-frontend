import { baseApi } from "@/redux/baseApi";
import type { TUser } from "@/types";
export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    GetAllUser: builder.query<TUser[], void>({
      query: () => ({
        url: "/user/all-users",
        method: "GET", // change to POST if your backend requires it
      }),
      providesTags: ["USER"],
    }),
    updateUser: builder.mutation({
    query: ({ id, data }) => ({
      url: `/user/${id}`,
      method: "PATCH",
      body: data,
    }),
  }),
  }),
});

export const { useGetAllUserQuery ,useUpdateUserMutation} = userApi;

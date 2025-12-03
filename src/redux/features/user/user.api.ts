import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
   GetAllUser: builder.query({
  query: () => ({
    url: "/user/all-users",
    method: "GET",
  }),
  transformResponse: (response) => {
    return {
      users: response.data,
      meta: response.meta,
    };
  },
  providesTags: ["USER"],
}),
    updateUser: builder.mutation({
    query: ({ id, data }) => ({
      url: `/user/${id}`,
      method: "PATCH",
      body: data,
    }),
  }),
  deleteUser: builder.mutation({
  query: (id) => ({
    url: `/user/${id}`,
    method: "DELETE",
  }),
  invalidatesTags: ["USER"],
}),

  }),
});

export const { useGetAllUserQuery ,useUpdateUserMutation ,useDeleteUserMutation} = userApi;

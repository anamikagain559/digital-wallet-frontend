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




 blockOrUnblockUser: builder.mutation({
      query: ({ id, status }) => ({
        url: `/user/block-unblock/${id}`,
        method: "PATCH",
        data: { isActive: status },
      }),
      invalidatesTags: ["USER"],
    }),

    updateUser: builder.mutation({
    query: ({ id, data }) => ({
      url: `/user/${id}`,
      method: "PATCH",
      data: data,
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

export const { useGetAllUserQuery ,useUpdateUserMutation ,useDeleteUserMutation,useBlockOrUnblockUserMutation} = userApi;

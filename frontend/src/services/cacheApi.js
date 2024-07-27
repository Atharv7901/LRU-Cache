import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const cacheApi = createApi({
  reducerPath: "cacheApi",
  baseQuery: fetchBaseQuery({baseUrl: "http://localhost:8000/"}),
  endpoints: (builder) => ({
    getCacheItem: builder.query({
      query: (data) => ({
        url: `/get?key=${data}`,
        method: "GET",
      }),
    }),
    setCacheItem: builder.mutation({
      query: (data) => ({
        url: "/set",
        method: "POST",
        body: data,
      }),
    }),
    deleteCacheItem: builder.mutation({
      query: (data) => ({
        url: `/delete?key=${data}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCacheItemQuery,
  useSetCacheItemMutation,
  useDeleteCacheItemMutation,
} = cacheApi;

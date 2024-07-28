import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const cacheApi = createApi({
  reducerPath: "cacheApi",
  baseQuery: fetchBaseQuery({baseUrl: "http://localhost:8000/"}),
  tagTypes: ["CacheItem"],
  endpoints: (builder) => ({
    getCacheData: builder.query({
      query: () => ({
        url: "/cache/state",
        method: "GET",
      }),
      providesTags: ["CacheItem"],
    }),
    getCacheItem: builder.query({
      query: (key) => ({
        url: `/get?key=${key}`,
        method: "GET",
      }),
      providesTags: ["CacheItem"],
    }),
    setCacheItem: builder.mutation({
      query: (data) => ({
        url: "/set",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CacheItem"],
    }),
    deleteCacheItem: builder.mutation({
      query: (key) => ({
        url: `/delete?key=${key}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CacheItem"],
    }),
  }),
});

export const {
  useGetCacheItemQuery,
  useSetCacheItemMutation,
  useDeleteCacheItemMutation,
  useGetCacheDataQuery,
} = cacheApi;

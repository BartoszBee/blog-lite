import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Post } from "@/types/Post";

// RTK Query — deklaratywne API z automatycznym cache i invalidacją tagów
export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com" }),

  // Tagi do zarządzania cache
  tagTypes: ["Post"],

  endpoints: (builder) => ({
    // GET /posts
    getPosts: builder.query<Post[], void>({
      query: () => "/posts",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Post" as const, id })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),

    // GET /posts/:id
    getPost: builder.query<Post, number>({
      query: (id) => `/posts/${id}`,
      providesTags: (_, __, id) => [{ type: "Post", id }],
    }),

    // POST /posts
    createPost: builder.mutation<Post, Partial<Post>>({
      query: (body) => ({
        url: "/posts",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),

    // PUT /posts/:id
    updatePost: builder.mutation<Post, Post>({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: (_, __, post) => [
        { type: "Post", id: post.id },
        { type: "Post", id: "LIST" },
      ],
    }),

    // DELETE /posts/:id
    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [
        { type: "Post", id },
        { type: "Post", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi;

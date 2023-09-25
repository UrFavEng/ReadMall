import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://readmall.onrender.com/api/v1",
    prepareHeaders(headers) {
      localStorage.getItem("token") &&
        headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
      return headers;
    },
  }),
  tagTypes: ["dataUser"],
  endpoints: (builder) => ({
    getCat: builder.query({
      query: () => `/categories/getAllCategories`,
    }),
    getBooks: builder.query({
      query: ({ cat, page }) => `/books/${cat}?page=${page}&limit=10`,
    }),
    getBook: builder.query({
      query: (id) => `/books/getById/${id}`,
    }),
    getBookByAuthor: builder.query({
      query: (id) => `/books/getByAuthorId/${id}?limit=10`,
    }),
    getDetailAuthor: builder.query({
      query: (id) => `/authors/getAuthorById/${id}`,
    }),
    getDetailPublisher: builder.query({
      query: (id) => `/publishers/getPublisherById/${id}`,
    }),
    getBooksPublisher: builder.query({
      query: (id) => `/books/getByPublisherId/${id}?limit=10`,
    }),
    getSearchBook: builder.query({
      query: (name) => `/books/searchBooks?q=${name}&limit=10`,
    }),
    getByCategoryById: builder.query({
      query: (id, page) => `/books/getByCategoryId/${id}?page=${page}&limit=10`,
    }),
    signUp: builder.mutation({
      query: (body) => ({
        url: "/users/signup",

        method: "POST",
        body,
      }),
    }),
    signin: builder.mutation({
      query: (body) => ({ url: "/users/login", method: "POST", body }),
    }),
    getMe: builder.query({
      query: () => `/users/me`,
      providesTags: ["dataUser"],
    }),
    rename: builder.mutation({
      query: (body) => ({
        url: "/users/editMyProfile", // تحديد مسار المورد الذي تريد تحديثه
        method: "PATCH", // استخدام طريقة PATCH
        body, // بيانات التحديث التي تريد إرسالها
      }),
      invalidatesTags: ["dataUser"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useRenameMutation,
  useGetCatQuery,
  useGetBooksQuery,
  useGetBookQuery,
  useGetBookByAuthorQuery,
  useGetDetailAuthorQuery,
  useGetDetailPublisherQuery,
  useGetBooksPublisherQuery,
  useGetSearchBookQuery,
  useGetByCategoryByIdQuery,
  useSignUpMutation,
  useGetMeQuery,
  useSigninMutation,
} = apiSlice;

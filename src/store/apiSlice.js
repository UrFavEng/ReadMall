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
  tagTypes: ["dataUser", "dataReview", "fav", "crt"],
  endpoints: (builder) => ({
    getCat: builder.query({
      query: () => `/categories/getAllCategories`,
    }),
    getCatByID: builder.query({
      query: (id) => `/categories/getCategoryById/${id}`,
    }),
    getBooks: builder.query({
      query: ({ cat, page }) => `/books/${cat}?page=${page}&limit=10`,
    }),
    getBooksByCat: builder.query({
      query: ({ id, pageCat }) =>
        `/books/getByCategoryId/${id}?page=${pageCat}&limit=10`,
    }),
    getBook: builder.query({
      query: (id) => `/books/getById/${id}`,
      providesTags: ["fav", "dataReview", "crt"],
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
    addReview: builder.mutation({
      query: (body) => ({
        url: "/reviews/addReview",
        method: "POST",
        body,
      }),
      invalidatesTags: ["dataReview"],
    }),
    getReview: builder.query({
      query: ({ id, pageReview }) =>
        `/reviews/getBookReviews/${id}?limit=2&page=${pageReview}`,
      providesTags: ["dataReview"],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/deleteReview/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["dataReview"],
    }),
    updateReview: builder.mutation({
      query: ({ id, body }) => ({
        url: `/reviews/updateReview/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["dataReview"],
    }),
    addFav: builder.mutation({
      query: (body) => ({
        url: "/favorites/addFavorite",
        method: "POST",
        body,
      }),
      invalidatesTags: ["fav"],
    }),
    deleteFav: builder.mutation({
      query: (id) => ({
        url: `/favorites/deleteFavorite/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["fav"],
    }),
    addCart: builder.mutation({
      query: (body) => ({
        url: "/carts/addToCart",
        method: "POST",
        body,
      }),
      invalidatesTags: ["crt"],
    }),
    deleteCart: builder.mutation({
      query: (id) => ({
        url: `/carts/deleteFromCart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["crt"],
    }),
    getFavOrCart: builder.query({
      query: ({ type, name, pageBook }) =>
        `/${type}/${name}?limit=10&page=${pageBook}`,
      providesTags: ["fav", "crt"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useGetReviewQuery,
  useAddReviewMutation,
  useRenameMutation,
  useGetCatQuery,
  useGetCatByIDQuery,
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
  useAddFavMutation,
  useGetBooksByCatQuery,
  useDeleteFavMutation,
  useAddCartMutation,
  useDeleteCartMutation,
  useGetFavOrCartQuery,
} = apiSlice;

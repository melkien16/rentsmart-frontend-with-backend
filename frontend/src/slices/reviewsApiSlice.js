import { apiSlice } from "./apiSlice";
import { REVIEWS_URL } from "../constants";

const reviewsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (reviewData) => ({
        url: REVIEWS_URL,
        method: "POST",
        body: reviewData, // Assuming reviewData contains all necessary fields
      }),
    }),
    getReviewsForOwner: builder.query({
      query: (ownerId) => ({
        url: `${REVIEWS_URL}/owner/${ownerId}`,
        method: "GET",
      }),
    }),
    getMyReviews: builder.query({
      query: () => ({
        url: `${REVIEWS_URL}/my`,
        method: "GET",
      }),
    }),
    getOwnerReviewSummary: builder.query({
      query: (ownerId) => ({
        url: `${REVIEWS_URL}/owner/${ownerId}/summary`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetReviewsForOwnerQuery,
  useGetMyReviewsQuery,
  useGetOwnerReviewSummaryQuery,
} = reviewsApiSlice;

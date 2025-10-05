import { apiSlice } from "./apiSlice";
import { SUBSCRIPTIONS_URL } from "../constants";
import { isSubscribed } from "../../../backend/controllers/publicSubscriber.controller";

export const subscribesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addSubscriber: builder.mutation({
      query: (email) => ({
        url: SUBSCRIPTIONS_URL,
        method: "POST",
        body: email,
      }),
    }),
    getSubscribers: builder.query({
      query: () => SUBSCRIPTIONS_URL,
      providesTags: ["Subscriber"],
    }),
    deleteSubscriber: builder.mutation({
      query: (id) => ({
        url: `${SUBSCRIPTIONS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subscriber"],
    }),
    getSubscribersCount: builder.query({
      query: () => `${SUBSCRIPTIONS_URL}/count`,
      providesTags: ["SubscriberCount"],
    }),
    isSubscribed: builder.query({
      query: (email) => `${SUBSCRIPTIONS_URL}/${email}`,
      providesTags: ["IsSubscribed"],
    }),
  }),
});

export const {
  useAddSubscriberMutation,
  useGetSubscribersQuery,
  useDeleteSubscriberMutation,
  useGetSubscribersCountQuery,
  useIsSubscribedQuery,
} = subscribesApi;

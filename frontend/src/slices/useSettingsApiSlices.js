import { apiSlice } from "./apiSlice";
import { SETTINGS_URL } from "../constants";

export const settingsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSettingsByUserId: builder.query({
      query: () => ({
        url: SETTINGS_URL,
        method: "GET",
      }),
      providesTags: ["Settings", "User"],
    }),

    createUserSettings: builder.mutation({
      query: (data) => ({
        url: SETTINGS_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Settings", "User"],
    }),

    updateNotifications: builder.mutation({
      query: (data) => ({
        url: `${SETTINGS_URL}/notifications`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Settings"],
    }),

    updateVisibility: builder.mutation({
      query: (data) => ({
        url: `${SETTINGS_URL}/visibility`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Settings"],
    }),

    updateSecuritySettings: builder.mutation({
      query: (data) => ({
        url: `${SETTINGS_URL}/security`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Settings"],
    }),

    addPaymentMethod: builder.mutation({
      query: (data) => ({
        url: `${SETTINGS_URL}/payment-methods`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Settings"],
    }),

    updatePasswordChangeDate: builder.mutation({
      query: () => ({
        url: `${SETTINGS_URL}/change-password`,
        method: "PUT",
      }),
      invalidatesTags: ["Settings"],
    }),

    addLoginHistory: builder.mutation({
      query: (data) => ({
        url: `${SETTINGS_URL}/login-history`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Settings"],
    }),

    getAllSettings: builder.query({
      query: () => ({
        url: `${SETTINGS_URL}/all-settings`,
        method: "GET",
      }),
      providesTags: ["Settings"],
    }),
  }),
});

export const {
  useGetSettingsByUserIdQuery,
  useLazyGetSettingsByUserIdQuery,
  useCreateUserSettingsMutation,
  useUpdateNotificationsMutation,
  useUpdateVisibilityMutation,
  useUpdateSecuritySettingsMutation,
  useAddPaymentMethodMutation,
  useUpdatePasswordChangeDateMutation,
  useAddLoginHistoryMutation,
  useGetAllSettingsQuery,
  useLazyGetAllSettingsQuery,
} = settingsApiSlice;

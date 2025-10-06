import { apiSlice } from "./apiSlice";
import { PRODUCTS_URL } from "../constants";

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}`,
        method: "GET",
      }),
      providesTags: [
        "Item",
        "Category",
        "User",
        "Booking",
        "Review",
        "Notification",
      ],
    }),
    getMylistings: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/mylistings`,
        method: "GET",
      }),
      providesTags: ["Item", "Category", "User"],
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
        method: "GET",
      }),
    }),
    getProductsByUserId: builder.query({
      query: (userId) => ({
        url: `${PRODUCTS_URL}/user/${userId}`,
        method: "GET",
      }),
      providesTags: ["Item", "Category", "User"],
    }),
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: "/api/upload",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Item", "User", "Booking", "Review", "Notification"],
    }),
    // for creating a new product
    createProduct: builder.mutation({
      query: (productData) => ({
        url: PRODUCTS_URL,
        method: "POST",
        body: productData,
      }),
      invalidatesTags: [
        "Item",
        "Category",
        "User",
        "Booking",
        "Review",
        "Notification",
      ],
    }),
    // update for views /:id/views
    incrementItemViews: builder.mutation({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}/views`,
        method: "PATCH",
      }),
      invalidatesTags: [
        "Item",
        "Category",
        "User",
        "Booking",
        "Review",
        "Notification",
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useUploadImageMutation,
  useCreateProductMutation,
  useGetProductsByUserIdQuery,
  useIncrementItemViewsMutation,
  useGetMylistingsQuery
} = productApiSlice;

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
    getProductById: builder.query({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
        method: "GET",
      }),
    }),
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: "/api/upload",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Item", "User", "Booking", "Review", "Notification"],
    }),
  }),
});


export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useUploadImageMutation,
} = productApiSlice;

import { apiSlice } from "./apiSlice";
import { CATEGORIES_URL } from "../constants";

const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => ({
        url: `${CATEGORIES_URL}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCategoryQuery } = categoryApiSlice;
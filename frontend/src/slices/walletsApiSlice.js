///api/wallets/:userId
import { apiSlice } from "./apiSlice";
import { WALLETS_URL } from "../constants";

const walletApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWalletByUserId: builder.query({
      query: (id) => ({
        url: `${WALLETS_URL}/${id}`,
        method: "GET",
      }),
      providedTags: ["Wallet", "User", "Booking"],
    }),
  }),
});

export const { useGetWalletByUserIdQuery, useLazyGetWalletByUserIdQuery } = walletApiSlice;
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Search } from "lucide-react";
import { useLazyGetUserMessagesByEmailQuery } from "../../slices/messagesApiSlice";
import { addNewConversation } from "../../slices/messageSlices";

const SearchNewUser = () => {
  const [search, setSearch] = useState("");
  const [triggerSearch, { isLoading }] = useLazyGetUserMessagesByEmailQuery();
  const dispatch = useDispatch();

  const handleTyping = (e) => {
    setSearch(e.target.value);
  };

  const handleSendSearch = async (e) => {
    e?.preventDefault?.();

    if (!search.trim()) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(search)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const result = await triggerSearch(search).unwrap();
      dispatch(addNewConversation(result));
    } catch (error) {
      toast.error(error?.data?.message || "User not found.");
    }
    setSearch("");
  };

  return (
    <form
      onSubmit={handleSendSearch}
      className="flex items-center border-b w-full rounded-xl bg-green-700/25 border-white/10"
    >
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleTyping}
        className="flex-1 px-4 py-2 w-full h-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 rounded-l-xl"
      />
      <button
        type="submit"
        disabled={!search.trim() || isLoading}
        className="px-4 py-2 bg-gradient-to-r from-emerald-400 to-emerald-500 text-black rounded-r-xl hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="animate-spin border-2 border-t-transparent border-black rounded-full w-5 h-5 mx-auto" />
        ) : (
          <Search className="w-5 h-5" />
        )}
      </button>
    </form>
  );
};

export default SearchNewUser;

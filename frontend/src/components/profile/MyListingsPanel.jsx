import { useState } from "react";
import { Calendar, Edit3, Trash2 } from "lucide-react";
import {  useGetMylistingsQuery } from "../../slices/productsApiSlice";
import Loader from "../ui/Loader";

const MyListingsPanel = () => {
  // const [listings] = useState([
  //   {
  //     id: "1",
  //     title: "Canon EOS 90D Camera",
  //     image:
  //       "https://images.pexels.com/photos/442559/pexels-photo-442559.jpeg?auto=compress&cs=tinysrgb&w=800",
  //     price: 450,
  //     createdAt: "2025-08-01",
  //     status: "active",
  //   },
  //   {
  //     id: "2",
  //     title: "DJI Mavic Mini Drone",
  //     image:
  //       "https://images.pexels.com/photos/1363876/pexels-photo-1363876.jpeg?auto=compress&cs=tinysrgb&w=800",
  //     price: 750,
  //     createdAt: "2025-07-18",
  //     status: "inactive",
  //   },
  //   {
  //     id: "3",
  //     title: "GoPro HERO10 Black",
  //     image:
  //       "https://images.pexels.com/photos/13723027/pexels-photo-13723027.jpeg?auto=compress&cs=tinysrgb&w=800",
  //     price: 300,
  //     createdAt: "2025-08-10",
  //     status: "active",
  //   },
  // ]);

  const { data, isLoading } = useGetMylistingsQuery();

  const listings = data|| [];

  if (isLoading) return <Loader />;

  return (
    <div className="bg-gray-900 border border-white/10 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">My Listings</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div
            key={listing._id}
            className="bg-gray-800 rounded-xl border border-white/10 overflow-hidden hover:border-emerald-500 transition"
          >
            <img
              src={listing.images[0] || "https://via.placeholder.com/400x300"}
              alt={listing.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {listing.title}
                </h3>
                <p className="text-emerald-400 font-semibold mt-1">
                  ${listing.price} / {listing.priceUnit}
                </p>
                <div className="flex items-center text-gray-400 text-sm mt-2">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(listing.createdAt).toLocaleDateString()}
                </div>
                <span
                  className={`mt-3 inline-block px-3 py-1 text-xs rounded-full ${
                    listing.status === "Available"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-gray-600/30 text-gray-400"
                  }`}
                >
                  {listing.status.charAt(0).toUpperCase() +
                    listing.status.slice(1)}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button className="flex items-center gap-1 px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-md transition">
                  <Edit3 className="w-4 h-4" /> Edit
                </button>
                <button className="flex items-center gap-1 px-3 py-1 bg-red-600/80 hover:bg-red-600 text-white text-sm rounded-md transition">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {listings.length === 0 && (
        <div className="text-center text-gray-400 py-10">
          No listings found. Start adding your items to rent.
        </div>
      )}
    </div>
  );
}

export default MyListingsPanel;
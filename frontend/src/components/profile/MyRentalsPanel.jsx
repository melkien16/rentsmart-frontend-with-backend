import React from "react";
import { CalendarDays, MapPin, CreditCard, Clock } from "lucide-react";
import { useGetBookingsQuery } from "../../slices/bookingsApiSlice";
import Loader from "../ui/Loader";

const MyRentalsPanel = () => {
  const { data, isLoading } = useGetBookingsQuery();

  const myRental = data || [];

  return (
    <div className="bg-gray-900 rounded-2xl border border-white/10 p-6 space-y-6">
      <h2 className="text-xl font-semibold text-white">My Rentals</h2>
      {isLoading && <Loader />}

      {myRental.length === 0 ? (
        <div className="text-gray-500 text-center py-10">No rentals found.</div>
      ) : (
        <div className="space-y-5">
          {myRental.map((rental) => (
            <div
              key={rental._id}
              className="bg-gray-800/50 border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-gray-800 transition"
            >
              {/* Image */}
              <img
                src={rental.item.images[0]}
                alt={rental.item.title}
                className="w-full sm:w-24 h-40 sm:h-24 object-cover rounded-lg border border-white/10"
              />

              {/* Details */}
              <div className="flex-1 space-y-2">
                <h3 className="text-white font-medium text-lg sm:text-base">
                  {rental.item.title}
                </h3>
                <div className="flex items-center text-gray-400 text-sm gap-2">
                  <MapPin className="w-4 h-4" />
                  {rental.item.location}
                </div>
                <div className="flex flex-wrap items-center text-gray-400 text-sm gap-3">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4" />
                    {new Date(rental.startDate).toLocaleDateString()} -{" "}
                    {new Date(rental.endDate).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <CreditCard className="w-4 h-4" />
                    {rental.paymentStatus}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {rental.status}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="text-left sm:text-right">
                <div className="text-lg font-semibold text-[#00FF99]">
                  {rental.totalPrice} ETB
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRentalsPanel;

import React from "react";
import { CalendarDays, MapPin, CreditCard, Clock } from "lucide-react";

const MyRentalsPanel = () => {
  const rentals = [
    {
      id: 1,
      item: {
        title: "Canon EOS 90D DSLR Camera",
        image:
          "https://images.pexels.com/photos/212372/pexels-photo-212372.jpeg?auto=compress&cs=tinysrgb&w=600",
        location: "Addis Ababa, Ethiopia",
      },
      booking: {
        startDate: "2025-08-01",
        endDate: "2025-08-05",
        paymentStatus: "paid",
        status: "completed",
        price: 2500,
      },
    },
    {
      id: 2,
      item: {
        title: "Samsonite Travel Luggage",
        image:
          "https://images.pexels.com/photos/96933/pexels-photo-96933.jpeg?auto=compress&cs=tinysrgb&w=600",
        location: "Bole, Addis Ababa",
      },
      booking: {
        startDate: "2025-08-10",
        endDate: "2025-08-15",
        paymentStatus: "paid",
        status: "confirmed",
        price: 1200,
      },
    },
    {
      id: 3,
      item: {
        title: "Apple Watch Series 8",
        image:
          "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600",
        location: "4 Kilo, Addis Ababa",
      },
      booking: {
        startDate: "2025-09-02",
        endDate: "2025-09-04",
        paymentStatus: "paid",
        status: "pending",
        price: 800,
      },
    },
  ];

  return (
    <div className="bg-gray-900 rounded-2xl border border-white/10 p-6 space-y-6">
      <h2 className="text-xl font-semibold text-white">My Rentals</h2>

      {rentals.length === 0 ? (
        <div className="text-gray-500 text-center py-10">No rentals found.</div>
      ) : (
        <div className="space-y-5">
          {rentals.map((rental) => (
            <div
              key={rental.id}
              className="bg-gray-800/50 border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-gray-800 transition"
            >
              {/* Image */}
              <img
                src={rental.item.image}
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
                    {new Date(
                      rental.booking.startDate
                    ).toLocaleDateString()} -{" "}
                    {new Date(rental.booking.endDate).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <CreditCard className="w-4 h-4" />
                    {rental.booking.paymentStatus}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {rental.booking.status}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="text-left sm:text-right">
                <div className="text-lg font-semibold text-[#00FF99]">
                  {rental.booking.price} ETB
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

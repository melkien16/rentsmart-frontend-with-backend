// ReviewsPane.jsx
import { Star } from "lucide-react";

// Mock Data based on Review schema
const mockReviews = [
  {
    _id: "1",
    reviewer: {
      _id: "u101",
      name: "Sophia Carter",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    owner: {
      _id: "u201",
      name: "ToolPro Rentals",
    },
    item: {
      _id: "i301",
      name: "Bosch Cordless Drill",
      image:
        "https://images.unsplash.com/photo-1600353068185-ec6f0a17c9db?auto=format&fit=crop&w=600&q=80",
    },
    rating: 5,
    comment:
      "Fantastic drill! Worked perfectly for my weekend project. Highly recommend!",
    createdAt: "2025-08-10T14:48:00.000Z",
  },
  {
    _id: "2",
    reviewer: {
      _id: "u102",
      name: "Liam Johnson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    owner: {
      _id: "u202",
      name: "ProCam Hire",
    },
    item: {
      _id: "i302",
      name: "Canon EOS R5 Camera",
      image:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80",
    },
    rating: 4,
    comment:
      "Image quality is insane! Battery could last a bit longer, but overall great experience.",
    createdAt: "2025-08-05T09:20:00.000Z",
  },
  {
    _id: "3",
    reviewer: {
      _id: "u103",
      name: "Emily Davis",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    owner: {
      _id: "u203",
      name: "EventGear Co",
    },
    item: {
      _id: "i303",
      name: "Epson HD Projector",
      image:
        "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80",
    },
    rating: 5,
    comment:
      "The projector made our outdoor movie night unforgettable. Bright, clear, and easy to set up.",
    createdAt: "2025-08-01T19:15:00.000Z",
  },
];

const ReviewsPanel = () => {
  return (
    <div className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
      <h2 className="text-2xl font-bold text-white mb-6">Your Reviews</h2>

      <div className="space-y-6">
        {mockReviews.map((review) => (
          <div
            key={review._id}
            className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4 flex gap-4 hover:scale-[1.01] transition-transform"
          >
            {/* Item Image */}
            <img
              src={review.item.image}
              alt={review.item.name}
              className="w-20 h-20 object-cover rounded-lg border border-white/20"
            />

            <div className="flex-1">
              {/* Item + Owner */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {review.item.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    Rented from {review.owner.name}
                  </p>
                </div>
                {/* Rating */}
                <div className="flex">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
              </div>

              {/* Comment */}
              <p className="text-gray-300 mt-2">{review.comment}</p>

              {/* Reviewer Info */}
              <div className="flex items-center mt-3">
                <img
                  src={review.reviewer.avatar}
                  alt={review.reviewer.name}
                  className="w-8 h-8 rounded-full border border-white/20 mr-2"
                />
                <span className="text-sm text-gray-400">
                  by {review.reviewer.name} •{" "}
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Glowing background accent */}
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-emerald-500/20 rounded-full blur-[120px]"></div>
    </div>
  );
}

export default ReviewsPanel;
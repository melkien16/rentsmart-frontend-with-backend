import { useState } from "react";
import {
  Star,
  X,
  Clock,
  Download,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

import { mockReviewsData } from "../mockUserData";

const Reviews = () => {
  const [selectedReview, setSelectedReview] = useState(null);
  const [filter, setFilter] = useState("all");
  const [showResponseModal, setShowResponseModal] = useState(false);

  const filteredReviews =
    filter === "all"
      ? mockReviewsData.reviews
      : mockReviewsData.reviews.filter((review) => {
          if (filter === "with-response") return review.response;
          if (filter === "without-response") return !review.response;
          return true;
        });

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return "text-green-400";
    if (rating >= 4) return "text-yellow-400";
    if (rating >= 3) return "text-orange-400";
    return "text-red-400";
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-yellow-400/10 via-orange-400/10 to-red-400/10 rounded-2xl border border-white/10 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <Star className="w-8 h-8 text-yellow-400" />
              Reviews & Ratings
            </h2>
            <p className="text-gray-300 mt-2">
              Manage and respond to customer reviews
            </p>
          </div>
          <div className="flex gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-yellow-400"
            >
              <option value="all">All Reviews</option>
              <option value="with-response">With Response</option>
              <option value="without-response">Without Response</option>
            </select>
            <button className="px-6 py-2 bg-yellow-400 text-black rounded-xl hover:bg-yellow-500 transition-all duration-200 flex items-center gap-2 font-semibold">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-2xl border border-yellow-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-400 text-sm font-medium">
                Total Reviews
              </p>
              <p className="text-3xl font-bold text-white">
                {mockReviewsData.totalReviews}
              </p>
              <p className="text-yellow-400 text-sm flex items-center gap-1">
                <Star className="w-4 h-4" />
                Customer feedback
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-400/20 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-2xl border border-green-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">
                Average Rating
              </p>
              <p
                className={`text-3xl font-bold ${getRatingColor(
                  mockReviewsData.averageRating
                )}`}
              >
                {mockReviewsData.averageRating}
              </p>
              <p className="text-green-400 text-sm flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                Out of 5 stars
              </p>
            </div>
            <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-2xl border border-blue-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm font-medium">With Response</p>
              <p className="text-3xl font-bold text-white">
                {mockReviewsData.reviews.filter((r) => r.response).length}
              </p>
              <p className="text-blue-400 text-sm flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                Replied to
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-2xl border border-purple-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-400 text-sm font-medium">
                Pending Response
              </p>
              <p className="text-3xl font-bold text-white">
                {mockReviewsData.reviews.filter((r) => !r.response).length}
              </p>
              <p className="text-purple-400 text-sm flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Need reply
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-400/20 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Rating Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
          <h3 className="text-xl font-bold text-white mb-4">
            Rating Breakdown
          </h3>
          <div className="space-y-3">
            {mockReviewsData.ratingBreakdown.map((rating) => (
              <div key={rating.stars} className="flex items-center gap-3">
                <div className="flex items-center gap-2 w-16">
                  <span className="text-gray-400 text-sm">
                    {rating.stars} stars
                  </span>
                </div>
                <div className="flex-1 bg-white/10 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${rating.percentage}%` }}
                  />
                </div>
                <span className="text-white text-sm w-12 text-right">
                  {rating.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
          <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <div className="w-8 h-8 bg-green-400/20 rounded-lg flex items-center justify-center">
                <Star className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <p className="text-white text-sm">New 5-star review</p>
                <p className="text-gray-400 text-xs">MacBook Pro 16" M2</p>
              </div>
              <span className="text-gray-400 text-xs ml-auto">2 hours ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <div className="w-8 h-8 bg-blue-400/20 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="text-white text-sm">Response added</p>
                <p className="text-gray-400 text-xs">DJI Drone Pro</p>
              </div>
              <span className="text-gray-400 text-xs ml-auto">1 day ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <div className="w-8 h-8 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                <Star className="w-4 h-4 text-yellow-400" />
              </div>
              <div>
                <p className="text-white text-sm">New 4-star review</p>
                <p className="text-gray-400 text-xs">Mountain Bike Trail</p>
              </div>
              <span className="text-gray-400 text-xs ml-auto">3 days ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h3 className="text-xl font-bold text-white">All Reviews</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-yellow-400/30 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedReview(review)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-400/20 rounded-xl flex items-center justify-center">
                      <Star className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">
                        {review.item}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Rented by {review.renter}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                      <span className="text-white ml-2">{review.rating}/5</span>
                    </div>
                    <span className="text-gray-400 text-sm">{review.date}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-300">{review.review}</p>
                </div>

                {review.response && (
                  <div className="bg-blue-400/10 border border-blue-400/30 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-400 font-semibold text-sm">
                        Your Response
                      </span>
                      <span className="text-gray-400 text-xs">
                        {review.responseDate}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm">{review.response}</p>
                  </div>
                )}

                {!review.response && (
                  <div className="flex justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedReview(review);
                        setShowResponseModal(true);
                      }}
                      className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors text-sm font-medium"
                    >
                      Add Response
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Detail Modal */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl border border-white/10 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  Review Details
                </h3>
                <button
                  onClick={() => setSelectedReview(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="text-gray-400 text-sm">Item</label>
                <p className="text-white font-medium">{selectedReview.item}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Renter</label>
                <p className="text-white">{selectedReview.renter}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Rating</label>
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < selectedReview.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                  <span className="text-white ml-2">
                    {selectedReview.rating}/5
                  </span>
                </div>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Review</label>
                <p className="text-gray-300">{selectedReview.review}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Date</label>
                <p className="text-white">{selectedReview.date}</p>
              </div>

              {selectedReview.response ? (
                <div>
                  <label className="text-gray-400 text-sm">Your Response</label>
                  <div className="bg-blue-400/10 border border-blue-400/30 rounded-xl p-4">
                    <p className="text-gray-300">{selectedReview.response}</p>
                    <p className="text-gray-400 text-xs mt-2">
                      {selectedReview.responseDate}
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="text-gray-400 text-sm">Add Response</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-yellow-400 transition-colors resize-none"
                    placeholder="Write your response to this review..."
                  />
                </div>
              )}

              <div className="flex space-x-3">
                {!selectedReview.response && (
                  <button className="flex-1 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors font-semibold">
                    Add Response
                  </button>
                )}
                <button
                  onClick={() => setSelectedReview(null)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Response Modal */}
      {showResponseModal && selectedReview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl border border-white/10 max-w-md w-full">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Add Response</h3>
                <button
                  onClick={() => {
                    setShowResponseModal(false);
                    setSelectedReview(null);
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="text-gray-400 text-sm">Review</label>
                <p className="text-gray-300 text-sm">{selectedReview.review}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Your Response</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-yellow-400 transition-colors resize-none"
                  placeholder="Write your response to this review..."
                />
              </div>
              <div className="flex space-x-3">
                <button className="flex-1 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors font-semibold">
                  Add Response
                </button>
                <button
                  onClick={() => {
                    setShowResponseModal(false);
                    setSelectedReview(null);
                  }}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;

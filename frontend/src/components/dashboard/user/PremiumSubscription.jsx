import { useState } from "react";
import {
  Package,
  Shield,
  DollarSign,
  Calendar,
  Star,
  Eye,
  Edit,
  Trash2,
  Plus,
  Check,
  X,
  AlertTriangle,
  Clock,
  User,
  CreditCard,
  FileText,
  Image,
  Upload,
  Download,
  Search,
  MoreHorizontal,
  ChevronRight,
  ChevronLeft,
  Heart,
  MessageSquare,
  Phone,
  Camera,
  Video,
  Tag,
  List,
  Grid,
  BarChart3,
  TrendingUp,
  Users,
  Bell,
  Settings,
  Lock,
  Activity,
  Wifi,
  Wallet as Wallet,
  Crown,
  Send,
  HelpCircle,
  AlertCircle,
  CheckCircle,
  Paperclip,
  Save,
} from "lucide-react";

import {mockPremiumData} from "../mockUserData"

const PremiumSubscription = () => {
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const getPlanColor = (planId) => {
    switch (planId) {
      case "basic":
        return "border-gray-400 text-gray-400";
      case "pro":
        return "border-emerald-400 text-emerald-400";
      case "premium":
        return "border-purple-400 text-purple-400";
      default:
        return "border-gray-400 text-gray-400";
    }
  };

  const getPlanBgColor = (planId) => {
    switch (planId) {
      case "basic":
        return "bg-gray-400/20";
      case "pro":
        return "bg-emerald-400/20";
      case "premium":
        return "bg-purple-400/20";
      default:
        return "bg-gray-400/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-purple-400/10 via-pink-400/10 to-emerald-400/10 rounded-2xl border border-white/10 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <Crown className="w-8 h-8 text-purple-400" />
              Premium Subscription
            </h2>
            <p className="text-gray-300 mt-2">
              Unlock advanced features and maximize your rental income
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="px-6 py-2 bg-purple-400 text-black rounded-xl hover:bg-purple-500 transition-all duration-200 flex items-center gap-2 font-semibold"
            >
              <Crown className="w-4 h-4" />
              Upgrade Plan
            </button>
          </div>
        </div>
      </div>

      {/* Current Plan Status */}
      <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white">Current Plan</h3>
            <p className="text-gray-400">
              You're currently on the {mockPremiumData.currentPlan.name} plan
            </p>
          </div>
          <span
            className={`px-4 py-2 rounded-full border ${getPlanColor(
              "basic"
            )} ${getPlanBgColor("basic")}`}
          >
            {mockPremiumData.currentPlan.name}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-white font-semibold mb-3">Plan Features</h4>
            <ul className="space-y-2">
              {mockPremiumData.currentPlan.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-gray-300"
                >
                  <Check className="w-4 h-4 text-green-400" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Current Usage</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Listings Used</span>
                  <span className="text-white">
                    {mockPremiumData.usage.listingsUsed}/
                    {mockPremiumData.usage.listingsLimit}
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-emerald-400 h-2 rounded-full"
                    style={{
                      width: `${
                        (mockPremiumData.usage.listingsUsed /
                          mockPremiumData.usage.listingsLimit) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Analytics Views</span>
                <span className="text-white">
                  {mockPremiumData.usage.analyticsViews}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Support Tickets</span>
                <span className="text-white">
                  {mockPremiumData.usage.supportTickets}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Available Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockPremiumData.availablePlans.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-white/5 rounded-2xl border p-6 hover:scale-105 transition-all duration-300 cursor-pointer ${
              plan.popular
                ? "border-emerald-400/50 bg-emerald-400/5"
                : "border-white/10"
            }`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-emerald-400 text-black px-4 py-1 rounded-full text-xs font-semibold">
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="flex items-center justify-center gap-1">
                <span className="text-3xl font-bold text-white">
                  ${plan.price}
                </span>
                <span className="text-gray-400">/{plan.period}</span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-gray-300 text-sm"
                >
                  <Check className="w-4 h-4 text-emerald-400" />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 ${
                plan.id === "basic"
                  ? "bg-gray-400 text-black cursor-not-allowed"
                  : plan.popular
                  ? "bg-emerald-400 text-black hover:bg-emerald-500"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              disabled={plan.id === "basic"}
            >
              {plan.id === "basic" ? "Current Plan" : "Upgrade to Pro"}
            </button>
          </div>
        ))}
      </div>

      {/* Plan Comparison */}
      <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h3 className="text-xl font-bold text-white">Plan Comparison</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div className="font-semibold text-white">Feature</div>
            <div className="text-center font-semibold text-gray-400">Basic</div>
            <div className="text-center font-semibold text-emerald-400">
              Pro
            </div>
            <div className="text-center font-semibold text-purple-400">
              Premium
            </div>

            <div className="text-gray-300">Active Listings</div>
            <div className="text-center text-gray-400">5</div>
            <div className="text-center text-emerald-400">20</div>
            <div className="text-center text-purple-400">Unlimited</div>

            <div className="text-gray-300">Platform Fee</div>
            <div className="text-center text-gray-400">2%</div>
            <div className="text-center text-emerald-400">1.5%</div>
            <div className="text-center text-purple-400">1%</div>

            <div className="text-gray-300">Analytics</div>
            <div className="text-center text-gray-400">Basic</div>
            <div className="text-center text-emerald-400">Advanced</div>
            <div className="text-center text-purple-400">Premium</div>

            <div className="text-gray-300">Support</div>
            <div className="text-center text-gray-400">Standard</div>
            <div className="text-center text-emerald-400">Priority</div>
            <div className="text-center text-purple-400">24/7 Priority</div>

            <div className="text-gray-300">Featured Listings</div>
            <div className="text-center text-gray-400">✗</div>
            <div className="text-center text-emerald-400">✓</div>
            <div className="text-center text-purple-400">✓</div>

            <div className="text-gray-300">API Access</div>
            <div className="text-center text-gray-400">✗</div>
            <div className="text-center text-gray-400">✗</div>
            <div className="text-center text-purple-400">✓</div>
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl border border-white/10 max-w-md w-full">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Upgrade Plan</h3>
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="text-gray-400 text-sm">Select Plan</label>
                <select
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-400 transition-colors"
                >
                  <option value="pro">Pro - $19.99/month</option>
                  <option value="premium">Premium - $39.99/month</option>
                </select>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Payment Method</label>
                <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-400 transition-colors">
                  <option value="">Select payment method</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>
              <div className="flex space-x-3">
                <button className="flex-1 px-4 py-2 bg-purple-400 text-black rounded-lg hover:bg-purple-500 transition-colors font-semibold">
                  Upgrade Now
                </button>
                <button
                  onClick={() => setShowUpgradeModal(false)}
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

export default PremiumSubscription
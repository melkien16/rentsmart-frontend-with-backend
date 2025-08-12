import {
  Users,
  DollarSign,
  Package,
  TrendingUp,
  AlertTriangle,
  Shield,
  Star,
  Award,
  Target,
  Globe,
  Zap,
  UserCheck,
  
} from "lucide-react";

export const platformGrowthData = [
  { name: "Jan", users: 8400, rentals: 1200, revenue: 24000, growth: 12 },
  { name: "Feb", users: 9200, rentals: 1400, revenue: 28000, growth: 15 },
  { name: "Mar", users: 10100, rentals: 1600, revenue: 32000, growth: 18 },
  { name: "Apr", users: 11500, rentals: 1900, revenue: 38000, growth: 22 },
  { name: "May", users: 12200, rentals: 2100, revenue: 42000, growth: 25 },
  { name: "Jun", users: 12847, rentals: 2400, revenue: 47892, growth: 28 },
];

export const revenueBreakdownData = [
  { name: "Cameras", value: 35, revenue: 18500, color: "#00FF99" },
  { name: "Tools", value: 28, revenue: 14200, color: "#00E68B" },
  { name: "Electronics", value: 20, revenue: 9800, color: "#00CC7A" },
  { name: "Automotive", value: 12, revenue: 3900, color: "#00B369" },
  { name: "Others", value: 5, revenue: 1492, color: "#009957" },
];

export const userGrowthData = [
  { name: "Week 1", active: 2400, new: 400, returning: 2000 },
  { name: "Week 2", active: 2800, new: 500, returning: 2300 },
  { name: "Week 3", active: 3200, new: 600, returning: 2600 },
  { name: "Week 4", active: 3600, new: 700, returning: 2900 },
];

export const performanceMetrics = [
  { name: "Q1", satisfaction: 92, completion: 88, disputes: 3 },
  { name: "Q2", satisfaction: 94, completion: 91, disputes: 2 },
  { name: "Q3", satisfaction: 96, completion: 93, disputes: 1 },
  { name: "Q4", satisfaction: 98, completion: 95, disputes: 1 },
];

export const recentAdminActivities = [
  {
    id: "1",
    type: "success",
    icon: UserCheck,
    title: "New Premium User",
    description: "Sarah Johnson upgraded to premium subscription",
    time: "2 minutes ago",
    amount: "+$29.99",
  },
  {
    id: "2",
    type: "success",
    icon: DollarSign,
    title: "High-Value Transaction",
    description: "Professional camera rental completed - $450",
    time: "8 minutes ago",
    amount: "+$67.50",
  },
  {
    id: "3",
    type: "warning",
    icon: AlertTriangle,
    title: "Dispute Escalated",
    description: "Booking #1248 requires immediate attention",
    time: "15 minutes ago",
  },
  {
    id: "4",
    type: "info",
    icon: Shield,
    title: "Collateral Verified",
    description: "High-value equipment collateral approved",
    time: "32 minutes ago",
  },
  {
    id: "5",
    type: "success",
    icon: Star,
    title: "Excellent Review",
    description: "5-star review boosts platform rating",
    time: "1 hour ago",
  },
];

export const kpiStats = [
  {
    title: "Total Active Users",
    value: "12,847",
    change: "+8.2%",
    icon: Users,
    color: "emerald",
    trend: "up",
  },
  {
    title: "Monthly Revenue",
    value: "$47,892",
    change: "+23.1%",
    icon: DollarSign,
    color: "blue",
    trend: "up",
  },
  {
    title: "Active Rentals",
    value: "1,247",
    change: "+12.5%",
    icon: Package,
    color: "purple",
    trend: "up",
  },
  {
    title: "Platform Growth",
    value: "+28.3%",
    change: "This quarter",
    icon: TrendingUp,
    color: "orange",
    trend: "up",
  },
];

export const criticalMetrics = [
  {
    title: "User Satisfaction",
    value: "98.2%",
    change: "+2.1%",
    icon: Award,
    color: "emerald",
    trend: "up",
  },
  {
    title: "Completion Rate",
    value: "95.7%",
    change: "+1.8%",
    icon: Target,
    color: "blue",
    trend: "up",
  },
  {
    title: "Global Reach",
    value: "47 Cities",
    change: "+3 new",
    icon: Globe,
    color: "purple",
    trend: "up",
  },
  {
    title: "System Uptime",
    value: "99.9%",
    change: "Excellent",
    icon: Zap,
    color: "orange",
    trend: "up",
  },
];

export const pendingActions = [
  {
    id: 1,
    title: "High-Value Collateral",
    count: 12,
    priority: "high",
    icon: Shield,
    description: "Items over $5,000 pending approval",
  },
  {
    id: 2,
    title: "Urgent Disputes",
    count: 3,
    priority: "high",
    icon: AlertTriangle,
    description: "Escalated cases requiring resolution",
  },
  {
    id: 3,
    title: "Premium Verifications",
    count: 8,
    priority: "medium",
    icon: Award,
    description: "Premium user identity checks",
  },
  {
    id: 4,
    title: "New Listings Review",
    count: 24,
    priority: "medium",
    icon: Package,
    description: "Recently submitted items",
  },
  {
    id: 5,
    title: "User Verifications",
    count: 15,
    priority: "low",
    icon: UserCheck,
    description: "Standard account verifications",
  },
];
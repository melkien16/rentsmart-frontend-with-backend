import { DollarSign, Package, TrendingUp, Clock, Star } from "lucide-react";

export const earningsData = [
  { name: "Jan", value: 1200 },
  { name: "Feb", value: 1900 },
  { name: "Mar", value: 1600 },
  { name: "Apr", value: 2400 },
  { name: "May", value: 2100 },
  { name: "Jun", value: 2800 },
  { name: "Jul", value: 3200 },
];

export const categoryData = [
  { name: "Cameras", value: 45 },
  { name: "Tools", value: 30 },
  { name: "Electronics", value: 15 },
  { name: "Others", value: 10 },
];

export const recentActivities = [
  {
    id: "1",
    type: "success",
    icon: DollarSign,
    title: "Payment Received",
    description: "Sony Alpha 7R IV rental completed",
    time: "2 hours ago",
    amount: "+$135.00",
  },
  {
    id: "2",
    type: "info",
    icon: Package,
    title: "New Rental Request",
    description: "Canon EOS R5 requested by Mike Rodriguez",
    time: "4 hours ago",
  },
  {
    id: "3",
    type: "warning",
    icon: Clock,
    title: "Return Reminder",
    description: "DJI Mavic Air 2 due back tomorrow",
    time: "6 hours ago",
  },
  {
    id: "4",
    type: "success",
    icon: Star,
    title: "New Review",
    description: "5-star review from Sarah Johnson",
    time: "1 day ago",
  },
];

export const quickStats = [
  {
    title: "Wallet Balance",
    value: "$1,247.50",
    change: "+12.5%",
    icon: DollarSign,
    color: "emerald",
    trend: "up",
  },
  {
    title: "Active Rentals",
    value: "8",
    change: "+2 this week",
    icon: Package,
    color: "blue",
    trend: "up",
  },
  {
    title: "Monthly Earnings",
    value: "$3,892.00",
    change: "+23.1%",
    icon: TrendingUp,
    color: "purple",
    trend: "up",
  },
  {
    title: "Pending Requests",
    value: "5",
    change: "3 new today",
    icon: Clock,
    color: "orange",
    trend: "neutral",
  },
];
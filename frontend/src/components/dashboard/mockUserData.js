// Mock data for user dashboard
export const mockRentals = {
  active: [
    {
      id: "rental1",
      item: {
        id: "item1",
        title: "Professional Camera",
        image: "/images/camera.jpg",
        category: "Electronics",
        description:
          "High-quality professional camera for events and photography",
      },
      renter: {
        id: "user2",
        name: "Jane Smith",
        avatar: "https://i.pravatar.cc/150?img=3",
        email: "jane@example.com",
        phone: "+1 234 567 890",
      },
      startDate: "2024-03-15",
      endDate: "2024-03-20",
      totalPrice: 250,
      status: "active",
      paymentStatus: "completed",
      deposit: 200,
      depositStatus: "held",
      location: "New York, NY",
      pickupTime: "2024-03-15 10:00 AM",
      returnTime: "2024-03-20 6:00 PM",
    },
    {
      id: "rental2",
      item: {
        id: "item2",
        title: "DJI Drone",
        image: "/images/drone.jpg",
        category: "Electronics",
        description:
          "Professional drone for aerial photography and videography",
      },
      renter: {
        id: "user1",
        name: "John Doe",
        avatar: "https://i.pravatar.cc/150?img=2",
        email: "john@example.com",
        phone: "+1 234 567 891",
      },
      startDate: "2024-03-18",
      endDate: "2024-03-22",
      totalPrice: 300,
      status: "active",
      paymentStatus: "completed",
      deposit: 300,
      depositStatus: "held",
      location: "Los Angeles, CA",
      pickupTime: "2024-03-18 2:00 PM",
      returnTime: "2024-03-22 8:00 PM",
    },
  ],
  pending: [
    {
      id: "rental3",
      item: {
        id: "item3",
        title: "Camping Tent",
        image: "/images/tent.jpg",
        category: "Outdoor",
        description: "Spacious 4-person camping tent with weather protection",
      },
      renter: {
        id: "user2",
        name: "Jane Smith",
        avatar: "https://i.pravatar.cc/150?img=3",
        email: "jane@example.com",
        phone: "+1 234 567 890",
      },
      startDate: "2024-03-25",
      endDate: "2024-03-28",
      totalPrice: 75,
      status: "pending",
      paymentStatus: "pending",
      deposit: 100,
      depositStatus: "pending",
      location: "Seattle, WA",
      pickupTime: "2024-03-25 9:00 AM",
      returnTime: "2024-03-28 5:00 PM",
    },
  ],
  completed: [
    {
      id: "rental4",
      item: {
        id: "item4",
        title: "Mountain Bike",
        image: "/images/bike.jpg",
        category: "Sports",
        description: "High-performance mountain bike for trail riding",
      },
      renter: {
        id: "user1",
        name: "John Doe",
        avatar: "https://i.pravatar.cc/150?img=2",
        email: "john@example.com",
        phone: "+1 234 567 891",
      },
      startDate: "2024-03-01",
      endDate: "2024-03-05",
      totalPrice: 160,
      status: "completed",
      paymentStatus: "completed",
      deposit: 250,
      depositStatus: "returned",
      rating: 5,
      review: "Great bike, perfect condition!",
      location: "Denver, CO",
      pickupTime: "2024-03-01 8:00 AM",
      returnTime: "2024-03-05 6:00 PM",
    },
  ],
};

// Mock data for user listings
export const mockListings = [
  {
    id: "listing1",
    title: "Professional Camera",
    category: "Electronics",
    description: "High-quality professional camera for events and photography",
    price: 50,
    priceUnit: "day",
    images: ["/images/camera.jpg", "/images/camera2.jpg"],
    status: "active",
    views: 245,
    inquiries: 12,
    bookings: 8,
    rating: 4.8,
    reviews: 15,
    location: "New York, NY",
    availability: "Now",
    createdAt: "2024-01-15",
    tags: ["Professional", "Events", "Photography"],
  },
  {
    id: "listing2",
    title: "DJI Drone",
    category: "Electronics",
    description: "Professional drone for aerial photography and videography",
    price: 75,
    priceUnit: "day",
    images: ["/images/drone.jpg", "/images/drone2.jpg"],
    status: "active",
    views: 189,
    inquiries: 8,
    bookings: 5,
    rating: 4.9,
    reviews: 12,
    location: "Los Angeles, CA",
    availability: "Now",
    createdAt: "2024-01-20",
    tags: ["Aerial", "Photography", "Videography"],
  },
  {
    id: "listing3",
    title: "Camping Tent",
    category: "Outdoor",
    description: "Spacious 4-person camping tent with weather protection",
    price: 25,
    priceUnit: "day",
    images: ["/images/tent.jpg"],
    status: "inactive",
    views: 156,
    inquiries: 6,
    bookings: 3,
    rating: 4.6,
    reviews: 8,
    location: "Seattle, WA",
    availability: "Unavailable",
    createdAt: "2024-01-10",
    tags: ["Camping", "Outdoor", "4-Person"],
  },
];

// Mock data for user collaterals
export const mockCollaterals = [
  {
    id: "collateral1",
    type: "Equipment",
    title: "Professional Camera",
    description: "Canon EOS R5 with multiple lenses",
    value: 3500,
    status: "approved",
    submittedDate: "2024-02-15",
    approvedDate: "2024-02-16",
    images: ["camera1.jpg", "camera2.jpg"],
    documents: ["receipt.pdf", "warranty.pdf"],
    verificationStatus: "verified",
    riskScore: "low",
    category: "Electronics",
  },
  {
    id: "collateral2",
    type: "Document",
    title: "Government ID",
    description: "Driver's license for identity verification",
    value: 0,
    status: "approved",
    submittedDate: "2024-02-10",
    approvedDate: "2024-02-11",
    images: ["id_front.jpg", "id_back.jpg"],
    documents: [],
    verificationStatus: "verified",
    riskScore: "low",
    category: "Identity",
  },
  {
    id: "collateral3",
    type: "Financial",
    title: "Security Deposit",
    description: "Cash security deposit for high-value rentals",
    value: 500,
    status: "pending",
    submittedDate: "2024-02-20",
    approvedDate: null,
    images: [],
    documents: ["bank_statement.pdf"],
    verificationStatus: "pending",
    riskScore: "low",
    category: "Financial",
  },
];

// Mock data for earnings and wallet
export const mockEarningsData = {
  totalEarnings: 2847.5,
  thisMonth: 685.0,
  lastMonth: 892.5,
  pendingPayouts: 342.0,
  totalRentals: 24,
  averagePerRental: 118.65,
  monthlyGrowth: 12.5,
  topEarningItems: [
    { name: 'MacBook Pro 16"', earnings: 420.0, rentals: 7 },
    { name: "DJI Drone", earnings: 380.0, rentals: 5 },
    { name: "Professional Camera", earnings: 320.0, rentals: 4 },
    { name: "Mountain Bike", earnings: 280.0, rentals: 6 },
  ],
  recentTransactions: [
    {
      id: 1,
      item: 'MacBook Pro 16"',
      amount: 120.0,
      date: "2024-03-20",
      status: "completed",
      renter: "John Doe",
    },
    {
      id: 2,
      item: "DJI Drone",
      amount: 75.0,
      date: "2024-03-19",
      status: "completed",
      renter: "Jane Smith",
    },
    {
      id: 3,
      item: "Professional Camera",
      amount: 80.0,
      date: "2024-03-18",
      status: "pending",
      renter: "Mike Johnson",
    },
    {
      id: 4,
      item: "Mountain Bike",
      amount: 45.0,
      date: "2024-03-17",
      status: "completed",
      renter: "Sarah Wilson",
    },
    {
      id: 5,
      item: "Camping Tent",
      amount: 35.0,
      date: "2024-03-16",
      status: "completed",
      renter: "Alex Brown",
    },
  ],
  monthlyData: [
    { month: "Jan", earnings: 650, rentals: 8 },
    { month: "Feb", earnings: 720, rentals: 9 },
    { month: "Mar", earnings: 685, rentals: 7 },
    { month: "Apr", earnings: 892, rentals: 12 },
    { month: "May", earnings: 784, rentals: 10 },
    { month: "Jun", earnings: 920, rentals: 11 },
  ],
};

export const mockWalletData = {
  balance: 1247.5,
  availableBalance: 905.5,
  pendingBalance: 342.0,
  totalDeposits: 2500.0,
  totalWithdrawals: 1252.5,
  securityDeposits: 800.0,
  recentTransactions: [
    {
      id: 1,
      type: "earning",
      amount: 120.0,
      description: "MacBook Pro rental",
      date: "2024-03-20",
      status: "completed",
    },
    {
      id: 2,
      type: "withdrawal",
      amount: -200.0,
      description: "Bank transfer",
      date: "2024-03-18",
      status: "completed",
    },
    {
      id: 3,
      type: "deposit",
      amount: 500.0,
      description: "Security deposit",
      date: "2024-03-15",
      status: "completed",
    },
    {
      id: 4,
      type: "earning",
      amount: 75.0,
      description: "DJI Drone rental",
      date: "2024-03-14",
      status: "completed",
    },
    {
      id: 5,
      type: "fee",
      amount: -15.0,
      description: "Platform fee",
      date: "2024-03-13",
      status: "completed",
    },
  ],
  paymentMethods: [
    {
      id: 1,
      type: "bank",
      name: "Chase Bank",
      account: "****1234",
      isDefault: true,
    },
    {
      id: 2,
      type: "card",
      name: "Visa",
      account: "****5678",
      isDefault: false,
    },
  ],
};

export const mockPremiumData = {
  currentPlan: {
    name: "Basic",
    price: 0,
    features: [
      "Up to 5 active listings",
      "Basic analytics",
      "Standard support",
      "2% platform fee",
    ],
    limitations: [
      "No priority listing",
      "Limited analytics",
      "Standard customer support",
    ],
  },
  availablePlans: [
    {
      id: "basic",
      name: "Basic",
      price: 0,
      period: "month",
      features: [
        "Up to 5 active listings",
        "Basic analytics",
        "Standard support",
        "2% platform fee",
      ],
      popular: false,
    },
    {
      id: "pro",
      name: "Pro",
      price: 19.99,
      period: "month",
      features: [
        "Up to 20 active listings",
        "Advanced analytics",
        "Priority support",
        "1.5% platform fee",
        "Featured listings",
        "Custom branding",
      ],
      popular: true,
    },
    {
      id: "premium",
      name: "Premium",
      price: 39.99,
      period: "month",
      features: [
        "Unlimited listings",
        "Premium analytics",
        "24/7 priority support",
        "1% platform fee",
        "Featured listings",
        "Custom branding",
        "API access",
        "White-label options",
      ],
      popular: false,
    },
  ],
  usage: {
    listingsUsed: 3,
    listingsLimit: 5,
    analyticsViews: 45,
    supportTickets: 2,
  },
};

export const mockFavoritesData = {
  totalFavorites: 12,
  categories: [
    { name: "Electronics", count: 5 },
    { name: "Sports", count: 3 },
    { name: "Tools", count: 2 },
    { name: "Vehicles", count: 2 },
  ],
  favorites: [
    {
      id: 1,
      title: 'MacBook Pro 16" M2',
      category: "Electronics",
      price: 60,
      priceUnit: "day",
      rating: 4.9,
      reviews: 42,
      image:
        "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
      owner: "John Smith",
      location: "San Francisco, CA",
      availability: "Now",
      addedDate: "2024-03-15",
    },
    {
      id: 2,
      title: "DJI Drone Pro",
      category: "Electronics",
      price: 75,
      priceUnit: "day",
      rating: 4.8,
      reviews: 28,
      image:
        "https://images.pexels.com/photos/705675/pexels-photo-705675.jpeg?auto=compress&cs=tinysrgb&w=600",
      owner: "Sarah Wilson",
      location: "Los Angeles, CA",
      availability: "Now",
      addedDate: "2024-03-10",
    },
    {
      id: 3,
      title: "Mountain Bike Trail",
      category: "Sports",
      price: 35,
      priceUnit: "day",
      rating: 4.7,
      reviews: 15,
      image:
        "https://images.pexels.com/photos/2158963/pexels-photo-2158963.jpeg?auto=compress&cs=tinysrgb&w=600",
      owner: "Mike Johnson",
      location: "Denver, CO",
      availability: "Next Week",
      addedDate: "2024-03-08",
    },
  ],
};

export const mockReviewsData = {
  totalReviews: 24,
  averageRating: 4.8,
  ratingBreakdown: [
    { stars: 5, count: 18, percentage: 75 },
    { stars: 4, count: 4, percentage: 17 },
    { stars: 3, count: 1, percentage: 4 },
    { stars: 2, count: 1, percentage: 4 },
    { stars: 1, count: 0, percentage: 0 },
  ],
  reviews: [
    {
      id: 1,
      item: 'MacBook Pro 16" M2',
      renter: "Alex Brown",
      rating: 5,
      review:
        "Excellent experience! The MacBook was in perfect condition and the owner was very professional. Highly recommend!",
      date: "2024-03-20",
      response:
        "Thank you Alex! We're glad you had a great experience. Looking forward to renting to you again.",
      responseDate: "2024-03-21",
    },
    {
      id: 2,
      item: "DJI Drone Pro",
      renter: "Emma Davis",
      rating: 4,
      review:
        "Great drone, worked perfectly for my photography project. Owner was helpful with setup instructions.",
      date: "2024-03-18",
      response: null,
    },
    {
      id: 3,
      item: "Mountain Bike Trail",
      renter: "David Wilson",
      rating: 5,
      review:
        "Amazing bike! Perfect for the trails. Owner provided great recommendations for local routes.",
      date: "2024-03-15",
      response:
        "Thanks David! Happy to hear you enjoyed the trails. Come back anytime!",
      responseDate: "2024-03-16",
    },
  ],
};

export const mockMessagesData = {
  totalMessages: 18,
  unreadCount: 5,
  conversations: [
    {
      id: 1,
      user: {
        name: "Alex Brown",
        avatar: "https://i.pravatar.cc/150?img=1",
        online: true,
      },
      lastMessage:
        "Thanks for the quick response! I'll pick up the camera tomorrow.",
      timestamp: "2 hours ago",
      unread: true,
      item: 'MacBook Pro 16" M2',
      messages: [
        {
          id: 1,
          sender: "user",
          message:
            "Hi! I'm interested in renting your MacBook Pro. Is it still available?",
          timestamp: "2024-03-20 10:30 AM",
        },
        {
          id: 2,
          sender: "me",
          message: "Yes, it's available! When would you like to pick it up?",
          timestamp: "2024-03-20 10:35 AM",
        },
        {
          id: 3,
          sender: "user",
          message:
            "Thanks for the quick response! I'll pick up the camera tomorrow.",
          timestamp: "2024-03-20 12:45 PM",
        },
      ],
    },
    {
      id: 2,
      user: {
        name: "Sarah Wilson",
        avatar: "https://i.pravatar.cc/150?img=2",
        online: false,
      },
      lastMessage:
        "The drone is in perfect condition. Great rental experience!",
      timestamp: "1 day ago",
      unread: false,
      item: "DJI Drone Pro",
      messages: [
        {
          id: 1,
          sender: "user",
          message:
            "Hi! I'm interested in your drone. Can you tell me more about it?",
          timestamp: "2024-03-18 09:15 AM",
        },
        {
          id: 2,
          sender: "me",
          message:
            "Sure! It's a DJI Drone Pro with 4K camera. Perfect for photography.",
          timestamp: "2024-03-18 09:20 AM",
        },
        {
          id: 3,
          sender: "user",
          message:
            "The drone is in perfect condition. Great rental experience!",
          timestamp: "2024-03-19 03:30 PM",
        },
      ],
    },
    {
      id: 3,
      user: {
        name: "Mike Johnson",
        avatar: "https://i.pravatar.cc/150?img=3",
        online: true,
      },
      lastMessage: "Can you extend the rental for another day?",
      timestamp: "3 days ago",
      unread: true,
      item: "Mountain Bike Trail",
      messages: [
        {
          id: 1,
          sender: "user",
          message: "Hi! I'm interested in your mountain bike.",
          timestamp: "2024-03-15 02:00 PM",
        },
        {
          id: 2,
          sender: "me",
          message: "Great! It's available for the weekend.",
          timestamp: "2024-03-15 02:05 PM",
        },
        {
          id: 3,
          sender: "user",
          message: "Can you extend the rental for another day?",
          timestamp: "2024-03-17 11:20 AM",
        },
      ],
    },
  ],
};

export const mockSupportData = {
  categories: [
    { id: "technical", name: "Technical Issues", icon: "Settings", count: 3 },
    { id: "billing", name: "Billing & Payments", icon: "CreditCard", count: 2 },
    { id: "rental", name: "Rental Problems", icon: "Package", count: 4 },
    { id: "account", name: "Account Issues", icon: "User", count: 1 },
    { id: "general", name: "General Support", icon: "HelpCircle", count: 2 },
  ],
  tickets: [
    {
      id: 1,
      title: "Payment not processed",
      category: "billing",
      status: "open",
      priority: "high",
      description:
        "I tried to pay for a rental but the payment didn't go through. Can you help?",
      createdAt: "2024-03-20",
      lastUpdated: "2024-03-20",
      attachments: ["receipt.pdf"],
      messages: [
        {
          id: 1,
          sender: "user",
          message:
            "I tried to pay for a rental but the payment didn't go through. Can you help?",
          timestamp: "2024-03-20 10:30 AM",
        },
        {
          id: 2,
          sender: "support",
          message:
            "Hi! We're looking into this issue. Can you provide your transaction ID?",
          timestamp: "2024-03-20 11:00 AM",
        },
      ],
    },
    {
      id: 2,
      title: "App not loading properly",
      category: "technical",
      status: "in-progress",
      priority: "medium",
      description:
        "The app keeps crashing when I try to browse items. This started happening yesterday.",
      createdAt: "2024-03-19",
      lastUpdated: "2024-03-20",
      attachments: [],
      messages: [
        {
          id: 1,
          sender: "user",
          message:
            "The app keeps crashing when I try to browse items. This started happening yesterday.",
          timestamp: "2024-03-19 02:15 PM",
        },
        {
          id: 2,
          sender: "support",
          message:
            "We're investigating this issue. Can you tell us what device you're using?",
          timestamp: "2024-03-19 03:00 PM",
        },
        {
          id: 3,
          sender: "user",
          message: "I'm using an iPhone 13 with iOS 17.2",
          timestamp: "2024-03-20 09:30 AM",
        },
      ],
    },
  ],
};

export const mockAccountData = {
  profile: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://i.pravatar.cc/150?img=4",
    dateOfBirth: "1990-05-15",
    address: {
      street: "123 Main Street",
      city: "San Francisco",
      state: "CA",
      zipCode: "94102",
      country: "United States",
    },
    preferences: {
      notifications: {
        email: true,
        sms: false,
        push: true,
      },
      privacy: {
        profileVisibility: "public",
        showEmail: false,
        showPhone: false,
      },
      language: "English",
      timezone: "America/Los_Angeles",
    },
  },
  security: {
    lastLogin: "2024-03-20 10:30 AM",
    loginHistory: [
      {
        date: "2024-03-20 10:30 AM",
        location: "San Francisco, CA",
        device: "Chrome on Mac",
      },
      {
        date: "2024-03-19 08:15 PM",
        location: "San Francisco, CA",
        device: "Safari on iPhone",
      },
      {
        date: "2024-03-18 02:45 PM",
        location: "San Francisco, CA",
        device: "Chrome on Mac",
      },
    ],
    twoFactorEnabled: true,
    passwordLastChanged: "2024-02-15",
  },
  paymentMethods: [
    {
      id: 1,
      type: "card",
      last4: "4242",
      brand: "Visa",
      expiry: "12/25",
      isDefault: true,
    },
    {
      id: 2,
      type: "card",
      last4: "5555",
      brand: "Mastercard",
      expiry: "08/26",
      isDefault: false,
    },
  ],
};
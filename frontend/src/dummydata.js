export const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@rentsmart.com",
    password: "admin123", // Plaintext for demo only
    role: "admin",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
    createdAt: new Date().toISOString(),
    isActive: true,
  },
  {
    id: "2",
    name: "John Doe",
    email: "user@rentsmart.com",
    password: "user123", // Plaintext for demo only
    role: "user",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
    createdAt: new Date().toISOString(),
    isActive: true,
  },
];

// Move mockProducts here so ProductDetailWrapper can access it
export const mockProducts = [
  {
    id: "1",
    title: 'MacBook Pro 16" M2',
    description:
      "Latest Apple MacBook Pro with M2 chip, 16GB RAM and 1TB SSD. Perfect for designers and developers.",
    price: 60,
    priceUnit: "day",
    rating: 4.9,
    reviews: 42,
    location: "San Francisco, CA",
    availability: "Now",
    images: [
      "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/705675/pexels-photo-705675.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
    category: "electronics",
    owner: "644e3d1e2c4a6343f0f4a8b3",
    features: [
      "M2 Pro chip with 12-core CPU",
      "16GB unified memory",
      "1TB SSD storage",
      "16-inch Liquid Retina XDR display",
      "Includes charger and protective case",
    ],
    rules: [
      "ID and credit card required",
      "Security deposit: $1000",
      "No international travel",
      "Software installation restrictions",
    ],
  },
  {
    id: "2",
    title: "Sony Alpha 7R IV Professional Camera",
    description:
      "Professional full-frame mirrorless camera with 61MP resolution. Perfect for photography and videography projects.",
    price: 85,
    priceUnit: "day",
    rating: 4.9,
    reviews: 127,
    location: "San Francisco, CA",
    availability: "Now",
    images: [
      "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
    category: "cameras",
    owner: "644e3d1e2c4a6343f0f4a8b3",
    features: [
      "61MP full-frame sensor",
      "4K video recording",
      "Fast autofocus",
      "Includes 2 batteries and charger",
    ],
    rules: ["ID required", "No international shipping"],
  },
  {
    id: "3",
    title: "DeWalt 20V MAX Cordless Drill Kit",
    description:
      "Professional cordless drill with 2 batteries and charger. Ideal for construction and DIY projects.",
    price: 25,
    priceUnit: "day",
    rating: 4.8,
    reviews: 89,
    location: "Los Angeles, CA",
    availability: "Now",
    images: [
      "https://images.pexels.com/photos/5691606/pexels-photo-5691606.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
    category: "tools",
    owner: "644e3d1e2c4a6343f0f4a8b3",
    features: [
      "20V MAX battery system",
      "Includes 2 batteries and charger",
      "Lightweight and ergonomic",
    ],
    rules: ["Return with all accessories"],
  },
  {
    id: "4",
    title: "DJI Mavic Air 2 Drone",
    description:
      "4K camera drone with 34-minute flight time. Perfect for aerial photography and videography.",
    price: 120,
    priceUnit: "day",
    rating: 4.9,
    reviews: 156,
    location: "New York, NY",
    availability: "Rented",
    images: [
      "https://images.pexels.com/photos/724921/pexels-photo-724921.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
    category: "electronics",
    owner: "644e3d1e2c4a6343f0f4a8b3",
    features: ["4K camera", "34-minute flight time", "Obstacle sensors"],
    rules: ["No flying in restricted areas", "Return fully charged"],
  },
  {
    id: "5",
    title: "Epson PowerLite 1080p Projector",
    description:
      "High-brightness projector perfect for presentations, events, and home theater.",
    price: 45,
    priceUnit: "day",
    rating: 4.7,
    reviews: 73,
    location: "Seattle, WA",
    availability: "Now",
    images: [
      "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
    category: "electronics",
    owner: "644e3d1e2c4a6343f0f4a8b3",
    features: ["1080p resolution", "High brightness", "HDMI and VGA inputs"],
    rules: ["No outdoor use in rain"],
  },
  {
    id: "6",
    title: "Canon EOS R5 Mirrorless Camera",
    description:
      "Professional 45MP full-frame camera with 8K video recording capabilities.",
    price: 95,
    priceUnit: "day",
    rating: 4.9,
    reviews: 203,
    location: "Miami, FL",
    availability: "Now",
    images: [
      "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
    category: "cameras",
    owner: "644e3d1e2c4a6343f0f4a8b3",
    features: [
      "45MP full-frame sensor",
      "8K video recording",
      "Dual card slots",
    ],
    rules: ["ID required", "No international shipping"],
  },
  {
    id: "7",
    title: 'Makita Circular Saw 7-1/4"',
    description:
      "Professional circular saw with carbide blade. Perfect for woodworking and construction.",
    price: 30,
    priceUnit: "day",
    rating: 4.6,
    reviews: 45,
    location: "Chicago, IL",
    availability: "Now",
    images: [
      "https://images.pexels.com/photos/5691606/pexels-photo-5691606.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
    category: "tools",
    owner: "644e3d1e2c4a6343f0f4a8b3",
    features: ['7-1/4" carbide blade', "Powerful motor", "Lightweight design"],
    rules: ["Return with blade guard attached"],
  },
];

// Mock users
export const mockUsers = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@rentsmart.com",
    password: "admin123",
    role: "admin",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
    createdAt: new Date().toISOString(),
    isActive: true,
  },
  {
    id: "2",
    name: "Regular User",
    email: "user@rentsmart.com",
    password: "user123",
    role: "user",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
    createdAt: new Date().toISOString(),
    isActive: true,
  },
];

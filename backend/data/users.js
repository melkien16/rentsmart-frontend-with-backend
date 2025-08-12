import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@rentsmart.com",
    phone: "0912345678",
    address: "Addis Ababa, Ethiopia",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150",
    password: bcrypt.hashSync("admin123", 10),
    isPremium: true,
    isAdmin: true,
  },
  {
    name: "Premium User",
    email: "premium@rentsmart.com",
    phone: "0922334455",
    address: "Bole, Addis Ababa",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150",
    password: bcrypt.hashSync("premium123", 10),
    isPremium: true,
    isAdmin: false,
  },
  {
    name: "Demo User",
    email: "demo@rentsmart.com",
    phone: "0933445566",
    address: "Kazanchis, Addis Ababa",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
    password: bcrypt.hashSync("demo123", 10),
    isPremium: false,
    isAdmin: false,
  },
];

export default users;

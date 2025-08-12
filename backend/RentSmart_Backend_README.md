
# 🧠 RentSmart Backend

RentSmart is a smart rental platform where users can list and rent tools, accessories, and other everyday items. This backend API handles authentication, item management, booking flows, wallets, subscriptions, reviews, messaging, and more.

---

## 🔧 Tech Stack

- **Node.js** + **Express** – RESTful API
- **MongoDB** + **Mongoose** – NoSQL Database
- **JWT** – Authentication
- **Multer** – File Uploads
- **dotenv** – Environment variables

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/melkien16/smartrent.git
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb:
JWT_SECRET=your_jwt_secret
NODE_ENV=development

### 4. Run the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

---

## 📁 Folder Structure

```
rentsmart-backend/
│
├── config/             # DB connection, cloudinary
├── controllers/        # Business logic
├── middleware/         # Auth, error handling
├── models/             # MongoDB schemas
├── routes/             # API route handlers
├── utils/              # Helper functions
├── data/               # dummy seeded data
├── Services/           # services like email(for the future)
├── server.js           # App entry point
└── README.md
```

---

## 🔐 Authentication

- `POST /api/users/register` – Register
- `POST /api/users/login` – Login
- `GET /api/users/profile` – User profile (protected)

---

## 📦 Items

- `GET /api/items` – All items
- `POST /api/items` – Add item (protected)
- `PUT /api/items/:id` – Update item (owner)
- `DELETE /api/items/:id` – Delete item

---

## 📅 Bookings

- `POST /api/bookings` – Create booking
- `GET /api/bookings` – Admin: All bookings
- `GET /api/bookings/user/:userId` – Bookings by user
- `GET /api/bookings/:id` – Single booking
- `PUT /api/bookings/:id/status` – Confirm/Complete
- `PUT /api/bookings/:id/cancel` – Cancel if pending

---

## 💳 Wallet

- `GET /api/wallet` – User wallet
- `PUT /api/wallet/deposit` – Deposit funds

---

## 💼 Collateral

- `POST /api/collateral` – Upload new collateral
- `GET /api/collateral` – Get current collateral
- `PUT /api/collateral` – Update existing collateral

### Logic:
- Every user must have a **single profile-level collateral**
- The system checks if the collateral meets item requirements before rental

---

## 💎 Subscriptions

- `POST /api/subscriptions` – Create/Update
- `GET /api/subscriptions/mine` – Get my subscription
- `PUT /api/subscriptions/:id/deactivate` – Admin/manual deactivation
- `GET /api/subscriptions/check-expired` – Auto-check expired

### Logic:
- `isPremium = true` on activation
- Premium users pay lower service fee (5%) vs basic (10%)
- On expiration: `isPremium = false`, subscription type = basic

---

## 🌟 Reviews

- `POST /api/reviews` – Submit review (to owner)
- `GET /api/reviews/user/:userId` – Get owner's reviews

---

## 💬 Messaging

- `POST /api/messages` – Send message
- `GET /api/messages/:userId` – Get messages with a user

---

## 📊 Reports (Admin)

- `GET /api/reports/stats` – Overall stats and system usage

---

## 🔄 Booking Logic

- **Statuses**: `pending`, `confirmed`, `completed`
- Payment deducted on booking
- Cancel only if `status === 'pending'`
- On completion, owner gets paid (after service fee deduction)

---

## ⚙️ Utilities

- `calculateTotalPrice()` – Calculates rental duration × price
- `premiumServiceFee` – 5% fee for premium users
- `ServiceFee` – 10% for regular users

---

## 🛡️ Middleware

- `authMiddleware` – Checks if user is logged in
- `adminMiddleware` – Checks for admin role
- `ownerMiddleware` – Checks item/booking ownership

---

## 🔁 Background Jobs

- **Subscription expiration check**
  - Can be set with `node-cron` to run `/api/subscriptions/check-expired` daily

---

## 🔐 Security & Validation

- Passwords hashed with bcrypt
- JWT token stored in HTTP-only cookies or headers
- API inputs validated at controller-level

---

## 📬 Contact

- Author: **Melkie**
- Email: [melkieyilk@gmail.com]
- GitHub: [github.com/melkien16](https://github.com/melkien16)

---

## 📃 License

This project is licensed under the **SmartRent License**.

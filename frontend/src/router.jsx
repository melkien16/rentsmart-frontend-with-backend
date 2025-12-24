import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Navbar } from "./components/navBar/Navbar";
import { Footer } from "./components/footer/Footer";
import { LandingPage } from "./components/LandingPage";
import { SignIn } from "./components/auth/SignIn";
import { SignUp } from "./components/auth/SignUp";
import { ProductBrowse } from "./components/browse/ProductBrowse";
import { Support } from "./components/Support";
import NotFound from "./components/NotFound";
import ProductDetailWrapper from "./helper/ProductsDetailWrapper";
import BookingSummary from "./components/booking/BookingSummary";
import OwnerProfileDetailOwner from "./components/profile/OwnerProfileDetail";
import ProfilePage from "./components/profile/ProfilePage";
import AddNewItem from "./components/ListItems";
import Message from "./components/Message/Message";
import VerificationStatus from "./components/profile/Verification";
import { UserDashboard } from "./components/dashboard/UserDashboard";
import { AdminDashboard } from "./components/dashboard/AdminDashboard";

function PrivateRoute({ children }) {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? children : <Navigate to="/signin" replace />;
}

function PublicLayout() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
}

function DashboardLayout() {
  return (
    <PrivateRoute>
      <Outlet />
      <ToastContainer />
    </PrivateRoute>
  );
}

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/items", element: <ProductBrowse /> },
      { path: "/items/:id", element: <ProductDetailWrapper /> },
      { path: "/support", element: <Support /> },
      { path: "/owner-profile/:id", element: <OwnerProfileDetailOwner /> },
    ],
  },
  {
    element: <DashboardLayout />,
    children: [
      { path: "/user", element: <UserDashboard /> },
      { path: "/admin", element: <AdminDashboard /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/list-item", element: <AddNewItem /> },
      { path: "/verify", element: <VerificationStatus /> },
      { path: "/user/message", element: <Message /> },
      { path: "/booking-summary", element: <BookingSummary /> },
    ],
  },
  {
    path: "*",
    element: (
      <PublicLayout>
        <NotFound />
      </PublicLayout>
    ),
  },
]);

import React from "react";
import { ToastContainer } from "react-toastify";
import { useSelector, Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import store from "./store";
import { SignIn } from "./components/auth/SignIn";
import { SignUp } from "./components/auth/SignUp";
import { UserDashboard } from "./components/dashboard/UserDashboard";
import { AdminDashboard } from "./components/dashboard/AdminDashboard";
import { LandingPage } from "./components/LandingPage";
import { ProductBrowse } from "./components/browse/ProductBrowse";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Support } from "./components/Support";
import NotFound from "./components/NotFound";
import ProductDetailWrapper from "./helper/ProductsDetailWrapper";
import Loader from "./components/ui/Loader";
import BookingSummary from "./components/booking/BookingSummary";
import OwnerProfileDetailOwner from "./components/profile/OwnerProfileDetail";
import ProfilePage from "./components/profile/ProfilePage";
import AddNewItem from "./components/ListItems";

const AppRoutes = () => {
  const isLoading = true;
  const navigate = useNavigate();
  const location = useLocation();

  // Determine if we are on a dashboard route
  const isDashboard =
    location.pathname.startsWith("/user") ||
    location.pathname.startsWith("/admin");

  {
    isLoading && <Loader />;
  }

  return (
    <>
      {/* Show Navbar and Footer on all non-dashboard pages */}
      {!isDashboard && (
        <Navbar
          onSignInClick={() => navigate("/signin")}
          onBrowseClick={() => navigate("/browse-items")}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              onSignInClick={() => navigate("/signin")}
              onBrowseClick={() => navigate("/browse-items")}
            />
          }
        />
        <Route
          path="/owner-profile/:id"
          element={<OwnerProfileDetailOwner />}
        />
        <Route
          path="/signin"
          element={<SignIn onSwitchToSignUp={() => navigate("/signup")} />}
        />
        <Route
          path="/booking-summary"
          element={
            <PrivateRoute>
              <BookingSummary />
            </PrivateRoute>
          }
        />
        <Route
          path="/signup"
          element={<SignUp onSwitchToSignIn={() => navigate("/signin")} />}
        />
        <Route path="/items" element={<ProductBrowse />} />
        <Route path="/items/:id" element={<ProductDetailWrapper />} />
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/list-item"
          element={
            <PrivateRoute>
              <AddNewItem />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route path="/support" element={<Support />} />
        {/* Fallback route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isDashboard && <Footer />}
      <ToastContainer />
    </>
  );
};

function PrivateRoute({ children }) {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? children : <Navigate to="/signin" replace />;
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { Mail, Lock, User, Phone, MapPin, Image, Zap } from "lucide-react";

import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { FloatingInput, FloatingPasswordInput } from "../ui/FloatingInput";
import { useRegisterMutation } from "../../slices/usersApiSlice";
import Loader from "../ui/Loader";
import { setCredentials } from "../../slices/authSlice";
import { setWalletInfo } from "../../slices/walletSlice";
import { useLazyGetWalletByUserIdQuery } from "../../slices/walletsApiSlice";

export const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
    password: "",
    confirmpassword: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [register, { isLoading }] = useRegisterMutation();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [userInfo, navigate, redirect]);

  const [getWalletByUserId] = useLazyGetWalletByUserIdQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, address, avatar, password, confirmpassword } =
      formData;

    if (password !== confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Please enter a valid phone number");
      return;
    }

    try {
      const res = await register({
        name,
        email,
        phone,
        address,
        avatar,
        password,
      }).unwrap();

      // Fetch wallet info after registration
      const walletData = await getWalletByUserId(res._id).unwrap();
      dispatch(setWalletInfo(walletData));
      toast.success("Registration successful!");
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error || "Registration failed");
    }
  };

  const inputClass =
    "w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all duration-300";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4 pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1),transparent_50%)]"></div>
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 w-full max-w-lg mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center">
              <Zap className="w-7 h-7 text-black" />
            </div>
            <span className="text-3xl font-bold text-white">RentSmart</span>
          </div>
          <p className="text-gray-300">Join the future of rentals</p>
        </div>

        {isLoading && <Loader />}

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Create Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <FloatingInput
              id="name"
              label="Full Name"
              icon={User}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />

            {/* Email */}
            <FloatingInput
              id="email"
              label="Email"
              type="email"
              icon={Mail}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />

            {/* Phone */}
            <FloatingInput
              id="phone"
              //add phone number validation suggestion in the placeholder
              label="Phone (e.g. +1234567890)"
              type="tel"
              icon={Phone}
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />

            {/* Address */}
            <FloatingInput
              id="address"
              label="Address"
              icon={MapPin}
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              required
            />

            {/* Avatar */}
            <FloatingInput
              id="avatar"
              label="Avatar URL (optional)"
              icon={Image}
              value={formData.avatar}
              onChange={(e) =>
                setFormData({ ...formData, avatar: e.target.value })
              }
            />

            {/* Password */}
            <FloatingPasswordInput
              id="password"
              label="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              icon={Lock}
              required
            />

            {/* Confirm Password */}
            <FloatingPasswordInput
              id="confirmpassword"
              label="Confirm Password"
              value={formData.confirmpassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmpassword: e.target.value })
              }
              icon={Lock}
              required
            />

            {/* Submit */}
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          {/* Redirect */}
          <div className="mt-6 text-center">
            <span className="text-gray-400">Already have an account? </span>
            <Link
              to="/signin"
              className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

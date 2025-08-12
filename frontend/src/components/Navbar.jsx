import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  Menu,
  X,
  Zap,
  Search,
  Mic,
  LogOut,
  LayoutDashboard,
  Bell,
  ChevronDown,
  Home,
  Camera,
  HelpCircle,
  TrendingUp,
  Shield,
} from "lucide-react";
import { Button } from "./ui/Button";
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const userMenuRef = useRef(null);
  const notificationsRef = useRef(null);
  const recordingIntervalRef = useRef(null);
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const [logoutApi] = useLogoutMutation();
  const dispatch = useDispatch();

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: "rental",
      message: "Your camera rental ends in 2 hours",
      time: "2 min ago",
      read: false,
      icon: Camera,
    },
    {
      id: 2,
      type: "payment",
      message: "Payment received for DJI Drone rental",
      time: "1 hour ago",
      read: true,
      icon: Shield,
    },
    {
      id: 3,
      type: "promotion",
      message: "20% off on all construction tools this week",
      time: "3 hours ago",
      read: false,
      icon: TrendingUp,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDashboardClick = () => {
    setIsUserMenuOpen(false);
    if (userInfo?.isAdmin === true) {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  };

  const handleLogout = async () => {
    setIsUserMenuOpen(false);

    try {
      await logoutApi().unwrap();
      navigate("/");
      dispatch(logout());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results or browse with query
      navigate(`/items?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    recordingIntervalRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);

    // Simulate voice recognition (in real app, you'd use Web Speech API)
    setTimeout(() => {
      stopRecording();
      setSearchQuery("camera equipment");
    }, 3000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
      recordingIntervalRef.current = null;
    }
    setRecordingTime(0);
  };

  const formatRecordingTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const navItems = [
    { name: "Browse", link: "/items", icon: Home },
    { name: "Support", link: "/support", icon: HelpCircle },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-2xl"
          : "bg-gradient-to-r from-black/20 via-black/10 to-black/20 backdrop-blur-sm"
      }`}
    >
      <div className="w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Logo - Icon Only */}
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 via-blue-400 to-purple-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-emerald-400/25 transition-all duration-300 group-hover:scale-110">
                <Zap className="w-7 h-7 text-black" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Mobile Search Bar - Centered */}
          <div className="md:hidden flex-1 max-w-sm mx-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search equipment..."
                className="w-full pl-10 sm:pl-12 pr-16 sm:pr-20 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 transition-all duration-300 text-sm sm:text-base"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <button
                  type="button"
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`p-1.5 sm:p-2 rounded-lg transition-all duration-300 ${
                    isRecording
                      ? "bg-red-500 hover:bg-red-600 animate-pulse"
                      : "hover:bg-white/10"
                  }`}
                >
                  <Mic
                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                      isRecording
                        ? "text-white"
                        : "text-gray-400 hover:text-emerald-400"
                    }`}
                  />
                </button>
                <button
                  type="submit"
                  className="p-1.5 sm:p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                </button>
              </div>

              {/* Mobile Recording Overlay */}
              {isRecording && (
                <div className="absolute inset-0 bg-red-500/20 backdrop-blur-sm rounded-xl border-2 border-red-500/50 flex items-center justify-center">
                  <div className="flex items-center space-x-2 bg-black/80 rounded-lg px-3 py-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-white text-sm font-medium">
                      Recording
                    </span>
                    <div className="text-red-400 font-mono text-xs">
                      {formatRecordingTime(recordingTime)}
                    </div>
                    <button
                      onClick={stopRecording}
                      className="text-red-400 hover:text-white transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Enhanced Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-4xl mx-8">
            <form onSubmit={handleSearch} className="relative w-full group">
              <div
                className={`absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  searchFocused ? "opacity-100" : ""
                }`}
              ></div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  placeholder="Search for tools, cameras, equipment..."
                  className="w-full pl-12 pr-20 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 transition-all duration-300 backdrop-blur-sm text-base"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                  <button
                    type="button"
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`p-2 rounded-xl transition-all duration-300 ${
                      isRecording
                        ? "bg-red-500 hover:bg-red-600 animate-pulse"
                        : "hover:bg-white/10"
                    }`}
                  >
                    <Mic
                      className={`w-5 h-5 transition-colors ${
                        isRecording
                          ? "text-white"
                          : "text-gray-400 hover:text-emerald-400"
                      }`}
                    />
                  </button>
                  <button
                    type="submit"
                    className="p-2 rounded-xl bg-emerald-400 hover:bg-emerald-500 transition-colors"
                  >
                    <Search className="w-5 h-5 text-black" />
                  </button>
                </div>

                {/* Recording Overlay */}
                {isRecording && (
                  <div className="absolute inset-0 bg-red-500/20 backdrop-blur-sm rounded-2xl border-2 border-red-500/50 flex items-center justify-center">
                    <div className="flex items-center space-x-3 bg-black/80 rounded-xl px-4 py-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-white font-medium">
                          Recording...
                        </span>
                      </div>
                      <div className="text-red-400 font-mono text-sm">
                        {formatRecordingTime(recordingTime)}
                      </div>
                      <button
                        onClick={stopRecording}
                        className="text-red-400 hover:text-white transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-emerald-400 transition-colors duration-200 font-medium rounded-xl hover:bg-white/10"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}

            {/* Notifications */}
            {userInfo && (
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="relative p-2 rounded-xl hover:bg-white/10 transition-all duration-200"
                >
                  <Bell className="w-6 h-6 text-gray-300 hover:text-emerald-400" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {isNotificationsOpen && (
                  <div className="absolute top-full right-0 mt-2 w-80 bg-black/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
                    <div className="p-4 border-b border-white/10">
                      <h3 className="text-white font-semibold">
                        Notifications
                      </h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${
                            !notification.read ? "bg-emerald-400/5" : ""
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <notification.icon className="w-5 h-5 text-emerald-400 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-white text-sm font-medium">
                                {notification.message}
                              </p>
                              <p className="text-gray-400 text-xs mt-1">
                                {notification.time}
                              </p>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Authentication Section */}
            {!userInfo ? (
              <div className="flex items-center space-x-3">
                <Link to={"/signin"}>
                  <Button variant="primary" size="sm">
                    Sign In
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={
                        userInfo.avatar ||
                        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
                      }
                      alt={userInfo.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-emerald-400/30"
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-black"></div>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Enhanced User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-black/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
                    <div className="p-4 border-b border-white/10">
                      <div className="flex items-center space-x-3">
                        <img
                          src={
                            userInfo.avatar ||
                            "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
                          }
                          alt={userInfo.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-emerald-400/30"
                        />
                        <div>
                          <p className="text-white font-semibold">
                            {userInfo.name}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {userInfo.email}
                          </p>
                          <span className="inline-block mt-1 px-2 py-1 bg-emerald-400/20 text-emerald-400 text-xs rounded-full capitalize">
                            {userInfo.isAdmin ? "Admin" : "User"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      <button
                        onClick={handleDashboardClick}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                      >
                        <LayoutDashboard className="w-5 h-5" />
                        <span>Dashboard</span>
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link key={item.name} to={item.link}>
                  <button
                    key={item.name}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-gray-300 hover:text-emerald-400 transition-colors rounded-lg hover:bg-white/10"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </button>
                </Link>
              ))}

              {/* Mobile Authentication */}
              {!userInfo ? (
                <div className="px-3 pt-4 space-y-2">
                  <Link to="/signin">
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Sign In
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="border-t border-white/10 pt-4 mt-4">
                  <div className="flex items-center space-x-3 px-3 py-2">
                    <img
                      src={
                        userInfo.avatar ||
                        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
                      }
                      alt={userInfo.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-white font-medium">{userInfo.name}</p>
                      <p className="text-gray-400 text-sm capitalize">
                        {userInfo.isAdmin ? "Admin" : "User"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleDashboardClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-gray-300 hover:text-emerald-400 transition-colors flex items-center space-x-2"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </button>

                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-gray-300 hover:text-red-400 transition-colors flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

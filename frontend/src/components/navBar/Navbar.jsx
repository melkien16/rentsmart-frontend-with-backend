import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../slices/authSlice";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import {
  useMarkNotificationReadMutation,
  useLazyGetNotificationsQuery,
} from "../../slices/notificationsApiSlice";

import Logo from "./Logo";
import MobileSearchBar from "./MobileSearchBar";
import DesktopSearchBar from "./DesktopSearchBar";
import DesktopNavigation from "./DesktopNavigation";
import MobileMenuButton from "./MobileMenuButton";
import MobileMenu from "./MobileMenu";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [markNotificationRead] = useMarkNotificationReadMutation();
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notifications, setNotifications] = useState(null);

  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const [lang, setLang] = useState("en-US");

  const { userInfo } = useSelector((state) => state.auth);

  const [notificationsTrigger] = useLazyGetNotificationsQuery();
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (userInfo) {
          const { data } = await notificationsTrigger();
          if (data) setNotifications(data);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [userInfo, notificationsTrigger]);

  const userMenuRef = useRef(null);
  const notificationsRef = useRef(null);
  const navigate = useNavigate();

  const [logoutApi] = useLogoutMutation();
  const dispatch = useDispatch();

  const unreadCount = notifications?.filter((n) => !n.isRead).length;

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
    } catch (error) {}
  };
  const handleProfile = async () => {
    setIsUserMenuOpen(false);
    navigate("/profile");
  };
  const handleMessage = async () => {
    setIsUserMenuOpen(false);
    navigate("/user/message");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/items?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognitionRef = useRef(null);
  const pressTimerRef = useRef(null); // track long press timer
  const isLongPressRef = useRef(false); // track if it was a long press

  if (SpeechRecognition && !recognitionRef.current) {
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = false;
  }

  const toggleLanguage = () => {
    setLang((prev) => (prev === "en-US" ? "am-ET" : "en-US"));
  };

  const startListening = () => {
    if (!recognitionRef.current) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    recognitionRef.current.lang = lang;
    recognitionRef.current.start();
    setListening(true);

    recognitionRef.current.onresult = (event) => {
      setText(event.results[0][0].transcript);
    };

    recognitionRef.current.onend = () => {
      setListening(false);
    };
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }

    if (text.trim()) {
      setSearchQuery(text);
      // navigate(`/items?search=${encodeURIComponent(text)}`);
      console.log("Final transcript:", text);
      setText("");
    }
  };

  // Handle press start
  const handlePressStart = () => {
    isLongPressRef.current = false;

    pressTimerRef.current = setTimeout(() => {
      isLongPressRef.current = true;
      startListening();
    }, 300); // if held for 300ms → treat as long press
  };

  // Handle press end
  const handlePressEnd = () => {
    clearTimeout(pressTimerRef.current);

    if (isLongPressRef.current) {
      stopListening(); // if it was long press → stop recording
    } else {
      toggleLanguage(); // if short press → toggle language
    }
  };

  const handleOpenNotification = async (notif) => {
    setSelectedNotification(notif);

    // Only mark as read if it's not already read
    if (!notif.isRead) {
      try {
        await markNotificationRead(notif._id).unwrap();
      } catch (err) {
        console.error("Failed to mark as read:", err);
      }
    }
  };

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
          <Logo />

          {/* Mobile Search Bar - Centered */}
          <MobileSearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            listening={listening}
            handlePressStart={handlePressStart}
            handlePressEnd={handlePressEnd}
            lang={lang}
          />

          {/* Enhanced Search Bar - Desktop */}
          <DesktopSearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            listening={listening}
            handlePressStart={handlePressStart}
            handlePressEnd={handlePressEnd}
            lang={lang}
            searchFocused={searchFocused}
            setSearchFocused={setSearchFocused}
          />

          {/* Desktop Navigation */}
          <DesktopNavigation
            userInfo={userInfo}
            notifications={notifications}
            unreadCount={unreadCount}
            isNotificationsOpen={isNotificationsOpen}
            setIsNotificationsOpen={setIsNotificationsOpen}
            notificationsRef={notificationsRef}
            handleOpenNotification={handleOpenNotification}
            handleDashboardClick={handleDashboardClick}
            handleProfile={handleProfile}
            handleMessage={handleMessage}
            handleLogout={handleLogout}
            userMenuRef={userMenuRef}
            isUserMenuOpen={isUserMenuOpen}
            setIsUserMenuOpen={setIsUserMenuOpen}
            selectedNotification={selectedNotification}
            setSelectedNotification={setSelectedNotification}
          />

          {/* Mobile menu button */}
          <MobileMenuButton
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        </div>

        {/* Enhanced Mobile menu */}
        {isMobileMenuOpen && (
          <MobileMenu
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            userInfo={userInfo}
            handleProfile={handleProfile}
            handleLogout={handleLogout}
            handleDashboardClick={handleDashboardClick}
            handleMessage={handleMessage}
          />
        )}
      </div>
    </nav>
  );
};

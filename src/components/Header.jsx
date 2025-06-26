import logo from "../assets/coclinic.png";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import {
  deleteUserFailure,
  unSetProfile,
  deleteUserSuccess,
  setAndUnSetProfile,
  signOutUserStart,
} from "../features/user/userSlice";
import { AuthUrls } from "../utils/serverURL";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from './LanguageSwitcher';
import axiosInstance from "../utils/axiosInstance";

const Header = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  console.log("laaang ====>", currentLanguage)
  
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { profile } = useSelector((state) => state.user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleProfile = () => {
    dispatch(setAndUnSetProfile());
  };

  const handleUnsetProfile = () => {
    dispatch(unSetProfile());
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const { data } = await axiosInstance.post(AuthUrls.signOut
      );
      if (data.status !== "success") {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
      localStorage.removeItem("aiChatMessages");
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  // Define navigation links once to avoid duplication
  const navLinks = [
    { to: "/", label: t('header.home') },
    ...(currentUser
      ? [
          { to: "/aichat", label: t('header.ai_chat') },
          { to: "/livechat", label: t('header.live_chat') },
          { to: "/appointment", label: t('header.appointments') },
          { to: "/resource", label: t('header.resources') },
          
        ]
      : []),
    { to: "/about", label: t('header.about') },
  ];

  const adminLinks = {
    to: "/dashboard", 
    label: t('header.dashboard')
  }
  const doctorLinks = {
    to: "/create-book", 
    label: t('header.create_book')
  }


  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="relative ">
          {/* Language Switcher (Desktop) */}
          <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-3">
            {/* Logo Section */}
            <div onClick={handleUnsetProfile} className="flex items-center space-x-8">
              <Link to="/">
                <div className="flex items-center space-x-3">
                  <button
                    className="lg:hidden"
                    onClick={() => setIsMobileMenuOpen(true)}
                  >
                    <FaBars className="w-6 h-6 text-gray-700" />
                  </button>
                  <img
                    src={logo}
                    width={70}
                    alt="CoClinic logo"
                    className="rounded-lg border-2 border-green-100 p-1"
                  />
                  <div className="hidden md:block">
                    <h1 className="text-4xl font-semibold text-gray-800">
                      <span className="text-green-600">{t('header.co')}</span>
                      <span className="text-green-800">{t('header.clinic')}</span>
                    </h1>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {t('header.slogan')}
                    </p>
                  </div>
                </div>
              </Link>
              {/* Search Bar (Desktop) - Show on md and up */}
              <div className="relative hidden lg:block">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaSearch className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder={t('header.find')}
                  className="w-72 pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500 text-sm text-gray-600 placeholder-gray-400"
                />
              </div>
            </div>

            <div className={`hidden lg:block relative top-2  ${currentLanguage === 'en' ? 'left-4' : 'right-4'} z-10`}>
            <LanguageSwitcher />
          </div>

            {/* Desktop Navigation and Profile */}
            <div className="hidden lg:flex items-center space-x-6">
              <nav className="flex space-x-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-gray-600 hover:text-green-700 transition-colors duration-200 text-meduim font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
                {
                  currentUser?.isAdmin && (
                    <Link
                    key={adminLinks.to}
                    to={adminLinks.to}
                    className="text-gray-600 hover:text-green-700 transition-colors duration-200 text-meduim font-medium"
                  >
                    {adminLinks.label}
                  </Link>
                  )
                }
                {
                  currentUser?.isDoctor && (
                    <Link
                    key={doctorLinks.to}
                    to={doctorLinks.to}
                    className="text-gray-600 hover:text-green-700 transition-colors duration-200 text-meduim font-medium"
                  >
                    {doctorLinks.label}
                  </Link>
                  )
                }
              </nav>
              {currentUser ? (
                <div className="relative ml-4">
                  <button
                    onClick={handleProfile}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <img
                      className="h-9 w-9 rounded-full border-2 border-green-100"
                      src={currentUser?.avatar}
                      alt="User profile"
                    />
                  </button>
                  {profile && (
                    <div className={`absolute  ${currentLanguage === 'en' ? 'right-0' : 'left-0'}  mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50`}>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 transition-colors"
                        onClick={handleProfile}
                      >
                        {t('header.my_profile')}
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-green-50 transition-colors"
                      >
                        {t('header.sign_out')}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex">
                  <Link
                    to="/signup"
                    className="ml-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 text-sm font-medium shadow-sm"
                  >
                    {t('header.sign_up')}
                  </Link>
                  <Link
                    to="/signin"
                    className="ml-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 text-sm font-medium shadow-sm"
                  >
                    {t('header.sign_in')}
                  </Link>
                </div>
              )}
            </div>

            

            {/* Search Bar (Mobile) - Show only on small screens */}
            <div className="flex-1 p-2 lg:hidden max-sm:hidden">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaSearch className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder={t('header.find')}
                  className="min-w-0 w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500 text-sm text-gray-600 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Mobile Sign-In/Profile */}
            <div className="ml-4 lg:hidden flex flex-row ">
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={handleProfile}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <img
                      className="h-9 w-9 rounded-full border-2 border-green-100"
                      src={currentUser?.avatar}
                      alt="User profile"
                    />
                  </button>
                  {profile && (
                    <div className={`absolute ${currentLanguage === 'en' ? 'right-0' : 'left-0'}  mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50`}>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 transition-colors"
                        onClick={handleProfile}
                      >
                        {t('header.my_profile')}
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-green-50 transition-colors"
                      >
                        {t('header.sign_out')}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="ml-2 px-2 py-2  text-black rounded-mdtransition-colors duration-200 text-sm font-bold underline"
                  >
                    {t('header.sign_in')}
                  </Link>
                  <Link
                    to="/signup"
                    className="ml-4 px-2 py-2 text-black rounded-md  transition-colors duration-200 text-sm font-bold underline "
                  >
                    {t('header.sign_up')}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="flex justify-between p-4">
            <LanguageSwitcher />
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <FaTimes className="w-6 h-6 text-gray-700" />
            </button>
          </div>
          <div className="flex flex-col space-y-4 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-600 hover:text-green-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {
                  currentUser?.isAdmin && (
                    <Link
                    key={adminLinks.to}
                    to={adminLinks.to}
                    className="text-gray-600 hover:text-green-700 transition-colors duration-200 text-meduim font-medium"
                  >
                    {adminLinks.label}
                  </Link>
                  )
            }

            {
                  currentUser?.isDoctor && (
                    <Link
                    key={doctorLinks.to}
                    to={doctorLinks.to}
                    className="text-gray-600 hover:text-green-700 transition-colors duration-200 text-meduim font-medium"
                  >
                    {doctorLinks.label}
                  </Link>
                  )
                }
          </div>
          {currentUser ? (
            <div className="p-4 border-t border-gray-200">
              <Link
                to="/profile"
                className="block py-2 text-gray-700 hover:text-green-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('header.my_profile')}
              </Link>
              <button
                onClick={() => {
                  handleSignOut();
                  setIsMobileMenuOpen(false);
                }}
                className="block py-2 text-gray-700 hover:text-green-700"
              >
                {t('header.sign_out')}
              </button>
            </div>
          ) : (
            <div className="p-4 border-t border-gray-200">
              <Link
                to="/signup"
                className="ml-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 text-sm font-medium shadow-sm"
              >
                {t('header.sign_up')}
              </Link>
              <Link
                to="/signin"
                className="ml-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 text-sm font-medium shadow-sm"
              >
                {t('header.sign_in')}
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Header;
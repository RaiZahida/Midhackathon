import React, { useState, useEffect } from "react";
import { auth } from '../configuration/firebase';
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState('');
  const [signUpMessage, setSignUpMessage] = useState('');
  const [signInMessage, setSignInMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

useEffect(() => {
    console.log('Navbar useEffect running');
    const signUpMsg = localStorage.getItem('signUpMessage');
    console.log('signUpMsg:', signUpMsg);
    if (signUpMsg) {
        localStorage.removeItem('signUpMessage');
        setTimeout(() => {
            setSignUpMessage(signUpMsg);
            setTimeout(() => setSignUpMessage(''), 2000);
        }, 1000);
    }
    const signInMsg = localStorage.getItem('signInMessage');
    console.log('signInMsg:', signInMsg);
    if (signInMsg) {
        localStorage.removeItem('signInMessage');
        setTimeout(() => {
            setSignInMessage(signInMsg);
            setTimeout(() => setSignInMessage(''), 2000);
        }, 1000);
    }
}, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email || '');
        setUserPhoto(user.photoURL || '');
      } else {
        setUserEmail('');
        setUserPhoto('');
      }
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    setShowLogoutModal(false);
    try {
      await signOut(auth);
      setTimeout(() => {
        setLogoutMessage('You have been successfully logged out.');
        setTimeout(() => {
          setLogoutMessage('');
          navigate('/');
        }, 2000);
      }, 1000);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      <div className="bg-[#0d1b2a] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

          {/* Brand */}
          <Link to="/" className="text-2xl font-bold flex items-center">
            <span style={{ color: '#415a77' }}>Z</span>
            <span style={{ color: '#e0e1dd' }}>events</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 lg:space-x-6">
            <Link to="/" className="hover:text-[#778da9] text-sm lg:text-base">Home</Link>
            <button
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  const servicesSection = document.getElementById('services');
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }}
              className="hover:text-[#778da9] bg-transparent border-none cursor-pointer text-sm lg:text-base"
            >
              Services
            </button>
            <button
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  const formSection = document.querySelector('section.relative.bg-cover');
                  if (formSection) {
                    formSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }}
              className="hover:text-[#778da9] bg-transparent border-none cursor-pointer text-sm lg:text-base"
            >
              Contact
            </button>
            <Link to="/events" className="hover:text-[#778da9] text-sm lg:text-base">Events</Link>
            {userEmail === 'admin@admin.com' && (
              <Link to="/admin" className="hover:text-[#778da9] text-sm lg:text-base">Admin</Link>
            )}
          </div>

          {/* Auth Button */}
          <div className="hidden md:block">
            {!userEmail && (
              <button
                onClick={() => {
                  navigate('/signin');
                  setIsMobileMenuOpen(false);
                }}
              className="font-sans text-sm sm:text-base font-bold text-white border border-white bg-transparent hover:bg-[#415a77] hover:text-[#e0e1dd] transition-all duration-300 px-3 py-2 rounded-lg block text-center lg:text-left"
              >
                Sign In
              </button>
            )}

            {userEmail && (
              <button
                onClick={() => {
                  setShowLogoutModal(true);
                  setIsMobileMenuOpen(false);
                }}
              className="font-sans text-sm sm:text-base font-bold text-white border border-white bg-transparent hover:bg-[#415a77] hover:text-[#e0e1dd] transition-all duration-300 px-3 py-2 rounded-lg block text-center lg:text-left"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
          {isOpen && (
          <div className="md:hidden bg-[#1b263b] px-4 pb-3 space-y-2 text-sm text-center">
            <Link to="/" className="block text-white hover:text-[#778da9]">Home</Link>
            <button
              onClick={() => {
                navigate('/');
                setIsMobileMenuOpen(false);
                setTimeout(() => {
                  const servicesSection = document.getElementById('services');
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }}
              className="block text-white hover:text-[#778da9] bg-transparent border-none cursor-pointer w-full"
            >
              Services
            </button>
            <button
              onClick={() => {
                navigate('/');
                setIsMobileMenuOpen(false);
                setTimeout(() => {
                  const formSection = document.querySelector('section.relative.bg-cover');
                  if (formSection) {
                    formSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }}
              className="block text-white hover:text-[#778da9] bg-transparent border-none cursor-pointer w-full"
            >
              Contact
            </button>
            <Link to="/events" className="block text-white hover:text-[#778da9]">Events</Link>
            {userEmail === 'admin@admin.com' && (
              <Link to="/dashboard" className="block text-white hover:text-[#778da9]">Dashboard</Link>
            )}

            <Link
              to="/signin"
              className="block bg-[#778da9] text-[#e0e1dd] px-3 py-1 rounded-md hover:bg-[#415a77] mx-auto w-fit"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
          </div>
        )}
        {showLogoutModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d1b2a] bg-opacity-90 backdrop-blur-md p-4">
            <div className="bg-[#415a77] rounded-2xl p-6 sm:p-8 md:p-10 max-w-sm sm:max-w-md lg:max-w-lg mx-4 border border-[#778da9] shadow-2xl transform scale-100 transition-transform duration-300 w-full">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#778da9] rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#e0e1dd]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#e0e1dd]">Confirm Logout</h2>
              </div>
              <p className="mb-6 sm:mb-8 md:mb-10 text-[#e0e1dd] leading-relaxed text-sm sm:text-base md:text-lg">Are you sure you want to logout from your account? This will end your current session.</p>
              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="px-6 sm:px-8 py-3 bg-[#778da9] text-[#e0e1dd] rounded-xl hover:bg-[#415a77] transition-all duration-300 font-semibold shadow-md w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-6 sm:px-8 py-3 bg-[#415a77] text-[#e0e1dd] rounded-xl hover:bg-[#778da9] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl w-full sm:w-auto"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

        )}
      </div>
      {/* Toast notifications container */}
      <div className="fixed bottom-5 right-5 space-y-2 z-50">
        {signInMessage && (
          <div className="bg-blue-600 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out">
            {signInMessage}
          </div>
        )}
        {logoutMessage && (
          <div className="bg-green-600 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out">
            {logoutMessage}
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../configuration/firebase";

function SignUpLoginPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [resetEmail, setResetEmail] = useState("");
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  // Track login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.email === 'admin@admin.com') {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Handle form inputs
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle login/signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, firstName, lastName } = formData;

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem('signInMessage', 'Successfully signed in!');
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(userCredential.user, {
          displayName: `${firstName} ${lastName}`,
        });
        localStorage.setItem('signUpMessage', 'Successfully signed up!');
      }
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      localStorage.setItem('signInMessage', 'Successfully signed in with Google!');
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  // Admin login
  const handleAdminLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, 'admin@admin.com', 'admin123');
      localStorage.setItem('signInMessage', 'Successfully signed in as admin!');
      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  // Reset password
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert("Password reset email sent!");
      setIsResettingPassword(false);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 px-4 font-poppins">
      <div className="relative w-full max-w-md p-8 bg-gray-800 rounded-2xl shadow-xl border border-gray-700">
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-white text-4xl hover:text-gray-400 transition"
          aria-label="Close and go to Home"
        >
          &times;
        </button>
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          {isResettingPassword
            ? "Reset Password"
            : isLogin
            ? "Sign In"
            : "Sign Up"}
        </h2>

        {/* Reset Password Form */}
        {isResettingPassword ? (
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 ">Email</label>
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Send Reset Email
            </button>
            <p
              onClick={() => setIsResettingPassword(false)}
              className="text-sm text-center text-indigo-600 cursor-pointer hover:underline"
            >
              Back to Login
            </p>
          </form>
        ) : (
          <>
            {/* Login / Sign Up Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
              <div>
                <label className="block text-sm font-medium text-gray-300 text-left">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="First Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 text-left">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Last Name"
                  required
                />
              </div>
                </>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-300 text-left">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 text-left">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Password"
                  required
                />
              </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
            {isLogin && (
              <>
                <p
                  onClick={() => setIsResettingPassword(true)}
                  className="text-sm text-center text-indigo-600 cursor-pointer hover:underline"
                >
                  Forgot Password?
                </p>

              </>
            )}
          </form>

            {/* Divider */}
            <div className="mt-6 flex items-center justify-center">
              <span className="border-t w-1/4"></span>
              <span className="mx-2 text-sm text-gray-500">OR</span>
              <span className="border-t w-1/4"></span>
            </div>

            {/* Google Login */}
            <button
  onClick={handleGoogleLogin}
  className="mt-4 flex items-center justify-center w-full border py-2 px-4 rounded-lg  hover:bg-indigo-700 transition">
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              <span className="text-sm font-medium text-gray-100">
                Continue with Google
              </span>
            </button>

            {/* Switch between Login / Signup */}
            <p className="mt-6 text-sm text-center text-gray-300">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 text-indigo-600 cursor-pointer hover:underline"
              >
                {isLogin ? "Sign Up" : "Login"}
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default SignUpLoginPage;

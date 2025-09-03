import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const { setToken, backendUrl } = useContext(ProductsContext);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (
      formData.email === "" ||
      formData.password === "" ||
      (isSignUp && formData.name === "")
    ) {
      toast.error("Please fill all the required fields");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Attempting to", isSignUp ? "register" : "login", "with:", formData);
      console.log("Backend URL:", backendUrl);
      
      if (isSignUp) {
        const response = await axios.post(
          `${backendUrl}/user/register`,
          formData
        );
        console.log("Registration response:", response.data);
        setToken(response.data.token);
        toast.success("Welcome aboard! Account created successfully!");
        localStorage.setItem("token", response.data.token);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navigate("/");
      } else {
        const response = await axios.post(`${backendUrl}/user/login`, formData);
        console.log("Login response:", response.data);
        setToken(response.data.token);
        toast.success("Welcome back! Login successful!");
        localStorage.setItem("token", response.data.token);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navigate("/");
      }
    } catch (error) {
      console.log("Error details:", error);
      console.log("Error response:", error.response?.data);
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else if (error.response && error.response.status === 500) {
        toast.error("Server error. Please try again later.");
      } else if (error.code === 'ECONNREFUSED') {
        toast.error("Cannot connect to server. Please check if the backend is running.");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-white flex">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
          <div className="relative z-10 flex flex-col justify-center px-12 text-white">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">Welcome to Our Store</h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Discover premium electronics with unbeatable quality and
                exceptional customer service.
              </p>
            </div>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                <span>Premium Quality Products</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                <span>Free Shipping Worldwide</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                <span>24/7 Customer Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {isSignUp ? "Create Account" : "Welcome Back"}
              </h2>
              <p className="text-gray-600">
                {isSignUp
                  ? "Join us to start your shopping journey"
                  : "Sign in to your account to continue"}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors bg-gray-50 focus:bg-white"
                    placeholder="Enter your full name"
                    required={isSignUp}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors bg-gray-50 focus:bg-white"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors bg-gray-50 focus:bg-white"
                  placeholder="Enter your password"
                  required
                />
              </div>

              

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    {isSignUp ? "Creating Account..." : "Signing In..."}
                  </div>
                ) : isSignUp ? (
                  "Create Account"
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            

            {/* Toggle Mode */}
            <div className="text-center">
              <span className="text-sm text-gray-600">
                {isSignUp
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </span>
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="ml-1 text-sm font-medium text-black hover:text-gray-700"
              >
                {isSignUp ? "Sign in" : "Sign up"}
              </button>
            </div>

            {/* Terms */}
            {isSignUp && (
              <p className="mt-6 text-xs text-center text-gray-500">
                By creating an account, you agree to our{" "}
                <a href="#" className="text-black hover:text-gray-700">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-black hover:text-gray-700">
                  Privacy Policy
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

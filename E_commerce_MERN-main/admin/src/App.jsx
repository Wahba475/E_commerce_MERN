import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import AddItems from "./pages/AddItems";
import ListItems from "./pages/ListItems";
import Orders from "./pages/Orders";
import Users from "./pages/users";
import Login from "./components/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken');
    if (storedToken) {
      try {
        const payload = JSON.parse(atob(storedToken.split(".")[1]));
        const currentTime = Date.now() / 1000;
        if (payload.exp < currentTime) {
          localStorage.removeItem("adminToken");
          toast.info("Your session has expired. Please log in again.");
        } else {
          setToken(storedToken);
        }
      } catch {
        localStorage.removeItem("adminToken");
        toast.error("Invalid token");
      }
    }
  }, []);

  const handleLogout = () => {
    setToken("");
  };

  if (!token) {
    return <Login />;
  }

  return (
    <Router>
      <AdminLayout onLogout={handleLogout}>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-items" element={<AddItems />} />
          <Route path="/list-items" element={<ListItems />} />
          <Route path="/orders" element={<Orders token={token} />} />
          <Route path="/users" element={<Users token={token} />} />
        </Routes>
      </AdminLayout>
    </Router>
  );
}

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to your admin panel</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900">Total Products</h3>
          <p className="text-3xl font-bold text-gray-700 mt-2">24</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900">Total Orders</h3>
          <p className="text-3xl font-bold text-gray-700 mt-2">156</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900">Revenue</h3>
          <p className="text-3xl font-bold text-gray-700 mt-2">$12,450</p>
        </div>
      </div>
    </div>
  );
}

export default App;
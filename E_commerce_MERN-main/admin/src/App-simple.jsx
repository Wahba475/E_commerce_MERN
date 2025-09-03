import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Simple Navbar */}
        <nav className="bg-white shadow-md border-b border-gray-200 p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
            <div className="flex space-x-4">
              <NavLink to="/" className="text-gray-600 hover:text-gray-900">Dashboard</NavLink>
              <NavLink to="/add-items" className="text-gray-600 hover:text-gray-900">Add Items</NavLink>
              <NavLink to="/list-items" className="text-gray-600 hover:text-gray-900">List Items</NavLink>
              <NavLink to="/orders" className="text-gray-600 hover:text-gray-900">Orders</NavLink>
            </div>
          </div>
        </nav>

        {/* Content */}
        <main className="max-w-7xl mx-auto p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-items" element={<AddItems />} />
            <Route path="/list-items" element={<ListItems />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// Simple Dashboard
function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome to the admin panel!</p>
    </div>
  );
}

// Simple Add Items
function AddItems() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Items</h1>
      <form className="space-y-4 max-w-md">
        <input 
          type="text" 
          placeholder="Product Name" 
          className="w-full p-3 border border-gray-300 rounded"
        />
        <input 
          type="number" 
          placeholder="Price" 
          className="w-full p-3 border border-gray-300 rounded"
        />
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

// Simple List Items
function ListItems() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">List Items</h1>
      <div className="bg-white p-4 rounded shadow">
        <p>Product list will appear here</p>
      </div>
    </div>
  );
}

// Simple Orders
function Orders() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="bg-white p-4 rounded shadow">
        <p>Orders list will appear here</p>
      </div>
    </div>
  );
}

export default App;

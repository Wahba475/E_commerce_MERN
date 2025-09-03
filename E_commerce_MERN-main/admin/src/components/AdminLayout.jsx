import React from "react";
import NavBar from "./Navbar";
import Sidebar from "./Sidebar";

function AdminLayout({ children, onLogout }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <NavBar onLogout={onLogout} />
      
      {/* Main Content Area */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Page Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;

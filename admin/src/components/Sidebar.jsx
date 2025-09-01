import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    {
      id: 1,
      title: "Add Items",
      path: "/add-items",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      )
    },
    {
      id: 2,
      title: "List Items",
      path: "/list-items",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Orders",
      path: "/orders",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    }
  ];

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200 min-h-screen">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
        <p className="text-sm text-gray-500 mt-1">Management Dashboard</p>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-6">
        <div className="px-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Management
          </h3>
        </div>
        
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? "bg-gray-100 text-gray-900 border-r-2 border-gray-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className={`transition-colors duration-200 ${
                      isActive 
                        ? "text-gray-700" 
                        : "text-gray-400 group-hover:text-gray-600"
                    }`}>
                      {item.icon}
                    </span>
                    <span>{item.title}</span>
                    
                    {/* Active indicator */}
                    <div className={`ml-auto w-2 h-2 rounded-full transition-all duration-200 ${
                      isActive 
                        ? "bg-gray-700" 
                        : "bg-transparent group-hover:bg-gray-300"
                    }`} />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Admin User</p>
            <p className="text-xs text-gray-500">admin@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

import React, { useState } from "react";
import Logo from "../assets/Logo.png";
import { NavLink, Link } from "react-router-dom";

function NavBar({ onLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  let hoverTimeout;
  
  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    if (onLogout) {
      onLogout();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="flex justify-between items-center py-6 px-10 bg-gradient-to-r from-gray-50 to-white shadow-md border-b border-gray-200">

     <div className="flex items-center gap-4">
       <Link to="/"> <img src={Logo} alt="logo" className="w-32 h-auto" /></Link>
       <div className="text-2xl font-bold text-gray-800">Admin Panel</div>
     </div>

              <ul className="hidden sm:flex gap-10 text-sm font-medium text-gray-800 tracking-wide">
         <NavLink 
           to="/" 
           className="group flex flex-col items-center gap-2 hover:text-black transition-colors duration-200"
         >
           {({ isActive }) => (
             <>
               <p>DASHBOARD</p>
               <hr className={`w-2/4 h-[2px] border-0 bg-black rounded-full transition-all duration-300 ease-out ${
                 isActive 
                   ? 'opacity-100 scale-x-100' 
                   : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
               }`} />
             </>
           )}
         </NavLink>
         
         <NavLink 
           to="/products" 
           className="group flex flex-col items-center gap-2 hover:text-black transition-colors duration-200"
         >
           {({ isActive }) => (
             <>
               <p>MANAGE PRODUCTS</p>
               <hr className={`w-2/4 h-[2px] border-0 bg-black rounded-full transition-all duration-300 ease-out ${
                 isActive 
                   ? 'opacity-100 scale-x-100' 
                   : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
               }`} />
             </>
           )}
         </NavLink>
         
         <NavLink 
           to="/orders" 
           className="group flex flex-col items-center gap-2 hover:text-black transition-colors duration-200"
         >
           {({ isActive }) => (
             <>
               <p>ORDERS</p>
               <hr className={`w-2/4 h-[2px] border-0 bg-black rounded-full transition-all duration-300 ease-out ${
                 isActive 
                   ? 'opacity-100 scale-x-100' 
                   : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
               }`} />
             </>
           )}
         </NavLink>
         
         <NavLink 
           to="/users" 
           className="group flex flex-col items-center gap-2 hover:text-black transition-colors duration-200"
         >
           {({ isActive }) => (
             <>
               <p>USERS</p>
               <hr className={`w-2/4 h-[2px] border-0 bg-black rounded-full transition-all duration-300 ease-out ${
                 isActive 
                   ? 'opacity-100 scale-x-100' 
                   : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
               }`} />
             </>
           )}
         </NavLink>
       </ul>

      <div className="flex items-center gap-6">
        
        {/* Admin Profile Dropdown */}
        <div className="relative">
          <div className="flex items-center gap-3 cursor-pointer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                         <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
               </svg>
             </div>
            <span className="text-gray-800 font-medium">Admin</span>
          </div>
          
          {isDropdownOpen && (
            <div
              className="absolute top-full right-0 mt-2 w-48 bg-white shadow-xl rounded-lg border border-gray-200 py-2 z-50"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex flex-col">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">admin@example.com</p>
                </div>
                <Link to="#" className="px-4 py-3 cursor-pointer hover:bg-gray-100 hover:text-gray-900 text-sm font-medium border-b">
                  Settings
                </Link>
                <Link to="#" className="px-4 py-3 cursor-pointer hover:bg-gray-100 hover:text-gray-900 text-sm font-medium border-b">
                  Analytics
                </Link>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-3 cursor-pointer hover:bg-gray-100 hover:text-gray-900 text-sm font-medium text-left w-full"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
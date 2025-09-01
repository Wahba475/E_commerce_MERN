import React, { useState, useContext } from "react";
import Logo from "../assets/Logo.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import search from "../assets/searchIcon.png";
import profile from "../assets/profile.png";
import Cart from "../assets/cart.png";
import { CartContext } from "../context/CartContext.js";
import { ProductsContext } from "../context/ProductsContext.js";
import { toast } from "react-toastify";

function NavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { getTotalQuantity } = useContext(CartContext);
  const { token, setToken } = useContext(ProductsContext);
  const navigate = useNavigate();
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

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setIsDropdownOpen(false);
    
    // Add a small delay to show the loading animation
    await new Promise(resolve => setTimeout(resolve, 800));
    
    localStorage.removeItem("token");
    setToken("");
    toast.success("Logged out successfully!");
    navigate("/");
    setIsLoggingOut(false);
  };

  return (
    <div className="flex justify-between items-center py-6 px-10 bg-gradient-to-r from-gray-50 to-white shadow-md border-b border-gray-200">

     <Link to="/"> <img src={Logo} alt="logo" className="w-32 h-auto" /></Link>

      
             <ul className="hidden sm:flex gap-10 text-sm font-medium text-gray-800 tracking-wide">
         <NavLink 
           to="/" 
           className="group flex flex-col items-center gap-2 hover:text-black transition-colors duration-200"
         >
           {({ isActive }) => (
             <>
               <p>HOME</p>
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
               <p>PRODUCTS</p>
               <hr className={`w-2/4 h-[2px] border-0 bg-black rounded-full transition-all duration-300 ease-out ${
                 isActive 
                   ? 'opacity-100 scale-x-100' 
                   : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
               }`} />
             </>
           )}
         </NavLink>
         
         <NavLink 
           to="/about" 
           className="group flex flex-col items-center gap-2 hover:text-black transition-colors duration-200"
         >
           {({ isActive }) => (
             <>
               <p>ABOUT</p>
               <hr className={`w-2/4 h-[2px] border-0 bg-black rounded-full transition-all duration-300 ease-out ${
                 isActive 
                   ? 'opacity-100 scale-x-100' 
                   : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
               }`} />
             </>
           )}
         </NavLink>
         
         <NavLink 
           to="/contact" 
           className="group flex flex-col items-center gap-2 hover:text-black transition-colors duration-200"
         >
           {({ isActive }) => (
             <>
               <p>CONTACT</p>
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
      
        <img
          src={search}
          alt="search"
          className="w-6 h-6 cursor-pointer hover:opacity-80 transition-opacity"
        />

        {/* Cart */}
        <NavLink to="/cart" className="relative">
          <img
            src={Cart}
            alt="cart"
            className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity"
          />
          <p className="absolute -bottom-1 -right-1 bg-black text-white text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
           {getTotalQuantity()}
           {console.log(getTotalQuantity())}
          </p>
        </NavLink>

        {/* Profile Dropdown */}
        <div className="relative">
          {token ? (
            <>
              <img
                src={profile}
                alt="profile"
                className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
              {isDropdownOpen && !isLoggingOut && (
                <div
                  className="absolute top-full right-0 mt-2 w-44 bg-white shadow-xl rounded-lg border border-gray-200 py-2 z-50"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="flex flex-col">
                    <p className="px-4 py-3 cursor-pointer hover:bg-gray-100 hover:text-gray-900 text-sm font-medium border-b">
                      My Profile
                    </p>
                    <Link to="/Order"> 
                      <p className="px-4 py-3 cursor-pointer hover:bg-gray-100 hover:text-gray-900 text-sm font-medium border-b">
                        Orders
                      </p>
                    </Link>
                    <p 
                      className="px-4 py-3 cursor-pointer hover:bg-gray-100 hover:text-gray-900 text-sm font-medium transition-colors"
                      onClick={handleLogout}
                    >
                      Logout
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <Link to="/login">
              <img
                src={profile}
                alt="profile"
                className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>
          )}
        </div>
        
        {/* Logout Loading Overlay */}
        {isLoggingOut && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 shadow-2xl transform transition-all duration-300 ease-out">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 bg-gray-600 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Logging out...</h3>
                  <p className="text-sm text-gray-600">Please wait a moment</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;

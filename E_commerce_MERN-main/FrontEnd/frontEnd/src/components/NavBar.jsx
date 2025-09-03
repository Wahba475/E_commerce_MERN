import React, { useState, useContext, useRef, useEffect } from "react";
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef(null);
  const { getTotalQuantity } = useContext(CartContext);
  const { token, setToken, products } = useContext(ProductsContext);
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

  // Search functionality
  const handleSearchClick = () => {
    setIsSearchOpen(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim().length > 0) {
      setIsSearching(true);
      // Simulate search delay for better UX
      setTimeout(() => {
        const filtered = products.filter(product => 
          product.title?.toLowerCase().includes(query.toLowerCase()) ||
          product.category?.toLowerCase().includes(query.toLowerCase()) ||
          product.description?.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5); // Limit to 5 results for dropdown
        setSearchResults(filtered);
        setIsSearching(false);
      }, 200);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      handleSearchClose();
    }
  };

  const handleProductClick = (productIndex) => {
    navigate(`/product/${productIndex}`);
    handleSearchClose();
  };

  // Close search on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isSearchOpen) {
        handleSearchClose();
      }
    };
    
    if (isSearchOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isSearchOpen]);

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
          onClick={handleSearchClick}
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

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
            
            {/* Search Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Search Products</h2>
              <button
                onClick={handleSearchClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Search Input */}
            <div className="p-6">
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search for products, categories, or descriptions..."
                    className="w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-lg"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    {isSearching ? (
                      <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                    ) : (
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Search
                </button>
              </form>
            </div>

            {/* Search Results */}
            {searchQuery.trim() && (
              <div className="max-h-96 overflow-y-auto border-t border-gray-200">
                {searchResults.length > 0 ? (
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-3">
                      Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                    </h3>
                    <div className="space-y-2">
                      {searchResults.map((product, index) => {
                        const productIndex = products.indexOf(product);
                        return (
                          <div
                            key={productIndex}
                            onClick={() => handleProductClick(productIndex)}
                            className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                          >
                            <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-900 truncate">
                                {product.title}
                              </h4>
                              <p className="text-sm text-gray-500 capitalize">
                                {product.category}
                              </p>
                              <p className="text-sm font-semibold text-gray-700">
                                ${product.price}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {searchResults.length === 5 && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <button
                          onClick={handleSearchSubmit}
                          className="w-full text-center text-gray-600 hover:text-gray-800 font-medium"
                        >
                          View all results for "{searchQuery}"
                        </button>
                      </div>
                    )}
                  </div>
                ) : !isSearching && searchQuery.trim() ? (
                  <div className="p-8 text-center">
                    <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-500 mb-4">
                      Try searching with different keywords or browse our categories
                    </p>
                    <button
                      onClick={handleSearchSubmit}
                      className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Search anyway
                    </button>
                  </div>
                ) : null}
              </div>
            )}

            {/* Search Tips */}
            {!searchQuery.trim() && (
              <div className="p-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-3">Search Tips</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Try searching by product name, brand, or category</li>
                  <li>• Use specific keywords for better results</li>
                  <li>• Press Enter to see all results</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;

import React, { useContext, useState, useMemo, useEffect } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { useNavigate, useSearchParams } from "react-router-dom";

function Products() {
  const { products } = useContext(ProductsContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15;

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");

  // Handle URL parameters for category filtering and search
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    const searchFromUrl = searchParams.get('search');
    
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
    
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    }
  }, [searchParams]);

  
  const categories = useMemo(() => {
    const cats = [...new Set(products.map(p => p.category))].filter(Boolean);
    return ["All", ...cats.slice(0, 8)]; // Limit to 8 categories + All
  }, [products]);

  
  const parsePrice = (price) => {
    // If price is already a number, return it
    if (typeof price === 'number') return price;
    // If price is a string, parse it
    if (typeof price === 'string') {
      return parseFloat(price.replace(/[^0-9.]/g, "")) || 0;
    }
    return 0;
  };

  
  const parseRating = (rating) => {
    if (!rating) return 0;
    // If rating is already a number, return it
    if (typeof rating === 'number') return rating;
    // If rating is a string like "4.1 out of 5 stars", extract the number
    if (typeof rating === 'string') {
      const match = rating.match(/(\d+\.?\d*)\s*out\s*of\s*5/);
      return match ? parseFloat(match[1]) : 0;
    }
    return 0;
  };

  
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Category filter
      const categoryMatch = selectedCategory === "All" || product.category === selectedCategory;
      
      // Search filter
      const searchMatch = !searchQuery || 
        product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      return categoryMatch && searchMatch;
    });

    
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        break;
      case "price-high":
        filtered.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        break;
      case "rating":
        filtered.sort((a, b) => parseRating(b.rating) - parseRating(a.rating));
        break;
      default: // featured
        break;
    }

    return filtered;
  }, [products, selectedCategory, sortBy, searchQuery]);

  
  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex);

  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-8 py-12">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {searchQuery ? (
              <>
                Search Results for <span className="text-gray-700">"{searchQuery}"</span>
              </>
            ) : (
              <>
                All <span className="text-500">Products</span>
              </>
            )}
          </h1>
          <div className="w-24 h-1 bg-gray-700 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            {searchQuery ? (
              `Found ${filteredAndSortedProducts.length} product${filteredAndSortedProducts.length !== 1 ? 's' : ''} matching your search`
            ) : (
              "Discover our complete collection of premium electronics"
            )}
          </p>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                navigate("/products");
              }}
              className="mt-4 text-gray-500 hover:text-gray-700 underline"
            >
              Clear search
            </button>
          )}
        </div>

        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-gray-700 text-white shadow-lg"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-gray-400 hover:bg-gray-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          
          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-sm">
              {filteredAndSortedProducts.length} products
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-12">
          {currentProducts.map((product) => {
            const productIndex = products.indexOf(product);
            const rating = parseRating(product.rating);
            
            return (
              <div
                key={productIndex}
                                 className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 hover:border-gray-300"
                onClick={() => navigate(`/product/${productIndex}`)}
              >
                
                <div className="relative bg-gray-50 aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-black transition-colors">
                    {product.title}
                  </h3>
                  
                  {/* Rating */}
                  {rating > 0 && (
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-3 h-3 ${i < Math.floor(rating) ? 'fill-current' : 'text-gray-300 fill-current'}`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">{rating.toFixed(1)}</span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="text-lg font-bold text-gray-900">
                    ${product.price}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>

            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              const isActive = page === currentPage;
              
              // Show first page, last page, current page, and 2 pages around current
              const shouldShow = 
                page === 1 || 
                page === totalPages || 
                Math.abs(page - currentPage) <= 2;

              if (!shouldShow) {
                // Show ellipsis
                if (page === currentPage - 3 || page === currentPage + 3) {
                  return <span key={page} className="px-2 text-gray-400">...</span>;
                }
                return null;
              }

              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isActive
                      ? "bg-gray-700 text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;

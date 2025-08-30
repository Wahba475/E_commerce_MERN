import React, { useContext } from 'react'
import { ProductsContext } from '../context/ProductsContext.js'
import { Link, useNavigate } from 'react-router-dom'
import Title from './Title'

function TrendingProducts() {
  const { products } = useContext(ProductsContext)
  const navigate = useNavigate()
  
  // Helper function to parse rating from text and render animated stars
  const parseRating = (ratingText) => {
    if (!ratingText) return 0
    // Extract number from text like "4.1 out of 5 stars"
    const match = ratingText.match(/(\d+\.?\d*)\s*out\s*of\s*5/)
    return match ? parseFloat(match[1]) : 0
  }

  const renderAnimatedStars = (ratingText, index) => {
    const rating = parseRating(ratingText)
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    
    // Render full stars with animation
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg 
          key={i}
          className="w-4 h-4 text-yellow-400 transform transition-all duration-300 hover:scale-125" 
          fill="currentColor" 
          viewBox="0 0 20 20"
          style={{
            animation: `starFillIn 0.3s ease-out ${(index * 100) + (i * 150)}ms both`
          }}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )
    }
    
    // Render half star with special animation
    if (hasHalfStar) {
      stars.push(
        <div 
          key="half" 
          className="relative"
          style={{
            animation: `starFillIn 0.3s ease-out ${(index * 100) + (fullStars * 150)}ms both`
          }}
        >
          <svg className="w-4 h-4 text-gray-300 transition-transform duration-300 hover:scale-125" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <svg 
              className="w-4 h-4 text-yellow-400" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              style={{
                animation: `halfStarFill 0.4s ease-out ${(index * 100) + (fullStars * 150) + 100}ms both`
              }}
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
      )
    }
    
    // Render empty stars with delayed animation
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg 
          key={`empty-${i}`}
          className="w-4 h-4 text-gray-300 transition-all duration-300 hover:scale-110 hover:text-gray-400" 
          fill="currentColor" 
          viewBox="0 0 20 20"
          style={{
            animation: `starFadeIn 0.2s ease-out ${(index * 100) + ((fullStars + (hasHalfStar ? 1 : 0) + i) * 100)}ms both`
          }}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )
    }
    
    return { stars, rating }
  }
  
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-8">
        {/* Modern Professional Heading */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-4">
              Trending Products
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-gray-300 via-gray-600 to-gray-300 mx-auto rounded-full"></div>
          </div>
          <p className="text-gray-600 mt-6 text-lg font-light max-w-2xl mx-auto">
            Discover our most popular electronics with unbeatable prices and quality
          </p>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-10">
          {products.slice(30, 42).map((product, index) => {
            const { stars, rating } = renderAnimatedStars(product.rating, index)
            const productIndex = 30 + index // Calculate actual array index
            return (
            <div 
              key={productIndex} 
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
              onClick={() => navigate(`/product/${productIndex}`)}
            >
              
                <div className="relative overflow-hidden bg-gray-50 rounded-t-2xl">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="aspect-square w-full object-contain group-hover:scale-105 transition-transform duration-300 p-6" 
                  />
                </div>
                

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-black transition-colors">
                    {product.title}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center space-x-1">
                      {stars}
                    </div>
                    <span className="ml-2 text-sm text-gray-600 font-medium">
                      {rating > 0 ? rating.toFixed(1) : "No rating"}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="text-2xl font-bold text-gray-900">
                    {product.price}
                  </div>
                </div>
            </div>
          )})}
        </div>
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes starFillIn {
          0% {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(-90deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        
        @keyframes halfStarFill {
          0% {
            width: 0%;
            opacity: 0;
          }
          100% {
            width: 50%;
            opacity: 1;
          }
        }
        
        @keyframes starFadeIn {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  )
}

export default TrendingProducts


    
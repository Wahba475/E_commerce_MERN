import React from 'react'
import { useNavigate } from 'react-router-dom'

function FeaturedCategories() {
  const navigate = useNavigate()
  
  const categories = [
    {
      id: 1,
      name: "Smartphones",
      description: "Latest flagship devices",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=300&fit=crop",
      count: "120+ products",
      color: "from-sky-400 to-sky-500"
    },
    {
      id: 2,
      name: "Laptops",
      description: "Power & portability",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=300&fit=crop",
      count: "85+ products",
      color: "from-sky-500 to-sky-600"
    },
    {
      id: 3,
      name: "Audio",
      description: "Premium sound experience",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=300&fit=crop",
      count: "60+ products",
      color: "from-sky-300 to-sky-400"
    },
    {
      id: 4,
      name: "Gaming",
      description: "Elite gaming gear",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=300&fit=crop",
      count: "40+ products",
      color: "from-sky-600 to-sky-700"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                         Featured <span className="text-gray-700">Categories</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our carefully curated selection of premium electronics across all major categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div 
              key={category.id}
              onClick={() => navigate(`/products?category=${encodeURIComponent(category.name)}`)}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="relative p-6">
                <div className="absolute -top-6 left-6 right-6">
                  <div className="bg-white rounded-xl p-4 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{category.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{category.count}</span>
                      <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-16"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedCategories

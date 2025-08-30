import React, { useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ProductsContext } from '../context/ProductsContext.js'

function ProductDetail() {
  const { id } = useParams()
  const { products } = useContext(ProductsContext)
  
  // Get product by array index
  const product = products[parseInt(id)]
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link 
            to="/" 
            className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-black transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-8">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="bg-gray-50 rounded-xl p-8 flex items-center justify-center">
              <img 
                src={product.image} 
                alt={product.title}
                className="max-w-full max-h-96 object-contain"
              />
            </div>

            {/* Product Details */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              <div className="text-3xl font-bold text-gray-900 mb-6">
                {product.price}
              </div>

              <div className="mb-6">
                <p className="text-gray-600">
                  Rating: {product.rating}
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600">
                  {product.description}
                </p>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-black transition-colors">
                  Add to Cart
                </button>
              </div>

              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-gray-500">Product ID: {id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

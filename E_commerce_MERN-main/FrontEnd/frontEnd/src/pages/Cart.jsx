import React, { useContext, useEffect } from 'react'
import { CartContext } from '../context/CartContext.js'
import { useNavigate } from 'react-router-dom'

function Cart() {
  const { 
    cartData, 
    removeFromCart, 
    updateQuantity, 
    getTotalQuantity, 
    getTotalAmount,
    loading,
    error,
    setError,
    fetchCartData
  } = useContext(CartContext)
  
  const navigate = useNavigate()

  // Fetch cart data on component mount
  useEffect(() => {
    fetchCartData()
  }, [])

  // Clear error after showing it
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [error, setError])

  // Handle quantity update with proper API integration
  const handleQuantityUpdate = async (productId, newQuantity) => {
    const success = await updateQuantity(productId, newQuantity)
    if (!success) {
      // Error is already handled in context, just provide user feedback if needed
      console.log('Failed to update quantity')
    }
  }

  // Handle item removal with proper API integration
  const handleRemoveItem = async (productId) => {
    const success = await removeFromCart(productId)
    if (!success) {
      console.log('Failed to remove item')
    }
  }

  // Calculate total items
  const totalItems = getTotalQuantity()
  const totalAmount = getTotalAmount()

  // Loading state
  if (loading && (!cartData || !cartData.products)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    )
  }

  // Empty cart state
  if (!cartData || !cartData.products || cartData.products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <button 
            onClick={() => navigate('/products')}
            className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-1">{totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {cartData.products.map((item, index) => {
                // Handle case where product might not be populated
                const product = item.product || {}
                const productId = product._id || item.product
                const title = product.name || product.title || 'Unknown Product'
                const price = product.price || 0
                const image = product.image || product.images?.[0] || '/placeholder-image.jpg'
                const category = product.category || 'Uncategorized'

                return (
                  <div key={productId} className={`p-6 ${index !== cartData.products.length - 1 ? 'border-b border-gray-200' : ''}`}>
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                        <img 
                          src={image} 
                          alt={title}
                          className="w-full h-full object-contain p-2"
                          onError={(e) => {
                            e.target.src = '/placeholder-image.jpg'
                          }}
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 line-clamp-2 mb-1">
                          {title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-3">{category}</p>
                        
                        {/* Price and Quantity */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button 
                                onClick={() => handleQuantityUpdate(productId, item.quantity - 1)}
                                disabled={loading}
                                className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                                </svg>
                              </button>
                              <span className="px-4 py-2 text-sm font-medium">{item.quantity}</span>
                              <button 
                                onClick={() => handleQuantityUpdate(productId, item.quantity + 1)}
                                disabled={loading}
                                className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                              </button>
                            </div>
                            
                            {/* Price */}
                            <div className="text-lg font-semibold text-gray-900">
                              ${(price * item.quantity).toFixed(2)}
                            </div>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => handleRemoveItem(productId)}
                            disabled={loading}
                            className="text-red-500 hover:text-red-700 transition-colors p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Remove item"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>$10.00</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg font-semibold text-gray-900">
                  <span>Total</span>
                  <span>${(totalAmount + 10.00).toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={() => navigate('/place-order')} 
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Proceed to Checkout'}
              </button>
              
              <button 
                onClick={() => navigate('/products')}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Continue Shopping
              </button>

              {/* Security Badge */}
              <div className="mt-6 text-center">
                <div className="inline-flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure checkout
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
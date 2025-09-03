import React, { useState, useEffect, useContext } from 'react'
import { ProductsContext } from '../context/ProductsContext'
import axios from 'axios'

function Order() {
  const { backendUrl, token, products } = useContext(ProductsContext)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${backendUrl}/order/list-user`, {
          headers: { Authorization: `Bearer ${token}` }
        })

        setOrders(response.data.orders || [])
      } catch (error) {
        console.error('Error fetching orders:', error)
        setOrders([])
      } finally {
        setLoading(false)
      }
    }
    if (token) {
      fetchOrders()
    } else {
      setLoading(false)
    }
  }, [backendUrl, token])

  // Function to get image for an order item, with fallback to product data
  const getItemImage = (item) => {
    // If item has image, use it
    if (item.image) {
      return item.image.startsWith('http') ? item.image : `${backendUrl}/uploads/${item.image}`
    }
    
    // Fallback: try to find the product in the products list and get its image
    if (products && products.length > 0) {
      const product = products.find(p => p.title === item.productName)
      if (product) {
        const image = product.image || product.image_link
        if (image) {
          return image.startsWith('http') ? image : `${backendUrl}/uploads/${image}`
        }
      }
    }
    
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-12">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order History</h1>
          <p className="text-gray-600">{orders.length} {orders.length === 1 ? 'order' : 'orders'} found</p>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              
              {/* Order Header */}
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Order #{order._id.slice(-8)}</h3>
                    <p className="text-sm text-gray-500 mt-1">{new Date(order.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                      {order.status}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{order.paymentMethod}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="px-6 py-4">
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      {/* Product Image */}
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {getItemImage(item) ? (
                          <img 
                            src={getItemImage(item)}
                            alt={item.productName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none'
                              e.target.nextSibling.style.display = 'flex'
                            }}
                          />
                        ) : null}
                        <div className="w-full h-full flex items-center justify-center text-gray-400" style={{display: getItemImage(item) ? 'none' : 'flex'}}>
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base font-medium text-gray-900 mb-1 line-clamp-2">
                          {item.productName}
                        </h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="font-semibold text-gray-900">${item.price.toFixed(2)}</span>
                          <span>Quantity: {item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-xl font-bold text-gray-900">${order.amount.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {orders.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-6 max-w-sm mx-auto">You haven't placed any orders yet. Start shopping to see your order history here.</p>
            <button 
              onClick={() => window.location.href = '/products'}
              className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Browse Products
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Order
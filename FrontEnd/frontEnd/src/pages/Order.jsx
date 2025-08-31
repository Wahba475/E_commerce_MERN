import React from 'react'

function Order() {
  // Sample orders data - in real app this would come from backend
  const orders = [
    {
      id: 1,
      productName: "Apple iPhone 15 128GB White Titanium",
      price: 524.90,
      quantity: 1,
      size: "128GB",
      date: "25, Dec, 2025",
      status: "Ready to ship",
      image: "https://i.ebayimg.com/images/g/zD4AAeSwQgtorrJV/s-l500.jpg"
    },
    {
      id: 2,
      productName: "APPLE IPHONE 15 128GB FACTORY UNLOCKED",
      price: 659.95,
      quantity: 1,
      size: "256GB",
      date: "25, Dec, 2025", 
      status: "Ready to ship",
      image: "https://i.ebayimg.com/images/g/4rQAAeSwiKlookzV/s-l500.jpg"
    },
    {
      id: 3,
      productName: "MacBook Pro 14-inch M3 Chip",
      price: 1299.00,
      quantity: 1,
      size: "14-inch",
      date: "24, Dec, 2025",
      status: "Processing",
      image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697311054290"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 flex items-center">
            MY ORDERS
            <div className="flex-1 h-px bg-gray-300 ml-4"></div>
          </h1>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                
                {/* Left side - Product Info */}
                <div className="flex items-center space-x-4 flex-1">
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={order.image} 
                      alt={order.productName}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-1">
                      {order.productName}
                    </h3>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <span className="font-semibold text-gray-900">
                        ${order.price.toFixed(2)}
                      </span>
                      <span>
                        Quantity: {order.quantity}
                      </span>
                      <span>
                        Size: {order.size}
                      </span>
                    </div>
                    
                    <div className="mt-2 text-sm text-gray-500">
                      Date: {order.date}
                    </div>
                  </div>
                </div>

                {/* Right side - Status & Actions */}
                <div className="flex items-center space-x-6">
                  {/* Status */}
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${
                      order.status === "Ready to ship" 
                        ? "bg-green-500" 
                        : order.status === "Processing"
                        ? "bg-yellow-500"
                        : "bg-gray-400"
                    }`}></div>
                    <span className="text-sm font-medium text-gray-700">
                      {order.status}
                    </span>
                  </div>
                  
                  {/* Track Order Button */}
                  <button className="text-gray-600 hover:text-gray-800 font-medium text-sm border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (if no orders) */}
        {orders.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
            <button 
              onClick={() => window.location.href = '/products'}
              className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Order

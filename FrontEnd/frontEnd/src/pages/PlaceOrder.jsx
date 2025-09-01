import React, { useContext, useState } from "react"
import { CartContext } from "../context/CartContext.js"
import { useNavigate } from "react-router-dom"

function PlaceOrder() {
  const { cartData, getTotalQuantity } = useContext(CartContext)
  const navigate = useNavigate()
  const [selectedPayment, setSelectedPayment] = useState("mastercard")
  
  // Debug logging
  console.log('PlaceOrder - cartData:', cartData)
  console.log('PlaceOrder - cartData length:', cartData?.length)
  
  // Temporary test - remove this once working
  if (!cartData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Loading cart data...</h2>
          <p className="text-gray-600">If this doesn't change, there's a context issue.</p>
        </div>
      </div>
    )
  }

  // Calculate total price
  const calculateTotal = () => {
    if (!cartData || cartData.length === 0) return "0.00";
    return cartData.reduce((total, item) => {
      // Handle both string and numeric prices
      let price = 0;
      if (typeof item.price === 'string') {
        price = parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0;
      } else if (typeof item.price === 'number') {
        price = item.price;
      }
      return total + (price * item.quantity)
    }, 0).toFixed(2)
  }


  const subtotal = calculateTotal()
  const shippingFee = 10.00 // Shipping fee
  const finalTotal = (parseFloat(subtotal) + shippingFee).toFixed(2)

  if (cartData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your cart is empty</h2>
          <button 
            onClick={() => navigate('/products')}
            className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Side - Form */}
          <div className="space-y-8">
            
            {/* Delivery Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                DELIVERY INFORMATION
                <div className="flex-1 h-px bg-gray-300 ml-4"></div>
              </h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="First name" 
                    className="w-full bg-white border border-gray-300 px-4 py-3 focus:outline-none focus:border-gray-500 transition-colors"
                  />
                  <input 
                    type="text" 
                    placeholder="Last name" 
                    className="w-full bg-white border border-gray-300 px-4 py-3 focus:outline-none focus:border-gray-500 transition-colors"
                  />
                </div>
                
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="w-full bg-white border border-gray-300 px-4 py-3 focus:outline-none focus:border-gray-500 transition-colors"
                />
                
                <input 
                  type="text" 
                  placeholder="Street" 
                  className="w-full bg-white border border-gray-300 px-4 py-3 focus:outline-none focus:border-gray-500 transition-colors"
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="City" 
                    className="bg-white border border-gray-300 px-4 py-3 focus:outline-none focus:border-gray-500 transition-colors"
                  />
                  <input 
                    type="text" 
                    placeholder="State" 
                    className="bg-white border border-gray-300 px-4 py-3 focus:outline-none focus:border-gray-500 transition-colors"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Zipcode" 
                    className="bg-white border border-gray-300 px-4 py-3 focus:outline-none focus:border-gray-500 transition-colors"
                  />
                  <input 
                    type="text" 
                    placeholder="Country" 
                    className="bg-white border border-gray-300 px-4 py-3 focus:outline-none focus:border-gray-500 transition-colors"
                  />
                </div>
                
                <input 
                  type="tel" 
                  placeholder="Phone" 
                  className="w-full bg-white border border-gray-300 px-4 py-3 focus:outline-none focus:border-gray-500 transition-colors"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                PAYMENT METHOD
                <div className="flex-1 h-px bg-gray-300 ml-4"></div>
              </h2>
              
              <div className="flex gap-6">
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="mastercard"
                    checked={selectedPayment === "mastercard"}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="mr-3"
                  />
                  <div className="flex items-center">
                    <img 
                      src="/mastercard.png" 
                      alt="Mastercard" 
                      className="h-8 w-auto"
                    />
                  </div>
                </label>
                
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="visa"
                    checked={selectedPayment === "visa"}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="mr-3"
                  />
                  <div className="flex items-center">
                    <img 
                      src="/Visa.png" 
                      alt="Visa" 
                      className="h-8 w-auto"
                    />
                  </div>
                </label>
                
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="cod"
                    checked={selectedPayment === "cod"}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="mr-3"
                  />
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-gray-700 font-medium">CASH ON DELIVERY</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Side - Cart Totals */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              CART TOTALS
              <div className="flex-1 h-px bg-gray-300 ml-4"></div>
            </h2>
            
            <div className="bg-white p-6 space-y-4">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>$ {subtotal}</span>
              </div>
              
              <div className="flex justify-between text-gray-700">
                <span>Shipping Fee</span>
                <span>$ {shippingFee.toFixed(2)}</span>
              </div>
              
              <hr className="border-gray-200" />
              
              <div className="flex justify-between text-lg font-semibold text-gray-900">
                <span>Total</span>
                <span>$ {finalTotal}</span>
              </div>
              
              <button onClick={() => navigate('/Order')} className="w-full bg-black text-white py-4 mt-6 hover:bg-gray-800 transition-colors font-medium tracking-wide">
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder

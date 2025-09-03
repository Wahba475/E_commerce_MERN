import React, { useContext, useState } from "react"
import { CartContext } from "../context/CartContext.js"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { ProductsContext } from "../context/ProductsContext"
import axios from 'axios'

function PlaceOrder() {
  const { cartData, clearCart } = useContext(CartContext)
  const { backendUrl, token } = useContext(ProductsContext)
  const navigate = useNavigate()
  
  const [fromdata, setFromdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  })
  const [formErrors, setFormErrors] = useState({})
  const [selectedPayment, setSelectedPayment] = useState("cod")
  
  const handleonSubmit = async (e) => {
    e.preventDefault()
    
    const errors = {}
    
    if (!fromdata.firstName.trim()) errors.firstName = "First name is required"
    if (!fromdata.lastName.trim()) errors.lastName = "Last name is required"
    if (!fromdata.email.trim()) errors.email = "Email is required"
    if (!fromdata.street.trim()) errors.street = "Street address is required"
    if (!fromdata.city.trim()) errors.city = "City is required"
    if (!fromdata.state.trim()) errors.state = "State is required"
    if (!fromdata.zipcode.trim()) errors.zipcode = "Zipcode is required"
    if (!fromdata.country.trim()) errors.country = "Country is required"
    if (!fromdata.phone.trim()) errors.phone = "Phone number is required"
    if (!selectedPayment) errors.payment = "Please select a payment method"
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      toast.error("Please fill out all required fields", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      return
    }
    
    setFormErrors({})
    
    try {
      // Prepare order items from cart
      const orderItems = cartData.products.map(item => ({
        productId: item.product._id,
        productName: item.product.title,
        quantity: item.quantity,
        price: item.product.price,
        image: item.product.image || item.product.image_link
      }))
      
      // Calculate totals
      const subtotal = parseFloat(calculateTotal())
      const shippingFee = 10.00
      const total = subtotal + shippingFee
      
      // Prepare order data to match backend expectations
      // Note: userId will be extracted from JWT token on backend
      const orderData = {
        items: orderItems,
        amount: total,
        address: {
          firstName: fromdata.firstName,
          lastName: fromdata.lastName,
          email: fromdata.email,
          phone: fromdata.phone,
          street: fromdata.street,
          city: fromdata.city,
          state: fromdata.state,
          zipcode: fromdata.zipcode,
          country: fromdata.country
        }
      }
      

      
      // Process order based on payment method
      switch(selectedPayment) {
        case "stripe":
          try {
            const response = await axios.post(`${backendUrl}/order/stripe`, orderData, {
              headers: { Authorization: `Bearer ${token}` }
            })
            
            if (response.data && response.data.session && response.data.session.url) {
              // Redirect to Stripe checkout
              window.location.href = response.data.session.url;
            } else {
              toast.error("Failed to initialize payment. Please try again.", {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              })
            }
          } catch (error) {
            console.error("Error placing order:", error)
            toast.error("Failed to place order. Please try again.", {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            })
          }
         
          break
          

          
        case "cod":
          // Handle Cash on Delivery
          try {
            const response = await axios.post(`${backendUrl}/order/place-order`, orderData, {
              headers: { Authorization: `Bearer ${token}` }
            })
            
            if(response) {
              toast.success("Order placed successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              })
              
              // Clear the cart after successful order placement
              try {
                await clearCart();
                console.log("Cart cleared after successful COD order");
              } catch (cartError) {
                console.error("Error clearing cart:", cartError);
                // Don't show error to user as order was successful
              }
              
              navigate("/Order")
            }
          } catch (error) {
            console.error("Error placing order:", error)
            toast.error("Failed to place order. Please try again.", {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            })
          }
          break
          
        default:
          toast.error("Please select a payment method", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
      }
      
    } catch (error) {
      console.error("Error placing order:", error)
      toast.error("Failed to place order. Please try again.", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
  }
  
  const onchangeHandler = (e) => {
    setFromdata({ ...fromdata, [e.target.name]: e.target.value })
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: "" })
    }
  }
  
  if (!cartData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Loading cart data...</h2>
          <p className="text-gray-600">Please wait while we load your cart.</p>
        </div>
      </div>
    )
  }

  const calculateTotal = () => {
    if (!cartData || !cartData.products || cartData.products.length === 0) return "0.00";
    return cartData.products.reduce((total, item) => {
      let price = 0;
      if (item.product && item.product.price) {
        if (typeof item.product.price === 'string') {
          price = parseFloat(item.product.price.replace(/[^0-9.]/g, "")) || 0;
        } else if (typeof item.product.price === 'number') {
          price = item.product.price;
        }
      }
      return total + (price * item.quantity)
    }, 0).toFixed(2)
  }


  const subtotal = calculateTotal()
  const shippingFee = 10.00
  const finalTotal = (parseFloat(subtotal) + shippingFee).toFixed(2)



  return (
    <form onSubmit={handleonSubmit} className="min-h-screen bg-gray-100 py-12">
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
                    <div>
                      <input  onChange={onchangeHandler} name="firstName" value={fromdata.firstName}
                    type="text" 
                    placeholder="First name" 
                        className={`w-full bg-white border px-4 py-3 focus:outline-none transition-colors ${
                          formErrors.firstName ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-gray-500'
                        }`}
                  />
                      {formErrors.firstName && <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>}
                    </div>
                    <div>
                      <input  onChange={onchangeHandler} name="lastName" value={fromdata.lastName}
                    type="text" 
                    placeholder="Last name" 
                        className={`w-full bg-white border px-4 py-3 focus:outline-none transition-colors ${
                          formErrors.lastName ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-gray-500'
                        }`}
                  />
                      {formErrors.lastName && <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>}
                    </div>
                </div>
                
                <div>
                <input 
                    onChange={onchangeHandler} name="email" value={fromdata.email}
                  type="email" 
                  placeholder="Email address" 
                    className={`w-full bg-white border px-4 py-3 focus:outline-none transition-colors ${
                      formErrors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-gray-500'
                    }`}
                />
                  {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                </div>
                
                <div>
                <input 
                    onChange={onchangeHandler} name="street" value={fromdata.street}
                  type="text" 
                  placeholder="Street" 
                    className={`w-full bg-white border px-4 py-3 focus:outline-none transition-colors ${
                      formErrors.street ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-gray-500'
                    }`}
                />
                  {formErrors.street && <p className="text-red-500 text-sm mt-1">{formErrors.street}</p>}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                  <input 
                      onChange={onchangeHandler} name="city" value={fromdata.city}
                    type="text" 
                    placeholder="City" 
                      className={`w-full bg-white border px-4 py-3 focus:outline-none transition-colors ${
                        formErrors.city ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-gray-500'
                      }`}
                  />
                    {formErrors.city && <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>}
                  </div>
                  <div>
                  <input 
                      onChange={onchangeHandler} name="state" value={fromdata.state}
                    type="text" 
                    placeholder="State" 
                      className={`w-full bg-white border px-4 py-3 focus:outline-none transition-colors ${
                        formErrors.state ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-gray-500'
                      }`}
                  />
                    {formErrors.state && <p className="text-red-500 text-sm mt-1">{formErrors.state}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                  <input 
                      onChange={onchangeHandler} name="zipcode" value={fromdata.zipcode}
                    type="text" 
                    placeholder="Zipcode" 
                      className={`w-full bg-white border px-4 py-3 focus:outline-none transition-colors ${
                        formErrors.zipcode ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-gray-500'
                      }`}
                  />
                    {formErrors.zipcode && <p className="text-red-500 text-sm mt-1">{formErrors.zipcode}</p>}
                  </div>
                  <div>
                  <input 
                      onChange={onchangeHandler} name="country" value={fromdata.country}
                    type="text" 
                    placeholder="Country" 
                      className={`w-full bg-white border px-4 py-3 focus:outline-none transition-colors ${
                        formErrors.country ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-gray-500'
                      }`}
                  />
                    {formErrors.country && <p className="text-red-500 text-sm mt-1">{formErrors.country}</p>}
                  </div>
                </div>
                
                <div>
                <input 
                    onChange={onchangeHandler} name="phone" value={fromdata.phone}
                  type="tel" 
                  placeholder="Phone" 
                    className={`w-full bg-white border px-4 py-3 focus:outline-none transition-colors ${
                      formErrors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-gray-500'
                    }`}
                />
                  {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                PAYMENT METHOD
                <div className="flex-1 h-px bg-gray-300 ml-4"></div>
              </h2>
              
              {formErrors.payment && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{formErrors.payment}</p>
                </div>
              )}
              
              <div className="grid grid-cols-1 gap-4">
                {/* Stripe */}
                <label className="relative cursor-pointer">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="stripe"
                    checked={selectedPayment === "stripe"}
                    onChange={(e) => {
                      setSelectedPayment(e.target.value);
                      if (formErrors.payment) {
                        setFormErrors({ ...formErrors, payment: "" });
                      }
                    }}
                    className="sr-only"
                  />
                  <div className={`p-4 border-2 rounded-lg transition-all duration-200 ${
                    selectedPayment === "stripe" 
                      ? "border-blue-500 bg-blue-50" 
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.274 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.407-2.354 1.407-1.852 0-4.963-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/>
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Stripe</h3>
                          <p className="text-sm text-gray-500">Credit & Debit Cards</p>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 ${
                        selectedPayment === "stripe" 
                          ? "border-blue-500 bg-blue-500" 
                          : "border-gray-300"
                      }`}>
                        {selectedPayment === "stripe" && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </label>
                

                
                {/* Cash on Delivery */}
                <label className="relative cursor-pointer">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="cod"
                    checked={selectedPayment === "cod"}

                    onChange={(e) => {
                      setSelectedPayment(e.target.value);
                      if (formErrors.payment) {
                        setFormErrors({ ...formErrors, payment: "" });
                      }
                    }}
                    className="sr-only"
                  />
                  <div className={`p-4 border-2 rounded-lg transition-all duration-200 ${
                    selectedPayment === "cod" 
                      ? "border-green-500 bg-green-50" 
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Cash on Delivery</h3>
                          <p className="text-sm text-gray-500">Pay when you receive</p>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 ${
                        selectedPayment === "cod" 
                          ? "border-green-500 bg-green-500" 
                          : "border-gray-300"
                      }`}>
                        {selectedPayment === "cod" && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                    </div>
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
              
              <button type="submit"  className="w-full bg-black text-white py-4 mt-6 hover:bg-gray-800 transition-colors font-medium tracking-wide">
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder

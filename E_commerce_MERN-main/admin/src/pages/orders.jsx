import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { backendUrl } from '../config';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Orders({ token }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to get image for an order item (same logic as frontend Order.jsx)
  const getItemImage = (item) => {
    // If item has image, use it
    if (item.image && item.image !== 'null' && item.image !== 'undefined') {
      return item.image.startsWith('http') ? item.image : `${backendUrl}/uploads/${item.image}`;
    }
    return null;
  };

  const fetchOrders = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      console.log("Fetching orders with token:", token);
      console.log("Backend URL:", backendUrl);
      
      const response = await axios.get(`${backendUrl}/order/list-admin`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log("Full response:", response);
      console.log("Response data:", response.data);
      console.log("Orders data:", response.data.orders);
      console.log("Orders count:", response.data.orders?.length || 0);

      setOrders(response.data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      setError(error.response?.data?.message || "Failed to fetch orders");
      setOrders([]);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    console.log("Orders component mounted, token:", token);
    fetchOrders();
  }, [fetchOrders, token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Connection Error</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={fetchOrders}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Management</h1>
          <p className="text-gray-600">{orders.length} {orders.length === 1 ? 'order' : 'orders'} found</p>
        </div>

        {/* Debug Button */}
        <div className="mb-6">
          <button 
            onClick={() => {
              console.log("=== FULL ORDERS DATA ===");
              console.log("Orders array:", orders);
              console.log("Orders length:", orders.length);
              orders.forEach((order, index) => {
                console.log(`\n=== ORDER ${index + 1} ===`);
                console.log("Full order object:", order);
                console.log("Order ID:", order._id || order.id);
                console.log("User info:", order.user);
                console.log("Customer from address:", order.address?.firstName, order.address?.lastName);
                console.log("Email from address:", order.address?.email);
                console.log("Phone from address:", order.address?.phone);
                console.log("Items:", order.items);
                console.log("Address:", order.address);
                console.log("Amount:", order.amount);
                console.log("Status:", order.status);
                console.log("Payment method:", order.paymentMethod);
                console.log("Payment status:", order.payment);
                console.log("Date:", order.date);
                
                if (order.items && Array.isArray(order.items)) {
                  order.items.forEach((item, itemIndex) => {
                    console.log(`\n--- Item ${itemIndex + 1} ---`);
                    console.log("Item object:", item);
                    console.log("Product name:", item.productName || item.title || item.name);
                    console.log("Price:", item.price);
                    console.log("Quantity:", item.quantity);
                    console.log("Image:", item.image);
                    console.log("Image URL:", getItemImage(item));
                  });
                }
              });
            }}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Debug Data
          </button>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              
              {/* Order Header */}
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Order #{order._id?.slice(-8) || order.id?.slice(-8)}</h3>
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
                  {order.items && Array.isArray(order.items) ? (
                    order.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        {/* Product Image */}
                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          {getItemImage(item) ? (
                            <img 
                              src={getItemImage(item)}
                              alt={item.productName || item.title || 'Product'}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
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
                            {item.productName || item.title || item.name || 'Product'}
                          </h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="font-semibold text-gray-900">${(item.price || 0).toFixed(2)}</span>
                            <span>Quantity: {item.quantity || 1}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500">No items found</div>
                  )}
                </div>
              </div>

              {/* Order Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    <p><strong>Customer:</strong> {order.address?.firstName && order.address?.lastName ? 
                      `${order.address.firstName} ${order.address.lastName}` : 
                      order.user?.name || order.customer || 'Unknown'}</p>
                    <p><strong>Email:</strong> {order.address?.email || order.user?.email || order.email || 'No email'}</p>
                    <p><strong>Phone:</strong> {order.address?.phone || order.user?.phone || order.phone || 'No phone'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-xl font-bold text-gray-900">${(order.amount || order.totalAmount || order.total || 0).toFixed(2)}</p>
                  </div>
                </div>
                
                {/* Address */}
                {order.address && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600"><strong>Address:</strong></p>
                    <div className="text-sm text-gray-800">
                      {order.address.street && <p>{order.address.street}</p>}
                      {order.address.city && order.address.state && <p>{order.address.city}, {order.address.state}</p>}
                      {order.address.zipCode && <p>{order.address.zipCode}</p>}
                      {order.address.country && <p>{order.address.country}</p>}
                    </div>
                  </div>
                )}
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
            <p className="text-gray-600 mb-6 max-w-sm mx-auto">No orders have been placed yet. Orders will appear here once customers start making purchases.</p>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Orders;

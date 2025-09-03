import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const { clearCart } = useContext(CartContext);

  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    const verifyPayment = async () => {
      if (!orderId) {
        setVerificationStatus('error');
        setLoading(false);
        toast.error("No order ID found in the URL");
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        setVerificationStatus('error');
        setLoading(false);
        toast.error("Please log in to verify your payment");
        return;
      }

      try {
        if (success === 'true') {
          // Payment was successful
          const response = await axios.patch(
            `${backendUrl}/order/update-payment/${orderId}`,
            { payment: true },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );

          if (response.status === 200) {
            setVerificationStatus('success');
            toast.success("Payment successful! Your order has been confirmed.");
            
            // Clear the cart after successful payment
            try {
              await clearCart();
              console.log("Cart cleared after successful payment");
            } catch (cartError) {
              console.error("Error clearing cart:", cartError);
              // Don't show error to user as payment was successful
            }
          } else {
            setVerificationStatus('error');
            toast.error("Payment verification failed. Please contact support.");
          }
        } else {
          // Payment was cancelled or failed
          setVerificationStatus('cancelled');
          toast.warning("Payment was cancelled. You can try again.");
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setVerificationStatus('error');
        toast.error("Payment verification failed. Please contact support.");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [success, orderId, clearCart]);

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const handleViewOrders = () => {
    navigate('/Order');
  };

  const handleRetryPayment = () => {
    navigate('/place-order');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Verifying Payment...</h2>
          <p className="text-gray-600">Please wait while we verify your payment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        {verificationStatus === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">
              Your order has been confirmed and payment has been processed successfully.
            </p>
            <div className="space-y-3">
              <button
                onClick={handleViewOrders}
                className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                View My Orders
              </button>
              <button
                onClick={handleContinueShopping}
                className="w-full bg-gray-100 text-gray-900 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}

        {verificationStatus === 'cancelled' && (
          <>
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Cancelled</h2>
            <p className="text-gray-600 mb-6">
              Your payment was cancelled. No charges have been made to your account.
            </p>
            <div className="space-y-3">
              <button
                onClick={handleRetryPayment}
                className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Try Again
              </button>
              <button
                onClick={handleContinueShopping}
                className="w-full bg-gray-100 text-gray-900 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}

        {verificationStatus === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h2>
            <p className="text-gray-600 mb-6">
              There was an error processing your payment. Please contact support if the problem persists.
            </p>
            <div className="space-y-3">
              <button
                onClick={handleRetryPayment}
                className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Try Again
              </button>
              <button
                onClick={handleContinueShopping}
                className="w-full bg-gray-100 text-gray-900 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Verify;
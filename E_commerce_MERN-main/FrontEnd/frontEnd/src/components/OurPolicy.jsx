import React from 'react'
import { FaTruck, FaUndo, FaShieldAlt } from 'react-icons/fa'

function OurPolicy() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Our Policies
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          
          <div className="flex flex-col items-center text-center bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
            <FaTruck className="text-blue-600 w-12 h-12 mb-5" />
            <h3 className="text-xl font-semibold mb-2">Fast & Free Shipping</h3>
            <p className="text-gray-500">
              Get your orders delivered quickly with our reliable shipping service, at no extra cost.
            </p>
          </div>


          <div className="flex flex-col items-center text-center bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
            <FaUndo className="text-green-600 w-12 h-12 mb-5" />
            <h3 className="text-xl font-semibold mb-2">30-Day Returns</h3>
            <p className="text-gray-500">
              Not satisfied? Return any product within 30 days for a full refund, no questions asked.
            </p>
          </div>

          <div className="flex flex-col items-center text-center bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
            <FaShieldAlt className="text-yellow-500 w-12 h-12 mb-5" />
            <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
            <p className="text-gray-500">
              Your payment information is safe with our advanced encryption and secure payment gateways.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurPolicy

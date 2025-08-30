import React, { useState } from 'react'
import { HiOutlineMail } from 'react-icons/hi'

function NewLetterBox() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Subscribe & Get 10% Off
        </h2>
        <p className="text-gray-500 mb-8">
          Join our newsletter and receive a 10% discount code for your first order!
        </p>

        <form 
          onSubmit={handleSubmit} 
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <div className="relative w-full sm:w-auto flex-1">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full sm:w-80 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <HiOutlineMail className="absolute right-3 top-3 text-gray-400 w-6 h-6" />
          </div>
          <button 
            type="submit" 
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Subscribe
          </button>
        </form>

        {submitted && (
          <p className="text-green-600 mt-4 font-medium">
            Thank you! Your 10% discount code has been sent to your email.
          </p>
        )}
      </div>
    </section>
  )
}

export default NewLetterBox

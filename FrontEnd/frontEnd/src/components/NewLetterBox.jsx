import React, { useState } from 'react'

function NewLetterBox() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setTimeout(() => setIsSubscribed(false), 3000)
      setEmail('')
    }
  }

  return (
    <section className="relative py-20 bg-gray-50 overflow-hidden">
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
        </div>
        
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Stay in the <span className="text-gray-700">Loop</span>
        </h2>
        
        {/* Subheading */}
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Be the first to know about exclusive deals, new arrivals, and tech insights. 
          Join our premium community of tech enthusiasts.
        </p>

        {/* Benefits */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex items-center text-gray-600">
            <svg className="w-5 h-5 text-gray-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Exclusive Deals
          </div>
          <div className="flex items-center text-gray-600">
            <svg className="w-5 h-5 text-gray-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Early Access
          </div>
          <div className="flex items-center text-gray-600">
            <svg className="w-5 h-5 text-gray-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Tech Reviews
          </div>
        </div>
        
        {/* Newsletter Form */}
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-6 py-4 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubscribed}
              className="px-8 py-4 bg-gray-700 rounded-lg text-white font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubscribed ? (
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Subscribed!
                </span>
              ) : (
                'Subscribe'
              )}
            </button>
          </div>
        </form>
        
        {/* Privacy Note */}
        <p className="text-sm text-gray-500 mt-6">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  )
}

export default NewLetterBox

import React from 'react'
import { useNavigate } from 'react-router-dom'
function About() {
  const navigate = useNavigate()
  const stats = [
    { number: '10M+', label: 'Happy Customers' },
    { number: '50K+', label: 'Products Sold' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' }
  ]

  const values = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Quality First',
      description: 'We never compromise on quality. Every product is carefully selected and tested to meet our high standards.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Fast Delivery',
      description: 'Lightning-fast shipping worldwide. Most orders are processed and shipped within 24 hours.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: 'Customer Love',
      description: 'Your satisfaction is our priority. We provide exceptional customer service and support at every step.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Secure Shopping',
      description: 'Shop with confidence. Your data is protected with industry-leading security measures.'
    }
  ]

  const team = [
    {
      name: 'Wahba',
      role: 'Fullstack Developer',
      image: '/wahba.jpg',
      description: 'Passionate fullstack developer building exceptional web experiences with modern technologies'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-24 overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 opacity-20">
          <img 
            src="/AboutUs.jpg" 
            alt="About us background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-gray-900/60"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">About Our Story</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're more than just an e-commerce platform. We're a team of passionate individuals 
              dedicated to bringing you the best electronics and an exceptional shopping experience.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Journey</h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2018, our company started with a simple mission: to make premium 
                  electronics accessible to everyone. What began as a small startup has grown 
                  into a trusted platform serving millions of customers worldwide.
                </p>
                <p>
                  We believe that technology should enhance lives, not complicate them. That's 
                  why we carefully curate every product in our catalog, ensuring it meets our 
                  strict standards for quality, innovation, and value.
                </p>
                <p>
                  Today, we're proud to be at the forefront of e-commerce innovation, constantly 
                  evolving to better serve our customers and partners. Our journey is just beginning.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/AboutUs.jpg" 
                alt="About our company" 
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-black text-white p-6 rounded-xl shadow-xl">
                <div className="text-2xl font-bold">6+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do and shape how we serve our customers.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-black mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind our success story.
            </p>
          </div>
          <div className="flex justify-center">
            {team.map((member, index) => (
              <div key={index} className="text-center group max-w-md">
                <div className="relative mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-64 h-64 rounded-full mx-auto object-cover shadow-xl group-hover:shadow-2xl transition-shadow border-4 border-gray-200"
                  />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-xl text-black font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 text-lg leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-black to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Shopping?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover our curated collection of premium electronics and experience the difference.
          </p>
          <button onClick={() => navigate('/products')} className="bg-white text-black px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-100 transition-colors">
            Explore Products
          </button>
        </div>
      </section>
    </div>
  )
}

export default About

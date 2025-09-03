import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 pt-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-4">About Us</h3>
          <p className="text-gray-400">
            We are a leading electronics e-commerce store, providing the latest gadgets and tech products with fast delivery and top-notch customer service.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">Shop</a></li>
            <li><a href="#" className="hover:text-white transition">About</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
            <li><a href="#" className="hover:text-white transition">FAQ</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-xl font-bold mb-4">Customer Service</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-white transition">Support</a></li>
          </ul>
        </div>

        {/* Newsletter & Social */}
        <div>
          <h3 className="text-xl font-bold mb-4">Stay Connected</h3>
          <p className="text-gray-400 mb-4">Subscribe to our newsletter for latest deals and offers.</p>
          <form className="flex mb-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full px-4 py-2 rounded-l-lg focus:outline-none"
            />
            <button type="submit" className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700 transition text-white">
              Subscribe
            </button>
          </form>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-white transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-white transition"><FaTwitter /></a>
            <a href="#" className="hover:text-white transition"><FaInstagram /></a>
            <a href="#" className="hover:text-white transition"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 py-6 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Wahba. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer

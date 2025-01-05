import React from 'react';
import { Facebook, Twitter, Instagram, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">ModernShop</h3>
            <p className="text-gray-400 text-sm">Your one-stop destination for premium products and exceptional shopping experience.</p>
          </div>
          <div>
            <h4 className="text-white text-md font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white text-sm">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white text-sm">Contact</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white text-sm">FAQ</Link></li>
              <li><Link to="/shipping" className="text-gray-400 hover:text-white text-sm">Shipping Info</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-md font-medium mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link to="/returns" className="text-gray-400 hover:text-white text-sm">Returns</Link></li>
              <li><Link to="/track-order" className="text-gray-400 hover:text-white text-sm">Track Order</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white text-sm">Terms & Conditions</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-md font-medium mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Github className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-4">
              <h5 className="text-white text-sm font-medium mb-2">Newsletter</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-3 py-2 bg-gray-800 text-white rounded-l-md focus:outline-none focus:ring-1 focus:ring-indigo-500 flex-1"
                />
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm text-center">&copy; {new Date().getFullYear()} ModernShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
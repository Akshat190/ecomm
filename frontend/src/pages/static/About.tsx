import React from 'react';
import StaticPageLayout from '../../components/StaticPageLayout';

function About() {
  return (
    <StaticPageLayout 
      title="About Us" 
      subtitle="Your trusted destination for premium products and exceptional shopping experiences"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <svg className="w-6 h-6 text-indigo-600" viewBox="0 0 24 24">
                <path 
                  fill="currentColor" 
                  d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2Z"
                />
              </svg>
            </div>
            <h2 className="ml-4 text-2xl font-bold text-gray-900">Our Story</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Founded with a vision to revolutionize online shopping...
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <svg className="w-6 h-6 text-indigo-600" viewBox="0 0 24 24">
                <path 
                  fill="currentColor"
                  d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M11,17H13V11H11V17Z"
                />
              </svg>
            </div>
            <h2 className="ml-4 text-2xl font-bold text-gray-900">Our Mission</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to make quality products accessible...
          </p>
        </div>
      </div>
    </StaticPageLayout>
  );
}

export default About;

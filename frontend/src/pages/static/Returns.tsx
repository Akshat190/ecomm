import React from 'react';
import StaticPageLayout from '../../components/StaticPageLayout';

function Returns() {
  return (
    <StaticPageLayout 
      title="Returns Policy" 
      subtitle="Simple, hassle-free returns within 30 days"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="p-2 bg-green-100 rounded-lg mr-3">
              <svg 
                className="w-6 h-6 text-green-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                />
              </svg>
            </span>
            Return Process
          </h2>
          <ol className="space-y-4">
            <li>Initiate your return through your account or contact customer service</li>
            <li>Print the provided return shipping label</li>
            <li>Package your item securely in its original packaging</li>
            <li>Drop off the package at any authorized shipping location</li>
          </ol>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Refund Information</h2>
            <p className="text-gray-600">
              Refunds will be processed within 5-7 business days after we receive your return.
              The refund will be issued to your original payment method.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Non-Returnable Items</h2>
            <ul className="space-y-2 text-gray-600">
              <li>Personal care items</li>
              <li>Opened software or digital products</li>
              <li>Gift cards</li>
              <li>Customized or personalized items</li>
            </ul>
          </div>
        </div>
      </div>
    </StaticPageLayout>
  );
}

export default Returns; 
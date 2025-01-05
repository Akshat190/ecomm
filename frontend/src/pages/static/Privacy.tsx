import React from 'react';

function Privacy() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Information We Collect
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We collect information that you provide directly to us, including when you create an account,
                  make a purchase, sign up for our newsletter, or contact us for support.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  How We Use Your Information
                </h2>
                <ul className="text-gray-600 leading-relaxed list-disc pl-6">
                  <li>To process your orders and payments</li>
                  <li>To communicate with you about your orders</li>
                  <li>To send you marketing communications (with your consent)</li>
                  <li>To improve our services and website</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Information Sharing
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We do not sell or rent your personal information to third parties.
                  We may share your information with service providers who assist us in operating our website
                  and conducting our business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
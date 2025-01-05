import React from 'react';

function Terms() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Terms & Conditions</h1>
          <p className="mt-4 text-lg text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-12">
          {[
            {
              title: "1. Acceptance of Terms",
              content: "By accessing and using ModernShop, you accept and agree to be bound by the terms and conditions outlined here. If you do not agree to these terms, please do not use our services."
            },
            {
              title: "2. User Accounts",
              content: "When you create an account with us, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account and password."
            },
            {
              title: "3. Ordering & Payment",
              content: "All orders are subject to product availability. We accept various payment methods as displayed during checkout. Prices are subject to change without notice. We reserve the right to refuse any order."
            },
            {
              title: "4. Shipping & Delivery",
              content: "Delivery times are estimates only. We are not responsible for delays beyond our control. Risk of loss and title for items purchased pass to you upon delivery."
            },
            {
              title: "5. Returns & Refunds",
              content: "Our return policy allows returns within 30 days of delivery. Items must be unused and in original packaging. Please refer to our Returns Policy for detailed information."
            },
            {
              title: "6. Intellectual Property",
              content: "All content on ModernShop, including text, graphics, logos, and images, is our property and protected by copyright laws."
            },
            {
              title: "7. Limitation of Liability",
              content: "ModernShop shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services."
            },
            {
              title: "8. Changes to Terms",
              content: "We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on the website."
            },
          ].map((section, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
              <div className="prose prose-indigo max-w-none">
                {section.content}
              </div>
            </div>
          ))}

          <div className="bg-indigo-50 rounded-xl p-6 mt-8">
            <h2 className="text-2xl font-bold text-indigo-900 mb-4">9. Contact Information</h2>
            <div className="prose prose-indigo max-w-none">
              <p className="text-indigo-900">
                If you have any questions about these Terms & Conditions, please contact us at:
              </p>
              <div className="flex flex-col space-y-2 mt-4">
                <a href="mailto:support@modernshop.com" className="text-indigo-600 hover:text-indigo-800">
                  support@modernshop.com
                </a>
                <span className="text-indigo-900">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Terms; 
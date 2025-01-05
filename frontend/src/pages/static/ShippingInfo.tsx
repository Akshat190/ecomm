import React from 'react';

function ShippingInfo() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shipping Information</h1>
      <div className="prose prose-lg max-w-none">
        <h2>Delivery Times</h2>
        <ul>
          <li>Domestic Orders: 3-5 business days</li>
          <li>International Orders: 7-14 business days</li>
          <li>Express Shipping: 1-2 business days (where available)</li>
        </ul>

        <h2>Shipping Costs</h2>
        <ul>
          <li>Free shipping on orders over $50</li>
          <li>Standard domestic shipping: $5.99</li>
          <li>Express domestic shipping: $12.99</li>
          <li>International shipping: Calculated at checkout</li>
        </ul>

        <h2>Tracking Your Order</h2>
        <p>
          Once your order ships, you will receive a confirmation email with your tracking number.
          You can track your order using our Track Order page or directly through the carrier's website.
        </p>
      </div>
    </div>
  );
}

export default ShippingInfo; 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

function Checkout() {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const placeOrder = async () => {
    try {
      // First create the order
      const { data: order } = await axios.post(
        'http://localhost:5000/api/orders',
        {
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          totalPrice: total,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      // Then redirect to payment with the order ID
      if (paymentMethod === 'credit-card') {
        const { data: session } = await axios.post(
          'http://localhost:5000/api/payment/create-checkout-session',
          {
            orderId: order._id,
            items: cartItems.map(item => ({
              price_data: {
                currency: 'usd',
                product_data: {
                  name: item.name,
                  images: [item.image],
                },
                unit_amount: item.price * 100, // Convert to cents
              },
              quantity: item.quantity,
            })),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        // Redirect to Stripe Checkout
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);
        if (stripe) {
          await stripe.redirectToCheckout({
            sessionId: session.id,
          });
        }
      } else if (paymentMethod === 'paypal') {
        navigate(`/payment/paypal/${order._id}`);
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Please login to continue checkout</h2>
          <button
            onClick={() => navigate('/login')}
            className="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          <div className={`flex items-center ${step >= 1 ? 'text-indigo-600' : 'text-gray-400'}`}>
            <span className="rounded-full h-8 w-8 flex items-center justify-center border-2 border-current">1</span>
            <span className="ml-2">Shipping</span>
          </div>
          <div className={`w-16 h-1 mx-4 ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}`} />
          <div className={`flex items-center ${step >= 2 ? 'text-indigo-600' : 'text-gray-400'}`}>
            <span className="rounded-full h-8 w-8 flex items-center justify-center border-2 border-current">2</span>
            <span className="ml-2">Payment</span>
          </div>
          <div className={`w-16 h-1 mx-4 ${step >= 3 ? 'bg-indigo-600' : 'bg-gray-200'}`} />
          <div className={`flex items-center ${step >= 3 ? 'text-indigo-600' : 'text-gray-400'}`}>
            <span className="rounded-full h-8 w-8 flex items-center justify-center border-2 border-current">3</span>
            <span className="ml-2">Review</span>
          </div>
        </div>
      </div>

      {step === 1 && (
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
          <form onSubmit={handleShippingSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  id="address"
                  required
                  value={shippingAddress.address}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  id="city"
                  required
                  value={shippingAddress.city}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
                <input
                  type="text"
                  id="postalCode"
                  required
                  value={shippingAddress.postalCode}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                <input
                  type="text"
                  id="country"
                  required
                  value={shippingAddress.country}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Continue to Payment
            </button>
          </form>
        </div>
      )}

      {step === 2 && (
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
          <form onSubmit={handlePaymentSubmit}>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="credit-card"
                  name="payment"
                  value="credit-card"
                  checked={paymentMethod === 'credit-card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="credit-card" className="ml-3 block text-sm font-medium text-gray-700">
                  Credit Card
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="paypal"
                  name="payment"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
                  PayPal
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Continue to Review
            </button>
          </form>
        </div>
      )}

      {step === 3 && (
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Order Review</h2>
          <div className="border rounded-lg p-6 mb-6">
            <h3 className="font-semibold mb-4">Shipping Address</h3>
            <p>{shippingAddress.address}</p>
            <p>{shippingAddress.city}, {shippingAddress.postalCode}</p>
            <p>{shippingAddress.country}</p>
          </div>
          <div className="border rounded-lg p-6 mb-6">
            <h3 className="font-semibold mb-4">Payment Method</h3>
            <p>{paymentMethod === 'credit-card' ? 'Credit Card' : 'PayPal'}</p>
          </div>
          <div className="border rounded-lg p-6 mb-6">
            <h3 className="font-semibold mb-4">Order Items</h3>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between py-2">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded" />
                  <div className="ml-4">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-500">{item.quantity} x ${item.price}</p>
                  </div>
                </div>
                <p className="font-medium">${item.price * item.quantity}</p>
              </div>
            ))}
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            <div className="flex justify-between mb-2">
              <p>Subtotal</p>
              <p>${total}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Shipping</p>
              <p>Free</p>
            </div>
            <div className="flex justify-between font-bold">
              <p>Total</p>
              <p>${total}</p>
            </div>
          </div>
          <button
            onClick={placeOrder}
            className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}

export default Checkout;
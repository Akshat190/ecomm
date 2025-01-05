import {  useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { CreditCard } from 'lucide-react';

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);

function Payment() {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  const { cartItems } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleStripePayment = async () => {
    try {
      setLoading(true);
      setError('');

      const { data: session } = await axios.post(
        'http://localhost:5000/api/payment/create-checkout-session',
        {
          orderId,
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

      const stripe = await stripePromise;
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (error) {
          setError(error.message);
        }
      }
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePayPalPayment = () => {
    // Implement PayPal payment logic here
    navigate(`/payment/paypal/${orderId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6">Choose Payment Method</h2>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>{item.name} x {item.quantity}</span>
              <span>${item.price * item.quantity}</span>
            </div>
          ))}
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={handleStripePayment}
            disabled={loading}
            className="w-full flex items-center justify-center px-6 py-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <CreditCard className="h-5 w-5 mr-2" />
            {loading ? 'Processing...' : 'Pay with Credit Card'}
          </button>

          <button
            onClick={handlePayPalPayment}
            disabled={loading}
            className="w-full flex items-center justify-center px-6 py-4 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <Paypal className="h-5 w-5 mr-2" />
            Pay with PayPal
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payment; 
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const updateOrderStatus = async () => {
      if (sessionId) {
        try {
          await axios.post(
            'http://localhost:5000/api/payment/confirm',
            { sessionId },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );
          clearCart();
        } catch (error) {
          console.error('Error confirming payment:', error);
        }
      }
    };

    updateOrderStatus();
  }, [sessionId, clearCart]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md mx-auto text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="mt-4 text-3xl font-bold text-gray-900">Payment Successful!</h1>
        <p className="mt-2 text-gray-600">Thank you for your purchase.</p>
        <div className="mt-8 space-x-4">
          <button
            onClick={() => navigate('/orders')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            View Orders
          </button>
          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess; 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '@/services/razorpay';
import { Loader2 } from 'lucide-react';

interface PaymentProps {
  amount: number;
  currency?: string;
  name?: string;
  description?: string;
  onSuccess?: (paymentId: string) => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Payment: React.FC<PaymentProps> = ({
  amount,
  currency = 'INR',
  name = 'CollabX',
  description = 'Subscription Payment',
  onSuccess,
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Create order on the server
      const order = await createOrder({
        amount,
        currency,
        notes: {
          name,
          description,
        },
      });

      // Initialize Razorpay payment
      const options = {
        key: 'rzp_test_51Nb5tBSCQnNnUu', // Use the test key directly
        amount: order.amount,
        currency: order.currency,
        name: name,
        description: description,
        order_id: order.id,
        handler: function (response: any) {
          if (onSuccess) {
            onSuccess(response.razorpay_payment_id);
          } else {
            navigate('/payment-success', {
              state: {
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
              },
            });
          }
        },
        prefill: {
          name: 'Test User',
          email: 'test@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#6366f1',
        },
        modal: {
          ondismiss: function() {
            setIsLoading(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment failed:', error);
      setError(error instanceof Error ? error.message : 'Payment failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      {error && (
        <div className="text-red-500 text-sm bg-red-50 p-2 rounded-md">
          {error}
        </div>
      )}
      <button
        onClick={handlePayment}
        disabled={isLoading}
        className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Processing...
          </>
        ) : (
          'Pay Now'
        )}
      </button>
    </div>
  );
};

export default Payment; 
import React, { useState } from 'react';
import { CreditCard, Smartphone, Building2, Loader2, Lock } from 'lucide-react';
import { createOrder, verifyPayment } from '@/services/razorpay';
import { useNotification } from '@/context/NotificationContext';

type PaymentMethod = 'card' | 'upi' | 'netbanking';

interface PaymentOptionsProps {
  amount: number;
  currency?: string;
  name: string;
  description: string;
  onSuccess?: (paymentId: string) => void;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({
  amount,
  currency = 'INR',
  name,
  description,
  onSuccess,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showSuccess, showError } = useNotification();

  const handlePayment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const order = await createOrder({
        amount: amount * 100, // Convert to paise
        currency,
        receipt: `receipt_${Date.now()}`,
      });

      const options = {
        key: 'rzp_test_51Nb5tBSCQnNnUu',
        amount: order.amount,
        currency: order.currency,
        name: 'CollabX',
        description,
        order_id: order.id,
        prefill: {
          name,
          email: '',
          contact: '',
        },
        notes: {
          payment_method: selectedMethod,
        },
        theme: {
          color: '#6366f1',
        },
        handler: async (response: any) => {
          try {
            const verified = await verifyPayment({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verified && onSuccess) {
              showSuccess(`Payment successful! Transaction ID: ${response.razorpay_payment_id}`);
              onSuccess(response.razorpay_payment_id);
            }
          } catch (error) {
            console.error('Payment verification failed:', error);
            const errorMessage = 'Payment verification failed. Please contact support.';
            setError(errorMessage);
            showError(errorMessage);
          }
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false);
          },
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment initiation failed:', error);
      const errorMessage = 'Failed to initiate payment. Please try again.';
      setError(errorMessage);
      showError(errorMessage);
      setIsLoading(false);
    }
  };

  const paymentMethods = [
    {
      id: 'card' as PaymentMethod,
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Pay securely with your card',
    },
    {
      id: 'upi' as PaymentMethod,
      name: 'UPI',
      icon: Smartphone,
      description: 'Pay using any UPI app',
    },
    {
      id: 'netbanking' as PaymentMethod,
      name: 'Net Banking',
      icon: Building2,
      description: 'Pay using your bank account',
    },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-4">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          return (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                selectedMethod === method.id
                  ? 'border-primary bg-primary/10 shadow-md'
                  : 'border-gray-300 hover:border-primary/50 hover:bg-gray-50'
              }`}
            >
              <div className={`p-2 rounded-full mb-2 ${
                selectedMethod === method.id ? 'bg-primary/20' : 'bg-gray-100'
              }`}>
                <Icon className={`w-7 h-7 ${
                  selectedMethod === method.id ? 'text-primary' : 'text-gray-600'
                }`} />
              </div>
              <span className={`text-sm font-semibold ${
                selectedMethod === method.id ? 'text-primary' : 'text-gray-700'
              }`}>{method.name}</span>
              <span className="text-xs text-gray-500 mt-1">{method.description}</span>
            </button>
          );
        })}
      </div>

      {error && (
        <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-md border border-red-200">{error}</div>
      )}

      <button
        onClick={handlePayment}
        disabled={isLoading}
        className="w-full py-3 px-4 bg-primary text-white rounded-md font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5" />
            <span>Pay ₹{amount}</span>
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
        <Lock className="w-4 h-4 text-primary" />
        <span>Secured by Razorpay</span>
      </div>
    </div>
  );
};

export default PaymentOptions; 
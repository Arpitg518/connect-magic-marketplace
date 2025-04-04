import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, CreditCard, Calendar, Download } from 'lucide-react';
import { useNotification } from '@/context/NotificationContext';

const PaymentSuccess: React.FC = () => {
  const location = useLocation();
  const paymentId = location.state?.paymentId;
  const plan = location.state?.plan;
  const amount = location.state?.amount;
  const { showSuccess, showInfo } = useNotification();

  useEffect(() => {
    if (paymentId) {
      showSuccess('Payment completed successfully! Welcome to Connect Magic.');
    }
  }, [paymentId, showSuccess]);

  const getPlanName = (planId: string) => {
    switch (planId) {
      case 'basic':
        return 'Basic Plan';
      case 'pro':
        return 'Pro Plan';
      case 'enterprise':
        return 'Enterprise Plan';
      default:
        return 'Subscription';
    }
  };

  const handleDownloadReceipt = () => {
    showInfo('Receipt download will be available soon!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 p-4">
      <div className="max-w-md w-full bg-zinc-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="mb-6 flex justify-center">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-gray-300">
            Thank you for your payment. Your transaction has been completed successfully.
          </p>
        </div>
        
        <div className="bg-zinc-700/50 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Order Details</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Plan:</span>
              <span className="text-white font-medium">{plan ? getPlanName(plan) : 'Subscription'}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-300">Amount:</span>
              <span className="text-white font-medium">₹{amount || '0'}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-300">Payment ID:</span>
              <span className="text-white font-mono text-sm">{paymentId || 'N/A'}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-300">Date:</span>
              <span className="text-white">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="block w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-center"
          >
            Return to Home
          </Link>
          
          <Link
            to="/dashboard"
            className="block w-full px-4 py-2 bg-zinc-700 text-white rounded-md hover:bg-zinc-600 transition-colors text-center"
          >
            Go to Dashboard
          </Link>
          
          <button 
            onClick={handleDownloadReceipt}
            className="w-full px-4 py-2 border border-zinc-600 text-white rounded-md hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
          >
            <Download size={16} />
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess; 
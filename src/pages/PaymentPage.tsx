import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Shield, Lock, RefreshCw, CreditCard, ArrowLeft, CheckCircle } from 'lucide-react';
import PaymentOptions from '@/components/PaymentOptions';
import { useNotification } from '@/context/NotificationContext';

interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 999,
    features: [
      'Up to 5 active campaigns',
      'Basic analytics',
      'Email support',
      'Standard matching algorithm',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 1999,
    features: [
      'Up to 20 active campaigns',
      'Advanced analytics',
      'Priority email & chat support',
      'AI-powered matching',
      'Custom branding',
    ],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 4999,
    features: [
      'Unlimited active campaigns',
      'Custom analytics dashboard',
      'Dedicated account manager',
      'Advanced AI matching',
      'API access',
      'Custom integrations',
    ],
  },
];

const PaymentPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'plan-selection' | 'payment'>('plan-selection');
  const { showInfo, showSuccess } = useNotification();

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    setShowConfirmation(true);
    setPaymentStep('payment');
    showInfo(`You've selected the ${plan.name} plan. Proceed to payment to complete your subscription.`);
  };

  const handlePaymentSuccess = (paymentId: string) => {
    console.log('Payment successful:', paymentId);
    showSuccess(`Your subscription to the ${selectedPlan?.name} plan has been activated successfully!`);
    // You can add additional logic here, like updating user subscription status
  };

  const handleBackToPlans = () => {
    setShowConfirmation(false);
    setPaymentStep('plan-selection');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                paymentStep === 'plan-selection' ? 'bg-primary text-white' : 'bg-green-500 text-white'
              }`}>
                {paymentStep === 'plan-selection' ? '1' : <CheckCircle className="w-5 h-5" />}
              </div>
              <div className="text-sm font-medium ml-2">Select Plan</div>
            </div>
            <div className="w-16 h-0.5 bg-gray-200 mx-2"></div>
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                paymentStep === 'payment' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                2
              </div>
              <div className="text-sm font-medium ml-2">Payment</div>
            </div>
          </div>
        </div>

        {paymentStep === 'plan-selection' ? (
          <>
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Plan</h1>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Select the perfect plan for your business needs. All plans include a 14-day money-back guarantee.
              </p>
            </div>

            {/* Security Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Lock className="w-4 h-4 text-green-500" />
                <span>SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <RefreshCw className="w-4 h-4 text-green-500" />
                <span>14-Day Money Back</span>
              </div>
            </div>

            {/* Plans */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {plans.map((plan) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`relative rounded-lg border p-6 ${
                    plan.popular
                      ? 'border-primary shadow-lg'
                      : 'border-gray-200'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <div className="mt-2">
                      <span className="text-3xl font-bold">₹{plan.price}</span>
                      <span className="text-gray-500">/month</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handlePlanSelect(plan)}
                    className={`w-full py-2 px-4 rounded-md ${
                      plan.popular
                        ? 'bg-primary text-white hover:bg-primary/90'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    } transition-colors`}
                  >
                    Get Started
                  </button>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden border-2 border-primary">
              <div className="bg-primary text-white p-6">
                <div className="flex items-center">
                  <button 
                    onClick={handleBackToPlans}
                    className="mr-4 p-1 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-2xl font-bold">Complete Your Subscription</h2>
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center mb-8">
                  <div className="bg-primary/20 p-4 rounded-full mr-4">
                    <CreditCard className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedPlan?.name} Plan</h3>
                    <p className="text-gray-600 font-medium">Secure payment processing</p>
                  </div>
                </div>
                
                <div className="bg-gray-100 rounded-lg p-6 mb-8 border border-gray-200">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-700 font-medium">Plan Price</span>
                    <span className="text-2xl font-bold text-primary">₹{selectedPlan?.price}/month</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Billing Cycle</span>
                    <span className="font-semibold">Monthly</span>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h4 className="font-bold text-xl mb-4 text-gray-900 border-b border-gray-200 pb-2">Plan includes:</h4>
                  <ul className="space-y-3 bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    {selectedPlan?.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="bg-green-100 p-1 rounded-full">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="font-semibold text-gray-800">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-bold text-xl mb-4 text-gray-900 border-b border-gray-200 pb-2">Select Payment Method</h4>
                  <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <PaymentOptions
                      amount={selectedPlan?.price || 0}
                      name={`${selectedPlan?.name} Plan - CollabX`}
                      description={`Subscription for ${selectedPlan?.name} plan`}
                      onSuccess={handlePaymentSuccess}
                    />
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600 mb-3">By completing your purchase, you agree to our Terms of Service and Privacy Policy.</p>
                  <div className="flex items-center justify-center bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <Lock className="w-5 h-5 text-primary mr-2" />
                    <span className="font-medium">Secure payment processing by Razorpay</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage; 
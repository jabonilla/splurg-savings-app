// Mock Stripe Service for development
// In production, this would integrate with the actual Stripe API

class StripeService {
  // Mock payment methods
  static mockPaymentMethods = [
    {
      id: 'pm_1',
      type: 'card',
      brand: 'visa',
      last4: '4242',
      expMonth: 12,
      expYear: 2025,
    },
    {
      id: 'pm_2',
      type: 'card',
      brand: 'mastercard',
      last4: '5555',
      expMonth: 8,
      expYear: 2026,
    },
  ];

  // Initialize Stripe (mock)
  static async initialize(publishableKey) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000);
    });
  }

  // Create payment intent (mock)
  static async createPaymentIntent(amount, currency = 'usd') {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          clientSecret: 'mock_client_secret_' + Date.now(),
          paymentIntentId: 'pi_' + Date.now(),
          amount,
          currency,
        });
      }, 1500);
    });
  }

  // Process payment (mock)
  static async processPayment(paymentIntentId, paymentMethodId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          transactionId: 'txn_' + Date.now(),
          amount: 1000, // Mock amount in cents
          status: 'succeeded',
        });
      }, 2000);
    });
  }

  // Process roundup payment (mock)
  static async processRoundupPayment(roundupAmount, goalId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          roundupId: 'roundup_' + Date.now(),
          amount: roundupAmount,
          goalId,
          status: 'completed',
        });
      }, 1500);
    });
  }

  // Process goal contribution (mock)
  static async processGoalContribution(amount, goalId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          contributionId: 'contrib_' + Date.now(),
          amount,
          goalId,
          status: 'completed',
        });
      }, 1500);
    });
  }

  // Get payment methods (mock)
  static async getPaymentMethods() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockPaymentMethods);
      }, 500);
    });
  }

  // Add payment method (mock)
  static async addPaymentMethod(paymentMethodData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPaymentMethod = {
          id: 'pm_' + Date.now(),
          type: 'card',
          brand: paymentMethodData.brand || 'visa',
          last4: paymentMethodData.last4 || '1234',
          expMonth: paymentMethodData.expMonth || 12,
          expYear: paymentMethodData.expYear || 2025,
        };
        this.mockPaymentMethods.push(newPaymentMethod);
        resolve(newPaymentMethod);
      }, 1000);
    });
  }

  // Remove payment method (mock)
  static async removePaymentMethod(paymentMethodId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.mockPaymentMethods = this.mockPaymentMethods.filter(
          pm => pm.id !== paymentMethodId
        );
        resolve({ success: true });
      }, 500);
    });
  }

  // Set default payment method (mock)
  static async setDefaultPaymentMethod(paymentMethodId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  }

  // Get payment history (mock)
  static async getPaymentHistory() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'pay_1',
            amount: 25.00,
            description: 'Roundup contribution',
            date: '2024-08-05',
            status: 'completed',
            goalId: 'goal_1',
          },
          {
            id: 'pay_2',
            amount: 50.00,
            description: 'Goal contribution',
            date: '2024-08-04',
            status: 'completed',
            goalId: 'goal_2',
          },
          {
            id: 'pay_3',
            amount: 10.00,
            description: 'Roundup contribution',
            date: '2024-08-03',
            status: 'completed',
            goalId: 'goal_1',
          },
        ]);
      }, 800);
    });
  }

  // Validate card details (mock)
  static validateCardDetails(cardNumber, expMonth, expYear, cvc) {
    // Basic validation
    if (!cardNumber || cardNumber.length < 13) {
      return { valid: false, error: 'Invalid card number' };
    }
    if (!expMonth || expMonth < 1 || expMonth > 12) {
      return { valid: false, error: 'Invalid expiration month' };
    }
    if (!expYear || expYear < new Date().getFullYear()) {
      return { valid: false, error: 'Invalid expiration year' };
    }
    if (!cvc || cvc.length < 3) {
      return { valid: false, error: 'Invalid CVC' };
    }
    
    return { valid: true };
  }

  // Calculate processing fee (mock)
  static calculateProcessingFee(amount) {
    // Mock fee calculation: 2.9% + 30 cents
    const percentageFee = amount * 0.029;
    const flatFee = 0.30;
    return percentageFee + flatFee;
  }

  // Get payment analytics (mock)
  static async getPaymentAnalytics() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalPayments: 1250.75,
          totalRoundups: 450.25,
          totalContributions: 800.50,
          averagePayment: 25.15,
          monthlyTotal: 350.00,
          topGoals: [
            { goalId: 'goal_1', amount: 500.00, name: 'Vacation to Hawaii' },
            { goalId: 'goal_2', amount: 300.00, name: 'New Laptop' },
            { goalId: 'goal_3', amount: 200.00, name: 'Emergency Fund' },
          ],
        });
      }, 600);
    });
  }
}

export default StripeService; 
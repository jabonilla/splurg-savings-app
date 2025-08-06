// Mock Plaid Service for development
// In production, this would integrate with the actual Plaid API

class PlaidService {
  // Mock bank accounts for development
  static mockBankAccounts = [
    {
      id: 'bank_1',
      name: 'Chase Bank',
      accountNumber: '****1234',
      type: 'checking',
      balance: 2547.89,
      institution: 'Chase',
    },
    {
      id: 'bank_2',
      name: 'Bank of America',
      accountNumber: '****5678',
      type: 'savings',
      balance: 12500.00,
      institution: 'Bank of America',
    },
  ];

  // Mock transactions for development
  static mockTransactions = [
    {
      id: 'txn_1',
      merchant: 'Starbucks',
      amount: 5.25,
      category: 'food',
      date: '2024-08-05',
      account_id: 'bank_1',
    },
    {
      id: 'txn_2',
      merchant: 'Target',
      amount: 89.99,
      category: 'shopping',
      date: '2024-08-04',
      account_id: 'bank_1',
    },
    {
      id: 'txn_3',
      merchant: 'Uber',
      amount: 15.50,
      category: 'transportation',
      date: '2024-08-03',
      account_id: 'bank_1',
    },
  ];

  // Initialize Plaid (mock)
  static async initialize() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000);
    });
  }

  // Link bank account (mock)
  static async linkBankAccount() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          accounts: this.mockBankAccounts,
          accessToken: 'mock_access_token_' + Date.now(),
        });
      }, 2000);
    });
  }

  // Get linked accounts (mock)
  static async getLinkedAccounts() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockBankAccounts);
      }, 500);
    });
  }

  // Sync transactions (mock)
  static async syncTransactions(accountId = null) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const transactions = accountId 
          ? this.mockTransactions.filter(t => t.account_id === accountId)
          : this.mockTransactions;
        resolve(transactions);
      }, 1000);
    });
  }

  // Get account balance (mock)
  static async getAccountBalance(accountId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const account = this.mockBankAccounts.find(a => a.id === accountId);
        resolve(account ? account.balance : 0);
      }, 500);
    });
  }

  // Unlink account (mock)
  static async unlinkAccount(accountId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000);
    });
  }

  // Get institutions (mock)
  static async getInstitutions() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 'chase', name: 'Chase Bank', logo: '🏦' },
          { id: 'bofa', name: 'Bank of America', logo: '🏦' },
          { id: 'wells', name: 'Wells Fargo', logo: '🏦' },
          { id: 'citi', name: 'Citibank', logo: '🏦' },
          { id: 'usaa', name: 'USAA', logo: '🏦' },
        ]);
      }, 500);
    });
  }

  // Process roundup (mock)
  static async processRoundup(transactionId, roundupAmount, goalId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          roundupId: 'roundup_' + Date.now(),
          amount: roundupAmount,
          transactionId,
          goalId,
        });
      }, 1500);
    });
  }

  // Get transaction categories (mock)
  static async getTransactionCategories() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 'food', name: 'Food & Dining', emoji: '🍽️' },
          { id: 'shopping', name: 'Shopping', emoji: '🛍️' },
          { id: 'transportation', name: 'Transportation', emoji: '🚗' },
          { id: 'entertainment', name: 'Entertainment', emoji: '🎬' },
          { id: 'health', name: 'Health & Fitness', emoji: '💪' },
          { id: 'education', name: 'Education', emoji: '📚' },
          { id: 'home', name: 'Home & Garden', emoji: '🏠' },
          { id: 'technology', name: 'Technology', emoji: '💻' },
          { id: 'travel', name: 'Travel', emoji: '✈️' },
          { id: 'other', name: 'Other', emoji: '📦' },
        ]);
      }, 300);
    });
  }

  // Calculate roundup amount based on transaction
  static calculateRoundupAmount(transactionAmount, roundupSettings = {}) {
    const { method = 'nearest_dollar', customAmount = 1.00 } = roundupSettings;
    
    switch (method) {
      case 'nearest_dollar':
        return Math.ceil(transactionAmount) - transactionAmount;
      case 'nearest_ten':
        return Math.ceil(transactionAmount / 10) * 10 - transactionAmount;
      case 'custom':
        return customAmount;
      case 'percentage':
        return transactionAmount * 0.01; // 1%
      default:
        return Math.ceil(transactionAmount) - transactionAmount;
    }
  }

  // Get transaction insights (mock)
  static async getTransactionInsights() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalSpent: 1250.75,
          averageTransaction: 45.25,
          topCategories: [
            { category: 'food', amount: 450.25, percentage: 36 },
            { category: 'shopping', amount: 380.50, percentage: 30 },
            { category: 'transportation', amount: 220.00, percentage: 18 },
            { category: 'entertainment', amount: 200.00, percentage: 16 },
          ],
          spendingTrend: 'increasing',
          monthlyAverage: 1250.75,
        });
      }, 800);
    });
  }
}

export default PlaidService; 
import AsyncStorage from '@react-native-async-storage/async-storage';

class DataService {
  // User Data
  static async saveUserData(userData) {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  }

  static async getUserData() {
    try {
      const data = await AsyncStorage.getItem('userData');
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  }

  // Goals Data
  static async saveGoals(goals) {
    try {
      await AsyncStorage.setItem('goals', JSON.stringify(goals));
    } catch (error) {
      console.error('Error saving goals:', error);
    }
  }

  static async getGoals() {
    try {
      const data = await AsyncStorage.getItem('goals');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting goals:', error);
      return [];
    }
  }

  static async addGoal(goal) {
    try {
      const goals = await this.getGoals();
      const newGoal = {
        ...goal,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        status: 'active',
        progress_percentage: 0,
      };
      goals.push(newGoal);
      await this.saveGoals(goals);
      return newGoal;
    } catch (error) {
      console.error('Error adding goal:', error);
      throw error;
    }
  }

  static async updateGoal(goalId, updates) {
    try {
      const goals = await this.getGoals();
      const goalIndex = goals.findIndex(goal => goal.id === goalId);
      if (goalIndex !== -1) {
        goals[goalIndex] = { ...goals[goalIndex], ...updates };
        await this.saveGoals(goals);
        return goals[goalIndex];
      }
      return null;
    } catch (error) {
      console.error('Error updating goal:', error);
      throw error;
    }
  }

  static async deleteGoal(goalId) {
    try {
      const goals = await this.getGoals();
      const filteredGoals = goals.filter(goal => goal.id !== goalId);
      await this.saveGoals(filteredGoals);
    } catch (error) {
      console.error('Error deleting goal:', error);
      throw error;
    }
  }

  // Transactions Data
  static async saveTransactions(transactions) {
    try {
      await AsyncStorage.setItem('transactions', JSON.stringify(transactions));
    } catch (error) {
      console.error('Error saving transactions:', error);
    }
  }

  static async getTransactions() {
    try {
      const data = await AsyncStorage.getItem('transactions');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting transactions:', error);
      return [];
    }
  }

  static async addTransaction(transaction) {
    try {
      const transactions = await this.getTransactions();
      const newTransaction = {
        ...transaction,
        id: Date.now().toString(),
        date: new Date().toISOString(),
      };
      transactions.unshift(newTransaction); // Add to beginning
      await this.saveTransactions(transactions);
      return newTransaction;
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw error;
    }
  }

  static async updateTransaction(transactionId, updates) {
    try {
      const transactions = await this.getTransactions();
      const transactionIndex = transactions.findIndex(t => t.id === transactionId);
      if (transactionIndex !== -1) {
        transactions[transactionIndex] = { ...transactions[transactionIndex], ...updates };
        await this.saveTransactions(transactions);
        return transactions[transactionIndex];
      }
      return null;
    } catch (error) {
      console.error('Error updating transaction:', error);
      throw error;
    }
  }

  static async deleteTransaction(transactionId) {
    try {
      const transactions = await this.getTransactions();
      const filteredTransactions = transactions.filter(t => t.id !== transactionId);
      await this.saveTransactions(filteredTransactions);
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw error;
    }
  }

  // Settings Data
  static async saveSettings(settings) {
    try {
      await AsyncStorage.setItem('settings', JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  }

  static async getSettings() {
    try {
      const data = await AsyncStorage.getItem('settings');
      return data ? JSON.parse(data) : {
        notifications: true,
        roundupEnabled: true,
        defaultRoundupAmount: 1.00,
        currency: 'USD',
      };
    } catch (error) {
      console.error('Error getting settings:', error);
      return {
        notifications: true,
        roundupEnabled: true,
        defaultRoundupAmount: 1.00,
        currency: 'USD',
      };
    }
  }

  // Friends Data
  static async saveFriends(friends) {
    try {
      await AsyncStorage.setItem('friends', JSON.stringify(friends));
    } catch (error) {
      console.error('Error saving friends:', error);
    }
  }

  static async getFriends() {
    try {
      const data = await AsyncStorage.getItem('friends');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting friends:', error);
      return [];
    }
  }

  // Clear all data (for logout)
  static async clearAllData() {
    try {
      await AsyncStorage.multiRemove([
        'userData',
        'goals',
        'transactions',
        'settings',
        'friends',
      ]);
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  }

  // Initialize with mock data if empty
  static async initializeMockData() {
    try {
      const goals = await this.getGoals();
      const transactions = await this.getTransactions();

      if (goals.length === 0) {
        const mockGoals = [
          {
            id: '1',
            name: 'Vacation to Hawaii',
            description: 'Dream vacation to the beautiful islands',
            target_amount: 5000.00,
            saved_amount: 1250.00,
            status: 'active',
            category: 'travel',
            created_at: '2024-01-15',
            deadline: '2024-12-15',
            progress_percentage: 25.00,
            roundup_amount: 1.00,
          },
          {
            id: '2',
            name: 'New Laptop',
            description: 'MacBook Pro for work and development',
            target_amount: 2500.00,
            saved_amount: 1800.00,
            status: 'active',
            category: 'technology',
            created_at: '2024-01-10',
            deadline: '2024-08-15',
            progress_percentage: 72.00,
            roundup_amount: 0.50,
          },
        ];
        await this.saveGoals(mockGoals);
      }

      if (transactions.length === 0) {
        const mockTransactions = [
          {
            id: '1',
            merchant: 'Unknown Merchant',
            amount: 4.75,
            roundup_amount: 0.25,
            linked_goal: 'Vacation to Hawaii',
            date: '2024-08-04',
            category: 'food',
            type: 'purchase',
          },
          {
            id: '2',
            merchant: 'Unknown Merchant',
            amount: 89.99,
            roundup_amount: 0.01,
            linked_goal: 'New Laptop',
            date: '2024-08-03',
            category: 'shopping',
            type: 'purchase',
          },
        ];
        await this.saveTransactions(mockTransactions);
      }
    } catch (error) {
      console.error('Error initializing mock data:', error);
    }
  }
}

export default DataService; 
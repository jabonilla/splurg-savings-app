// Mock Analytics Service for development
// In production, this would integrate with analytics platforms like Mixpanel, Amplitude, etc.

class AnalyticsService {
  // Mock analytics data
  static mockAnalytics = {
    spending: {
      total: 1250.75,
      average: 45.25,
      categories: [
        { category: 'food', amount: 450.25, percentage: 36 },
        { category: 'shopping', amount: 380.50, percentage: 30 },
        { category: 'transportation', amount: 220.00, percentage: 18 },
        { category: 'entertainment', amount: 200.00, percentage: 16 },
      ],
      trends: {
        daily: [25, 30, 45, 20, 35, 40, 30],
        weekly: [180, 220, 195, 240, 210, 185, 200],
        monthly: [1200, 1350, 1100, 1400, 1250, 1300],
      },
    },
    savings: {
      total: 2149.00,
      roundups: 450.25,
      contributions: 1698.75,
      goals: {
        completed: 3,
        active: 2,
        total: 5,
      },
      trends: {
        daily: [5, 8, 12, 15, 10, 18, 20],
        weekly: [45, 60, 75, 90, 85, 100, 120],
        monthly: [300, 450, 600, 750, 900, 1200, 1500],
      },
    },
    goals: {
      total: 5,
      completed: 3,
      active: 2,
      averageProgress: 65,
      categories: [
        { category: 'travel', count: 2, totalAmount: 7500 },
        { category: 'technology', count: 1, totalAmount: 2500 },
        { category: 'shopping', count: 1, totalAmount: 500 },
        { category: 'education', count: 1, totalAmount: 1000 },
      ],
    },
    insights: {
      topMerchants: [
        { name: 'Starbucks', amount: 125.50, count: 15 },
        { name: 'Target', amount: 89.99, count: 1 },
        { name: 'Uber', amount: 75.25, count: 8 },
        { name: 'Amazon', amount: 245.00, count: 3 },
      ],
      roundupEfficiency: 85, // Percentage of transactions with roundups
      savingsRate: 12.5, // Percentage of income saved
      averageRoundup: 0.75,
      bestSavingDay: 'Friday',
      bestSavingTime: 'Evening',
    },
  };

  // Track event
  static async trackEvent(eventName, properties = {}) {
    // Mock implementation - in real app, this would send to analytics platform
    console.log('Analytics Event:', eventName, properties);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 100);
    });
  }

  // Track user action
  static async trackUserAction(action, data = {}) {
    return this.trackEvent(`user_${action}`, data);
  }

  // Track goal creation
  static async trackGoalCreation(goalData) {
    return this.trackEvent('goal_created', {
      category: goalData.category,
      target_amount: goalData.target_amount,
      roundup_amount: goalData.roundup_amount,
      is_group_goal: goalData.group_goal || false,
    });
  }

  // Track goal completion
  static async trackGoalCompletion(goalData) {
    return this.trackEvent('goal_completed', {
      category: goalData.category,
      target_amount: goalData.target_amount,
      time_to_complete: goalData.timeToComplete,
      total_contributions: goalData.totalContributions,
    });
  }

  // Track roundup
  static async trackRoundup(roundupData) {
    return this.trackEvent('roundup_processed', {
      amount: roundupData.amount,
      merchant: roundupData.merchant,
      goal_id: roundupData.goalId,
      transaction_amount: roundupData.transactionAmount,
    });
  }

  // Track contribution
  static async trackContribution(contributionData) {
    return this.trackEvent('contribution_made', {
      amount: contributionData.amount,
      goal_id: contributionData.goalId,
      payment_method: contributionData.paymentMethod,
    });
  }

  // Track transaction
  static async trackTransaction(transactionData) {
    return this.trackEvent('transaction_added', {
      amount: transactionData.amount,
      category: transactionData.category,
      merchant: transactionData.merchant,
      has_roundup: transactionData.hasRoundup,
    });
  }

  // Get spending analytics
  static async getSpendingAnalytics(timeframe = 'month') {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockAnalytics.spending);
      }, 500);
    });
  }

  // Get savings analytics
  static async getSavingsAnalytics(timeframe = 'month') {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockAnalytics.savings);
      }, 500);
    });
  }

  // Get goal analytics
  static async getGoalAnalytics() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockAnalytics.goals);
      }, 500);
    });
  }

  // Get insights
  static async getInsights() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockAnalytics.insights);
      }, 500);
    });
  }

  // Get spending trends
  static async getSpendingTrends(timeframe = 'month') {
    return new Promise((resolve) => {
      setTimeout(() => {
        const trends = this.mockAnalytics.spending.trends[timeframe] || [];
        resolve({
          data: trends,
          labels: this.generateLabels(timeframe, trends.length),
        });
      }, 300);
    });
  }

  // Get savings trends
  static async getSavingsTrends(timeframe = 'month') {
    return new Promise((resolve) => {
      setTimeout(() => {
        const trends = this.mockAnalytics.savings.trends[timeframe] || [];
        resolve({
          data: trends,
          labels: this.generateLabels(timeframe, trends.length),
        });
      }, 300);
    });
  }

  // Get category breakdown
  static async getCategoryBreakdown() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockAnalytics.spending.categories);
      }, 300);
    });
  }

  // Get merchant insights
  static async getMerchantInsights() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockAnalytics.insights.topMerchants);
      }, 300);
    });
  }

  // Get roundup efficiency
  static async getRoundupEfficiency() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          efficiency: this.mockAnalytics.insights.roundupEfficiency,
          averageRoundup: this.mockAnalytics.insights.averageRoundup,
          totalRoundups: this.mockAnalytics.savings.roundups,
        });
      }, 300);
    });
  }

  // Get savings rate
  static async getSavingsRate() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          rate: this.mockAnalytics.insights.savingsRate,
          totalSaved: this.mockAnalytics.savings.total,
          monthlyAverage: this.calculateMonthlyAverage(),
        });
      }, 300);
    });
  }

  // Get personalized insights
  static async getPersonalizedInsights() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            type: 'spending_pattern',
            title: 'High Coffee Spending',
            description: 'You spend $125/month on coffee. Consider brewing at home to save $75/month.',
            potential_savings: 75,
            category: 'food',
          },
          {
            type: 'goal_progress',
            title: 'Goal Ahead of Schedule',
            description: 'Your "New Laptop" goal is 72% complete and ahead of schedule!',
            goal_name: 'New Laptop',
            progress: 72,
          },
          {
            type: 'roundup_opportunity',
            title: 'Roundup Opportunity',
            description: 'You could save $45 more this month by enabling roundups on all transactions.',
            potential_savings: 45,
          },
          {
            type: 'milestone_approaching',
            title: 'Milestone Approaching',
            description: 'You\'re $51 away from reaching $2,200 in total savings!',
            milestone: 2200,
            current: 2149,
            remaining: 51,
          },
        ]);
      }, 500);
    });
  }

  // Get financial health score
  static async getFinancialHealthScore() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const score = this.calculateFinancialHealthScore();
        resolve({
          score,
          grade: this.getGradeFromScore(score),
          factors: [
            { factor: 'Savings Rate', score: 85, weight: 0.3 },
            { factor: 'Goal Progress', score: 90, weight: 0.25 },
            { factor: 'Roundup Efficiency', score: 85, weight: 0.2 },
            { factor: 'Spending Control', score: 75, weight: 0.15 },
            { factor: 'Emergency Fund', score: 80, weight: 0.1 },
          ],
        });
      }, 400);
    });
  }

  // Generate labels for charts
  static generateLabels(timeframe, count) {
    const labels = [];
    const now = new Date();
    
    switch (timeframe) {
      case 'week':
        for (let i = 6; i >= 0; i--) {
          const date = new Date(now);
          date.setDate(date.getDate() - i);
          labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
        }
        break;
      case 'month':
        for (let i = 29; i >= 0; i--) {
          const date = new Date(now);
          date.setDate(date.getDate() - i);
          labels.push(date.getDate().toString());
        }
        break;
      case 'year':
        for (let i = 11; i >= 0; i--) {
          const date = new Date(now);
          date.setMonth(date.getMonth() - i);
          labels.push(date.toLocaleDateString('en-US', { month: 'short' }));
        }
        break;
      default:
        for (let i = 0; i < count; i++) {
          labels.push(`Day ${i + 1}`);
        }
    }
    
    return labels;
  }

  // Calculate monthly average
  static calculateMonthlyAverage() {
    const monthlyData = this.mockAnalytics.savings.trends.monthly;
    return monthlyData.reduce((sum, value) => sum + value, 0) / monthlyData.length;
  }

  // Calculate financial health score
  static calculateFinancialHealthScore() {
    const factors = [
      { score: 85, weight: 0.3 }, // Savings Rate
      { score: 90, weight: 0.25 }, // Goal Progress
      { score: 85, weight: 0.2 }, // Roundup Efficiency
      { score: 75, weight: 0.15 }, // Spending Control
      { score: 80, weight: 0.1 }, // Emergency Fund
    ];
    
    return factors.reduce((total, factor) => {
      return total + (factor.score * factor.weight);
    }, 0);
  }

  // Get grade from score
  static getGradeFromScore(score) {
    if (score >= 90) return 'A+';
    if (score >= 85) return 'A';
    if (score >= 80) return 'A-';
    if (score >= 75) return 'B+';
    if (score >= 70) return 'B';
    if (score >= 65) return 'B-';
    if (score >= 60) return 'C+';
    if (score >= 55) return 'C';
    if (score >= 50) return 'C-';
    return 'D';
  }

  // Export analytics data
  static async exportAnalyticsData(format = 'json') {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = {
          spending: this.mockAnalytics.spending,
          savings: this.mockAnalytics.savings,
          goals: this.mockAnalytics.goals,
          insights: this.mockAnalytics.insights,
          exportDate: new Date().toISOString(),
        };
        
        if (format === 'csv') {
          // Convert to CSV format
          resolve(this.convertToCSV(data));
        } else {
          resolve(data);
        }
      }, 1000);
    });
  }

  // Convert data to CSV (mock implementation)
  static convertToCSV(data) {
    // Mock CSV conversion
    return 'Date,Category,Amount\n2024-08-05,food,25.50\n2024-08-04,shopping,89.99';
  }
}

export default AnalyticsService; 
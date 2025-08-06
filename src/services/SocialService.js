// Mock Social Service for development
// In production, this would integrate with a backend API

class SocialService {
  // Mock friends data
  static mockFriends = [
    {
      id: 'friend_1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      avatar: '👩‍💼',
      status: 'active',
      totalSaved: 1850.00,
      goalsCompleted: 3,
      joinedDate: '2024-01-15',
    },
    {
      id: 'friend_2',
      name: 'Mike Chen',
      email: 'mike@example.com',
      avatar: '👨‍💻',
      status: 'active',
      totalSaved: 3200.00,
      goalsCompleted: 5,
      joinedDate: '2024-02-01',
    },
    {
      id: 'friend_3',
      name: 'Emma Davis',
      email: 'emma@example.com',
      avatar: '👩‍🎨',
      status: 'active',
      totalSaved: 950.00,
      goalsCompleted: 2,
      joinedDate: '2024-03-10',
    },
  ];

  // Mock friend requests
  static mockFriendRequests = [
    {
      id: 'req_1',
      from: {
        id: 'user_4',
        name: 'Alex Thompson',
        email: 'alex@example.com',
        avatar: '👨‍🏫',
      },
      message: 'Hey! I saw you on Splurg and would love to connect!',
      date: '2024-08-05',
    },
    {
      id: 'req_2',
      from: {
        id: 'user_5',
        name: 'Lisa Wang',
        email: 'lisa@example.com',
        avatar: '👩‍⚕️',
      },
      message: 'Love your savings goals! Let\'s be friends!',
      date: '2024-08-04',
    },
  ];

  // Mock group goals
  static mockGroupGoals = [
    {
      id: 'group_1',
      name: 'Vacation Fund',
      description: 'Saving for a group trip to Hawaii',
      target_amount: 10000.00,
      saved_amount: 4500.00,
      members: ['friend_1', 'friend_2', 'friend_3'],
      created_by: 'friend_1',
      deadline: '2024-12-31',
      status: 'active',
    },
    {
      id: 'group_2',
      name: 'Emergency Fund',
      description: 'Building emergency savings together',
      target_amount: 5000.00,
      saved_amount: 3200.00,
      members: ['friend_1', 'friend_2'],
      created_by: 'friend_2',
      deadline: '2024-10-31',
      status: 'active',
    },
  ];

  // Mock activity feed
  static mockActivityFeed = [
    {
      id: 'activity_1',
      type: 'goal_completed',
      user: {
        id: 'friend_1',
        name: 'Sarah Johnson',
        avatar: '👩‍💼',
      },
      goal: {
        name: 'New Laptop',
        amount: 2500.00,
      },
      date: '2024-08-05',
      message: 'Sarah completed her goal: New Laptop! 🎉',
    },
    {
      id: 'activity_2',
      type: 'roundup_milestone',
      user: {
        id: 'friend_2',
        name: 'Mike Chen',
        avatar: '👨‍💻',
      },
      milestone: {
        amount: 1000.00,
        type: 'total_savings',
      },
      date: '2024-08-04',
      message: 'Mike reached $1,000 in total savings! 💰',
    },
    {
      id: 'activity_3',
      type: 'group_contribution',
      user: {
        id: 'friend_3',
        name: 'Emma Davis',
        avatar: '👩‍🎨',
      },
      groupGoal: {
        name: 'Vacation Fund',
        contribution: 150.00,
      },
      date: '2024-08-03',
      message: 'Emma contributed $150 to Vacation Fund ✈️',
    },
  ];

  // Get friends list
  static async getFriends() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockFriends);
      }, 500);
    });
  }

  // Get friend requests
  static async getFriendRequests() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockFriendRequests);
      }, 500);
    });
  }

  // Send friend request
  static async sendFriendRequest(userId, message = '') {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          requestId: 'req_' + Date.now(),
        });
      }, 1000);
    });
  }

  // Accept friend request
  static async acceptFriendRequest(requestId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Move from requests to friends
        const request = this.mockFriendRequests.find(r => r.id === requestId);
        if (request) {
          this.mockFriends.push({
            id: request.from.id,
            name: request.from.name,
            email: request.from.email,
            avatar: request.from.avatar,
            status: 'active',
            totalSaved: 0,
            goalsCompleted: 0,
            joinedDate: new Date().toISOString().split('T')[0],
          });
          this.mockFriendRequests = this.mockFriendRequests.filter(r => r.id !== requestId);
        }
        resolve({ success: true });
      }, 1000);
    });
  }

  // Decline friend request
  static async declineFriendRequest(requestId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.mockFriendRequests = this.mockFriendRequests.filter(r => r.id !== requestId);
        resolve({ success: true });
      }, 500);
    });
  }

  // Remove friend
  static async removeFriend(friendId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.mockFriends = this.mockFriends.filter(f => f.id !== friendId);
        resolve({ success: true });
      }, 500);
    });
  }

  // Get group goals
  static async getGroupGoals() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockGroupGoals);
      }, 500);
    });
  }

  // Create group goal
  static async createGroupGoal(goalData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newGroupGoal = {
          id: 'group_' + Date.now(),
          ...goalData,
          saved_amount: 0,
          status: 'active',
          created_at: new Date().toISOString(),
        };
        this.mockGroupGoals.push(newGroupGoal);
        resolve(newGroupGoal);
      }, 1000);
    });
  }

  // Contribute to group goal
  static async contributeToGroupGoal(groupGoalId, amount) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const goal = this.mockGroupGoals.find(g => g.id === groupGoalId);
        if (goal) {
          goal.saved_amount += amount;
        }
        resolve({
          success: true,
          contributionId: 'contrib_' + Date.now(),
          amount,
          groupGoalId,
        });
      }, 1000);
    });
  }

  // Get activity feed
  static async getActivityFeed() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockActivityFeed);
      }, 500);
    });
  }

  // Add activity
  static async addActivity(activityData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newActivity = {
          id: 'activity_' + Date.now(),
          ...activityData,
          date: new Date().toISOString().split('T')[0],
        };
        this.mockActivityFeed.unshift(newActivity);
        resolve(newActivity);
      }, 500);
    });
  }

  // Search users
  static async searchUsers(query) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUsers = [
          { id: 'user_1', name: 'John Smith', email: 'john@example.com', avatar: '👨‍💼' },
          { id: 'user_2', name: 'Maria Garcia', email: 'maria@example.com', avatar: '👩‍🎓' },
          { id: 'user_3', name: 'David Kim', email: 'david@example.com', avatar: '👨‍🔬' },
        ];
        
        const filteredUsers = mockUsers.filter(user =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase())
        );
        
        resolve(filteredUsers);
      }, 300);
    });
  }

  // Get friend suggestions
  static async getFriendSuggestions() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'suggestion_1',
            name: 'Alex Thompson',
            email: 'alex@example.com',
            avatar: '👨‍🏫',
            mutualFriends: 2,
            reason: 'You have 2 mutual friends',
          },
          {
            id: 'suggestion_2',
            name: 'Lisa Wang',
            email: 'lisa@example.com',
            avatar: '👩‍⚕️',
            mutualFriends: 1,
            reason: 'You have 1 mutual friend',
          },
        ]);
      }, 500);
    });
  }

  // Get social stats
  static async getSocialStats() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalFriends: this.mockFriends.length,
          pendingRequests: this.mockFriendRequests.length,
          groupGoals: this.mockGroupGoals.length,
          totalGroupSavings: this.mockGroupGoals.reduce((sum, g) => sum + g.saved_amount, 0),
          averageFriendSavings: this.mockFriends.reduce((sum, f) => sum + f.totalSaved, 0) / this.mockFriends.length,
        });
      }, 300);
    });
  }

  // Send achievement notification
  static async sendAchievementNotification(achievement) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          notificationId: 'notif_' + Date.now(),
        });
      }, 500);
    });
  }

  // Get leaderboard
  static async getLeaderboard() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const leaderboard = this.mockFriends
          .map(friend => ({
            id: friend.id,
            name: friend.name,
            avatar: friend.avatar,
            totalSaved: friend.totalSaved,
            goalsCompleted: friend.goalsCompleted,
            rank: 0, // Will be calculated
          }))
          .sort((a, b) => b.totalSaved - a.totalSaved)
          .map((friend, index) => ({
            ...friend,
            rank: index + 1,
          }));
        
        resolve(leaderboard);
      }, 500);
    });
  }
}

export default SocialService; 
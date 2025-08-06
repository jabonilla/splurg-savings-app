import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

class NotificationService {
  // Request permissions
  static async requestPermissions() {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return false;
      }
      
      return true;
    } else {
      console.log('Must use physical device for Push Notifications');
      return false;
    }
  }

  // Get push token
  static async getPushToken() {
    try {
      const token = await Notifications.getExpoPushTokenAsync({
        projectId: 'your-project-id', // Replace with your Expo project ID
      });
      return token.data;
    } catch (error) {
      console.error('Error getting push token:', error);
      return null;
    }
  }

  // Schedule local notification
  static async scheduleLocalNotification(title, body, data = {}, trigger = null) {
    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data,
          sound: 'default',
        },
        trigger: trigger || null, // null means send immediately
      });
      return notificationId;
    } catch (error) {
      console.error('Error scheduling notification:', error);
      return null;
    }
  }

  // Send immediate notification
  static async sendNotification(title, body, data = {}) {
    return this.scheduleLocalNotification(title, body, data);
  }

  // Schedule goal reminder
  static async scheduleGoalReminder(goalId, goalName, targetDate) {
    const reminderDate = new Date(targetDate);
    reminderDate.setDate(reminderDate.getDate() - 7); // 1 week before deadline
    
    if (reminderDate > new Date()) {
      return await this.scheduleLocalNotification(
        'Goal Reminder',
        `Your goal "${goalName}" is due in 1 week!`,
        { type: 'goal_reminder', goalId },
        { date: reminderDate }
      );
    }
    return null;
  }

  // Schedule daily roundup reminder
  static async scheduleDailyReminder() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0); // 9 AM
    
    return await this.scheduleLocalNotification(
      'Daily Roundup Reminder',
      'Don\'t forget to check your roundups today! 💰',
      { type: 'daily_reminder' },
      { date: tomorrow, repeats: true }
    );
  }

  // Schedule weekly progress report
  static async scheduleWeeklyReport() {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    nextWeek.setHours(10, 0, 0, 0); // 10 AM
    
    return await this.scheduleLocalNotification(
      'Weekly Progress Report',
      'Check out your savings progress this week! 📊',
      { type: 'weekly_report' },
      { date: nextWeek, repeats: true }
    );
  }

  // Send achievement notification
  static async sendAchievementNotification(achievement) {
    const messages = {
      first_goal: '🎉 Congratulations! You created your first goal!',
      first_roundup: '💰 Great job! You made your first roundup!',
      milestone_100: '💯 You\'ve saved $100! Keep it up!',
      milestone_500: '🎯 Halfway to $1,000! You\'re doing amazing!',
      milestone_1000: '🏆 You\'ve saved $1,000! Incredible achievement!',
      goal_completed: `🎊 Goal completed! "${achievement.goalName}" is finished!`,
      streak_7: '🔥 7-day saving streak! You\'re on fire!',
      streak_30: '⚡ 30-day saving streak! Unstoppable!',
    };

    const message = messages[achievement.type] || '🎉 Achievement unlocked!';
    
    return await this.sendNotification(
      'Achievement Unlocked!',
      message,
      { type: 'achievement', achievement }
    );
  }

  // Send roundup notification
  static async sendRoundupNotification(amount, goalName) {
    return await this.sendNotification(
      'Roundup Processed',
      `$${amount.toFixed(2)} added to "${goalName}" from your roundup! 💰`,
      { type: 'roundup', amount, goalName }
    );
  }

  // Send goal contribution notification
  static async sendContributionNotification(amount, goalName) {
    return await this.sendNotification(
      'Contribution Added',
      `$${amount.toFixed(2)} contributed to "${goalName}"! 🎯`,
      { type: 'contribution', amount, goalName }
    );
  }

  // Send friend activity notification
  static async sendFriendActivityNotification(friendName, activity) {
    const messages = {
      goal_completed: `${friendName} completed a goal! 🎉`,
      milestone_reached: `${friendName} reached a savings milestone! 💰`,
      group_contribution: `${friendName} contributed to a group goal! 👥`,
    };

    const message = messages[activity.type] || `${friendName} had some activity!`;
    
    return await this.sendNotification(
      'Friend Activity',
      message,
      { type: 'friend_activity', friendName, activity }
    );
  }

  // Send group goal notification
  static async sendGroupGoalNotification(groupGoalName, action) {
    const messages = {
      created: `New group goal created: "${groupGoalName}"! 👥`,
      contribution: `Someone contributed to "${groupGoalName}"! 💰`,
      milestone: `"${groupGoalName}" reached a milestone! 🎯`,
    };

    const message = messages[action] || `Update for "${groupGoalName}"!`;
    
    return await this.sendNotification(
      'Group Goal Update',
      message,
      { type: 'group_goal', groupGoalName, action }
    );
  }

  // Cancel all notifications
  static async cancelAllNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }

  // Cancel specific notification
  static async cancelNotification(notificationId) {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  }

  // Get all scheduled notifications
  static async getScheduledNotifications() {
    return await Notifications.getAllScheduledNotificationsAsync();
  }

  // Set notification settings
  static async setNotificationSettings(settings) {
    const defaultSettings = {
      goalReminders: true,
      dailyReminders: true,
      weeklyReports: true,
      achievements: true,
      roundups: true,
      friendActivity: true,
      groupGoals: true,
    };

    const finalSettings = { ...defaultSettings, ...settings };
    
    // Store settings in AsyncStorage or other storage
    // This is a mock implementation
    console.log('Notification settings updated:', finalSettings);
    
    return finalSettings;
  }

  // Get notification settings
  static async getNotificationSettings() {
    // Mock implementation - in real app, this would read from storage
    return {
      goalReminders: true,
      dailyReminders: true,
      weeklyReports: true,
      achievements: true,
      roundups: true,
      friendActivity: true,
      groupGoals: true,
    };
  }

  // Initialize notification service
  static async initialize() {
    try {
      const hasPermission = await this.requestPermissions();
      if (hasPermission) {
        const token = await this.getPushToken();
        console.log('Push token:', token);
        
        // Schedule default notifications
        await this.scheduleDailyReminder();
        await this.scheduleWeeklyReport();
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error initializing notifications:', error);
      return false;
    }
  }

  // Handle notification received
  static handleNotificationReceived(notification) {
    console.log('Notification received:', notification);
    // Handle the notification based on its data
    const { data } = notification.request.content;
    
    switch (data.type) {
      case 'goal_reminder':
        // Navigate to goal detail
        break;
      case 'achievement':
        // Show achievement modal
        break;
      case 'roundup':
        // Show roundup summary
        break;
      default:
        // Handle other notification types
        break;
    }
  }

  // Handle notification response
  static handleNotificationResponse(response) {
    console.log('Notification response:', response);
    const { data } = response.notification.request.content;
    
    // Handle user interaction with notification
    // Navigate to appropriate screen based on notification type
  }
}

export default NotificationService; 
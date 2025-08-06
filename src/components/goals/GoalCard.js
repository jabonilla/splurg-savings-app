import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getCategoryEmoji } from '../../utils/emojiUtils';

const GoalCard = ({ goal, onPress }) => {
  const getProgressPercentage = () => {
    if (!goal.target_amount || goal.target_amount <= 0) return 0;
    return Math.min((goal.saved_amount / goal.target_amount) * 100, 100);
  };

  const getGoalEmoji = (category) => {
    return getCategoryEmoji(category);
  };

  const getGoalIconColor = (category) => {
    switch (category) {
      case 'technology':
        return '#007AFF';
      case 'travel':
        return '#FF9500';
      case 'shopping':
        return '#FF3B30';
      case 'food':
        return '#34C759';
      case 'entertainment':
        return '#AF52DE';
      default:
        return '#8E8E93';
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <View style={[styles.iconContainer, { backgroundColor: getGoalIconColor(goal.category) + '20' }]}>
            <Text style={styles.emojiText}>
              {getGoalEmoji(goal.category)}
            </Text>
          </View>
          <View style={styles.goalInfo}>
            <Text style={styles.goalName} numberOfLines={1}>
              {goal.name}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Text style={styles.moreButtonText}>⋯</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${getProgressPercentage()}%`,
                backgroundColor: goal.status === 'completed' ? '#34C759' : '#000000'
              }
            ]} 
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.amountText}>
          ${goal.saved_amount.toFixed(2)} / ${goal.target_amount.toFixed(2)}
        </Text>
        <TouchableOpacity style={styles.addContributionButton}>
          <Text style={styles.addContributionText}>add contribution</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  goalInfo: {
    flex: 1,
  },
  goalName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'serif',
  },
  moreButton: {
    padding: 5,
  },
  moreButtonText: {
    fontSize: 20,
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#F2F2F7',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountText: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'serif',
  },
  addContributionButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  addContributionText: {
    fontSize: 12,
    color: '#8E8E93',
    fontFamily: 'serif',
  },
  emojiText: {
    fontSize: 18,
  },
});

export default GoalCard; 
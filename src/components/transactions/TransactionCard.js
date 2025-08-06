import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getMerchantEmoji, getGoalEmoji } from '../../utils/emojiUtils';

const TransactionCard = ({ transaction, onPress }) => {
  const getMerchantEmojiData = (merchant) => {
    if (!merchant) {
      return { emoji: '🏪', color: '#8E8E93' };
    }
    
    const merchantLower = merchant.toLowerCase();
    
    if (merchantLower.includes('starbucks')) {
      return { emoji: '☕', color: '#34C759' };
    } else if (merchantLower.includes('target')) {
      return { emoji: '🛒', color: '#FF3B30' };
    } else if (merchantLower.includes('amazon')) {
      return { emoji: '📦', color: '#FF9500' };
    } else if (merchantLower.includes('uber') || merchantLower.includes('lyft')) {
      return { emoji: '🚗', color: '#000000' };
    } else if (merchantLower.includes('netflix') || merchantLower.includes('spotify')) {
      return { emoji: '📺', color: '#AF52DE' };
    } else {
      return { emoji: '🏪', color: '#8E8E93' };
    }
  };

  const getGoalEmojiData = (goalName) => {
    if (!goalName) {
      return '🎯';
    }
    
    const goalLower = goalName.toLowerCase();
    
    if (goalLower.includes('nike') || goalLower.includes('shoe')) {
      return '👟';
    } else if (goalLower.includes('trip') || goalLower.includes('vacation')) {
      return '✈️';
    } else if (goalLower.includes('phone') || goalLower.includes('iphone')) {
      return '💻';
    } else {
      return '🎯';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return 'Unknown Date';
    }
    
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const merchantEmojiData = getMerchantEmojiData(transaction?.merchant);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.leftSection}>
        <View style={[styles.merchantIcon, { backgroundColor: merchantEmojiData.color + '20' }]}>
          <Text style={styles.emojiText}>
            {merchantEmojiData.emoji}
          </Text>
        </View>
        <View style={styles.transactionInfo}>
          <Text style={styles.merchantName} numberOfLines={1}>
            {transaction?.merchant || 'Unknown Merchant'}
          </Text>
          <Text style={styles.transactionDate}>
            {formatDate(transaction?.date)}
          </Text>
          {transaction?.linked_goal && (
            <View style={styles.linkedGoal}>
              <Text style={styles.smallEmojiText}>
                {getGoalEmojiData(transaction.linked_goal)}
              </Text>
              <Text style={styles.linkedGoalText}>
                {transaction.linked_goal}
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.amount}>
          ${transaction.amount.toFixed(2)}
        </Text>
        {transaction.roundup_amount > 0 && (
          <Text style={styles.roundupAmount}>
            + {transaction.roundup_amount.toFixed(2)}
          </Text>
        )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  merchantIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  merchantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'serif',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'serif',
    marginBottom: 4,
  },
  linkedGoal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkedGoalText: {
    fontSize: 12,
    color: '#8E8E93',
    fontFamily: 'serif',
    marginLeft: 4,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'serif',
    marginBottom: 2,
  },
  roundupAmount: {
    fontSize: 14,
    color: '#34C759',
    fontFamily: 'serif',
  },
  emojiText: {
    fontSize: 20,
  },
  smallEmojiText: {
    fontSize: 12,
  },
});

export default TransactionCard; 
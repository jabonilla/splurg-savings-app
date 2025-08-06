import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';

// Actions
import { deleteTransaction } from '../../store/actions/transactionsActions';

const TransactionDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  
  const { transactionId } = route.params;
  const { transactions } = useSelector(state => state.transactions);
  const transaction = transactions.find(t => t.id === transactionId);

  if (!transaction) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Transaction not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const getMerchantIcon = (merchant) => {
    if (!merchant) return { name: 'store', color: '#8E8E93' };
    
    const merchantLower = merchant.toLowerCase();
    
    if (merchantLower.includes('starbucks')) {
      return { name: 'coffee', color: '#34C759' };
    } else if (merchantLower.includes('target')) {
      return { name: 'shopping-cart', color: '#FF3B30' };
    } else if (merchantLower.includes('amazon')) {
      return { name: 'shopping-bag', color: '#FF9500' };
    } else if (merchantLower.includes('uber') || merchantLower.includes('lyft')) {
      return { name: 'directions-car', color: '#000000' };
    } else if (merchantLower.includes('netflix') || merchantLower.includes('spotify')) {
      return { name: 'play-circle', color: '#AF52DE' };
    } else {
      return { name: 'store', color: '#8E8E93' };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown Date';
    
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
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            dispatch(deleteTransaction(transactionId));
            navigation.goBack();
          }
        },
      ]
    );
  };

  const merchantIcon = getMerchantIcon(transaction.merchant);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="chevron-left" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Transaction Details</Text>
          <TouchableOpacity style={styles.moreButton}>
            <Icon name="more-vert" size={24} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Transaction Info */}
        <View style={styles.transactionInfo}>
          {/* Merchant Section */}
          <View style={styles.merchantSection}>
            <View style={styles.merchantHeader}>
              <View style={[styles.merchantIcon, { backgroundColor: merchantIcon.color + '20' }]}>
                <Icon name={merchantIcon.name} size={32} color={merchantIcon.color} />
              </View>
              <View style={styles.merchantDetails}>
                <Text style={styles.merchantName}>{transaction.merchant || 'Unknown Merchant'}</Text>
                <Text style={styles.transactionDate}>{formatDate(transaction.date)}</Text>
              </View>
            </View>
            <View style={styles.amountSection}>
              <Text style={styles.amountLabel}>Transaction Amount</Text>
              <Text style={styles.amount}>${transaction.amount.toFixed(2)}</Text>
            </View>
          </View>

          {/* Roundup Section */}
          {transaction.roundup_amount > 0 && (
            <View style={styles.roundupSection}>
              <View style={styles.roundupHeader}>
                <Icon name="add-circle" size={20} color="#34C759" />
                <Text style={styles.roundupLabel}>Round-up Contribution</Text>
              </View>
              <Text style={styles.roundupAmount}>+ ${transaction.roundup_amount.toFixed(2)}</Text>
            </View>
          )}

          {/* Transaction Details */}
          <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>Transaction Details</Text>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Category</Text>
              <Text style={styles.detailValue}>{transaction.category}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Type</Text>
              <Text style={styles.detailValue}>{transaction.type}</Text>
            </View>
            
            {transaction.linked_goal && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Linked Goal</Text>
                <Text style={styles.detailValue}>{transaction.linked_goal}</Text>
              </View>
            )}
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>
                {new Date(transaction.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, styles.editButton]}
              onPress={() => navigation.navigate('EditTransaction', { transactionId })}
            >
              <Icon name="edit" size={20} color="#000000" />
              <Text style={[styles.actionButtonText, { color: '#000000' }]}>Edit</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.actionButton, styles.deleteButton]}
              onPress={handleDelete}
            >
              <Icon name="delete" size={20} color="#FF3B30" />
              <Text style={[styles.actionButtonText, { color: '#FF3B30' }]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'serif',
  },
  moreButton: {
    padding: 8,
  },
  transactionInfo: {
    padding: 20,
  },
  merchantSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  merchantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  merchantIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  merchantDetails: {
    flex: 1,
  },
  merchantName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'serif',
    marginBottom: 5,
  },
  transactionDate: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'serif',
  },
  amountSection: {
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'serif',
    marginBottom: 5,
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'serif',
  },
  roundupSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  roundupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  roundupLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'serif',
    marginLeft: 8,
  },
  roundupAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#34C759',
    fontFamily: 'serif',
  },
  detailsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'serif',
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  detailLabel: {
    fontSize: 16,
    color: '#8E8E93',
    fontFamily: 'serif',
  },
  detailValue: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'serif',
    textAlign: 'right',
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
  },
  editButton: {
    backgroundColor: '#F0F0F0',
  },
  deleteButton: {
    backgroundColor: '#F0F0F0',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'serif',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#8E8E93',
    fontFamily: 'serif',
  },
});

export default TransactionDetailScreen; 
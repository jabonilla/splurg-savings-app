import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Components
import TransactionCard from '../../components/transactions/TransactionCard';
import EmptyState from '../../components/common/EmptyState';
import LoadingSpinner from '../../components/common/LoadingSpinner';

// Services
import DataService from '../../services/DataService';
import PlaidService from '../../services/PlaidService';

const TransactionsScreen = () => {
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [roundupStats, setRoundupStats] = useState({
    totalRoundups: 0,
    totalTransactions: 0,
    averageRoundup: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [localTransactions, bankTransactions] = await Promise.all([
        DataService.getTransactions(),
        PlaidService.syncTransactions(),
      ]);

      // Merge local and bank transactions
      const allTransactions = [...localTransactions, ...bankTransactions];
      setTransactions(allTransactions);

      // Calculate stats
      const totalRoundups = allTransactions.reduce((sum, t) => sum + (t.roundup_amount || 0), 0);
      const averageRoundup = allTransactions.length > 0 ? totalRoundups / allTransactions.length : 0;

      setRoundupStats({
        totalRoundups,
        totalTransactions: allTransactions.length,
        averageRoundup,
      });
    } catch (error) {
      console.error('Error loading transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleTransactionPress = (transaction) => {
    navigation.navigate('TransactionDetail', { transactionId: transaction.id });
  };

  const handleRoundupHistory = () => {
    // TODO: Implement roundup history screen
    console.log('Roundup history pressed');
    Alert.alert('Coming Soon', 'Roundup history feature will be available soon!');
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Transactions</Text>
      <TouchableOpacity
        style={styles.statsButton}
        onPress={handleRoundupHistory}
      >
        <Icon name="analytics" size={20} color="#007AFF" />
      </TouchableOpacity>
    </View>
  );

  const renderStats = () => {
    return (
      <View style={styles.statsContainer}>
        <View style={styles.savingsSection}>
          <Text style={styles.savingsLabel}>This week's savings</Text>
          <Text style={styles.savingsAmount}>${roundupStats.totalRoundups.toFixed(2)}</Text>
        </View>
      </View>
    );
  };

  const renderFilters = () => (
    <View style={styles.filtersContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[
          { key: 'all', label: 'All' },
          { key: 'roundups', label: 'Roundups' },
          { key: 'contributions', label: 'Contributions' },
          { key: 'purchases', label: 'Purchases' },
        ].map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterButton,
              {
                backgroundColor: selectedFilter === filter.key ? '#000000' : '#FFFFFF',
              },
            ]}
            onPress={() => setSelectedFilter(filter.key)}
          >
            <Text
              style={[
                styles.filterText,
                {
                  color: selectedFilter === filter.key ? '#FFFFFF' : '#000000',
                },
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const getFilteredTransactions = () => {
    if (selectedFilter === 'all') return transactions;
    
    return transactions.filter(transaction => {
      switch (selectedFilter) {
        case 'roundups':
          return transaction.roundup_amount > 0;
        case 'contributions':
          return transaction.type === 'contribution';
        case 'purchases':
          return transaction.type === 'purchase';
        default:
          return true;
      }
    });
  };

  const renderTransactionsList = () => {
    if (loading && !refreshing) {
      return <LoadingSpinner />;
    }

    const filteredTransactions = getFilteredTransactions();

    if (filteredTransactions.length === 0) {
      return (
        <EmptyState
          icon="receipt"
          title="No Transactions"
          subtitle={selectedFilter === 'all' 
            ? "Your transactions will appear here once you connect your bank account"
            : `No ${selectedFilter} transactions found`
          }
          actionText="Connect Bank"
          onAction={() => navigation.navigate('LinkBankAccount')}
        />
      );
    }

    return (
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TransactionCard
            transaction={item}
            onPress={() => handleTransactionPress(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.transactionsList}
      />
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {renderStats()}
        {renderFilters()}
        {renderTransactionsList()}
      </ScrollView>
      
      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddTransaction')}
      >
        <Icon name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
  },
  statsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  savingsSection: {
    marginBottom: 20,
  },
  savingsLabel: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'serif',
    textDecorationLine: 'underline',
    marginBottom: 8,
  },
  savingsAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'serif',
  },
  filtersContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  transactionsList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
});

export default TransactionsScreen; 
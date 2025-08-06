import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import Logo from '../../components/common/Logo';

// Components
import GoalCard from '../../components/goals/GoalCard';
import TransactionCard from '../../components/transactions/TransactionCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';

// Actions
import { fetchGoals } from '../../store/actions/goalsActions';
import { fetchTransactions } from '../../store/actions/transactionsActions';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  const { goals, loading: goalsLoading } = useSelector(state => state.goals);
  const { transactions, loading: transactionsLoading } = useSelector(state => state.transactions);
  
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      await Promise.all([
        dispatch(fetchGoals()),
        dispatch(fetchTransactions())
      ]);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const getTotalSavings = () => {
    return goals.reduce((sum, goal) => sum + goal.saved_amount, 0);
  };

  const getActiveGoals = () => {
    return goals.filter(goal => goal.status === 'active').slice(0, 2);
  };

  const getRecentRoundups = () => {
    return transactions
      .filter(transaction => transaction.roundup_amount > 0)
      .slice(0, 2);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Hello, Michael</Text>
        </View>
        <Text style={styles.savingsLabel}>Your total savings</Text>
        <Text style={styles.savingsAmount}>${getTotalSavings().toFixed(2)}</Text>
      </View>
    </View>
  );

  const renderActiveGoals = () => {
    const activeGoals = getActiveGoals();
    
    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Goals</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Goals')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.goalsContainer}>
          {activeGoals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onPress={() => navigation.navigate('GoalDetail', { goalId: goal.id })}
            />
          ))}
        </View>
      </View>
    );
  };

  const renderRecentRoundups = () => {
    const recentRoundups = getRecentRoundups();
    
    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Round-Ups</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.transactionsContainer}>
          {recentRoundups.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              onPress={() => navigation.navigate('TransactionDetail', { transactionId: transaction.id })}
            />
          ))}
        </View>
      </View>
    );
  };

  if (goalsLoading || transactionsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {renderHeader()}
        {renderActiveGoals()}
        {renderRecentRoundups()}
      </ScrollView>
    </View>
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
    backgroundColor: '#FFFFFF',
    paddingTop: 0,
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop: 60,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000000',
  },
  headerContent: {
    marginTop: 10,
  },
  welcomeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 18,
    color: '#000000',
    fontFamily: 'serif',
  },
  settingsButton: {
    padding: 5,
  },
  savingsLabel: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'serif',
    marginBottom: 5,
  },
  savingsAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'serif',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'serif',
  },
  seeAllText: {
    fontSize: 14,
    color: '#007AFF',
    fontFamily: 'serif',
  },
  goalsContainer: {
    gap: 12,
  },
  transactionsContainer: {
    gap: 12,
  },
});

export default HomeScreen; 
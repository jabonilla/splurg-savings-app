import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';

// Actions
import { updateGoal } from '../../store/actions/goalsActions';

const ContributeGoalScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  
  const { goalId } = route.params;
  const { goals } = useSelector(state => state.goals);
  const goal = goals.find(g => g.id === goalId);

  const [amount, setAmount] = useState('');

  if (!goal) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Goal not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const getRemainingAmount = () => {
    return Math.max(goal.target_amount - goal.saved_amount, 0);
  };

  const getProgressPercentage = () => {
    return Math.min((goal.saved_amount / goal.target_amount) * 100, 100);
  };

  const handleContribute = () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    const contributionAmount = parseFloat(amount);
    const currentSaved = goal.saved_amount || 0;
    const newSavedAmount = Math.min(currentSaved + contributionAmount, goal.target_amount);

    const updatedGoal = {
      ...goal,
      saved_amount: newSavedAmount,
    };

    dispatch(updateGoal(updatedGoal));
    
    Alert.alert(
      'Contribution Added',
      `Successfully added $${contributionAmount.toFixed(2)} to your goal!`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  const handleQuickAmount = (quickAmount) => {
    setAmount(quickAmount.toString());
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contribute</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Goal Info */}
      <View style={styles.goalInfo}>
        <View style={styles.goalHeader}>
          <View style={[styles.goalIcon, { backgroundColor: goal.category_color + '20' }]}>
            <Icon name={goal.icon} size={24} color={goal.category_color} />
          </View>
          <View style={styles.goalTitleSection}>
            <Text style={styles.goalTitle}>{goal.name}</Text>
            <Text style={styles.goalCategory}>{goal.category}</Text>
          </View>
        </View>

        {/* Progress */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Current Progress</Text>
            <Text style={styles.progressPercentage}>{getProgressPercentage().toFixed(1)}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${getProgressPercentage()}%`, backgroundColor: goal.category_color }
              ]} 
            />
          </View>
                      <View style={styles.progressStats}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Saved</Text>
                <Text style={styles.statValue}>${(goal.saved_amount || 0).toFixed(2)}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Remaining</Text>
                <Text style={styles.statValue}>${getRemainingAmount().toFixed(2)}</Text>
              </View>
            </View>
        </View>

        {/* Contribution Amount */}
        <View style={styles.contributionSection}>
          <Text style={styles.sectionTitle}>Contribution Amount</Text>
          <View style={styles.amountInput}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.amountTextInput}
              value={amount}
              onChangeText={setAmount}
              placeholder="0.00"
              placeholderTextColor="#8E8E93"
              keyboardType="decimal-pad"
              autoFocus
            />
          </View>

          {/* Quick Amount Buttons */}
          <View style={styles.quickAmounts}>
            <Text style={styles.quickAmountLabel}>Quick Amounts</Text>
            <View style={styles.quickAmountButtons}>
              {[5, 10, 25, 50, 100].map((quickAmount) => (
                <TouchableOpacity
                  key={quickAmount}
                  style={styles.quickAmountButton}
                  onPress={() => handleQuickAmount(quickAmount)}
                >
                  <Text style={styles.quickAmountText}>${quickAmount}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Contribute Button */}
        <TouchableOpacity
          style={[
            styles.contributeButton,
            (!amount || parseFloat(amount) <= 0) && styles.contributeButtonDisabled
          ]}
          onPress={handleContribute}
          disabled={!amount || parseFloat(amount) <= 0}
        >
          <Icon name="add" size={20} color="#FFFFFF" />
          <Text style={styles.contributeButtonText}>Add Contribution</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
  placeholder: {
    width: 40,
  },
  goalInfo: {
    padding: 20,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  goalIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  goalTitleSection: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'serif',
    marginBottom: 5,
  },
  goalCategory: {
    fontSize: 16,
    color: '#8E8E93',
    fontFamily: 'serif',
  },
  progressSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'serif',
  },
  progressPercentage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'serif',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginBottom: 20,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
    fontFamily: 'serif',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'serif',
  },
  contributionSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
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
  amountInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
  },
  currencySymbol: {
    fontSize: 18,
    color: '#8E8E93',
    fontFamily: 'serif',
    marginRight: 8,
  },
  amountTextInput: {
    flex: 1,
    fontSize: 18,
    color: '#000000',
    fontFamily: 'serif',
  },
  quickAmounts: {
    marginTop: 10,
  },
  quickAmountLabel: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'serif',
    marginBottom: 10,
  },
  quickAmountButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  quickAmountButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  quickAmountText: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'serif',
  },
  contributeButton: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  contributeButtonDisabled: {
    backgroundColor: '#8E8E93',
  },
  contributeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
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

export default ContributeGoalScreen; 
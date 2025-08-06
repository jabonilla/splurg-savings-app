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

// Components
import GoalCard from '../../components/goals/GoalCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import DataService from '../../services/DataService';

const GoalsScreen = () => {
  const navigation = useNavigation();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      const userGoals = await DataService.getGoals();
      setGoals(userGoals);
    } catch (error) {
      console.error('Error loading goals:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadGoals();
    setRefreshing(false);
  };

  const getActiveGoals = () => {
    return goals.filter(goal => goal.status === 'active');
  };

  const getCompletedGoals = () => {
    return goals.filter(goal => goal.status === 'completed');
  };

  const handleCreateGoal = () => {
    navigation.navigate('CategorySelection');
  };

  const renderActiveGoals = () => {
    const activeGoals = getActiveGoals();
    
    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Goals</Text>
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

  const renderCompletedGoals = () => {
    const completedGoals = getCompletedGoals();
    
    if (completedGoals.length === 0) return null;
    
    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Past Goals</Text>
        </View>
        <View style={styles.goalsContainer}>
          {completedGoals.map((goal) => (
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

  if (loading) {
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
        {renderActiveGoals()}
        {renderCompletedGoals()}
      </ScrollView>

      {/* New Goal Button */}
      <TouchableOpacity
        style={styles.newGoalButton}
        onPress={handleCreateGoal}
        activeOpacity={0.8}
      >
        <Text style={styles.newGoalText}>New</Text>
      </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'serif',
  },
  goalsContainer: {
    gap: 12,
  },
  newGoalButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#000000',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  newGoalText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'serif',
  },
});

export default GoalsScreen; 
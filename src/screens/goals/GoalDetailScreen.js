import React, { useState, useEffect } from 'react';
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
import { updateGoal, deleteGoal } from '../../store/actions/goalsActions';

const GoalDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  
  const { goalId } = route.params;
  const { goals } = useSelector(state => state.goals);
  const goal = goals.find(g => g.id === goalId);

  const [isEditing, setIsEditing] = useState(false);

  if (!goal) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Goal not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const getProgressPercentage = () => {
    return Math.min((goal.saved_amount / goal.target_amount) * 100, 100);
  };

  const getRemainingAmount = () => {
    return Math.max(goal.target_amount - goal.saved_amount, 0);
  };

  const getDaysRemaining = () => {
    if (!goal.deadline) return null;
    const deadline = new Date(goal.deadline);
    const today = new Date();
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const handleEdit = () => {
    navigation.navigate('EditGoal', { goalId });
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Goal',
      'Are you sure you want to delete this goal? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            dispatch(deleteGoal(goalId));
            navigation.goBack();
          }
        },
      ]
    );
  };

  const handleContribute = () => {
    navigation.navigate('ContributeGoal', { goalId });
  };

  const handleComplete = () => {
    Alert.alert(
      'Complete Goal',
      'Mark this goal as completed?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Complete',
          onPress: () => {
            dispatch(updateGoal({ ...goal, status: 'completed' }));
            navigation.goBack();
          }
        },
      ]
    );
  };

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
          <Text style={styles.headerTitle}>Goal Details</Text>
          <TouchableOpacity style={styles.moreButton}>
            <Icon name="more-vert" size={24} color="#000000" />
          </TouchableOpacity>
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

          {/* Progress Section */}
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Progress</Text>
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
                <Text style={styles.statLabel}>Target</Text>
                <Text style={styles.statValue}>${(goal.target_amount || 0).toFixed(2)}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Remaining</Text>
                <Text style={styles.statValue}>${getRemainingAmount().toFixed(2)}</Text>
              </View>
            </View>
          </View>

          {/* Goal Details */}
          <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>Goal Details</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Round-up Amount</Text>
              <Text style={styles.detailValue}>${(goal.roundup_amount || 0).toFixed(2)}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Created</Text>
              <Text style={styles.detailValue}>
                {new Date(goal.created_at).toLocaleDateString()}
              </Text>
            </View>
            {goal.deadline && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Deadline</Text>
                <Text style={styles.detailValue}>
                  {new Date(goal.deadline).toLocaleDateString()}
                  {getDaysRemaining() !== null && (
                    <Text style={styles.daysRemaining}> ({getDaysRemaining()} days left)</Text>
                  )}
                </Text>
              </View>
            )}
            {goal.linked_account && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Linked Account</Text>
                <Text style={styles.detailValue}>{goal.linked_account}</Text>
              </View>
            )}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, styles.contributeButton]}
              onPress={handleContribute}
            >
              <Icon name="add" size={20} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Contribute</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.actionButton, styles.editButton]}
              onPress={handleEdit}
            >
              <Icon name="edit" size={20} color="#000000" />
              <Text style={[styles.actionButtonText, { color: '#000000' }]}>Edit</Text>
            </TouchableOpacity>
          </View>

          {/* Complete/Delete Buttons */}
          <View style={styles.bottomActions}>
            {goal.status === 'active' && (
              <TouchableOpacity
                style={[styles.actionButton, styles.completeButton]}
                onPress={handleComplete}
              >
                <Icon name="check-circle" size={20} color="#34C759" />
                <Text style={[styles.actionButtonText, { color: '#34C759' }]}>Mark Complete</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity
              style={[styles.actionButton, styles.deleteButton]}
              onPress={handleDelete}
            >
              <Icon name="delete" size={20} color="#FF3B30" />
              <Text style={[styles.actionButtonText, { color: '#FF3B30' }]}>Delete Goal</Text>
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
    justifyContent: 'space-between',
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
  },
  daysRemaining: {
    color: '#FF3B30',
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
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
  contributeButton: {
    backgroundColor: '#000000',
  },
  editButton: {
    backgroundColor: '#F0F0F0',
  },
  completeButton: {
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
  bottomActions: {
    gap: 12,
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

export default GoalDetailScreen; 
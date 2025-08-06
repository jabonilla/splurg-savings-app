import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';

// Actions
import { updateGoal } from '../../store/actions/goalsActions';

const EditGoalScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  
  const { goalId } = route.params;
  const { goals } = useSelector(state => state.goals);
  const goal = goals.find(g => g.id === goalId);

  const [formData, setFormData] = useState({
    name: '',
    target_amount: '',
    roundup_amount: '',
    deadline: '',
    category: '',
    linked_account: '',
  });

  useEffect(() => {
    if (goal) {
      setFormData({
        name: goal.name || '',
        target_amount: goal.target_amount?.toString() || '',
        roundup_amount: goal.roundup_amount?.toString() || '',
        deadline: goal.deadline || '',
        category: goal.category || '',
        linked_account: goal.linked_account || '',
      });
    }
  }, [goal]);

  if (!goal) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Goal not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleSave = () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Goal name is required');
      return;
    }

    if (!formData.target_amount || parseFloat(formData.target_amount) <= 0) {
      Alert.alert('Error', 'Target amount must be greater than 0');
      return;
    }

    const updatedGoal = {
      ...goal,
      name: formData.name.trim(),
      target_amount: parseFloat(formData.target_amount),
      roundup_amount: parseFloat(formData.roundup_amount) || 0,
      deadline: formData.deadline || null,
      category: formData.category || goal.category,
      linked_account: formData.linked_account || null,
    };

    dispatch(updateGoal(updatedGoal));
    navigation.goBack();
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancel Changes',
      'Are you sure you want to cancel? Your changes will be lost.',
      [
        { text: 'Keep Editing', style: 'cancel' },
        { 
          text: 'Cancel', 
          style: 'destructive',
          onPress: () => navigation.goBack()
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
            onPress={handleCancel}
          >
            <Icon name="chevron-left" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Goal</Text>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Goal Name */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Goal Name</Text>
            <TextInput
              style={styles.textInput}
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              placeholder="Enter goal name"
              placeholderTextColor="#8E8E93"
            />
          </View>

          {/* Target Amount */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Target Amount</Text>
            <View style={styles.amountInput}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.amountTextInput}
                value={formData.target_amount}
                onChangeText={(text) => setFormData({ ...formData, target_amount: text })}
                placeholder="0.00"
                placeholderTextColor="#8E8E93"
                keyboardType="decimal-pad"
              />
            </View>
          </View>

          {/* Round-up Amount */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Round-up Amount</Text>
            <View style={styles.amountInput}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.amountTextInput}
                value={formData.roundup_amount}
                onChangeText={(text) => setFormData({ ...formData, roundup_amount: text })}
                placeholder="0.00"
                placeholderTextColor="#8E8E93"
                keyboardType="decimal-pad"
              />
            </View>
          </View>

          {/* Category */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Category</Text>
            <TextInput
              style={styles.textInput}
              value={formData.category}
              onChangeText={(text) => setFormData({ ...formData, category: text })}
              placeholder="Enter category"
              placeholderTextColor="#8E8E93"
            />
          </View>

          {/* Deadline */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Deadline (Optional)</Text>
            <TextInput
              style={styles.textInput}
              value={formData.deadline}
              onChangeText={(text) => setFormData({ ...formData, deadline: text })}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#8E8E93"
            />
          </View>

          {/* Linked Account */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Linked Account (Optional)</Text>
            <TextInput
              style={styles.textInput}
              value={formData.linked_account}
              onChangeText={(text) => setFormData({ ...formData, linked_account: text })}
              placeholder="Enter account name"
              placeholderTextColor="#8E8E93"
            />
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
  saveButton: {
    padding: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    fontFamily: 'serif',
  },
  form: {
    padding: 20,
  },
  formSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'serif',
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000000',
    fontFamily: 'serif',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  amountInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  currencySymbol: {
    fontSize: 16,
    color: '#8E8E93',
    fontFamily: 'serif',
    marginRight: 8,
  },
  amountTextInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
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

export default EditGoalScreen; 
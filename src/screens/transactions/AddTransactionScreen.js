import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DataService from '../../services/DataService';
import { getCategoryEmoji } from '../../utils/emojiUtils';

const AddTransactionScreen = ({ navigation }) => {
  const [merchant, setMerchant] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [linkedGoal, setLinkedGoal] = useState('');
  const [goals, setGoals] = useState([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      const userGoals = await DataService.getGoals();
      setGoals(userGoals.filter(goal => goal.status === 'active'));
    } catch (error) {
      console.error('Error loading goals:', error);
    }
  };

  const categories = [
    { key: 'food', label: 'Food & Dining', emoji: '🍽️' },
    { key: 'shopping', label: 'Shopping', emoji: '🛍️' },
    { key: 'transportation', label: 'Transportation', emoji: '🚗' },
    { key: 'entertainment', label: 'Entertainment', emoji: '🎬' },
    { key: 'health', label: 'Health & Fitness', emoji: '💪' },
    { key: 'education', label: 'Education', emoji: '📚' },
    { key: 'home', label: 'Home & Garden', emoji: '🏠' },
    { key: 'technology', label: 'Technology', emoji: '💻' },
    { key: 'travel', label: 'Travel', emoji: '✈️' },
    { key: 'other', label: 'Other', emoji: '📦' },
  ];

  const handleSave = async () => {
    if (!merchant || !amount || !category) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    try {
      const transaction = {
        merchant,
        amount: amountValue,
        category,
        linked_goal: linkedGoal || null,
        type: 'purchase',
        roundup_amount: 0, // Will be calculated based on settings
      };

      await DataService.addTransaction(transaction);
      Alert.alert('Success', 'Transaction added successfully', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to add transaction');
    }
  };

  const getCategoryDisplay = () => {
    if (!category) return 'Select Category';
    const cat = categories.find(c => c.key === category);
    return cat ? `${cat.emoji} ${cat.label}` : category;
  };

  const getGoalDisplay = () => {
    if (!linkedGoal) return 'Link to Goal (Optional)';
    const goal = goals.find(g => g.id === linkedGoal);
    return goal ? goal.name : linkedGoal;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Transaction</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          {/* Merchant */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Merchant *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter merchant name"
              placeholderTextColor="#8E8E93"
              value={merchant}
              onChangeText={setMerchant}
            />
          </View>

          {/* Amount */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Amount *</Text>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              placeholderTextColor="#8E8E93"
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
            />
          </View>

          {/* Category */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Category *</Text>
            <TouchableOpacity
              style={styles.selector}
              onPress={() => setShowCategoryModal(true)}
            >
              <Text style={styles.selectorText}>{getCategoryDisplay()}</Text>
              <Icon name="keyboard-arrow-down" size={24} color="#000000" />
            </TouchableOpacity>
          </View>

          {/* Linked Goal */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Link to Goal</Text>
            <TouchableOpacity
              style={styles.selector}
              onPress={() => setShowGoalModal(true)}
            >
              <Text style={styles.selectorText}>{getGoalDisplay()}</Text>
              <Icon name="keyboard-arrow-down" size={24} color="#000000" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Transaction</Text>
        </TouchableOpacity>
      </View>

      {/* Category Modal */}
      <Modal
        visible={showCategoryModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Category</Text>
              <TouchableOpacity onPress={() => setShowCategoryModal(false)}>
                <Icon name="close" size={24} color="#000000" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalList}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.key}
                  style={styles.modalItem}
                  onPress={() => {
                    setCategory(cat.key);
                    setShowCategoryModal(false);
                  }}
                >
                  <Text style={styles.modalItemEmoji}>{cat.emoji}</Text>
                  <Text style={styles.modalItemText}>{cat.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Goal Modal */}
      <Modal
        visible={showGoalModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowGoalModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Goal</Text>
              <TouchableOpacity onPress={() => setShowGoalModal(false)}>
                <Icon name="close" size={24} color="#000000" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalList}>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  setLinkedGoal('');
                  setShowGoalModal(false);
                }}
              >
                <Text style={styles.modalItemText}>No Goal</Text>
              </TouchableOpacity>
              {goals.map((goal) => (
                <TouchableOpacity
                  key={goal.id}
                  style={styles.modalItem}
                  onPress={() => {
                    setLinkedGoal(goal.id);
                    setShowGoalModal(false);
                  }}
                >
                  <Text style={styles.modalItemEmoji}>
                    {getCategoryEmoji(goal.category)}
                  </Text>
                  <Text style={styles.modalItemText}>{goal.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
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
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
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
  content: {
    flex: 1,
  },
  form: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'serif',
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    fontSize: 18,
    color: '#000000',
    fontFamily: 'serif',
    paddingVertical: 12,
  },
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingVertical: 12,
  },
  selectorText: {
    fontSize: 18,
    color: '#000000',
    fontFamily: 'serif',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  saveButton: {
    backgroundColor: '#000000',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'serif',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'serif',
  },
  modalList: {
    padding: 20,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalItemEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  modalItemText: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'serif',
  },
});

export default AddTransactionScreen; 
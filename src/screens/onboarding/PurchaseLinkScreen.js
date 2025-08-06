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
import Icon from 'react-native-vector-icons/MaterialIcons';
import DataService from '../../services/DataService';

const PurchaseLinkScreen = ({ navigation }) => {
  const [website, setWebsite] = useState('');

  const handleContinue = async () => {
    if (website.trim().length === 0) {
      Alert.alert('Error', 'Please enter a website');
      return;
    }

    try {
      // Get all the data from the navigation state
      const route = navigation.getState().routes;
      const categoryScreen = route.find(r => r.name === 'CategorySelection');
      const groupGoalScreen = route.find(r => r.name === 'GroupGoal');
      const roundupScreen = route.find(r => r.name === 'RoundupAmount');
      const targetScreen = route.find(r => r.name === 'TargetAmount');
      const paymentScreen = route.find(r => r.name === 'PaymentOption');
      const goalNameScreen = route.find(r => r.name === 'GoalName');

      const goalData = {
        name: goalNameScreen?.params?.goalName || 'New Goal',
        description: `Goal for ${goalNameScreen?.params?.goalName || 'New Goal'}`,
        category: categoryScreen?.params?.category || 'other',
        target_amount: parseFloat(targetScreen?.params?.targetAmount || 100),
        roundup_amount: parseFloat(roundupScreen?.params?.roundupAmount || 1),
        payment_method: paymentScreen?.params?.paymentMethod || 'card',
        website: website,
        group_goal: groupGoalScreen?.params?.isGroupGoal || false,
        friends: groupGoalScreen?.params?.selectedFriends || [],
        automatic_purchase: true, // Default to true for now
        deadline: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year from now
      };

      // Save the goal using DataService
      const newGoal = await DataService.addGoal(goalData);
      
      Alert.alert('Success', 'Goal created successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('MainTabs') }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to create goal. Please try again.');
    }
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
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.navigate('MainTabs')}
        >
          <Icon name="close" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Purchase Link</Text>
        
        <TextInput
          style={styles.websiteInput}
          placeholder="Website"
          placeholderTextColor="#8E8E93"
          value={website}
          onChangeText={setWebsite}
          autoFocus
        />

        <TouchableOpacity
          style={[
            styles.continueButton,
            website.trim().length > 0 && styles.continueButtonActive
          ]}
          onPress={handleContinue}
          disabled={website.trim().length === 0}
          activeOpacity={0.8}
        >
          <Text style={styles.continueText}>Create Goal</Text>
        </TouchableOpacity>
      </View>
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
    paddingBottom: 40,
  },
  backButton: {
    padding: 8,
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'serif',
    marginBottom: 40,
  },
  websiteInput: {
    fontSize: 18,
    color: '#000000',
    fontFamily: 'serif',
    textAlign: 'center',
    marginBottom: 40,
    width: '100%',
    paddingVertical: 10,
  },
  continueButton: {
    backgroundColor: '#8E8E93',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 40,
    minWidth: 200,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  continueButtonActive: {
    backgroundColor: '#000000',
  },
  continueText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'serif',
  },
});

export default PurchaseLinkScreen; 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RoundupAmountScreen = ({ navigation }) => {
  const [amount, setAmount] = useState('');

  const handleContinue = () => {
    if (amount && parseFloat(amount) > 0) {
      navigation.navigate('TargetAmount');
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
        <Text style={styles.title}>What's the round-up amount</Text>
        
        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="0.00"
            placeholderTextColor="#8E8E93"
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            autoFocus
          />
        </View>

        <TouchableOpacity
          style={[
            styles.continueButton,
            amount && parseFloat(amount) > 0 && styles.continueButtonActive
          ]}
          onPress={handleContinue}
          disabled={!amount || parseFloat(amount) <= 0}
          activeOpacity={0.8}
        >
          <Text style={styles.continueText}>Continue</Text>
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
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  currencySymbol: {
    fontSize: 24,
    color: '#8E8E93',
    fontFamily: 'serif',
    marginRight: 10,
  },
  amountInput: {
    fontSize: 24,
    color: '#8E8E93',
    fontFamily: 'serif',
    textAlign: 'center',
    minWidth: 100,
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

export default RoundupAmountScreen; 
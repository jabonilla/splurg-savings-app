import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PaymentOptionScreen = ({ navigation }) => {
  const [selectedPayment, setSelectedPayment] = useState('Cards / Accounts');
  const [showModal, setShowModal] = useState(false);

  const paymentMethods = [
    'Visa ending in 1234',
    'Mastercard ending in 5678',
    'Chase Bank Account',
    'Wells Fargo Account',
    'Add New Payment Method',
  ];

  const handleContinue = () => {
    if (selectedPayment !== 'Cards / Accounts') {
      navigation.navigate('GoalName');
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
        <Text style={styles.title}>Choose a Payment Option</Text>
        
        <TouchableOpacity
          style={styles.paymentSelector}
          onPress={() => setShowModal(true)}
        >
          <Text style={styles.paymentText}>{selectedPayment}</Text>
          <Icon name="keyboard-arrow-down" size={24} color="#000000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.continueButton,
            selectedPayment !== 'Cards / Accounts' && styles.continueButtonActive
          ]}
          onPress={handleContinue}
          disabled={selectedPayment === 'Cards / Accounts'}
          activeOpacity={0.8}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>

      {/* Payment Methods Modal */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Payment Method</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Icon name="close" size={24} color="#000000" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              {paymentMethods.map((method) => (
                <TouchableOpacity
                  key={method}
                  style={styles.paymentOption}
                  onPress={() => {
                    setSelectedPayment(method);
                    setShowModal(false);
                  }}
                >
                  <Text style={styles.paymentOptionText}>{method}</Text>
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
  paymentSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    marginBottom: 40,
  },
  paymentText: {
    fontSize: 18,
    color: '#8E8E93',
    fontFamily: 'serif',
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
  modalBody: {
    padding: 20,
  },
  paymentOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  paymentOptionText: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'serif',
  },
});

export default PaymentOptionScreen; 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PlaidService from '../../services/PlaidService';

const LinkBankAccountScreen = () => {
  const navigation = useNavigation();
  const [selectedBank, setSelectedBank] = useState('');
  const [accountType, setAccountType] = useState('');
  const [isLinking, setIsLinking] = useState(false);

  const banks = [
    { id: 'chase', name: 'Chase Bank', logo: '🏦' },
    { id: 'wells-fargo', name: 'Wells Fargo', logo: '🏦' },
    { id: 'bank-of-america', name: 'Bank of America', logo: '🏦' },
    { id: 'citibank', name: 'Citibank', logo: '🏦' },
    { id: 'us-bank', name: 'U.S. Bank', logo: '🏦' },
    { id: 'capital-one', name: 'Capital One', logo: '🏦' },
    { id: 'american-express', name: 'American Express', logo: '💳' },
    { id: 'discover', name: 'Discover', logo: '💳' },
  ];

  const accountTypes = [
    { id: 'checking', name: 'Checking Account' },
    { id: 'savings', name: 'Savings Account' },
    { id: 'credit', name: 'Credit Card' },
  ];

  const handleLinkAccount = async () => {
    if (!selectedBank || !accountType) {
      Alert.alert('Error', 'Please select both a bank and account type');
      return;
    }

    setIsLinking(true);
    
    try {
      const result = await PlaidService.linkBankAccount();
      
      if (result.success) {
        Alert.alert(
          'Account Linked Successfully',
          'Your bank account has been connected. You can now enable automatic transaction syncing.',
          [
            {
              text: 'Continue',
              onPress: () => navigation.navigate('MainTabs')
            }
          ]
        );
      } else {
        Alert.alert('Error', 'Failed to link account. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to link account. Please try again.');
    } finally {
      setIsLinking(false);
    }
  };

  const renderBankOption = (bank) => (
    <TouchableOpacity
      key={bank.id}
      style={[
        styles.bankOption,
        selectedBank === bank.id && styles.bankOptionSelected
      ]}
      onPress={() => setSelectedBank(bank.id)}
    >
      <Text style={styles.bankLogo}>{bank.logo}</Text>
      <Text style={[
        styles.bankName,
        selectedBank === bank.id && styles.bankNameSelected
      ]}>
        {bank.name}
      </Text>
      {selectedBank === bank.id && (
        <Icon name="check-circle" size={20} color="#34C759" />
      )}
    </TouchableOpacity>
  );

  const renderAccountTypeOption = (type) => (
    <TouchableOpacity
      key={type.id}
      style={[
        styles.accountTypeOption,
        accountType === type.id && styles.accountTypeOptionSelected
      ]}
      onPress={() => setAccountType(type.id)}
    >
      <Text style={[
        styles.accountTypeName,
        accountType === type.id && styles.accountTypeNameSelected
      ]}>
        {type.name}
      </Text>
      {accountType === type.id && (
        <Icon name="check-circle" size={20} color="#34C759" />
      )}
    </TouchableOpacity>
  );

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
          <Text style={styles.headerTitle}>Link Bank Account</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Security Notice */}
          <View style={styles.securityNotice}>
            <Icon name="security" size={24} color="#34C759" />
            <View style={styles.securityText}>
              <Text style={styles.securityTitle}>Secure Connection</Text>
              <Text style={styles.securityDescription}>
                Your bank credentials are encrypted and never stored on our servers. 
                We use bank-level security to protect your information.
              </Text>
            </View>
          </View>

          {/* Bank Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Your Bank</Text>
            <View style={styles.bankOptions}>
              {banks.map(renderBankOption)}
            </View>
          </View>

          {/* Account Type Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account Type</Text>
            <View style={styles.accountTypeOptions}>
              {accountTypes.map(renderAccountTypeOption)}
            </View>
          </View>

          {/* Features */}
          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>What You'll Get</Text>
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <Icon name="sync" size={20} color="#34C759" />
                <Text style={styles.featureText}>Automatic transaction syncing</Text>
              </View>
              <View style={styles.featureItem}>
                <Icon name="auto-fix-high" size={20} color="#34C759" />
                <Text style={styles.featureText}>Smart roundup calculations</Text>
              </View>
              <View style={styles.featureItem}>
                <Icon name="trending-up" size={20} color="#34C759" />
                <Text style={styles.featureText}>Real-time savings tracking</Text>
              </View>
              <View style={styles.featureItem}>
                <Icon name="notifications" size={20} color="#34C759" />
                <Text style={styles.featureText}>Instant roundup notifications</Text>
              </View>
            </View>
          </View>

          {/* Link Button */}
          <TouchableOpacity
            style={[
              styles.linkButton,
              (!selectedBank || !accountType) && styles.linkButtonDisabled
            ]}
            onPress={handleLinkAccount}
            disabled={!selectedBank || !accountType || isLinking}
          >
            {isLinking ? (
              <>
                <Icon name="sync" size={20} color="#FFFFFF" style={styles.spinning} />
                <Text style={styles.linkButtonText}>Linking Account...</Text>
              </>
            ) : (
              <>
                <Icon name="link" size={20} color="#FFFFFF" />
                <Text style={styles.linkButtonText}>Link Account</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Privacy Notice */}
          <View style={styles.privacyNotice}>
            <Text style={styles.privacyText}>
              By linking your account, you agree to our Terms of Service and Privacy Policy. 
              Your data is protected with bank-level encryption.
            </Text>
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
  placeholder: {
    width: 40,
  },
  content: {
    padding: 20,
  },
  securityNotice: {
    flexDirection: 'row',
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
  securityText: {
    flex: 1,
    marginLeft: 15,
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'serif',
    marginBottom: 5,
  },
  securityDescription: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'serif',
    lineHeight: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'serif',
    marginBottom: 15,
  },
  bankOptions: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bankOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  bankOptionSelected: {
    backgroundColor: '#F8F8F8',
  },
  bankLogo: {
    fontSize: 24,
    marginRight: 15,
  },
  bankName: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    fontFamily: 'serif',
  },
  bankNameSelected: {
    fontWeight: '600',
  },
  accountTypeOptions: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  accountTypeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  accountTypeOptionSelected: {
    backgroundColor: '#F8F8F8',
  },
  accountTypeName: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    fontFamily: 'serif',
  },
  accountTypeNameSelected: {
    fontWeight: '600',
  },
  featuresSection: {
    marginBottom: 30,
  },
  featuresList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureText: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    fontFamily: 'serif',
    marginLeft: 12,
  },
  linkButton: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  linkButtonDisabled: {
    backgroundColor: '#8E8E93',
  },
  linkButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'serif',
  },
  spinning: {
    transform: [{ rotate: '360deg' }],
  },
  privacyNotice: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 15,
  },
  privacyText: {
    fontSize: 12,
    color: '#8E8E93',
    fontFamily: 'serif',
    lineHeight: 16,
    textAlign: 'center',
  },
});

export default LinkBankAccountScreen; 
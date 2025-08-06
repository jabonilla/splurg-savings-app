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
import Logo from '../../components/common/Logo';

const EmailScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleContinue = () => {
    if (email.includes('@') && email.includes('.')) {
      navigation.navigate('Username');
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
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>What's your email?</Text>
        
        <View style={styles.emailInputContainer}>
          <TextInput
            style={styles.emailInput}
            placeholder="enter email"
            placeholderTextColor="#8E8E93"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            textAlign="center"
          />
        </View>

        <TouchableOpacity
          style={[
            styles.continueButton,
            email.includes('@') && email.includes('.') && styles.continueButtonActive
          ]}
          onPress={handleContinue}
          disabled={!email.includes('@') || !email.includes('.')}
          activeOpacity={0.8}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Logo size={60} />
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000000',
    fontWeight: '600',
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
    marginBottom: 20,
  },
  emailInputContainer: {
    paddingBottom: 10,
    marginBottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  emailInput: {
    fontSize: 20,
    color: '#000000',
    fontFamily: 'serif',
    textAlign: 'center',
    width: '100%',
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
  logoContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
});

export default EmailScreen; 
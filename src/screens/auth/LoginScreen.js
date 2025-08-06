import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../../components/common/Logo';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const result = await login({
        email,
        name: email.split('@')[0], // Mock name from email
        id: Date.now().toString(),
      });

      if (result.success) {
        // Navigation will be handled by the auth state change
      } else {
        Alert.alert('Error', result.error || 'Login failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          {/* Logo Section */}
          <View style={styles.logoSection}>
            <Logo size={80} />
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue saving</Text>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#8E8E93"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#8E8E93"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <TouchableOpacity
              style={[styles.loginButton, loading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.loginButtonText}>
                {loading ? 'Signing In...' : 'Sign In'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.registerLink}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.registerText}>
                Don't have an account? <Text style={styles.registerTextBold}>Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'serif',
    marginTop: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    fontFamily: 'serif',
    textAlign: 'center',
  },
  formSection: {
    width: '100%',
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
  loginButton: {
    backgroundColor: '#000000',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
  },
  loginButtonDisabled: {
    backgroundColor: '#8E8E93',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'serif',
  },
  registerLink: {
    alignItems: 'center',
  },
  registerText: {
    fontSize: 16,
    color: '#8E8E93',
    fontFamily: 'serif',
  },
  registerTextBold: {
    color: '#000000',
    fontWeight: '600',
  },
});

export default LoginScreen; 
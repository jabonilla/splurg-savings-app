import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Logo from '../../components/common/Logo';

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <Logo size={240} />
        </View>

        {/* Get Started Button */}
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => navigation.navigate('PhoneNumber')}
          activeOpacity={0.8}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>

        {/* Terms of Service */}
        <Text style={styles.termsText}>
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 120,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 40,
  },
  logoContainer: {
    position: 'relative',
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoS: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#000000',
  },
  starsContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  star1: {
    position: 'absolute',
    top: 5,
    left: 10,
    fontSize: 16,
    color: '#FF3B30',
  },
  star2: {
    position: 'absolute',
    bottom: 5,
    right: 10,
    fontSize: 16,
    color: '#FF3B30',
  },
  getStartedButton: {
    backgroundColor: '#000000',
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
    marginBottom: 10,
  },
  getStartedText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'serif',
  },
  termsText: {
    fontSize: 10,
    color: '#666666',
    textAlign: 'center',
    fontFamily: 'serif',
    lineHeight: 16,
    paddingHorizontal: 20,
    fontWeight: '300',
    marginBottom: 10,
  },
});

export default WelcomeScreen; 
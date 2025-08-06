/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import store from './src/store';
import ProfileScreen from './src/screens/main/ProfileScreen';
import SettingsScreen from './src/screens/main/SettingsScreen';

// Import goal management screens
import GoalDetailScreen from './src/screens/goals/GoalDetailScreen';
import EditGoalScreen from './src/screens/goals/EditGoalScreen';
import ContributeGoalScreen from './src/screens/goals/ContributeGoalScreen';

// Import transaction management screens
import TransactionDetailScreen from './src/screens/transactions/TransactionDetailScreen';
import AddTransactionScreen from './src/screens/transactions/AddTransactionScreen';

// Import banking screens
import LinkBankAccountScreen from './src/screens/banking/LinkBankAccountScreen';

// Import social screens
import FriendsScreen from './src/screens/social/FriendsScreen';

// Import placeholder screens
import AddFriendScreen from './src/screens/main/AddFriendScreen';
import ProfileSettingScreen from './src/screens/main/ProfileSettingScreen';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';

// Import auth screens
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';

// Import onboarding screens
import WelcomeScreen from './src/screens/onboarding/WelcomeScreen';
import PhoneNumberScreen from './src/screens/onboarding/PhoneNumberScreen';
import VerificationCodeScreen from './src/screens/onboarding/VerificationCodeScreen';
import CreatePinScreen from './src/screens/onboarding/CreatePinScreen';
import EmailScreen from './src/screens/onboarding/EmailScreen';
import UsernameScreen from './src/screens/onboarding/UsernameScreen';
import CategorySelectionScreen from './src/screens/onboarding/CategorySelectionScreen';

// Import goal creation screens
import GroupGoalScreen from './src/screens/onboarding/GroupGoalScreen';
import RoundupAmountScreen from './src/screens/onboarding/RoundupAmountScreen';
import TargetAmountScreen from './src/screens/onboarding/TargetAmountScreen';
import PaymentOptionScreen from './src/screens/onboarding/PaymentOptionScreen';
import GoalNameScreen from './src/screens/onboarding/GoalNameScreen';
import PurchaseLinkScreen from './src/screens/onboarding/PurchaseLinkScreen';
import AutomaticPurchaseScreen from './src/screens/onboarding/AutomaticPurchaseScreen';

// Import main screens
import HomeScreen from './src/screens/main/HomeScreen';
import GoalsScreen from './src/screens/main/GoalsScreen';
import TransactionsScreen from './src/screens/main/TransactionsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Main Tab Navigator
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home'; // Default icon

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Goals') {
            iconName = 'star';
          } else if (route.name === 'Transactions') {
            iconName = 'list';
          } else if (route.name === 'Friends') {
            iconName = 'people';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 80,
          paddingBottom: 15,
          paddingTop: 10,
          paddingHorizontal: 0,
        },
        tabBarLabelStyle: {
          fontFamily: 'serif',
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Goals" component={GoalsScreen} />
      <Tab.Screen name="Transactions" component={TransactionsScreen} />
      <Tab.Screen name="Friends" component={FriendsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Onboarding Stack Navigator
const OnboardingStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
      <Stack.Screen name="VerificationCode" component={VerificationCodeScreen} />
      <Stack.Screen name="CreatePin" component={CreatePinScreen} />
      <Stack.Screen name="Email" component={EmailScreen} />
      <Stack.Screen name="Username" component={UsernameScreen} />
      <Stack.Screen name="CategorySelection" component={CategorySelectionScreen} />
      <Stack.Screen name="GroupGoal" component={GroupGoalScreen} />
      <Stack.Screen name="RoundupAmount" component={RoundupAmountScreen} />
      <Stack.Screen name="TargetAmount" component={TargetAmountScreen} />
      <Stack.Screen name="PaymentOption" component={PaymentOptionScreen} />
      <Stack.Screen name="GoalName" component={GoalNameScreen} />
      <Stack.Screen name="PurchaseLink" component={PurchaseLinkScreen} />
      <Stack.Screen name="AutomaticPurchase" component={AutomaticPurchaseScreen} />
    </Stack.Navigator>
  );
};

// Root Stack Navigator
const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingStack} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Settings" component={SettingsScreen} />

      {/* Goal Management Screens */}
      <Stack.Screen name="GoalDetail" component={GoalDetailScreen} />
      <Stack.Screen name="EditGoal" component={EditGoalScreen} />
      <Stack.Screen name="ContributeGoal" component={ContributeGoalScreen} />

      {/* Transaction Management Screens */}
      <Stack.Screen name="TransactionDetail" component={TransactionDetailScreen} />
      <Stack.Screen name="AddTransaction" component={AddTransactionScreen} />

      {/* Banking Screens */}
      <Stack.Screen name="LinkBankAccount" component={LinkBankAccountScreen} />

      {/* Social Screens */}
      <Stack.Screen name="Friends" component={FriendsScreen} />

      {/* Placeholder Screens */}
      <Stack.Screen name="AddFriend" component={AddFriendScreen} />
      <Stack.Screen name="ProfileSetting" component={ProfileSettingScreen} />
    </Stack.Navigator>
  );
};

// Auth Navigator
const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null; // You can add a loading screen here
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <RootNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </Provider>
  );
}

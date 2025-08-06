import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Logo from '../../components/common/Logo';

const SettingsScreen = ({ navigation }) => {
  const settingsOptions = [
    {
      id: 'profile',
      title: 'Profile Setting',
      icon: 'person',
      onPress: () => navigation.navigate('ProfileSetting'),
    },
    {
      id: 'security',
      title: 'Security',
      icon: 'security',
      onPress: () => {
        // TODO: Implement security screen
        console.log('Security pressed');
      },
    },
    {
      id: 'linked-accounts',
      title: 'Link Bank Account',
      icon: 'account-balance',
      onPress: () => navigation.navigate('LinkBankAccount'),
    },
    {
      id: 'friends',
      title: 'Friends',
      icon: 'people',
      onPress: () => navigation.navigate('Friends'),
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: 'help',
      onPress: () => {
        // TODO: Implement help & support screen
        console.log('Help & Support pressed');
      },
    },
  ];

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
        <Logo size={28} />
        <View style={styles.placeholder} />
      </View>

      {/* Settings List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Settings</Text>
        
        {settingsOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.settingItem}
            onPress={option.onPress}
            activeOpacity={0.7}
          >
            <View style={styles.settingLeft}>
              <View style={styles.iconContainer}>
                <Icon name={option.icon} size={24} color="#000000" />
              </View>
              <Text style={styles.settingTitle}>{option.title}</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#8E8E93" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
    fontWeight: 'bold',
    color: '#000000',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'serif',
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'serif',
  },
});

export default SettingsScreen; 
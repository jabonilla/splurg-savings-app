import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Logo from '../../components/common/Logo';
import { useAuth } from '../../contexts/AuthContext';

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  
  const userStats = {
    totalSaved: 2149,
    goalsCompleted: 1,
    daysActive: 365,
  };

  const achievements = [
    {
      id: 'goals-completed',
      title: 'Goals Completed',
      value: '1',
      color: '#34C759',
    },
    {
      id: 'splurg-streak',
      title: 'Splurg Day Streak',
      value: '365',
      color: '#34C759',
    },
    {
      id: 'big-spender',
      title: 'Big Spender',
      value: '🏆',
      color: '#FFD700',
      isSpecial: true,
    },
  ];

  const friends = [
    { id: 1, name: 'Fred Sanchez', avatar: null },
    { id: 2, name: 'Sam Cox', avatar: null },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Logo size={32} />
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Icon name="settings" size={24} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* User Info */}
        <View style={styles.userSection}>
          <Text style={styles.greeting}>Hello, {user?.name || 'User'}</Text>
          <Text style={styles.savingsLabel}>Your total savings</Text>
          <Text style={styles.savingsAmount}>$2,149</Text>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.achievementsContainer}>
            {achievements.map((achievement) => (
              <View
                key={achievement.id}
                style={[
                  styles.achievementCard,
                  achievement.isSpecial && styles.specialAchievement
                ]}
              >
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={[styles.achievementValue, { color: achievement.color }]}>
                  {achievement.value}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Friends */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Friends</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See More</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.friendsContainer}>
            {friends.map((friend) => (
              <View key={friend.id} style={styles.friendCard}>
                <View style={styles.friendAvatar}>
                  <Icon name="person" size={24} color="#8E8E93" />
                </View>
                <View style={styles.friendInfo}>
                  <Text style={styles.friendName}>{friend.name}</Text>
                </View>
                <TouchableOpacity style={styles.friendOptions}>
                  <Icon name="more-vert" size={20} color="#8E8E93" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {
              Alert.alert(
                'Logout',
                'Are you sure you want to logout?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Logout', style: 'destructive', onPress: logout },
                ]
              );
            }}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
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
  appTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  settingsButton: {
    padding: 8,
  },
  userSection: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  greeting: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'serif',
    marginBottom: 8,
    fontWeight: '300',
  },
  savingsLabel: {
    fontSize: 24,
    color: '#000000',
    fontFamily: 'serif',
    marginBottom: 8,
    fontWeight: '400',
  },
  savingsAmount: {
    fontSize: 28,
    fontWeight: '400',
    color: '#000000',
    fontFamily: 'serif',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'serif',
  },
  seeAllText: {
    fontSize: 14,
    color: '#007AFF',
    fontFamily: 'serif',
  },
  achievementsContainer: {
    gap: 12,
  },
  achievementCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  specialAchievement: {
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  achievementTitle: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'serif',
  },
  achievementValue: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'serif',
  },
  friendsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  friendCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  friendAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  friendInfo: {
    alignItems: 'center',
  },
  friendName: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'serif',
    textAlign: 'center',
  },
  friendOptions: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 4,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'serif',
  },
});

export default ProfileScreen; 
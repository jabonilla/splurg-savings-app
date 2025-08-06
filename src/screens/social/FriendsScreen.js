import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FriendsScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('friends');

  // Mock data
  const friends = [
    { id: 1, name: 'Fred Sanchez', avatar: null, status: 'online', totalSaved: 1250 },
    { id: 2, name: 'Sam Cox', avatar: null, status: 'offline', totalSaved: 890 },
    { id: 3, name: 'Emma Wilson', avatar: null, status: 'online', totalSaved: 2100 },
    { id: 4, name: 'Mike Johnson', avatar: null, status: 'offline', totalSaved: 750 },
  ];

  const pendingRequests = [
    { id: 5, name: 'Sarah Davis', avatar: null, mutualFriends: 2 },
    { id: 6, name: 'Alex Thompson', avatar: null, mutualFriends: 1 },
  ];

  const suggestedFriends = [
    { id: 7, name: 'Jessica Brown', avatar: null, mutualFriends: 3 },
    { id: 8, name: 'David Lee', avatar: null, mutualFriends: 2 },
    { id: 9, name: 'Lisa Garcia', avatar: null, mutualFriends: 1 },
  ];

  const handleAddFriend = (friendId) => {
    Alert.alert(
      'Add Friend',
      'Send friend request?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Send Request',
          onPress: () => {
            // TODO: Implement friend request
            Alert.alert('Success', 'Friend request sent!');
          }
        },
      ]
    );
  };

  const handleAcceptRequest = (friendId) => {
    Alert.alert(
      'Accept Request',
      'Accept friend request?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Accept',
          onPress: () => {
            // TODO: Implement accept request
            Alert.alert('Success', 'Friend request accepted!');
          }
        },
      ]
    );
  };

  const handleRemoveFriend = (friendId) => {
    Alert.alert(
      'Remove Friend',
      'Are you sure you want to remove this friend?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement remove friend
            Alert.alert('Success', 'Friend removed');
          }
        },
      ]
    );
  };

  const renderFriend = ({ item }) => (
    <View style={styles.friendCard}>
      <View style={styles.friendInfo}>
        <View style={styles.avatarContainer}>
          <Icon name="person" size={32} color="#8E8E93" />
          <View style={[
            styles.statusIndicator,
            { backgroundColor: item.status === 'online' ? '#34C759' : '#8E8E93' }
          ]} />
        </View>
        <View style={styles.friendDetails}>
          <Text style={styles.friendName}>{item.name}</Text>
          <Text style={styles.friendStats}>${item.totalSaved.toLocaleString()} saved</Text>
        </View>
      </View>
      <View style={styles.friendActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('FriendProfile', { friendId: item.id })}
        >
          <Icon name="person" size={20} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleRemoveFriend(item.id)}
        >
          <Icon name="more-vert" size={20} color="#8E8E93" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPendingRequest = ({ item }) => (
    <View style={styles.friendCard}>
      <View style={styles.friendInfo}>
        <View style={styles.avatarContainer}>
          <Icon name="person" size={32} color="#8E8E93" />
        </View>
        <View style={styles.friendDetails}>
          <Text style={styles.friendName}>{item.name}</Text>
          <Text style={styles.friendStats}>{item.mutualFriends} mutual friends</Text>
        </View>
      </View>
      <View style={styles.friendActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.acceptButton]}
          onPress={() => handleAcceptRequest(item.id)}
        >
          <Icon name="check" size={20} color="#34C759" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.declineButton]}
          onPress={() => Alert.alert('Decline', 'Request declined')}
        >
          <Icon name="close" size={20} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSuggestedFriend = ({ item }) => (
    <View style={styles.friendCard}>
      <View style={styles.friendInfo}>
        <View style={styles.avatarContainer}>
          <Icon name="person" size={32} color="#8E8E93" />
        </View>
        <View style={styles.friendDetails}>
          <Text style={styles.friendName}>{item.name}</Text>
          <Text style={styles.friendStats}>{item.mutualFriends} mutual friends</Text>
        </View>
      </View>
      <View style={styles.friendActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.addButton]}
          onPress={() => handleAddFriend(item.id)}
        >
          <Icon name="person-add" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'friends':
        return (
          <FlatList
            data={friends}
            renderItem={renderFriend}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        );
      case 'requests':
        return (
          <FlatList
            data={pendingRequests}
            renderItem={renderPendingRequest}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        );
      case 'suggestions':
        return (
          <FlatList
            data={suggestedFriends}
            renderItem={renderSuggestedFriend}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Friends</Text>
        <TouchableOpacity
          style={styles.addFriendButton}
          onPress={() => navigation.navigate('AddFriend')}
        >
          <Icon name="person-add" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#8E8E93" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search friends..."
            placeholderTextColor="#8E8E93"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'friends' && styles.activeTab]}
          onPress={() => setActiveTab('friends')}
        >
          <Text style={[styles.tabText, activeTab === 'friends' && styles.activeTabText]}>
            Friends ({friends.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'requests' && styles.activeTab]}
          onPress={() => setActiveTab('requests')}
        >
          <Text style={[styles.tabText, activeTab === 'requests' && styles.activeTabText]}>
            Requests ({pendingRequests.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'suggestions' && styles.activeTab]}
          onPress={() => setActiveTab('suggestions')}
        >
          <Text style={[styles.tabText, activeTab === 'suggestions' && styles.activeTabText]}>
            Suggestions
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {renderTabContent()}
      </View>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'serif',
  },
  addFriendButton: {
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#000000',
    fontFamily: 'serif',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#000000',
  },
  tabText: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'serif',
  },
  activeTabText: {
    color: '#000000',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  friendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
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
  friendInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  friendDetails: {
    flex: 1,
  },
  friendName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'serif',
    marginBottom: 2,
  },
  friendStats: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'serif',
  },
  friendActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    padding: 8,
  },
  acceptButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
  },
  declineButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
  },
});

export default FriendsScreen; 
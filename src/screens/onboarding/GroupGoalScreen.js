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

const GroupGoalScreen = ({ navigation }) => {
  const [selectedFriends, setSelectedFriends] = useState('Friends');
  const [showModal, setShowModal] = useState(false);

  const friends = [
    'Fred Sanchez',
    'Sam Cox',
    'Alex Johnson',
    'Maria Garcia',
    'David Wilson',
  ];

  const handleContinue = () => {
    if (selectedFriends !== 'Friends') {
      navigation.navigate('RoundupAmount');
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
        <Text style={styles.title}>Group Goal?</Text>
        <Text style={styles.subtitle}>Add Friends</Text>
        
        <TouchableOpacity
          style={styles.friendsSelector}
          onPress={() => setShowModal(true)}
        >
          <Text style={styles.friendsText}>{selectedFriends}</Text>
          <Icon name="keyboard-arrow-down" size={24} color="#000000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.continueButton,
            selectedFriends !== 'Friends' && styles.continueButtonActive
          ]}
          onPress={handleContinue}
          disabled={selectedFriends === 'Friends'}
          activeOpacity={0.8}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>

      {/* Friends Modal */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Friends</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Icon name="close" size={24} color="#000000" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              {friends.map((friend) => (
                <TouchableOpacity
                  key={friend}
                  style={styles.friendOption}
                  onPress={() => {
                    setSelectedFriends(friend);
                    setShowModal(false);
                  }}
                >
                  <Text style={styles.friendOptionText}>{friend}</Text>
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'serif',
    marginBottom: 40,
  },
  friendsSelector: {
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
  friendsText: {
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
  friendOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  friendOptionText: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'serif',
  },
});

export default GroupGoalScreen; 
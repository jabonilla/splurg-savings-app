import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { availableEmojis } from '../../utils/emojiUtils';

const EmojiPicker = ({ visible, onClose, onSelect, selectedEmoji }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Choose an Emoji</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#000000" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.emojiGrid}>
            <View style={styles.emojiContainer}>
              {availableEmojis.map((emoji, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.emojiButton,
                    selectedEmoji === emoji && styles.selectedEmojiButton
                  ]}
                  onPress={() => {
                    onSelect(emoji);
                    onClose();
                  }}
                >
                  <Text style={styles.emojiText}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  emojiGrid: {
    padding: 20,
  },
  emojiContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emojiButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#F2F2F7',
  },
  selectedEmojiButton: {
    backgroundColor: '#000000',
  },
  emojiText: {
    fontSize: 24,
  },
});

export default EmojiPicker; 
import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colors} from '../styles/theme';

const EditDeleteModal = ({visible, onClose, onEdit, onDelete}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <TouchableOpacity style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.option} onPress={onEdit}>
            <Text style={styles.optionText}>수정하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={onDelete}>
            <Text style={styles.optionText}>삭제하기</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  option: {
    padding: 10,
  },
  optionText: {
    fontSize: 18,
    color: colors.darkGray,
  },
});

export default EditDeleteModal;

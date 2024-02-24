import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const ProductModal = ({ onClose, children }) => {
  return (
    <View style={styles.modal}>
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>&times;</Text>
        </TouchableOpacity>
        {children}
      </View>
    </View>
  );
};

const styles = {
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
};

export default ProductModal;

import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { colors } from '../styles/theme';

const { height } = Dimensions.get('window');

const ProductModal = ({ onClose, currentPrice, bidPrice }) => {
  return (
    <View style={[styles.modal, { height: height / 4 }]}>
      <View style={styles.modalContent}>
        <View style={styles.priceContainer}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>현재가격</Text>
            <Text style={styles.priceValue}>{currentPrice}원</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>입찰가</Text>
            <Text style={styles.priceValue}>{bidPrice}원</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => console.log('입찰하기')}>
            <Text style={styles.buttonText}>입찰하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = {
  modal: {
    justifyContent: 'flex-end', // 화면 아래에서 올라오도록 변경
  },
  modalContent: {
    backgroundColor: colors.secondYellow,
    padding: 20,
    paddingTop: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flex: 1, 
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
  priceContainer: {
    marginBottom: 20,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  priceLabel: {
    fontSize: 16,
    color: colors.darkGray,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkGray,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 50,
    alignItems: 'center',
    flex: 1,
    margin: 5,
  },
  buttonText: {
    fontSize: 16,
    color: colors.darkGray,
  },
};

export default ProductModal;

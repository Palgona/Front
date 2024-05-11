import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {icons, colors} from '../styles/theme.js';
import Mailage from '../Components/Mailage.js';
import {API_URL} from '../globalVariables.js';
import axios from 'axios';
import {getAccessToken} from '../token.js';

const MaileageCharge = ({user}) => {
  // 충전할 마일리지를 관리하는 state
  const [chargeAmount, setChargeAmount] = useState('');
  // 선택한 마일리지 옵션을 관리하는 state
  const [selectedOption, setSelectedOption] = useState(null);

  // 마일리지 옵션 선택 핸들러
  const handleOptionSelect = amount => {
    // "p"를 제거하고 숫자만 추출하여 chargeAmount로 설정
    const amountValue = parseInt(amount.replace('p', ''), 10);
    setChargeAmount(amountValue);
    setSelectedOption(amount);
  };

  // 마일리지 충전 제출 핸들러
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/maileages`,
        {amount: chargeAmount},
        {
          headers: {
            Authorization: `Bearer ${getAccessToken}`,
          },
        },
      );
      console.log('Mailage charge response:', response.data);
      // 여기서 필요한 추가 작업 수행
    } catch (error) {
      console.error('Error charging mailage:', error);
      // 여기서 오류 처리
    }
  };

  return (
    <View style={styles.container}>
      <Mailage user={user} />
      <View style={styles.optionsContainer}>
        <OptionItem
          style={styles.option}
          label="1,000p"
          selected={selectedOption === '1000p'}
          onPress={() => handleOptionSelect('1000p')}
        />
        <OptionItem
          style={styles.option}
          label="5,000p"
          selected={selectedOption === '5000p'}
          onPress={() => handleOptionSelect('5000p')}
        />
        <OptionItem
          style={styles.option}
          label="10,000p"
          selected={selectedOption === '10000p'}
          onPress={() => handleOptionSelect('10000p')}
        />
        <OptionItem
          style={styles.option}
          label="50,000p"
          selected={selectedOption === '50000p'}
          onPress={() => handleOptionSelect('50000p')}
        />
      </View>
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>충전하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const OptionItem = ({label, selected, onPress}) => (
  <TouchableOpacity style={styles.optionItem} onPress={onPress}>
    <Image
      source={selected ? icons.checkboxChecked : icons.checkbox}
      style={styles.checkboxIcon}
    />
    <Text style={styles.optionLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionLabel: {
    margin: 10,
    fontSize: 15,
  },
  checkboxIcon: {
    width: 23,
    height: 23,
    tintColor: colors.darkGray,
    marginRight: 5,
  },
  submitButton: {
    backgroundColor: colors.mainYellow,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
  },
  submitButtonText: {
    color: colors.darkGray,
  },
});

export default MaileageCharge;

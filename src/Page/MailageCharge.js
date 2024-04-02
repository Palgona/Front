import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { icons, colors } from '../styles/theme';

const MailageCharge = () => {
  // 충전할 마일리지를 관리하는 state
  const [chargeAmount, setChargeAmount] = useState('');
  
  // 선택한 마일리지 옵션을 관리하는 state
  const [selectedOption, setSelectedOption] = useState(null);

  // 마일리지 옵션 선택 핸들러
  const handleOptionSelect = (amount) => {
    if (selectedOption === amount) {
      setSelectedOption(null); // 이미 선택된 옵션을 다시 선택하면 선택 해제
    } else {
      setChargeAmount(amount);
      setSelectedOption(amount);
    }
  };

  // 마일리지 충전 제출 핸들러
  const handleSubmit = () => {
    // 충전할 마일리지 정보를 서버로 전송하는 등의 작업 수행
    console.log('Charge amount:', chargeAmount);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>마일리지 충전</Text>
      <View style={styles.optionsContainer}>
        <OptionItem style={styles.option}
          label="1000p"
          selected={selectedOption === '1000p'}
          onPress={() => handleOptionSelect('1000p')}
        />
        <OptionItem style={styles.option}
          label="5000p"
          selected={selectedOption === '5000p'}
          onPress={() => handleOptionSelect('5000p')}
        />
        <OptionItem style={styles.option}
          label="10000p" 
          selected={selectedOption === '10000p'}
          onPress={() => handleOptionSelect('10000p')}
        />
        <OptionItem style={styles.option}
          label="50000p"
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

const OptionItem = ({ label, selected, onPress }) => (
  <TouchableOpacity style={styles.optionItem} onPress={onPress}>
    <Image 
      source={selected ? icons.checkboxChecked : icons.checkbox} // 테마 파일에서 가져온 아이콘 사용
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
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
    marginRight: 10,
  },
  submitButton:{
    backgroundColor: colors.mainYellow,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
  },
  submitButtonText:{
    color: colors.darkGray,
  }
});

export default MailageCharge;

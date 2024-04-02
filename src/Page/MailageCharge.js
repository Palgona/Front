import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const MailageCharge = () => {
  // 충전할 마일리지를 관리하는 state
  const [chargeAmount, setChargeAmount] = useState('');

  // 입력 필드 값 변경 이벤트 핸들러
  const handleInputChange = (value) => {
    setChargeAmount(value);
  };

  // 마일리지 충전 제출 핸들러
  const handleSubmit = () => {
    // 충전할 마일리지 정보를 서버로 전송하는 등의 작업 수행
    console.log('Charge amount:', chargeAmount);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>마일리지 충전</Text>
      <TextInput
        style={styles.input}
        placeholder="충전할 마일리지 금액을 입력하세요"
        keyboardType="numeric"
        value={chargeAmount}
        onChangeText={handleInputChange}
      />
      <Button title="충전하기" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});

export default MailageCharge;

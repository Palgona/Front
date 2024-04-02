import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ProfileEdit = () => {
  // 사용자 정보를 관리하는 state
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  // 입력 필드 값 변경 이벤트 핸들러
  const handleInputChange = (key, value) => {
    setUserInfo({
      ...userInfo,
      [key]: value,
    });
  };

  // 프로필 정보 수정 제출 핸들러
  const handleSubmit = () => {
    // 사용자 정보 업데이트 요청 등의 작업 수행
    console.log('Updated user info:', userInfo);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>프로필 편집</Text>
      <TextInput
        style={styles.input}
        placeholder="이름"
        value={userInfo.name}
        onChangeText={(text) => handleInputChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="이메일"
        value={userInfo.email}
        onChangeText={(text) => handleInputChange('email', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        secureTextEntry={true}
        value={userInfo.password}
        onChangeText={(text) => handleInputChange('password', text)}
      />
      <Button title="저장" onPress={handleSubmit} />
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

export default ProfileEdit;

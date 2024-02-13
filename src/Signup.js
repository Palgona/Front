import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, Alert } from 'react-native';
import { login, getProfile as getKakaoProfile } from "@react-native-seoul/kakao-login";

// 백엔드로 토큰을 보내는 함수
const sendTokenToBackend = async (token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.accessToken}`
    };

    const response = await fetch('http://ec2-3-36-87-107.ap-northeast-2.compute.amazonaws.com:8080/api/v1/auth/login', {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error('Failed to send token to backend');
    }

    console.log('Token sent to backend successfully');
  } catch (err) {
    console.error('Error sending token to backend:', err);
  }
};

const Signup = () => {
  const [nickName, setNickName] = useState('');
  const [profileImage, setProfileImage] = useState('');

  const signInWithKakao = async () => {
    try {
      const token = await login();
      await sendTokenToBackend(token);

      const userProfile = await getKakaoProfile();
      console.log("User Profile:", userProfile);

      // 회원가입을 위해 닉네임과 프로필 이미지를 백엔드로 전송
      await signUp(nickName, profileImage);
      
      // 토큰을 문자열로 표시하지 않음
      setResult(JSON.stringify(token));
    } catch (err) {
      console.error("login err", err);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logologin.png')} style={styles.image} />
      <View style={styles.spacing} />
      <TextInput
        style={styles.input}
        placeholder="Enter Nickname"
        onChangeText={text => setNickName(text)}
        value={nickName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Profile Image URL"
        onChangeText={text => setProfileImage(text)}
        value={profileImage}
      />
      <Button title="Sign Up" onPress={signInWithKakao} />
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'white',
  },
  input: {
    width: '80%',
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
  },
  image:{
    width: 100,
    height: 130,
  },
  spacing: {
    height: 50,
  },
});

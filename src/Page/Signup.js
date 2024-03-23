import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Alert } from 'react-native';
import styled from 'styled-components/native';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '../globalVariables.js';
import { colors, icons } from '../styles/theme'; 

const Signup = ({navigation}) => {
  const [nickName, setNickName] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: true
      }, 
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('Image Error: ', response.errorCode);
        } else {
          setImageFile(response.assets[0].base64);
        }
      }
    );
  };

  const handleSignup = async () => {
    try {
      if (!imageFile) {
        Alert.alert('Image Required', 'Please select an image.');
        return;
      }
      const formData = new FormData();
      formData.append('nickName', nickName);
      formData.append('image', {
        uri: `data:image/jpeg;base64,${imageFile}`,
        type: 'image/jpeg',
        name: 'profileImage.jpg',
      });
  
      const token = await AsyncStorage.getItem('jwtToken');
  
      const response = await axios.post(API_URL+'/auth/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        Alert.alert('회원 가입 성공', '회원 가입이 완료되었습니다.');
        navigation.navigate('Home');
      } else {
        Alert.alert('회원 가입 실패', '서버 오류로 회원 가입에 실패했습니다.');
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      Alert.alert('오류', '회원 가입 중 오류가 발생했습니다.');
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onSelectImage} style={styles.profileImageContainer}>
        {imageFile ? (
          <Image source={{ uri: `data:image/jpeg;base64,${imageFile}` }} style={styles.profileImage} />
        ) : (
          <View style={styles.defaultProfileImage} />
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Enter your nickname"
        onChangeText={text => setNickName(text)}
        value={nickName}
      />
      <TouchableOpacity onPress={handleSignup} style={styles.signupButton}>
        <Text style={styles.signupButtonText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  profileImageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.secondYellow,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  defaultProfileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.secondYellow,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: colors.mainGray,
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  signupButton: {
    width: '80%',
    backgroundColor: colors.mainYellow,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
  },
  signupButtonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default Signup;

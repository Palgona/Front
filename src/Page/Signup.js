import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { API_URL } from '../globalVariables.js';
import { colors } from '../styles/theme'; 
import { getAccessToken } from '../token.js';

const Signup = ({navigation}) => {
  const [nickName, setNickName] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: false
      }, 
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
          setImageFile(null);
        } else if (response.errorCode) {
          console.log('Image Error: ', response.errorCode);
        } else {
          setImageFile(response.assets[0]);
        }
      }
    );
  };

  const handleSignup = async () => {
    try {
      const formData = new FormData();
      const requestData = {
        nickName: nickName
      };
      formData.append('request', JSON.stringify(requestData));
  
      if (imageFile && imageFile.uri) {
        const fileName = imageFile.fileName || 'profileImage.jpg'; // 파일명이 없는 경우 기본 파일명으로 설정
        //const imageType = fileName.split('.').pop(); // 파일명에서 확장자 추출
        
        formData.append('image', fileName);
      }
      console.log('Request Data:', formData );
      //console.log('aaa');
      //console.log('Image File:', imageFile);

      const token = await getAccessToken();
  
      const response = await axios.post(API_URL+'/auth/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${token}`,
        },
      });
  
      // 처리된 응답 확인
      console.log('Response Data:', response.data);
  
      if (response.status === 200) {
        // 회원 가입 성공
        Alert.alert('회원 가입 성공', '회원 가입이 완료되었습니다.');
        navigation.navigate('Home');
      } else {
        // 회원 가입 실패
        Alert.alert('회원 가입 실패', '서버 오류로 회원 가입에 실패했습니다.');
        //navigation.navigate('Home');
      }
    } catch (error) {
      // 오류 발생
      console.error('Error signing up:', error);
      Alert.alert('오류', '회원 가입 중 오류가 발생했습니다.');
      //navigation.navigate('Home');
    }
  };
  
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onSelectImage} style={styles.profileImageContainer}>
        {imageFile ? (
          <Image source={{ uri: imageFile.uri }} style={styles.profileImage} />
        ) : (
          <View style={styles.defaultProfileImage} />
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="닉네임을 입력하세요"
        onChangeText={text => setNickName(text)}
        value={nickName}
      />
      <TouchableOpacity onPress={handleSignup} style={styles.signupButton}>
        <Text style={styles.signupButtonText}>회원가입</Text>
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
    backgroundColor: 'gray', // 기본 이미지 스타일 지정
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
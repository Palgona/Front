import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';

const Signup = ({ navigation }) => {
  const [nickName, setNickName] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleChoosePhoto = () => {
    const options = {
      title: 'Select Profile Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setProfileImage(response.uri);
      }
    });
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('nickName', nickName);
      formData.append('profileImage', {
        uri: profileImage,
        type: 'image/jpeg',
        name: 'profileImage.jpg',
      });

      const jwtToken = ''; // 여기에 jwt token(access, refresh)을 넣어야 합니다. 해당 앱에서 어떻게 관리하는지에 따라 달라집니다.

      const response = await axios.post('https://auth/auth/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${jwtToken}`,
        },
      });

      if (response.status === 200) {
        Alert.alert('회원 가입 성공', '회원 가입이 완료되었습니다.');
        navigation.navigate('Home'); // Home.js로 이동
      } else {
        Alert.alert('회원 가입 실패', '서버 오류로 회원 가입에 실패했습니다.');
        // 나중에 수정
        navigation.navigate('Home'); // Home.js로 이동
      }
    } catch (error) {
      console.error('Error signing up:', error);
      Alert.alert('오류', '회원 가입 중 오류가 발생했습니다.');
      //나중에 수정
      navigation.navigate('Home'); // Home.js로 이동
    }
  };


  return (
    <Container>
      <ProfileImageContainer>
        {profileImage ? (
          <ProfileImage source={{ uri: profileImage }} />
        ) : (
          <TouchableOpacity onPress={handleChoosePhoto}>
            <ChoosePhotoText>Choose Photo</ChoosePhotoText>
          </TouchableOpacity>
        )}
      </ProfileImageContainer>
      <Input
        placeholder="Nick Name"
        onChangeText={text => setNickName(text)}
        value={nickName}
      />
      <ButtonContainer>
        <CustomButton onPress={handleSubmit}>
          <CustomButtonText>회원 가입</CustomButtonText>
        </CustomButton>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const ProfileImageContainer = styled.View`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  background-color: #e1e1e1;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const ProfileImage = styled(Image)`
  width: 150px;
  height: 150px;
  border-radius: 75px;
`;

const ChoosePhotoText = styled.Text`
  color: #007bff;
`;

const Input = styled.TextInput`
  width: 80%;
  height: 40px;
  border-color: gray;
  border-width: 1px;
  border-radius: 50px;
  margin-bottom: 20px;
  padding-horizontal: 10px;
`;

const ButtonContainer = styled.View`
  width: 80%;
`;

const CustomButton = styled.TouchableOpacity`
  width: 100%;
  height: 23%;
  background-color: #F2CD5C;
  border-radius: 20px; /* 버튼을 둥글게 만듭니다. */
  align-items: center;
  justify-content: center;
`;

const CustomButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

export default Signup;

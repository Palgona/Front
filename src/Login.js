import { Pressable, StyleSheet, View, Image } from "react-native";
import React, { useState } from "react";
import { login, getProfile as getKakaoProfile } from "@react-native-seoul/kakao-login";


const App = ({ navigation }) => { // navigation을 올바르게 받도록 수정합니다.
  const [result, setResult] = useState("");

  const signInWithKakao = async () => {
    try {
      const token = await login();

      // 클라이언트에서 토큰을 서버로 전달
      await sendTokenToBackend(token);

      // 사용자 정보 가져오기
      const userProfile = await getKakaoProfile();
      console.log("User Profile:", userProfile);

      setResult(JSON.stringify(token)); // 토큰을 문자열로 표시하지 않음

      // 로그인 성공 시 Signup 페이지로 이동
      navigation.navigate('Signup');
    } catch (err) {
      console.error("login err", err);
    }
  };

  const sendTokenToBackend = async (token) => {
    try {
      // 사용자 정보 토큰을 가져와서 accessToken 헤더에 설정
      const userProfile = await getKakaoProfile();
      const { nickName, profileImage } = userProfile;
      const accessToken = token.accessToken;

      // 액세스 토큰이 만료되었는지 확인
      if (isAccessTokenExpired(token)) {
        // 만료되었으면 리프레시 토큰을 사용하여 새로운 액세스 토큰 발급
        const newAccessToken = await refreshAccessToken(token.refreshToken);
        // 새로 발급받은 액세스 토큰으로 대체
        token.accessToken = newAccessToken;
      }

      const headers = {
        'Content-Type': 'application/json',
        'accessToken': token.accessToken
      };
      const body = JSON.stringify({
        nickName,
        profileImage
      });

      const response = await fetch('https://auth/signup', {
        method: 'POST',
        headers,
        body
      });

      if (!response.ok) {
        throw new Error('url failed to sign up');
      }

      console.log('User signed up successfully');
    } catch (err) {
      console.error('Error signing up:', err);
    }
  };

  const isAccessTokenExpired = (token) => {
    // 액세스 토큰의 만료 시간을 가져옵니다.
    const expirationTime = new Date(token.expirationTime);

    // 현재 시간을 가져옵니다.
    const currentTime = new Date();

    // 만료 시간이 현재 시간보다 이전이면 토큰이 만료된 것으로 판단합니다.
    return expirationTime <= currentTime;
  };

  const refreshAccessToken = async (refreshToken) => {
    try {
      const response = await fetch('https://auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          refreshToken: refreshToken
        })
      });

      if (!response.ok) {
        throw new Error('Failed to refresh access token');
      }

      const data = await response.json();
      return data.accessToken; // 새로 발급받은 액세스 토큰을 반환합니다.
    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw error; // 에러를 잡아서 상위 레벨에서 처리할 수 있도록 다시 던집니다.
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logologin.png')} style={styles.image} />
      <View style={styles.spacing} />
      <Pressable
        style={styles.button}
        onPress={() => {
          signInWithKakao();
        }}
      >
        <Image source={require('../assets/kakao_login_large_wide.png')} style={styles.imageButton} />
      </Pressable>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'white',
  },
  button: {
    marginTop: 20,
    alignItems: 'center',
  },
  image:{
    width: 100, // 이미지의 너비를 200으로 설정
    height: 130, // 이미지의 높이를 200으로 설정
  },
  imageButton: {
    width: '80%',
    height: undefined,
    aspectRatio: 7/1,
    resizeMode: 'cover',
  },
  spacing: {
    height: 50, // image와 imageButton 사이에 20만큼의 간격을 두기 위한 높이 설정
  },
});
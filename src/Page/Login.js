import { Image, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { login } from "@react-native-seoul/kakao-login";
import { API_URL } from "../globalVariables.js";
import axios from "axios";
import { storeAccessToken, storeRefreshToken } from "../token";

const App = ({ navigation }) => {
  const signInWithKakao = async () => {
    try {
      const kakaoOAthtoken = await login();
      console.log("kakaoOAthtoken", kakaoOAthtoken);
      // 클라이언트에서 토큰을 서버로 전달
      await sendTokenToBackend(kakaoOAthtoken);
    } catch (err) {
      console.error("signInWithKakao err", err);
    }
  };

  const sendTokenToBackend = async (kakaoOAthtoken) => {
    try {
      const responseLogin = await axios.get(API_URL + "/auth/login", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "BEARER " + kakaoOAthtoken.accessToken,
        },
      });

      // 서버로부터 받은 응답 헤더에서 Authorization 값을 가져옴
      const authorizationHeader = responseLogin.headers.get("Authorization");
      storeAccessToken(authorizationHeader);
      storeRefreshToken(authorizationHeader);

      // 사용자 정보 또는 상태를 확인하여 페이지 이동 결정
      if (responseLogin.data.isNewUser) {
        navigation.navigate("Signup");
      } else {
        navigation.navigate("Home");
      }

      console.log("User logged in successfully:", authorizationHeader);
    } catch (err) {
      console.error("Error signing in:", err);
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
      const response = await fetch(API_URL + "/auth/refresh-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: refreshToken,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to refresh access token");
      }

      const data = await response.json();
      return data.accessToken; // 새로 발급받은 액세스 토큰을 반환합니다.
    } catch (error) {
      console.error("Error refreshing access token:", error);
      throw error; // 에러를 잡아서 상위 레벨에서 처리할 수 있도록 다시 던집니다.
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logologin.png")}
        style={styles.image}
      />
      <View style={styles.spacing} />
      <Pressable
        style={styles.button}
        onPress={() => {
          signInWithKakao();
        }}
      >
        <Image
          source={require("../../assets/kakao_login_large_wide.png")}
          style={styles.imageButton}
        />
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
    backgroundColor: "white",
  },
  button: {
    marginTop: 20,
    alignItems: "center",
  },
  image: {
    width: 100, // 이미지의 너비를 100으로 설정
    height: 130, // 이미지의 높이를 130으로 설정
  },
  imageButton: {
    width: "80%",
    height: undefined,
    aspectRatio: 7 / 1,
    resizeMode: "cover",
  },
  spacing: {
    height: 50, // image와 imageButton 사이에 50만큼의 간격을 두기 위한 높이 설정
  },
});

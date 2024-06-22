import { Image, Pressable, StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import { login } from "@react-native-seoul/kakao-login";
import { API_URL } from "../globalVariables.js";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; // AsyncStorage 추가
import { storeAccessToken, storeRefreshToken } from "../token";

const App = ({ navigation }) => {
  const [user, setUser] = useState(null); // 사용자 정보를 상태로 관리

  const signInWithKakao = async () => {
    try {
      const kakaoOAthtoken = await login();
      console.log("kakaoOAthtoken", kakaoOAthtoken);
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

      const authorizationHeader = responseLogin.headers.get("Authorization");
      storeAccessToken(authorizationHeader);
      storeRefreshToken(authorizationHeader);

      // 사용자 정보를 AsyncStorage에 저장
      await AsyncStorage.setItem("user", JSON.stringify(responseLogin.data));

      // 사용자 정보를 상태에 저장
      setUser(responseLogin.data);

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

  // 앱 시작 시 AsyncStorage에서 사용자 정보를 로드하여 상태에 설정
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData !== null) {
          setUser(JSON.parse(userData));
        }
      } catch (err) {
        console.error("Error loading user data:", err);
      }
    };

    loadUserData();
  }, []);

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
    width: 100,
    height: 130,
  },
  imageButton: {
    width: "80%",
    height: undefined,
    aspectRatio: 7 / 1,
    resizeMode: "cover",
  },
  spacing: {
    height: 50,
  },
});

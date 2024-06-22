import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { colors, icons } from "../styles/theme";

const ProfileEdit = ({ route }) => {
  const { user } = route.params;
  const [name, setName] = useState(user ? user.nickName : "");
  const [image, setImage] = useState(user ? user.profileImage : "");

  if (!user) {
    return (
      <View>
        <Text>사용자 정보가 없습니다.</Text>
      </View>
    );
  }

  const handleSave = () => {
    // 사용자 정보 저장 처리
  };

  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: false,
      },
      (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.errorCode) {
          console.log("Image Error: ", response.errorCode);
        } else {
          setImage(response.assets[0].uri);
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={onSelectImage}>
          <Image source={{ uri: image }} style={styles.profileImage} />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="닉네임"
        value={name}
        onChangeText={setName}
      />
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>프로필 수정</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 500,
    marginRight: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 50,
    padding: 10,
    marginBottom: 20,
  },
  saveButton: {
    width: "100%",
    backgroundColor: colors.secondGreen,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: "center",
  },
  saveButtonText: {
    color: "black",
    fontSize: 16,
  },
});

export default ProfileEdit;

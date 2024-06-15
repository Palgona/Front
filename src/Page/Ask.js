import React, { useState } from "react";
import {
  TouchableOpacity,
  Alert,
  View,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import { colors } from "../styles/theme";

const Ask = ({ user, navigation }) => {
  // 사용자가 입력한 문의사항을 관리하는 state
  const [inquiry, setInquiry] = useState("");

  // 문의사항 입력 이벤트 핸들러
  const handleInquiryChange = (text) => {
    setInquiry(text);
  };

  // 문의사항 제출 이벤트 핸들러
  const handleSubmit = () => {
    // 사용자가 입력한 문의사항 처리하는 로직 추가
    console.log("Submitted inquiry:", inquiry);
    Alert.alert("제출 완료", "문의사항이 제출되었습니다.", [
      {
        text: "확인",
        onPress: () => navigation.goBack(), // 이전 화면으로 이동
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.guide}>
        답변은 신속하게 회원가입된 이메일로 보내드리겠습니다.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="문의사항을 입력하세요"
        multiline={true}
        numberOfLines={15}
        value={inquiry}
        onChangeText={handleInquiryChange}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>제출</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingTop: "10%",
    backgroundColor: colors.background,
    alignItems: "center",
    //justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.darkGray,
  },
  guide: {
    color: colors.mainGray,
    fontSize: 14,
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    width: "90%",
    borderColor: colors.secondYellow,
    backgroundColor: colors.secondYellow,
    borderRadius: 20,
    padding: 10,
    marginBottom: 30,
    textAlignVertical: "top", // 입력 텍스트를 위로 정렬하여 여러 줄 입력 가능하게 함
  },
  submitButton: {
    backgroundColor: colors.mainYellow,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: "center",
    width: "90%",
  },
  submitButtonText: {
    color: colors.darkGray,
  },
});

export default Ask;

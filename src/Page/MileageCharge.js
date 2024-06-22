import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { icons, colors } from "../styles/theme.js";
import Mileage from "../Components/Mileage.js";
import { API_URL } from "../globalVariables.js";
import axios from "axios";
import { getAccessToken } from "../token.js";

const MileageCharge = ({ user, navigation }) => {
  const [chargeAmount, setChargeAmount] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (amount) => {
    const amountValue = parseInt(amount.replace("p", ""), 10);
    setChargeAmount(amountValue);
    setSelectedOption(amount);
  };

  const handleSubmit = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axios.post(
        `${API_URL}/mileages`,
        { amount: chargeAmount },
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );
      console.log("Milage charge response:", response.data);
      // 알림창 표시
      Alert.alert(
        "충전 완료",
        `${chargeAmount}p가 충전되었습니다.`,
        [
          { text: "확인", onPress: () => navigation.goBack() }
        ]
      );
    } catch (error) {
      console.error("Error charging mailage:", error);
      // 오류 처리
      Alert.alert(
        "충전 실패",
        "마일리지 충전 중 오류가 발생했습니다.",
        [
          { text: "확인" }
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Mileage user={user} />
      <View style={styles.optionsContainer}>
        <OptionItem
          label="1,000p"
          selected={selectedOption === "1000p"}
          onPress={() => handleOptionSelect("1000p")}
        />
        <OptionItem
          label="5,000p"
          selected={selectedOption === "5000p"}
          onPress={() => handleOptionSelect("5000p")}
        />
        <OptionItem
          label="10,000p"
          selected={selectedOption === "10000p"}
          onPress={() => handleOptionSelect("10000p")}
        />
        <OptionItem
          label="50,000p"
          selected={selectedOption === "50000p"}
          onPress={() => handleOptionSelect("50000p")}
        />
      </View>
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>충전하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const OptionItem = ({ label, selected, onPress }) => (
  <TouchableOpacity style={styles.optionItem} onPress={onPress}>
    <Image
      source={selected ? icons.checkboxChecked : icons.checkbox}
      style={styles.checkboxIcon}
    />
    <Text style={styles.optionLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  optionLabel: {
    margin: 10,
    fontSize: 15,
  },
  checkboxIcon: {
    width: 23,
    height: 23,
    tintColor: colors.darkGray,
    marginRight: 5,
  },
  submitButton: {
    backgroundColor: colors.mainYellow,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: "center",
  },
  submitButtonText: {
    color: colors.darkGray,
  },
});

export default MileageCharge;

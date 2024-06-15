import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { icons, colors } from "../styles/theme.js";
import Mailage from "../Components/Mileage.js";
import { API_URL } from "../globalVariables.js";
import axios from "axios";
import { getAccessToken } from "../token.js";

const MileageCharge = ({ user }) => {
  const [chargeAmount, setChargeAmount] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentMileage, setCurrentMileage] = useState(0);

  useEffect(() => {
    fetchMileage();
  }, []);

  const fetchMileage = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axios.get(`${API_URL}/mileages`, {
        headers: {
          Authorization: `${accessToken}`,
        },
      });
      setCurrentMileage(response.data); // 마일리지 데이터 설정
    } catch (error) {
      console.error("Error fetching mileage:", error);
    }
  };

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
      console.log("Mailage charge response:", response.data);
      // 여기서 필요한 추가 작업 수행
    } catch (error) {
      console.error("Error charging mailage:", error);
      // 여기서 오류 처리
    }
  };

  return (
    <View style={styles.container}>
      <Mailage user={user} mileage={currentMileage} />
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

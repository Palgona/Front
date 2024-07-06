import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { colors, icons } from "../styles/theme";
import { buttonStyles } from "../styles/buttonStyles";
import { Picker } from "@react-native-picker/picker";
import { launchImageLibrary } from "react-native-image-picker";
import { API_URL } from "../globalVariables.js";
import axios from "axios";
import { getAccessToken } from "../token.js";

const ProductWrite = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [category, setCategory] = useState("Digital Devices");
  const [price, setPrice] = useState("");
  
  const [endDate, setEndDate] = useState(null);
  
  const [isEndDatePickerVisible, setIsEndDatePickerVisible] = useState(false);
  const [endButtonText, setEndButtonText] = useState("종료 시간 설정");

  const onSelectImage = () => {
    if (imageFiles.length >= 10) {
      Alert.alert("이미지는 최대 10장까지 선택할 수 있습니다.");
      return;
    }
    launchImageLibrary(
      {
        mediaType: "photo",
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: false,
        selectionLimit: 10,
      },
      (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.errorCode) {
          console.log("Image Error: ", response.errorCode);
        } else {
          if (response.assets.length > 10) {
            Alert.alert("이미지는 최대 10장까지 선택할 수 있습니다.");
            return;
          }
          setImageFiles([...imageFiles, ...response.assets]);
        }
      }
    );
  };

  const handleDeleteImage = (index) => {
    const newImageFiles = [...imageFiles];
    newImageFiles.splice(index, 1);
    setImageFiles(newImageFiles);
  };

  const handleSubmit = async () => {
    if (
      !title ||
      !description ||
      !category ||
      !price ||
      !endDate
    ) {
      Alert.alert("내용을 모두 작성해주세요.");
      return;
    }

    try {
      const accessToken = await getAccessToken();

      const formData = new FormData();
      formData.append("name", title);
      formData.append("initialPrice", price);
      formData.append("content", description);
      formData.append("category", category);
      const formattedEndDate =
        endDate.toISOString().split("T")[0] + "T00:00:00";
      formData.append("deadline", formattedEndDate);

      imageFiles.forEach((file, index) => {
        formData.append(`files`, {
          uri: file.uri,
          type: file.type,
          name: file.fileName || `image${index + 1}.jpg`,
        });
      });

      const response = await axios.post(`${API_URL}/products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${accessToken}`,
        },
      });

      if (response.status === 200) {
        Alert.alert("제품이 성공적으로 등록되었습니다.");
        navigation.navigate("Home");
      } else {
        throw new Error("Failed to submit product");
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      Alert.alert("제품 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleEndDatePicker = (date) => {
    setEndDate(date);
    setEndButtonText(date.toLocaleString("ko-KR"));
    setIsEndDatePickerVisible(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <TouchableOpacity
              style={styles.ImageSelect}
              onPress={onSelectImage}
            >
              <Image source={icons.camera} style={styles.cameraIcon} />
              <Text style={styles.counterText}>
                {`(${imageFiles.length}/10)`}
              </Text>
            </TouchableOpacity>
            <ScrollView horizontal>
              <View style={styles.imagePreviewContainer}>
                {imageFiles.map((imageFile, index) => (
                  <View key={index}>
                    <Image
                      source={{ uri: imageFile.uri }}
                      style={styles.imagePreview}
                    />
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeleteImage(index)}
                    >
                      <Image
                        source={icons.close}
                        style={styles.deleteButtonIcons}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.darkGray }]}>
              게시글 제목
            </Text>
            <TextInput
              placeholder="제목"
              value={title}
              onChangeText={setTitle}
              style={styles.textInput}
            />
          </View>
          <Text style={[styles.label, { color: colors.darkGray }]}>
            상품 소개
          </Text>
          <TextInput
            placeholder={
              "올릴 게시글 내용을 작성해 주세요.\n신뢰할 수 있는 거래를 위해 자세히 적어주세요."
            }
            value={description}
            onChangeText={setDescription}
            style={styles.textInputArea}
            textAlignVertical="top"
            multiline
          />
          <Text style={[styles.label, { color: colors.darkGray }]}>
            카테고리 선택
          </Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={category}
              onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="디지털기기" value="DIGITAL_DEVICE" />
              <Picker.Item label="의류" value="CLOTHING" />
              <Picker.Item label="식품" value="FOOD" />
              <Picker.Item label="도서" value="BOOK" />
              <Picker.Item label="기타" value="OTHER" />
            </Picker>
          </View>
          <Text style={[styles.label, { color: colors.darkGray }]}>
            초기 마일리지
          </Text>
          <TextInput
            placeholder="₩초기가격을 입력해주세요."
            value={price}
            onChangeText={setPrice}
            style={styles.textInput}
            keyboardType="numeric"
          />
          <Text style={[styles.label, { color: colors.darkGray }]}>
            마감기한 설정
          </Text>
          <View style={styles.datePickerContainer}>
            <TouchableOpacity
              style={buttonStyles.button}
              onPress={() => setIsEndDatePickerVisible(true)}
            >
              <Text>{endButtonText}</Text>
              <DateTimePickerModal
                isVisible={isEndDatePickerVisible}
                mode="datetime"
                onConfirm={handleEndDatePicker}
                onCancel={() => setIsEndDatePickerVisible(false)}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={[styles.submitButtonText, { color: colors.darkGray }]}>
              등록
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  imageContainer: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  ImageSelect: {
    width: 100,
    height: 100,
    marginRight: 10,
    padding: 10,
    borderColor: colors.mainGray,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraIcon: {
    width: 30,
    height: 30,
    tintColor: colors.mainGray,
  },
  imagePreviewContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginHorizontal: 5,
  },
  deleteButton: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButtonIcons: {
    tintColor: colors.background,
    fontWeight: "bold",
    width: 10,
    height: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  textInput: {
    marginBottom: 10,
    padding: 10,
    borderColor: colors.mainGray,
    borderWidth: 1,
    borderRadius: 10,
  },
  textInputArea: {
    marginBottom: 10,
    height: 200,
    padding: 10,
    borderColor: colors.mainGray,
    borderWidth: 1,
    borderRadius: 10,
  },
  pickerContainer: {
    marginBottom: 10,
    borderColor: colors.mainGray,
    borderWidth: 1,
    borderRadius: 10,
  },
  picker: {
    padding: 10,
    borderColor: colors.mainGray,
    borderWidth: 1,
    borderRadius: 50,
  },
  datePickerContainer: {
    borderColor: colors.mainGray,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  deadline: {
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: colors.mainYellow,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: "center",
  },
  submitButtonText: {
    color: colors.darkGray,
  },
});

export default ProductWrite;

import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import ImagePicker from 'react-native-image-picker';

const GalleryScreen = () => {
  const [imageFiles, setImageFiles] = useState([]);

  const onSelectImage = () => {
    if (imageFiles.length >= 10) {
      Alert.alert('이미지는 최대 10장까지 선택할 수 있습니다.');
      return;
    }

    const options = {
      mediaType: 'photo',
      maxWidth: 512,
      maxHeight: 512,
      includeBase64: false,
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image Error: ', response.errorCode);
      } else {
        const newImageFiles = [...imageFiles, response.assets[0]];
        setImageFiles(newImageFiles);
      }
    });
  };

  return (
    <View>
      <TouchableOpacity onPress={onSelectImage}>
        <Text>갤러리에서 이미지 선택하기</Text>
      </TouchableOpacity>
      {imageFiles.map((imageFile, index) => (
        <View key={index}>
          <Image
            source={{uri: imageFile.uri}}
            style={{width: 100, height: 100}}
          />
        </View>
      ))}
    </View>
  );
};

export default GalleryScreen;

import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';

const ProductWrite = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState(new Date());

  // Function to handle product submission
  const submitProduct = () => {
    // Logic to submit the product
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Category:', category);
    console.log('Price:', price);
    console.log('Date:', date);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {/* Image upload functionality can be added here */}
      </View>
      <TextInput
        style={styles.input}
        placeholder="제품명을 입력해주세요"
        onChangeText={text => setTitle(text)}
        value={title}
      />
      <TextInput
        style={styles.input}
        placeholder="상품 소개를 입력해주세요"
        onChangeText={text => setDescription(text)}
        value={description}
      />
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
        {/* Add Picker.Item components to provide category options */}
        <Picker.Item label="Category 1" value="category1" />
        <Picker.Item label="Category 2" value="category2" />
        <Picker.Item label="Category 3" value="category3" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="가격을 입력해주세요"
        onChangeText={text => setPrice(text)}
        value={price}
        keyboardType="numeric"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  imageContainer: {
    // Style for the image upload section
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '100%',
  },
  picker: {
    height: 50,
    width: '100%',
  },
});

export default ProductWrite;

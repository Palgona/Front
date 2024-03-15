import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import ProductList from '../Components/ProductList'; 
import { theme, colors, icons } from '../styles/theme';
import { buttonStyles } from '../styles/buttonStyles'; 
import { API_URL } from '../globalVariables.js';

const Home = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [sortByPrice, setSortByPrice] = useState(null);

  useEffect(() => {
    // API 호출 및 상품 데이터 가져오기
    axios.get(API_URL+'/products')
      .then(response => {
        setProducts(response.data.products);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleSearchPress = () => {
    navigation.navigate('Search');
  };

  const handleProductWritePress = () => {
    navigation.navigate('ProductWrite');
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    // 가격 버튼을 선택하면 정렬 옵션을 토글합니다.
    if (option === 'price') {
      setSortByPrice(!sortByPrice);
    }
  };

  const handleSortByPrice = (ascending) => {
    // ascending이 true이면 가격 낮은 순, false이면 가격 높은 순으로 정렬합니다.
    let sortedProducts = [...products];
    sortedProducts.sort((a, b) => ascending ? a.price - b.price : b.price - a.price);
    setProducts(sortedProducts);
  };

  return (
    <View style={theme.container}>
  {/* 상단 버튼 */}
  <View style={[styles.buttonContainer, { justifyContent: 'flex-end' }]}>
    <TouchableOpacity onPress={handleSearchPress} style={[buttonStyles.smallButton, { backgroundColor: colors.secondary }]}>
      <Image source={icons.search} style={buttonStyles.iconimage} resizeMode="contain" />
    </TouchableOpacity>
    <TouchableOpacity onPress={handleSearchPress} style={[buttonStyles.smallButton, { backgroundColor: colors.secondary }]}>
      <Image source={icons.alarm} style={buttonStyles.iconimage} resizeMode="contain" />
    </TouchableOpacity>
    <TouchableOpacity onPress={handleSearchPress} style={[buttonStyles.smallButton, { backgroundColor: colors.secondary }]}>
      <Image source={icons.category} style={buttonStyles.iconimage} resizeMode="contain" />
    </TouchableOpacity>
  </View>

  {/* 가격, 카테고리, 정확도 토글 옵션 버튼 */}
  <View style={styles.optionButtonsContainer}>
    <TouchableOpacity onPress={() => handleOptionPress('price')} style={[styles.optionButton, { backgroundColor: colors.secondary }]}>
      <Text style={styles.optionButtonText}>가격</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleOptionPress('category')} style={[styles.optionButton, { backgroundColor: colors.secondary }]}>
      <Text style={styles.optionButtonText}>카테고리</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleOptionPress('accuracy')} style={[styles.optionButton, { backgroundColor: colors.secondary }]}>
      <Text style={styles.optionButtonText}>정확도</Text>
    </TouchableOpacity>
  </View>

  {/* 상품 리스트 컴포넌트 추가 */}
  <ProductList products={products} />

  {/* 우측 하단 버튼 */}
  <TouchableOpacity onPress={handleProductWritePress} style={[styles.addButton, { backgroundColor: colors.main }]}>
    <Text style={styles.addButtonText}>+</Text>
  </TouchableOpacity>
</View>

  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  optionsContainer: {
    position: 'absolute',
    top: 70,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    zIndex: 1,
  },
  option: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  optionText: {
    fontSize: 16,
  },
  toggleButton: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  optionButtonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  optionButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 50,
    marginHorizontal: 5,
  },
  optionButtonText: {
    color: 'white',
  },
});

export default Home;

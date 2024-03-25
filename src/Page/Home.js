import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import axios from 'axios';
import ProductList from '../Components/ProductList'; 
import { colors, icons, theme } from '../styles/theme'; // theme에서 container 스타일을 제거하였으므로 colors와 icons만 import
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

  const handleCategoryPress = () => {
    navigation.openDrawer(); 
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
    <ImageBackground source={require('../../assets/homeBack.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* 상단 버튼 */}
        <View style={[styles.buttonContainer, { justifyContent: 'space-between' }]}>
        <Image source={require('../../assets/logoWhite.png')} style={styles.logo} resizeMode="contain" />
        <View style={{ flexDirection: 'row' }}></View>
          <TouchableOpacity onPress={handleSearchPress} style={buttonStyles.smallButton}>
            <Image source={icons.search} style={buttonStyles.iconimage} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSearchPress} style={buttonStyles.smallButton}>
            <Image source={icons.alarm} style={buttonStyles.iconimage} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCategoryPress} style={buttonStyles.smallButton}>
            <Image source={icons.category} style={buttonStyles.iconimage} resizeMode="contain" />
          </TouchableOpacity>
        </View>

        {/* 가격, 카테고리, 정확도 토글 옵션 버튼 */}
        <View style={styles.optionButtonsContainer}>
          <TouchableOpacity onPress={() => handleOptionPress('price')} style={styles.optionButton}>
            <Text style={styles.optionButtonText}>가격</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCategoryPress} style={styles.optionButton}>
            <Text style={styles.optionButtonText}>카테고리</Text>
          </TouchableOpacity>
        </View>
        
        {/* 상품 리스트 컴포넌트 추가 */}
        <ProductList products={products} />

        {/* 우측 하단 버튼 */}
        <TouchableOpacity onPress={handleProductWritePress} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  logo: {
    width: 150,
    height: 50,
    marginRight: '20%',
  },
  backgroundImage:{
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
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
    backgroundColor: colors.mainYellow,
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
  },
  optionButtonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  optionButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 50,
    marginHorizontal: 5,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  optionButtonText: {
    color: colors.darkGray,
  },
});

export default Home;

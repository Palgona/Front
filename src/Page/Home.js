import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import ProductList from '../Components/ProductList'; 
import { theme, colors, icons } from '../styles/theme';
import { buttonStyles } from '../styles/buttonStyles'; 

const Home = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // API 호출 및 상품 데이터 가져오기
    axios.get('/products')
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
});

export default Home;

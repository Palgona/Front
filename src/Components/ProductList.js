import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { icons, colors } from '../styles/theme';
import { API_URL } from '../globalVariables.js';

const ProductList = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const dummyProducts = [
      { id: 1, name: 'Product 1', price: 50, image: 'https://via.placeholder.com/150', chatCount: 10, likeCount: 20 },
      { id: 2, name: 'Product 2', price: 70, image: 'https://via.placeholder.com/150', chatCount: 5, likeCount: 15 },
      { id: 3, name: 'Product 3', price: 50, image: 'https://via.placeholder.com/150', chatCount: 10, likeCount: 20 },
      { id: 4, name: 'Product 4', price: 70, image: 'https://via.placeholder.com/150', chatCount: 5, likeCount: 15 },
      { id: 5, name: 'Product 5', price: 50, image: 'https://via.placeholder.com/150', chatCount: 10, likeCount: 20 },
      { id: 6, name: 'Product 6', price: 70, image: 'https://via.placeholder.com/150', chatCount: 5, likeCount: 15 },
      { id: 7, name: 'Product 7', price: 50, image: 'https://via.placeholder.com/150', chatCount: 10, likeCount: 20 },
      { id: 8, name: 'Product 8', price: 70, image: 'https://via.placeholder.com/150', chatCount: 5, likeCount: 15 },
      
    ];
    setProducts(dummyProducts);
  }, []);

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </View>
      {/* 채팅수, 찜수 */}
      <View style={styles.chatAndLike}>
        <Image source={icons.chat} style={styles.icon} /> 
        <Text style={styles.chatAndLikeText}>{item.chatCount}</Text>
        <Image source={icons.heart} style={styles.icon} /> 
        <Text style={styles.chatAndLikeText}>{item.likeCount}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products} 
        renderItem={renderProductItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.column}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  column: {
    flexGrow: 1,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'top',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 5,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  productPrice: {
    fontSize: 14,
    color: colors.darkGray,
  },
  chatAndLike: {
    flexDirection: 'row',
    width: '20%',
    marginTop: 10,
  },
  icon: {
    width: 15,
    height: 15,
    marginRight: 3,
    marginLeft: 5,
    tintColor: colors.mainGray,
  },
  chatAndLikeText: {
    fontSize: 12,
    color: colors.mainGray,
  },
});

export default ProductList;

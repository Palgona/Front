import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { icons, colors } from '../styles/theme';
import { API_URL } from '../globalVariables.js';

const ProductList = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const dummyProducts = [
      { id: 1, name: 'Product 1', price: 10, image: 'https://via.placeholder.com/150', chatCount: 11, likeCount: 20, time: '마지막 입찰 1분전' },
      { id: 2, name: 'Product 2', price: 20, image: 'https://via.placeholder.com/150', chatCount: 2, likeCount: 15, time: '마지막 입찰 2분전' },
      { id: 3, name: 'Product 3', price: 30, image: 'https://via.placeholder.com/150', chatCount: 13, likeCount: 20, time: '마지막 입찰 7분전' },
      { id: 4, name: 'Product 4', price: 40, image: 'https://via.placeholder.com/150', chatCount: 99, likeCount: 15, time: '마지막 입찰 10분전' },
      { id: 5, name: 'Product 5', price: 50, image: 'https://via.placeholder.com/150', chatCount: 7, likeCount: 20, time: '마지막 입찰 15분전' },
      { id: 6, name: 'Product 6', price: 60, image: 'https://via.placeholder.com/150', chatCount: 4, likeCount: 15, time: '마지막 입찰 20분전' },
      { id: 7, name: 'Product 7', price: 70, image: 'https://via.placeholder.com/150', chatCount: 15, likeCount: 20, time: '마지막 입찰 28분전' },
      { id: 8, name: 'Product 8', price: 80, image: 'https://via.placeholder.com/150', chatCount: 99, likeCount: 15, time: '마지막 입찰 30분전' },
    ];
    setProducts(dummyProducts);
  }, []);

  const renderProductItem = ({ item }) => (
    <ScrollView>
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      {/* 이미지 */}
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}00원</Text>
        {/* 채팅수, 찜수 */}
        <View style={styles.chatAndLike}>
          <View style={styles.iconTextContainer}>
            <Image source={icons.chat} style={styles.icon} />
            <Text style={styles.chatAndLikeText}>{item.chatCount}</Text>
          </View>
          <View style={styles.iconTextContainer}>
            <Image source={icons.heart} style={styles.icon} />
            <Text style={styles.chatAndLikeText}>{item.likeCount}</Text>
          </View>
        </View>
      </View>
      {/* 시간 */}
      <Text style={styles.timeText}>{item.time}</Text>
    </TouchableOpacity>
    </ScrollView>
  );

  return (
      <FlatList
        data={products} 
        renderItem={renderProductItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.column}
      />
  );
};

const styles = StyleSheet.create({
  column: {
    flexGrow: 1,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  productInfo: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    color: colors.darkGray,
  },
  productPrice: {
    fontSize: 14,
    color: colors.secondary,
  },
  chatAndLike: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,

  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 15,
    height: 15,
    marginRight: '4%',
    tintColor: colors.mainGray,
  },
  chatAndLikeText: {
    fontSize: 12,
    color: colors.mainGray,
  },
  timeText: {
    fontSize: 12,
    color: colors.mainGray,
    position: 'absolute',
    bottom: 5,
    right: 10,
  },
});

export default ProductList;

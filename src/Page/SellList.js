import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProductList from '../Components/ProductList';

const Bookmark = () => {
  const navigation = useNavigation();

  const handleSellList = () => {
    // 판매내역 페이지로 이동
    navigation.navigate('SellList', { memberId });
  };

  return (
    <View style={styles.container}>
      {/* 페이지 상단에 장바구니 텍스트 표시 */}
      <Text style={styles.title}>판매내역</Text>
      
      {/* 상품 리스트를 보여주는 ProductList 컴포넌트 */}
      <ProductList />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 50,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  backButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: 'blue',
  },
});

export default Bookmark;

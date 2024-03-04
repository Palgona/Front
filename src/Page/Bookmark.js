import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProductList from './ProductList'; // ProductList 컴포넌트를 import 합니다.

const Bookmark = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* 페이지 상단에 장바구니 텍스트 표시 */}
      <Text style={styles.title}>장바구니</Text>
      
      {/* 상품 리스트를 보여주는 ProductList 컴포넌트 */}
      <ProductList />

      {/* 뒤로가기 버튼 */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>{'< 뒤로가기'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
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

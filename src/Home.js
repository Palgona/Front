import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

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
    <View style={styles.container}>
      {/* 상단 버튼 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSearchPress} style={styles.button}>
          {/* 이미지로 대체*/}
          <Text style={styles.buttonText}>검색</Text>
        </TouchableOpacity>
        {/* 알림 버튼 등 기타 버튼 추가 */}
      </View>

      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productTextContainer}>
              <Text style={styles.productName}>{item.productName}</Text>
              <Text style={styles.productDescription}>{item.description}</Text>
            </View>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
        numColumns={2} // 2열로 표시
        contentContainerStyle={styles.flatlistContent} // 아이템 간격 설정
      />

      {/* 우측 하단 버튼 */}
      <TouchableOpacity onPress={handleProductWritePress} style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  button: {
    borderRadius: 50,
    backgroundColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
  },
  productContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  productTextContainer: {
    flex: 1,
  },
  productName: {
    fontWeight: 'bold',
  },
  productDescription: {
    color: '#666',
  },
  flatlistContent: {
    paddingHorizontal: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
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

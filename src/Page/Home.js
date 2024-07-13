import React, { useEffect, useState, useCallback } from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import ProductList from '../Components/ProductList';
import { colors, icons } from '../styles/theme';
import { buttonStyles } from '../styles/buttonStyles';
import { API_URL } from '../globalVariables.js';
import { getAccessToken } from '../token.js';

const Home = ({ navigation, route }) => {
  const [products, setProducts] = useState([]);
  const [sortType, setSortType] = useState('LATEST'); // 기본값
  const [category, setCategory] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const [cursor, setCursor] = useState('');
  const [pageSize, setPageSize] = useState(20); // 기본값
  const [hasNext, setHasNext] = useState(true);

  // 기본 상품 리스트를 불러오는 함수
  const fetchDefaultProducts = useCallback(async () => {
    try {
      const accessToken = await getAccessToken(); // 액세스 토큰 가져오기
      const params = {
        sortType,
        searchWord,
        pageSize,
      };

      const response = await axios.get(`${API_URL}/products`, {
        headers: {
          Authorization: `${accessToken}`,
        },
        params,
        
      });
      console.log(accessToken);
      setProducts(response.data.values);
      setHasNext(response.data.hasNext);
      setCursor(response.data.hasNext ? response.data.cursor : '');
    } catch (error) {
      console.error('기본 상품을 불러오는 중 에러 발생:', error);
    }
  }, [sortType, searchWord, pageSize]);

  // 카테고리 선택에 따라 상품 목록을 필터링하여 불러오는 함수
  const fetchProductsByCategory = useCallback(async (selectedCategory) => {
    try {
      const accessToken = await getAccessToken(); // 액세스 토큰 가져오기
      const params = {
        sortType,
        category: selectedCategory,
        searchWord,
        pageSize,
      };

      const response = await axios.get(`${API_URL}/products`, {
        headers: {
          Authorization: `${accessToken}`,
        },
        params,
      });

      setProducts(response.data.values);
      setHasNext(response.data.hasNext);
      setCursor(response.data.hasNext ? response.data.cursor : '');
    } catch (error) {
      console.error('카테고리 상품을 불러오는 중 에러 발생:', error);
    }
  }, [sortType, searchWord, pageSize]);

  useEffect(() => {
    fetchDefaultProducts(); // 초기화면에 기본 상품 불러오기
  }, [fetchDefaultProducts]);

  useEffect(() => {
    if (route && route.params && route.params.category) {
      const selectedCategory = route.params.category;
      setCategory(selectedCategory); // Drawernavigator에서 전달된 카테고리 설정
      fetchProductsByCategory(selectedCategory); // 카테고리에 맞는 상품 리스트 불러오기
    } else {
      fetchDefaultProducts(); // 기본 상품 리스트를 다시 불러옴
    }
  }, [route, fetchDefaultProducts, fetchProductsByCategory]);

  const handleSearchPress = () => {
    navigation.navigate('Search');
  };

  const handleNotificationsPress = () => {
    navigation.navigate('Notifications');
  };

  const handleCategoryPress = () => {
    navigation.openDrawer();
  };

  const handleProductWritePress = () => {
    navigation.navigate('ProductWrite');
  };

  const handleOptionPress = (option) => {
    if (option === 'price') {
      setSortType(
        sortType === "LOWEST_PRICE" ? "HIGHEST_PRICE" : "LOWEST_PRICE"
      );
    } else if (option === 'category') {
      handleCategoryPress();
    } else if (option === 'latest') {
      setSortType('LATEST');
      fetchDefaultProducts(); // 최신순 정렬 시 기본 상품 리스트를 다시 불러옴
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/homeBack.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View
          style={[styles.buttonContainer, { justifyContent: 'space-between' }]}
        >
          <Image
            source={require('../../assets/logoWhite.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={handleSearchPress}
              style={buttonStyles.smallButton}
            >
              <Image
                source={icons.search}
                style={buttonStyles.iconimage}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleNotificationsPress}
              style={buttonStyles.smallButton}
            >
              <Image
                source={icons.alarm}
                style={buttonStyles.iconimage}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCategoryPress}
              style={buttonStyles.smallButton}
            >
              <Image
                source={icons.category}
                style={buttonStyles.iconimage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.optionButtonsContainer}>
          <TouchableOpacity
            onPress={() => handleOptionPress('price')}
            style={styles.optionButton}
          >
            <Text style={styles.optionButtonText}>
              {sortType === 'LOWEST_PRICE' ? '최고가' : '최저가'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleOptionPress('category')}
            style={styles.optionButton}
          >
            <Text style={styles.optionButtonText}>카테고리</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleOptionPress('latest')}
            style={styles.optionButton}
          >
            <Text style={styles.optionButtonText}>최신순</Text>
          </TouchableOpacity>
        </View>

        <ProductList products={products} />

        <TouchableOpacity
          onPress={handleProductWritePress}
          style={styles.addButton}
        >
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
  backgroundImage: {
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

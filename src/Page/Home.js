import React, {useEffect, useState} from 'react';
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
import {colors, icons} from '../styles/theme';
import {buttonStyles} from '../styles/buttonStyles';
import {API_URL} from '../globalVariables.js';

const Home = ({navigation}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/products`)
      .then(response => {
        setProducts(response.data.products);
      })
      .catch(error => {
        console.error('상품을 불러오는 중 에러 발생:', error);
      });
  }, []);

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

  return (
    <ImageBackground
      source={require('../../assets/homeBack.png')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <View
          style={[styles.buttonContainer, {justifyContent: 'space-between'}]}>
          <Image
            source={require('../../assets/logoWhite.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={handleSearchPress}
              style={buttonStyles.smallButton}>
              <Image
                source={icons.search}
                style={buttonStyles.iconimage}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleNotificationsPress}
              style={buttonStyles.smallButton}>
              <Image
                source={icons.alarm}
                style={buttonStyles.iconimage}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCategoryPress}
              style={buttonStyles.smallButton}>
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
            // eslint-disable-next-line no-undef
            onPress={() => handleOptionPress('price')}
            style={styles.optionButton}>
            <Text style={styles.optionButtonText}>가격</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleCategoryPress}
            style={styles.optionButton}>
            <Text style={styles.optionButtonText}>카테고리</Text>
          </TouchableOpacity>
        </View>

        <ProductList products={products} />

        <TouchableOpacity
          onPress={handleProductWritePress}
          style={styles.addButton}>
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

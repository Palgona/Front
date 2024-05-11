import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {icons, colors} from '../styles/theme';

const ProductList = ({products}) => {
  // 부모 컴포넌트로부터 products props를 받음
  const navigation = useNavigation();

  const renderProductItem = ({item}) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() =>
        navigation.navigate('ProductDetail', {productId: item.id})
      }>
      {/* 이미지 */}
      <Image source={{uri: item.image}} style={styles.productImage} />
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
  );

  return (
    <FlatList
      data={products} // 부모 컴포넌트로부터 받은 products props를 사용
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

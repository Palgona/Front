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
  const navigation = useNavigation();

  const formatDate = dateString => {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return new Intl.DateTimeFormat('ko-KR', options).format(date);
  };

  const renderProductItem = ({item}) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => navigation.navigate('ProductDetail', {productId: item.id})}
    >
      {/* 이미지 */}
      <Image source={{uri: item.imageUrl}} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.currentBid}원</Text>
        {/* 채팅수, 찜수 */}
        <View style={styles.chatAndLike}>
          <View style={styles.iconTextContainer}>
            <Image source={icons.chat} style={styles.icon} />
            <Text style={styles.chatAndLikeText}>{item.chatroomCount}</Text>
          </View>
          <View style={styles.iconTextContainer}>
            <Image source={icons.heart} style={styles.icon} />
            <Text style={styles.chatAndLikeText}>{item.bookmarkCount}</Text>
          </View>
        </View>
      </View>
      {/* 시간 */}
      <Text style={styles.timeText}>{formatDate(item.deadline)}</Text>
    </TouchableOpacity>
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
    backgroundColor: 'rgba(128, 128, 128, 0.05)',
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
    marginRight: 10,
  },
  icon: {
    width: 15,
    height: 15,
    marginRight: 4,
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

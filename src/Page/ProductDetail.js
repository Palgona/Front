import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { icons, colors, theme } from '../styles/theme'; 
import { API_URL } from '../globalVariables.js';
import ProductModal from '../Components/ProductModal';

const ProductDetail = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [liked, setLiked] = useState(false);

  // 예시 데이터
  const exampleProduct = {
    name: '나의 아이폰14',
    owner: {
      username: '김가룡',
      avatar: 'https://via.placeholder.com/150',
    },
    price: 100,
    content: '아이폰14 화이트 깨끗해요 잘썼어요'.repeat(50), // 긴 설명을 위해 반복
    imageUrls: ['https://via.placeholder.com/300'],
    chatCount: 10, // 채팅 수
    likeCount: 20, // 찜 수
  };

  useEffect(() => {
    // 데이터 가져오는 로직을 여기에 구현
    // 여기서는 예시 데이터를 사용하여 상품 정보를 설정합니다.
    /* API를 호출하여 상품 정보를 가져오는 로직
    fetch(`${API_URL}/products/${productId}`)
    .then(response => response.json())
    .then(data => setProduct(data))
    .catch(error => console.error('Error fetching product:', error)); */
    setProduct(exampleProduct);
  }, []);

  const handleChatPress = () => {
    // 채팅하기 클릭 시 동작
    // 상대방과 채팅할 수 있는 페이지로 이동하는 로직 구현
  };

  const handleBidPress = () => {
    // 참여하기 클릭 시 동작
    setModalVisible(true); // 모달 열기
  };

  const handleLikePress = () => {
    // 좋아요(like) 버튼을 누르면 liked 상태를 반전시킴
    setLiked(!liked);
  };

  if (!product) {
    return <Text>Loading...</Text>; // 데이터가 로드되지 않은 경우 로딩 메시지를 표시합니다.
  }

  return (
    <View style={theme.container}>

      {/* 이미지와 상품 정보 */}
      <ScrollView>
        <View style={styles.scrollContainer}>
          {/* 이미지 */}
          <TouchableOpacity onPress={() => navigation.navigate('User')}>
            <Image source={{ uri: product.imageUrls[0] }} style={styles.productImage} />
          </TouchableOpacity>

          {/* 상품 정보 */}
          <View style={styles.productInfo}>
            {/* 상품 이름과 사용자 정보 */}
            <View style={styles.nameAndUser}>
              <TouchableOpacity onPress={() => navigation.navigate('User')}>
                <Text style={styles.productName}>{product.name}</Text>
              </TouchableOpacity>
              {/* 사용자 이미지와 닉네임 */}
              <TouchableOpacity onPress={() => navigation.navigate('User')}>
                <View style={styles.userInfo}>
                  <Image source={{ uri: product.owner.avatar }} style={styles.userImage} />
                  <Text style={styles.userName}>{product.owner.username}</Text>
                </View>
              </TouchableOpacity>
            </View>
            {/* 가격, 최고 입찰가, 채팅 및 찜 정보 */}
            <View style={styles.details}>
              <Text style={styles.price}>현재 최고가: {product.price}원</Text>
              <View style={styles.chatAndLike}>
                <TouchableOpacity style={styles.iconContainer}>
                  <Image source={icons.chat} style={styles.icon} />
                  <Text style={styles.iconText}>{product.chatCount}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLikePress} style={styles.iconContainer}>
                  <Image source={liked ? icons.heartClick : icons.heart} style={[styles.icon, liked && styles.likedIcon]} />
                  <Text style={styles.iconText}>{product.likeCount}</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* 상품 설명 */}
            <Text style={styles.productDescription}>{product.content}</Text>
          </View>
        </View>
      </ScrollView>

      {/* 하단 버튼 */}
      <View style={styles.buttonContainer}>
        {/* 채팅하기 버튼 */}
        <TouchableOpacity style={styles.Button} onPress={handleChatPress}>
          <Text style={styles.buttonText}>채팅하기</Text>
        </TouchableOpacity>
        {/* 참여하기 버튼 */}
        <TouchableOpacity style={styles.Button} onPress={handleBidPress}>
          <Text style={styles.buttonText}>참여하기</Text>
        </TouchableOpacity>
      </View>

      {/* 모달 */}
      {modalVisible && <ProductModal visible={modalVisible} onClose={() => setModalVisible(false)} />}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    marginBottom: 55,
    padding: 20,
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
  },
  productInfo: {
    marginBottom: 20,
    color: colors.darkGray,
  },
  nameAndUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.darkGray,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  },
  userName: {
    fontSize: 16,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    marginTop: 15,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatAndLike: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 21,
    height: 21,
    marginLeft: 10,
  },
  iconText: {
    fontSize: 16,
    marginLeft: 3,
  },
  productDescription: {
    fontSize: 16,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    backgroundColor: 'white',
    padding: 10,
    bottom: 0,
    left: 20,
    right: 20,
  },
  Button: {
    backgroundColor: colors.mainYellow,
    borderRadius: 50,
    paddingVertical: 10,
    flex: 1,
    marginRight: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.darkGray,
    fontSize: 16,
  },
});

export default ProductDetail;

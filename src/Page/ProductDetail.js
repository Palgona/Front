import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {icons, colors, theme} from '../styles/theme';
import axios from 'axios';
import {API_URL} from '../globalVariables.js';
import ProductModal from '../Components/ProductModal';
import Swiper from 'react-native-swiper';
import {getAccessToken} from '../token.js';

const windowWidth = Dimensions.get('window').width;

const ProductDetail = ({route, navigation}) => {
  const {productId} = route.params;
  const [product, setProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [liked, setLiked] = useState(false);
  };

  useEffect(() => {
    // 데이터 가져오는 로직
    getProductData();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getProductData = async () => {
    try {
      //const accessToken = await getAccessToken();
      const response = await axios.get(`${API_URL}/products/${productId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const data = response.data;
      const productData = {
        productId: data.productId,
        productName: data.productName,
        content: data.content,
        category: data.category,
        productState: data.productState,
        deadline: data.deadline,
        created_at: data.created_at,
        ownerId: data.ownerId,
        ownerName: data.ownerName,
        ownerImgUrl: data.ownerImgUrl,
        highestPrice: data.highestPrice,
        bookmarkCount: data.bookmarkCount,
        imageUrls: data.imageUrls,
      };
      setProduct(productData);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const createChatRoom = async () => {
    try {
      //const accessToken = await getAccessToken();
      // 채팅방 생성 API 호출
      const response = await axios.post(
        `${API_URL}/chats`,
        {visitorId: 0},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const chatRoomId = response.data.chatRoomId;
      // 생성된 채팅방으로 넘어가기
      navigation.navigate('Chat', {chatRoomId});
    } catch (error) {
      console.error('Error creating chat room:', error);
    }
  };

  const handleBidPress = () => {
    // 참여하기 클릭 시 동작
    setModalVisible(true); // 모달 열기
  };

  const handleLikePress = async () => {
    // 좋아요(like) 버튼을 누르면 liked 상태를 반전시킴
    setLiked(!liked);
    // 서버와 통신하여 북마크를 추가하거나 삭제합니다.
    const url = `${API_URL}/bookmarks/${productId}`;
    const method = liked ? 'DELETE' : 'POST';
    try {
      const response = await axios({
        method: method,
        url: url,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          productId: productId,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // 서버에서 성공적인 응답을 받은 경우, 필요한 작업을 수행할 수 있습니다.
      // 예: 사용자에게 메시지 표시 등
    } catch (error) {
      console.error('Error updating bookmark:', error);
      // 오류 처리를 수행합니다. 예: 사용자에게 오류 메시지 표시
    }
  };

  if (!product) {
    return <Text>Loading...</Text>; // 데이터가 로드되지 않은 경우 로딩 메시지를 표시합니다.
  }

  return (
    <View style={theme.container}>
      {/* 상품 이미지 및 정보 */}
      <ScrollView>
        <View style={styles.scrollContainer}>
          <Swiper
            style={styles.Swiper}
            dotStyle={{backgroundColor: colors.mainGray}}
            activeDotStyle={{backgroundColor: colors.mainYellow}}>
            {product.imageUrls.map((imageUrl, index) => (
              <Image
                key={index}
                source={{uri: imageUrl}}
                style={styles.productImage}
              />
            ))}
          </Swiper>
          <View style={styles.productInfo}>
            {/* 상품 이름 및 판매자 정보 */}
            <View style={styles.nameAndUser}>
              <Text style={styles.productName}>{product.productName}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('User', {userId: product.ownerId})
                }>
                <View style={styles.userInfo}>
                  <Image
                    source={{uri: product.ownerImgUrl}}
                    style={styles.userImage}
                  />
                  <Text style={styles.userName}>{product.ownerName}</Text>
                </View>
              </TouchableOpacity>
            </View>
            {/* 가격, 채팅 및 찜 정보 */}
            <View style={styles.details}>
              <Text style={styles.price}>최고가: {product.highestPrice}원</Text>
              <View style={styles.chatAndLike}>
                <TouchableOpacity style={styles.iconContainer}>
                  <Image source={icons.chat} style={styles.icon} />
                  <Text style={styles.iconText}>{product.chatCount}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleLikePress}
                  style={styles.iconContainer}>
                  <Image
                    source={liked ? icons.heartClick : icons.heart}
                    style={[styles.icon, liked && styles.likedIcon]}
                  />
                  <Text style={styles.iconText}>{product.bookmarkCount}</Text>
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
        <TouchableOpacity style={styles.Button} onPress={createChatRoom}>
          <Text style={styles.buttonText}>채팅하기</Text>
        </TouchableOpacity>
        {/* 참여하기 버튼 */}
        <TouchableOpacity style={styles.Button} onPress={handleBidPress}>
          <Text style={styles.buttonText}>참여하기</Text>
        </TouchableOpacity>
      </View>

      {/* 모달 */}
      {modalVisible && (
        <ProductModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    marginBottom: 55,
    padding: 20,
  },
  Swiper: {
    //width: '100%',
    //aspectRatio: 1,
    marginBottom: 5,
    height: windowWidth,
  },
  productImage: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  productInfo: {
    marginBottom: 10,
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
    tintColor: colors.mainGray,
  },
  likedIcon: {
    tintColor: colors.point,
  },
  iconText: {
    fontSize: 16,
    marginLeft: 3,
    color: colors.mainGray,
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

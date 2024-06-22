import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import {
  Dimensions,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Popover from "react-native-popover-view";
import { icons, colors, theme } from "../styles/theme";
import { API_URL } from "../globalVariables.js";
import ProductModal from "../Components/ProductModal";
import Swiper from "react-native-swiper";
import { getAccessToken } from "../token.js";
import axios from "axios";

const windowWidth = Dimensions.get("window").width;

const ProductDetail = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [liked, setLiked] = useState(false);
  const [alarmEnabled, setAlarmEnabled] = useState(false);
  const [user, setUser] = useState(null);
  const etcButtonRef = useRef();
  const [etcButtonLayout, setEtcButtonLayout] = useState(null);

  useLayoutEffect(() => {
    if (etcButtonRef.current) {
      etcButtonRef.current.measure((x, y, width, height, pageX, pageY) => {
        setEtcButtonLayout({ x: pageX, y: pageY, width, height });
      });
    }
  }, []);

  const exampleProduct = {
    productId: 0,
    productName: "나의 아이폰14",
    content: "아이폰14 화이트 깨끗해요 잘썼어요".repeat(50), // 긴 설명을 위해 반복
    category: "스마트폰",
    productState: "중고",
    deadline: "2024-03-27T08:24:43.012Z",
    created_at: "2024-03-27T08:24:43.012Z",
    ownerId: 123, // 판매자의 고유 ID
    ownerName: "김가룡",
    ownerImgUrl: "https://via.placeholder.com/150",
    highestPrice: 100,
    bookmarkCount: 20,
    imageUrls: [
      "https://via.placeholder.com/300/aabbcc/FFFFFF?text=Image+1",
      "https://via.placeholder.com/300/3498DB/FFFFFF?text=Image+2",
      "https://via.placeholder.com/300/2ECC71/FFFFFF?text=Image+3",
      "https://via.placeholder.com/300/ccbbff/FFFFFF?text=Image+4",
    ],
    chatCount: 10, // 채팅 수
    likeCount: 20, // 찜 수
  };

  useEffect(() => {
    setUser({
      userId: 123,
      userName: "임시 사용자",
      // 다른 사용자 정보들...
    });
  }, []);

  useEffect(() => {
    // 데이터 가져오는 로직
    fetchProduct();

    // 예시 데이터를 사용하여 상품 정보를 설정합니다.
    setProduct(exampleProduct);
  }, []);

  const fetchProduct = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axios.get(`${API_URL}/products/${productId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
      });
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
      console.error("Error fetching product:", error);
    }
  };

  const handleAlarm = () => {
    setAlarmEnabled(!alarmEnabled);
    Alert.alert("알림", "게시물 알림이 설정되었습니다.");
  };

  const handleEtc = () => {
    setPopoverVisible(true);
  };

  const handleChatPress = async () => {
    try {
      const accessToken = await getAccessToken();

      // 채팅방 생성 API 호출
      const createChatResponse = await axios.post(
        `${API_URL}/chats`,
        {
          visitorId: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${accessToken}`,
          },
        }
      );

      const createChatData = createChatResponse.data;

      // 생성된 채팅방으로 넘어가기
      const chatRoomId = createChatData.chatRoomId;

      // 필요한 정보만 추출
      const senderId = createChatData.senderId || 0;
      const receiverId = createChatData.receiverId || 0;
      const isLeaveSender =
        createChatData.isLeaveSender !== undefined
          ? createChatData.isLeaveSender
          : true;
      const isLeaveReceiver =
        createChatData.isLeaveReceiver !== undefined
          ? createChatData.isLeaveReceiver
          : true;

      // 네비게이션으로 채팅방으로 이동하며 필요한 데이터 전달
      navigation.navigate("ChatRoom", {
        chatRoomId,
        senderId,
        receiverId,
        isLeaveSender,
        isLeaveReceiver,
      });
    } catch (error) {
      console.error("Error creating chat room:", error);
    }
  };

  const handleEdit = () => {
    setPopoverVisible(false);
    // 수정하기 기능 구현
  };

  const handleDelete = async () => {
    setPopoverVisible(false);
    try {
      const accessToken = await getAccessToken();
      const response = await axios.delete(`${API_URL}/products/${productId}`, {
        headers: {
          Authorization: `${accessToken}`,
        },
      });
      if (response.status === 200) {
        console.log("Product deleted successfully");
        Alert.alert("알림", "상품이 삭제되었습니다.", [
          {
            text: "확인",
            onPress: () => navigation.navigate("MainScreen"), // 메인 화면으로 이동
          },
        ]);
      } else {
        console.error("Failed to delete product:", response.data);
        Alert.alert("오류", "상품 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      Alert.alert("오류", "상품 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleReport = () => {
    setPopoverVisible(false);
    // 신고하기 기능 구현
  };

  const handleShare = () => {
    setPopoverVisible(false);
    // 공유하기 기능 구현
  };

  const handleBidPress = () => {
    //참여하기 버튼
  };

  const handleLikePress = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axios.post(`${API_URL}/bookmarks/${productId}`, {
        headers: {
          Authorization: `${accessToken}`,
        },
      });
      if (response.status === 200) {
        // 성공적으로 북마크가 추가되면 liked 상태를 토글하고 북마크 수를 업데이트
        setLiked(!liked);
        setProduct((prevProduct) => ({
          ...prevProduct,
          bookmarkCount: liked
            ? prevProduct.bookmarkCount - 1
            : prevProduct.bookmarkCount + 1,
        }));
      } else {
        // API 요청 실패 처리
        console.error("Failed to bookmark product.");
      }
    } catch (error) {
      console.error("Error while bookmarking product:", error);
    }
  };

  const currentUserId = user ? user.userId : null;

  // 팝오버에 표시할 내용을 담을 변수를 초기화합니다.
  let popoverContent;

  if (currentUserId === exampleProduct.ownerId) {
    popoverContent = (
      <View style={styles.popoverContent}>
        <TouchableOpacity style={styles.popoverOption} onPress={handleEdit}>
          <Text style={styles.popoverText}>수정하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.popoverOption} onPress={handleDelete}>
          <Text style={styles.popoverText}>삭제하기</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    // 현재 사용자와 게시글을 올린 사용자가 다른 경우
    popoverContent = (
      <View style={styles.popoverContent}>
        <TouchableOpacity style={styles.popoverOption} onPress={handleReport}>
          <Text style={styles.popoverText}>신고하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.popoverOption} onPress={handleShare}>
          <Text style={styles.popoverText}>공유하기</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!product) {
    return <Text>Loading...</Text>; // 데이터가 로드되지 않은 경우 로딩 메시지를 표시합니다.
  }

  return (
    <View style={theme.container}>
      {/* 상품 이미지 및 정보 */}
      <View style={styles.header}>
        {/* 알림 버튼 */}
        <TouchableOpacity style={styles.headerButton} onPress={handleAlarm}>
          <Image
            source={alarmEnabled ? icons.alarmChecked : icons.alarm}
            style={styles.headerIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerButton}
          ref={etcButtonRef}
          onPress={handleEtc}
        >
          <Image source={icons.etc} style={styles.headerIcon} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.scrollContainer}>
          <Swiper
            style={styles.Swiper}
            dotStyle={{ backgroundColor: colors.mainGray }}
            activeDotStyle={{ backgroundColor: colors.mainYellow }}
          >
            {product.imageUrls.map((imageUrl, index) => (
              <Image
                key={index}
                source={{ uri: imageUrl }}
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
                  navigation.navigate("User", { userId: product.ownerId })
                }
              >
                <View style={styles.userInfo}>
                  <Image
                    source={{ uri: product.ownerImgUrl }}
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
                  style={styles.iconContainer}
                >
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
        <TouchableOpacity style={styles.Button} onPress={handleChatPress}>
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
      <Popover
        isVisible={popoverVisible}
        from={etcButtonLayout}
        onRequestClose={() => setPopoverVisible(false)}
        placement="bottom"
      >
        {popoverContent}
      </Popover>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  headerButton: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  headerIcon: {
    width: 25,
    height: 25,
    tintColor: colors.mainGray,
  },
  scrollContainer: {
    marginBottom: 55,
    padding: 20,
    paddingTop: 10,
  },
  Swiper: {
    marginBottom: 5,
    height: windowWidth,
  },
  productImage: {
    width: "100%",
    aspectRatio: 1,
    resizeMode: "contain",
    borderRadius: 10,
  },
  productInfo: {
    marginBottom: 10,
    color: colors.darkGray,
  },
  nameAndUser: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.darkGray,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    marginTop: 15,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
  chatAndLike: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    backgroundColor: "white",
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
    alignItems: "center",
  },
  buttonText: {
    color: colors.darkGray,
    fontSize: 16,
  },
  editButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: colors.mainBlue,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    alignItems: "center",
  },
  editButtonText: {
    color: "white",
    fontSize: 16,
  },
  popoverContent: {
    padding: 10,
  },
  popoverOption: {
    paddingVertical: 7,
  },
  popoverText: {
    fontSize: 15,
    color: colors.darkGray,
  },
});

export default ProductDetail;

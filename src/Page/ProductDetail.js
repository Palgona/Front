import React, { useState, useEffect, useRef } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  const etcButtonRef = useRef();
  const [etcButtonLayout, setEtcButtonLayout] = useState(null);
  const [userData, setUserData] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    fetchUserData();
    fetchProduct();
    checkLikedStatus(); // 페이지 로드 시 좋아요 상태를 확인하기 위한 함수 호출
  }, []);

  useEffect(() => {
    return () => {
      AsyncStorage.removeItem(`likedStatus_${productId}`);
    };
  }, [productId]);

  const fetchUserData = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axios.get(`${API_URL}/members/my`, {
        headers: {
          Authorization: `${accessToken}`,
        },
      });
      const { id, nickName, mileage, profileImage } = response.data;
      setUserData({ id, nickName, mileage, profileImage });
      setCurrentUserId(id);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

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

  const checkLikedStatus = async () => {
    try {
      const likedStatus = await AsyncStorage.getItem(`likedStatus_${productId}`);
      if (likedStatus === "true") {
        setLiked(true);
      } else {
        setLiked(false);
      }
    } catch (error) {
      console.error("Error getting liked status:", error);
    }
  };

  const toggleLikeStatus = async () => {
    try {
      const accessToken = await getAccessToken();
      if (!liked) {
        const response = await axios.post(
          `${API_URL}/bookmarks/${productId}`,
          {},
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          setLiked(true);
          await AsyncStorage.setItem(`likedStatus_${productId}`, "true");
          setProduct((prevProduct) => ({
            ...prevProduct,
            bookmarkCount: prevProduct.bookmarkCount + 1,
          }));
        } else {
          console.error("Failed to add product to bookmarks.");
        }
      } else {
        const response = await axios.delete(
          `${API_URL}/bookmarks/${productId}`,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          setLiked(false);
          await AsyncStorage.setItem(`likedStatus_${productId}`, "false");
          setProduct((prevProduct) => ({
            ...prevProduct,
            bookmarkCount: prevProduct.bookmarkCount - 1,
          }));
        } else {
          console.error("Failed to remove product from bookmarks.");
        }
      }
    } catch (error) {
      console.error("Error toggling like status:", error);
    }
  };

  const handleLikePress = async () => {
    toggleLikeStatus();
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
      const response = await axios.post(
        `${API_URL}/chats`,
        { visitorId: product.ownerId },
        {
          headers: {
            Authorization: `${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const chatRoomId = response.data.chatRoomId;
        navigation.navigate("ChatRoom", { chatRoomId });
      } else {
        Alert.alert("Error", "Failed to create or retrieve chat room.");
      }
    } catch (error) {
      console.error("Error creating chat room:", error);
      Alert.alert("Error", "An error occurred while creating the chat room.");
    }
  };

  const handleBidPress = async () => {
    try {
      const accessToken = await getAccessToken();
      const price = 1000;
      if (!price) {
        Alert.alert("Error", "Bid price cannot be empty.");
        return;
      }

      const response = await axios.post(
        `${API_URL}/biddings/attempt`,
        {
          productId: parseInt(productId),
          price: parseFloat(price),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        Alert.alert("Success", "Bid placed successfully!");
        // Handle successful bid placement (e.g., navigate to another screen)
      } else {
        Alert.alert("Error", "Failed to place bid. Please try again.");
      }
    } catch (error) {
      console.error("Error placing bid:", error);
      Alert.alert("Error", "Failed to place bid. Please try again.");
    }
  };

  const handleEdit = () => {
    setPopoverVisible(false);
    // 수정하기 기능 구현
  };

  const handleDelete = async () => {
    setPopoverVisible(false);
    // 삭제하기 기능 구현
  };

  const handleReport = () => {
    setPopoverVisible(false);
    // 신고하기 기능 구현
  };

  const handleShare = () => {
    setPopoverVisible(false);
    // 공유하기 기능 구현
  };

  let popoverContent;
  if (product && currentUserId === product.ownerId) {
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
    return <Text>Loading...</Text>;
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

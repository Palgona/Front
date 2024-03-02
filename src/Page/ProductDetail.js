import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Modal, Button } from 'react-native';
import { icons, } from '../styles/theme'; 
import { API_URL } from '../globalVariables.js';

const ProductDetail = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // 예시 데이터
  const exampleProduct = {
    name: '나의 아이폰14',
    owner: {
      username: '김가룡',
      avatar: 'https://via.placeholder.com/150',
    },
    price: 100,
    content: '아이폰14 화이트 깨끗해요 잘썼어요'.repeat(20), // 긴 설명을 위해 반복
    imageUrls: ['https://via.placeholder.com/300'],
  };

  useEffect(() => {
    // 데이터 가져오는 로직을 여기에 구현
    // 여기서는 예시 데이터를 사용하여 상품 정보를 설정합니다.
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

  if (!product) {
    return <Text>Loading...</Text>; // 데이터가 로드되지 않은 경우 로딩 메시지를 표시합니다.
  }

  return (
    <View style={styles.container}>
      {/* 이전으로 돌아가는 버튼 */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.goBack}>{'<   '}</Text>
      </TouchableOpacity>

      {/* 이미지 */}
      <Image source={{ uri: product.imageUrls[0] }} style={styles.productImage} />

      {/* 상품 정보 */}
      <View style={styles.productInfo}>
        {/* 상품 이름과 사용자 정보 */}
        <View style={styles.nameAndUser}>
          <Text style={styles.productName}>{product.name}</Text>
          {/* 사용자 이미지와 닉네임 */}
          <View style={styles.userInfo}>
            <Image source={{ uri: product.owner.avatar }} style={styles.userImage} />
            <Text style={styles.userName}>{product.owner.username}</Text>
          </View>
        </View>
        {/* 가격, 최고 입찰가, 채팅 및 찜 정보 */}
        <View style={styles.details}>
          <Text style={styles.price}>Highest Bid: ${product.price}</Text>
          <Text style={styles.chatAndLike}>Chat: 10 / Like: 20</Text>
        </View>
        {/* 상품 설명 */}
        <ScrollView style={styles.descriptionContainer}>
          <Text style={styles.productDescription}>{product.content}</Text>
        </ScrollView>
      </View>

      {/* 하단 버튼 */}
      <View style={styles.buttonContainer}>
        {/* 채팅하기 버튼 */}
        <TouchableOpacity style={styles.chatButton} onPress={handleChatPress}>
          <Text style={styles.buttonText}>Chat</Text>
        </TouchableOpacity>
        {/* 참여하기 버튼 */}
        <TouchableOpacity style={styles.bidButton} onPress={handleBidPress}>
          <Text style={styles.buttonText}>Bid</Text>
        </TouchableOpacity>
      </View>

      {/* 모달 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Modal Content</Text>
            <Button title="Close" onPress={() => setModalVisible(!modalVisible)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  goBack: {
    marginBottom: 10,
    fontSize: 16,
    color: 'blue',
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
  },
  nameAndUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    color: 'blue',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatAndLike: {
    fontSize: 14,
    color: 'gray',
  },
  descriptionContainer: {
    maxHeight: 200,
  },
  productDescription: {
    fontSize: 16,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  chatButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    paddingVertical: 10,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  bidButton: {
    backgroundColor: 'green',
    borderRadius: 5,
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
});

export default ProductDetail;

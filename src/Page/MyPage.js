import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { icons, colors } from '../styles/theme';
import Profile from '../Components/Profile';
import Mailage from '../Components/Mailage';
import { API_URL } from '../globalVariables.js';
import axios from 'axios';

const MyPage = ({ navigation }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);
  
  const fetchUserData = async () => {
    try {
      // 임시 사용자 데이터를 가져오는 API 호출
      const response = await axios.get(`${API_URL}/user`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // 사용자 정보가 없을 때의 기본값
  const defaultUser = {
    userId: '123',
    nickname: '김가룡',
    profile_image: 'https://via.placeholder.com/80',
  };

  // 사용자 정보가 없을 경우 기본값 사용
  const user = userData || defaultUser;

  const handleEditProfile = () => {
    // 프로필 편집 페이지로 이동
    // navigation.navigate('EditProfile');
  };

  const handleSellList = () => {
    // 판매내역 페이지로 이동
    navigation.navigate('SellList', { userId });
  };

  const handleReview = () => {
    // 거래 후기 페이지로 이동
    // navigation.navigate('Review', { memberId });
  };

  const handleManner = () => {
    // 받은 매너 평가 페이지로 이동
    // navigation.navigate('UserManner', { memberId });
  };


  return (
    <View style={styles.container}>
      {/* 프로필과 프로필 편집 버튼을 감싸는 컨테이너 */}
      <View style={styles.profileContainer}>
        {/* Profile 컴포넌트 */}
        <Profile user={user} />

        {/* 프로필 편집 버튼 */}
        <TouchableOpacity style={styles.editProfileButton} onPress={handleEditProfile}>
          <Text style={styles.editProfileText}>프로필 편집</Text>
        </TouchableOpacity>
      </View>
        {/* 마일리지 컴포넌트 */}
        <Mailage/>
        {/* 기능 목록 */}
        <View style={styles.functionList}>
        <View style={styles.separator} />
        <Text>My</Text>
        <TouchableOpacity style={styles.functionItem} onPress={handleSellList}>
          <Text style={styles.functionText}>장바구니</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.functionItem} onPress={handleReview}>
          <Text style={styles.functionText}>판매 내역</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.functionItem} onPress={handleManner}>
          <Text style={styles.functionText}>구매 내역</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.functionItem} onPress={handleManner}>
          <Text style={styles.functionText}>키워드 관리</Text>
        </TouchableOpacity>

        <View style={styles.separator} />
        <Text>이용안내</Text>
        <TouchableOpacity style={styles.functionItem} onPress={handleManner}>
          <Text style={styles.functionText}>문의 사항</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.functionItem} onPress={handleManner}>
          <Text style={styles.functionText}>알림</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.functionItem} onPress={handleManner}>
          <Text style={styles.functionText}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: '10%',
    backgroundColor: colors.background,
  },
  profileContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    padding: 10,
    marginVertical: 20,
    borderRadius: 10,
  },
  editProfileButton: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 'auto',
    padding: 10,
    borderRadius: 50,
    backgroundColor: colors.secondGreen
  },
  editProfileIcon: {
    width: 25,
    height: 25,
    marginBottom: 5,
    tintColor: colors.darkGray,
  },
  editProfileText: {
    color: colors.mainGray,
    fontSize: 10,
    fontWeight: 'bold',
  },
  functionList: {
    width: '100%',
  },
  functionItem: {
    marginVertical: 15,
    fontSize: 20,
  },
  functionText: {
    fontSize: 17,
    color: colors.darkGray,
  },
  separator: {
    height: 1,
    backgroundColor: colors.darkGray,
    marginBottom: 10,
    marginTop: 10,
  },
});
  
export default MyPage;

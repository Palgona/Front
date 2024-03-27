import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { icons, colors } from '../styles/theme';
import Profile from '../Components/Profile';
import { API_URL } from '../globalVariables.js';
import axios from 'axios';

const User = ({ route, navigation }) => {
  const { userId } = route.params;
  const [memberData, setMemberData] = useState(null);

  useEffect(() => {
    fetchMemberData();
  }, []);
  
  const fetchMemberData = async () => {
    try {
      const response = await axios.get(`${API_URL}/members/${userId}`);
      setMemberData(response.data);
    } catch (error) {
      console.error('Error fetching member data:', error);
    }
  };

  // 임시 사용자 프로필 정보
  const user = {
    userId: memberData ? memberData.userId : '123',
    nickname: memberData ? memberData.username : '김가룡',
    profile_image: memberData ? memberData.avatar : 'https://via.placeholder.com/80',
  };

  const handleReport = () => {
    // 신고하기 버튼 클릭 시 동작
    // 신고 화면으로 이동하는 로직 구현
    // navigation.navigate('Report', { memberId });
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
      {/* 프로필과 신고하기 버튼을 감싸는 컨테이너 */}
      <View style={styles.profileContainer}>
        {/* Profile 컴포넌트 호출 */}
        <Profile user={user} />

        {/* 신고하기 버튼 */}
        <TouchableOpacity style={styles.reportButton} onPress={handleReport}>
          <Image source={icons.report} style={styles.reportIcon} />
          <Text style={styles.reportButtonText}>신고하기</Text>
        </TouchableOpacity>
      </View>

      {/* 기능 목록 */}
      <View style={styles.functionList}>
        <View style={styles.separator} />
        <TouchableOpacity style={styles.functionItem} onPress={handleSellList}>
          <Text style={styles.functionText}>판매내역</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.functionItem} onPress={handleReview}>
          <Text style={styles.functionText}>거래 후기</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.functionItem} onPress={handleManner}>
          <Text style={styles.functionText}>받은 매너 평가</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: '20%',
    backgroundColor: colors.background,
  },
  profileContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginBottom: '10%', 
    padding: 10,
    paddingVertical: 20,
    borderRadius: 10,
    backgroundColor: colors.secondYellow,
  },
  reportButton: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 'auto',
    padding: 10,
    borderRadius: 5,
    color: colors.mainGray,
  },
  reportIcon: {
    width: 25,
    height: 25,
    marginBottom: 5,
    tintColor: colors.mainGray,
  },
  reportButtonText: {
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
    color: colors.mainGray,
  },
  separator: {
    height: 1,
    backgroundColor: colors.mainGray,
    marginBottom: 30,
  },
});
  
export default User;

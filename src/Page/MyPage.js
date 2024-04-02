import React, { useState, useEffect } from 'react';
import { Alert, View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
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
      const response = await axios.get(`${API_URL}/members/my`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // 사용자 정보가 없을 때의 기본값
  const defaultUser = {
    id: '123',
    nickname: '김가룡',
    mailage: 1000,
    profile_image: 'https://via.placeholder.com/80',
  };

  // 사용자 정보가 없을 경우 기본값 사용
  const user = userData || defaultUser;

  const handleEditProfile = () => {
    // 프로필 편집 페이지로 이동
    navigation.navigate('ProfileEdit');
  };

  const handleMailage = () => {
    //마일리지 충전 페이지로 이동
    navigation.navigate('MailageCharge', {user})
  }

  const handleList = (listType) =>{
    //리스트 페이지로 이동
    navigation.navigate('List', {user, listType})
  }

  const handleKeyword = () => {
    // 키워드관리 페이지로 이동 
  };

  const handleAsk =() => {
    //문의사항 페이지로 이동
    navigation.navigate('Ask', {user});
  };

  const handleAlarm = () => {
    //알림 설정 페이지로 이동
  };

  const handleLogout = async () => {
    // 확인 메시지를 표시하여 로그아웃 여부를 사용자에게 물어봄
    Alert.alert(
      '로그아웃 확인',
      '정말 로그아웃하시겠습니까?',
      [
        {
          text: '취소',
          onPress: () => console.log('취소되었습니다.'),
          style: 'cancel',
        },
        {
          text: '로그아웃',
          onPress: async () => {
            try {
              // 로그아웃 API 호출
              await axios.post(`${API_URL}/logout`);
              // 로그아웃 성공 메시지
              Alert.alert('로그아웃', '로그아웃되었습니다.');
              // 홈화면으로 이동
              navigation.navigate('Home');
            } catch (error) {
              console.error('Error logging out:', error);
              // 로그아웃 실패 메시지
              Alert.alert('로그아웃 실패', '로그아웃을 실패했습니다. 다시 시도해주세요.');
            }
          },
        },
      ],
      { cancelable: false }
    );
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
        <TouchableOpacity onPress={handleMailage}>
          <Mailage user={user}/>
        </TouchableOpacity>

        {/* 기능 목록 */}
        <View style={styles.functionList}>
        <View style={styles.separator} />
        <Text>My</Text>
        <TouchableOpacity style={styles.functionItem} onPress={() => handleList('bookmark')}>
          <Text style={styles.functionText}>장바구니</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.functionItem} onPress={() => handleList('sell')}>
          <Text style={styles.functionText}>판매 내역</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.functionItem} onPress={() => handleList('buy')}>
          <Text style={styles.functionText}>구매 내역</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.functionItem} onPress={handleKeyword}>
          <Text style={styles.functionText}>키워드 관리</Text>
        </TouchableOpacity>

        <View style={styles.separator} />
        <Text>이용안내</Text>
        <TouchableOpacity style={styles.functionItem} onPress={handleAsk}>
          <Text style={styles.functionText}>문의 사항</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.functionItem} onPress={handleAlarm}>
          <Text style={styles.functionText}>알림</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.functionItem} onPress={handleLogout}>
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
    color: colors.darkGray,
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
    marginBottom: 15,
    marginTop: 15,
  },
});
  
export default MyPage;

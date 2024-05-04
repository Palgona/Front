import React, {useState, useEffect} from 'react';
import {Alert, View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {colors} from '../styles/theme';
import Profile from '../Components/Profile';
import Mailage from '../Components/Mailage';
import {API_URL} from '../globalVariables.js';
import axios from 'axios';

const MyPage = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [accessToken] = useState(
    'eyJhbGciOiJIUzI1NiJ9.eyJzb2NpYWxJZCI6IjEyMzE3MjM3IiwiaWF0IjoxNzEzNjAxNjg1LCJleHAiOjEwMDAxNzEzNjAxNjg1fQ.NhIHmTyMvh_rDaugZRV0xB353OXuW-1qwI1MWKwldps',
  );
  const [refreshToken] = useState(
    'eyJhbGciOiJIUzI1NiJ9.eyJzb2NpYWxJZCI6IjEyMzE3MjM3IiwiaWF0IjoxNzEzNjAxNjg1LCJleHAiOjEwMDAxNzEzNjAxNjg1fQ.NhIHmTyMvh_rDaugZRV0xB353OXuW-1qwI1MWKwldps',
  );

  useEffect(() => {
    fetchUserData();
  }, []); // useEffect 의존성 배열 수정

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${API_URL}/members/my`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const {id, nickName, mileage, profileImage} = response.data;
      setUserData({id, nickName, mileage, profileImage});
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const user = userData;

  const handleEditProfile = () => {
    navigation.navigate('ProfileEdit', {user: userData});
  };

  const handleMailage = () => {
    navigation.navigate('MaileageCharge', {user});
  };

  const handleList = listType => {
    navigation.navigate('List', {user, listType});
  };

  const handleKeyword = () => {
    // 키워드 관리 페이지로 이동
  };

  const handleAsk = () => {
    navigation.navigate('Ask', {user});
  };

  const handleAlarm = () => {
    // 알림 설정 페이지로 이동
  };

  const handleLogout = async () => {
    try {
      // 유효한 경우 로그아웃 요청 보내기
      const response = await axios.post(`${API_URL}/auth/logout`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'refresh-token': `Bearer ${refreshToken}`,
        },
      });
      if (response.status === 204) {
        Alert.alert('로그아웃', '로그아웃되었습니다.');
        navigation.navigate('Login'); // 로그인 페이지로 이동
      } else {
        throw new Error('로그아웃 실패');
      }
    } catch (error) {
      console.error('로그아웃 에러:', error.message);
      // 로그아웃 실패시 추가 처리
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Profile user={user} />
        <TouchableOpacity
          style={styles.editProfileButton}
          onPress={handleEditProfile}>
          <Text style={styles.editProfileText}>프로필 편집</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleMailage}>
        <Mailage user={user} />
      </TouchableOpacity>

      <View style={styles.functionList}>
        <View style={styles.separator} />
        <Text>My</Text>
        <TouchableOpacity
          style={styles.functionItem}
          onPress={() => handleList('bookmark')}>
          <Text style={styles.functionText}>장바구니</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.functionItem}
          onPress={() => handleList('sell')}>
          <Text style={styles.functionText}>판매 내역</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.functionItem}
          onPress={() => handleList('buy')}>
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
    backgroundColor: colors.secondGreen,
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

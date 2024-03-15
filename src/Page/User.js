import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { icons, colors } from '../styles/theme';
import Profile from '../Components/Profile';

const User = ({ navigation }) => {
  // 임시 사용자 프로필 정보
  const user = {
    nickname: '김가룡',
    profile_image: 'https://via.placeholder.com/90',
    bio: '하이루 김가룡데스',
  };

  const handleReport = () => {
    // 신고하기 버튼 클릭 시 동작
    // 신고 화면으로 이동하는 로직 구현
    // navigation.navigate('Report', { memberId });
  };

  const handleSellList = () => {
    // 판매내역 페이지로 이동
    // navigation.navigate('SellList', { memberId });
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
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 30,
      backgroundColor: 'white',
    },
    profileContainer: {
      flexDirection: 'row', // 가로 방향으로 정렬
      alignItems: 'center', // 세로 방향에서 중앙 정렬
      marginBottom: 50, // 프로필과 버튼 사이에 여백 추가
      marginTop: '20%', // 상단 여백 설정
    },
    reportButton: {
      flexDirection: 'column',
      alignItems: 'center',
      marginLeft: 'auto',
      padding: 10,
      borderRadius: 5,
    },
    reportIcon: {
      width: 25,
      height: 25,
      marginBottom: 5,
    },
    reportButtonText: {
      color: 'black',
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
    },
    separator: {
      height: 1,
      backgroundColor: 'gray',
      marginBottom: 30,
    },
  });
  
export default User;

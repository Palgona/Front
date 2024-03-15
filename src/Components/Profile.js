import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const Profile = ({ user }) => {
  return (
    <View style={styles.container}>
      {/* 사용자 프로필 이미지 */}
      <Image source={{ uri: user.profile_image }} style={styles.avatar} />
      
      {/* 닉네임과 소개 */}
      <View style={styles.userInfo}>
        <Text style={styles.nickname}>{user.nickname}</Text>
        <Text style={styles.bio}>{user.bio}</Text>
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: screenWidth * 0.7, // 화면 너비의 70%
  },
  avatar: {
    width: 90, 
    height: 90,
    borderRadius: 75,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  nickname: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bio: {
    fontSize: 13,
  },
});

export default Profile;

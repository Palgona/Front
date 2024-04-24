import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {colors} from '../styles/theme';

const Profile = ({user}) => {
  // user 객체가 null이면 null을 반환하고, null이 아니면 user 객체를 반환
  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* 사용자 프로필 이미지 */}
      <Image source={{uri: user.profileImage}} style={styles.avatar} />

      {/* 닉네임과 소개 */}
      <View style={styles.userInfo}>
        <Text style={styles.nickname}>{user.nickName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 75,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  nickname: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.darkGray,
  },
  bio: {
    fontSize: 15,
    color: colors.mainGray,
  },
});

export default Profile;

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { colors, theme } from '../styles/theme';
import { API_URL } from '../globalVariables.js';

const ChatList = ({ user }) => { // 사용자 정보를 prop으로 받음
  const navigation = useNavigation();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetchChats(); // 컴포넌트 마운트 시 채팅 데이터 가져오기
  }, []);

  // 채팅 목록을 가져오는 함수
  const fetchChats = async () => {
    try {
      // 여기서는 예시 데이터를 사용하므로 axios를 사용하지 않고 하드코딩하여 채팅 목록을 설정합니다.
      const exampleChats = [
        {
          chatRoomId: 1,
          profileImage: 'https://via.placeholder.com/150',
          nickname: '유저1',
          lastMessage: '안녕하세요!',
          newMessages: 2, // 예시로 새로운 메시지 개수를 설정합니다.
          lastMessageTime: '13:30', // 예시로 최근 메시지 시간을 설정합니다.
        },
        {
          chatRoomId: 2,
          profileImage: 'https://via.placeholder.com/150',
          nickname: '유저2',
          lastMessage: '반가워요!',
          newMessages: 10,
          lastMessageTime: '15:20',
        },
      ];
      setChats(exampleChats); // 예시 채팅 목록을 상태에 설정
    } catch (error) {
      console.error('Error fetching chat list:', error);
    }
  };

  const handleChatPress = (chatRoomId, user) => { // user 객체를 전달
    navigation.navigate('Chat', { chatRoomId, user });
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.chatItem} onPress={() => handleChatPress(item.chatRoomId, { profileImage: item.profileImage, nickname: item.nickname })}>
        <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
        <View style={styles.chatContent}>
          <View style={styles.header}>
            <Text style={styles.nickname}>{item.nickname}</Text>
            <Text style={styles.lastMessageTime}>{item.lastMessageTime}</Text>
          </View>
          <Text>{item.lastMessage}</Text>
        </View>
        {item.newMessages > 0 && <View style={styles.newMessagesBadge}>
          <Text style={styles.newMessagesCount}>{item.newMessages}</Text>
        </View>}
      </TouchableOpacity>
    );
  };

  return (
    <View style={theme.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>채팅</Text>
      </View>
      <FlatList
        data={chats}
        renderItem={renderItem}
        keyExtractor={(item) => item.chatRoomId.toString()}
        ListEmptyComponent={() => (
          <View style={styles.emptyListComponent}>
            <Text style={styles.emptyListText}>채팅 목록이 없습니다.</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.mainYellow,
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  chatContent: {
    flex: 1,
    marginLeft: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nickname: {
    fontSize: 16,
    color: colors.darkGray,
  },
  lastMessageTime: {
    position: 'absolute',
    right: 0,
    top: 0,
    fontSize: 12,
    color: colors.mainGray,
  },
  newMessagesBadge: {
    position: 'absolute',
    right: '4%',
    top: '77%',
    backgroundColor: colors.point,
    borderRadius: 15,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newMessagesCount: {
    color: 'white',
  },
  emptyListComponent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    fontSize: 15,
  },
});

export default ChatList;
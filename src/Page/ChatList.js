import React, { useEffect, useState } from 'react';
import { toString, View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { colors, theme } from '../styles/theme';
import { API_URL } from '../globalVariables.js';
import { storeAccessToken, getAccessToken, removeAccessToken } from '../token.js';

const ChatList = ({ user }) => {
  const navigation = useNavigation();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetchChats(); // 컴포넌트 마운트 시 채팅 데이터 가져오기
  }, []);

  // 채팅 목록을 가져오는 함수
  const fetchChats = async () => {
    try {
      const accessToken = await getAccessToken();
      
      // 채팅 목록 조회 API 호출
      const response = await axios.get(`${API_URL}/chats`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      setChats(response.data); // 채팅 목록을 상태에 설정
    } catch (error) {
      console.error('Error fetching chat list:', error);
    }
  };

  const handleChatPress = (chatRoomId, user) => {
    navigation.navigate('Chat', { chatRoomId, user });
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.chatItem} onPress={() => handleChatPress(item.id, user)}>
        <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
        <View style={styles.chatContent}>
          <View style={styles.header}>
            <Text style={styles.nickname}>{user.nickname}</Text>
            <Text style={styles.lastMessageTime}>최근 메시지 시간</Text>
          </View>
          <Text>{item.lastMessage}</Text>
        </View>
        {item.unreadMessageCount > 0 && <View style={styles.newMessagesBadge}>
          <Text style={styles.newMessagesCount}>{item.unreadMessageCount}</Text>
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
        keyExtractor={(item) => item.id.toString()}
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

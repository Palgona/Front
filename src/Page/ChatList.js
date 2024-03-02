import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { colors, theme } from '../styles/theme';
import { API_URL } from '../globalVariables.js';

const ChatList = () => {
  const navigation = useNavigation();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetchChats(); // 컴포넌트 마운트 시 채팅 데이터 가져오기
  }, []);

  // 채팅 목록을 가져오는 함수
  const fetchChats = async () => {
    try {
      const response = await axios.get(API_URL+'/chats'); // 채팅 목록을 가져오는 API 호출
      setChats(response.data); // 가져온 채팅 목록을 상태에 설정
    } catch (error) {
      console.error('Error fetching chat list:', error);
    }
  };

  const handleChatPress = (chatRoomId) => {
    navigation.navigate('Chat', { chatRoomId });
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }} onPress={() => handleChatPress(item.chatRoomId)}>
        <Image source={{ uri: item.profileImage }} style={{ width: 50, height: 50, borderRadius: 25 }} />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 16 }}>{item.nickname}</Text>
          <Text>{item.lastMessage}</Text>
        </View>
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
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18 }}>채팅 목록이 없습니다.</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = {
  headerContainer: {
    backgroundColor: colors.main,
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
};

export default ChatList;

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {colors, theme} from '../styles/theme';
import {API_URL} from '../globalVariables.js';
import {getAccessToken} from '../token.js';

const ChatList = ({user}) => {
  const navigation = useNavigation();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const accessToken = await getAccessToken(); // 여기에 액세스 토큰을 가져오는 코드를 추가해야 합니다.
      const response = await axios.get(`${API_URL}/chats`, {
        headers: {
          Authorization: `${accessToken}`,
        },
      });
      const chatData = response.data.map(chat => ({
        chatRoomId: chat.id,
        profileImage: "", // 상대방 프로필 이미지는 API 응답에 포함되지 않았으므로 빈 문자열로 설정하거나 별도 로직 필요
        nickname: "", // 상대방 닉네임도 API 응답에 포함되지 않았으므로 별도 로직 필요
        lastMessage: "", // 마지막 메시지도 포함되지 않았으므로 빈 문자열로 설정
        lastMessageTime: "", // 마지막 메시지 시간도 포함되지 않았으므로 빈 문자열로 설정
        newMessages: chat.unreadMessageCount, // 안읽은 메시지 수
      }));
      setChats(chatData);
    } catch (error) {
      console.error("Error fetching chat list:", error);
    }
  };

  const handleChatPress = (chatRoomId, user) => {
    navigation.navigate("Chat", { chatRoomId, user });
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() =>
          handleChatPress(item.chatRoomId, {
            profileImage: item.profileImage,
            nickname: item.nickname,
          })
        }
      >
        <Image
          source={{ uri: item.profileImage }}
          style={styles.profileImage}
        />
        <View style={styles.chatContent}>
          <View style={styles.header}>
            <Text style={styles.nickname}>{item.nickname}</Text>
            <Text style={styles.lastMessageTime}>{item.lastMessageTime}</Text>
          </View>
          <Text>{item.lastMessage}</Text>
        </View>
        {item.newMessages > 0 && (
          <View style={styles.newMessagesBadge}>
            <Text style={styles.newMessagesCount}>{item.newMessages}</Text>
          </View>
        )}
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
    fontWeight: "bold",
    marginLeft: 10,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nickname: {
    fontSize: 16,
    color: colors.darkGray,
  },
  lastMessageTime: {
    position: "absolute",
    right: 0,
    top: 0,
    fontSize: 12,
    color: colors.mainGray,
  },
  newMessagesBadge: {
    position: "absolute",
    right: "4%",
    top: "77%",
    backgroundColor: colors.point,
    borderRadius: 15,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  newMessagesCount: {
    color: "white",
  },
  emptyListComponent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyListText: {
    fontSize: 15,
  },
});

export default ChatList;

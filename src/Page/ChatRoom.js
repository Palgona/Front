import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import { launchImageLibrary } from "react-native-image-picker";
import { colors, icons } from "../styles/theme.js";
import { API_URL, API_URL_WS } from "../globalVariables.js";
import { getAccessToken } from "../token.js";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const ChatRoom = ({ route, navigation }) => {
  const { roomId, user } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [partnerProfile, setPartnerProfile] = useState(user || { profileImage: '', nickname: '' });

  const client = useRef(null);

  useEffect(() => {
    fetchChatMessages();
    connectWebSocket();

    return () => {
      if (client.current) {
        client.current.deactivate();
      }
    };
  }, []);

  const fetchChatMessages = async () => {
    const accessToken = await getAccessToken();
    const token = accessToken.replace("Bearer ", "");
    try {
      const response = await axios.get(`${API_URL}/chats/${roomId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const formattedMessages = response.data.map((msg) => ({
        id: msg.id,
        sender: msg.senderId === user.id ? "me" : "other",
        text: msg.chatType === "TEXT" ? msg.message : null,
        image: msg.chatType === "IMAGE" ? msg.message : null,
        timestamp: msg.createdAt,
      }));
      setMessages(formattedMessages);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  const connectWebSocket = async () => {
    const accessToken = await getAccessToken();
    const token = accessToken.replace("Bearer ", "");
    client.current = new Client({
      webSocketFactory: () => new SockJS(`${API_URL_WS}/ws`),
      connectHeaders: {
        Authorization: `${token}`,
      },
      onConnect: () => {
        console.log("Connected to WebSocket");
        client.current.subscribe(`/sub/chatroom/${roomId}`, (message) => {
          const receivedMessage = JSON.parse(message.body);
          const formattedMessage = {
            id: receivedMessage.id,
            sender: receivedMessage.senderId === user.id ? "me" : "other",
            text: receivedMessage.chatType === "TEXT" ? receivedMessage.message : null,
            image: receivedMessage.chatType === "IMAGE" ? receivedMessage.message : null,
            timestamp: receivedMessage.createdAt,
          };
          setMessages((prevMessages) => [formattedMessage, ...prevMessages]);
        });
      },
      onDisconnect: () => {
        console.log("Disconnected from WebSocket");
      },
      onStompError: (error) => {
        console.error("STOMP error:", error);
      },
    });

    client.current.activate();
  };

  const handleSend = () => {
    if (text.trim() !== "") {
      const message = {
        text,
        sender: "me",
        timestamp: Date.now(),
      };

      if (client.current && client.current.connected) {
        client.current.publish({
          destination: `/app/chats/${roomId}`,
          body: JSON.stringify({
            message: text,
            senderId: user.id,
            receiverId: partnerProfile.id,
            roomId: roomId,
            chatType: "TEXT",
          }),
        });
      } else {
        console.error("STOMP client is not connected");
      }

      setMessages([message, ...messages]);
      setText("");
    }
  };

  const handleImageSend = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: true,
      },
      (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.errorCode) {
          console.log("Image Error: ", response.errorCode);
        } else {
          sendImageToServer(response.assets[0].uri);
        }
      }
    );
  };

  const sendImageToServer = async (uri) => {
    try {
      const formData = new FormData();
      formData.append("files", {
        uri: uri,
        type: "image/jpeg",
        name: "chatImage.jpg",
      });
      const accessToken = await getAccessToken();
      const token = accessToken.replace("Bearer ", "");
      const response = await axios.post(
        `${API_URL}/chats/${roomId}/image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${token}`,
          },
        }
      );
      if (!response.data.ok) {
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Error", "Failed to upload image");
    }
  };

  const renderItem = ({ item }) => {
    if (item.text) {
      return (
        <View
          style={[
            styles.messageBubble,
            item.sender === "me" ? styles.myMessage : styles.otherMessage,
          ]}
        >
          <Text style={styles.messageText}>{item.text}</Text>
        </View>
      );
    } else if (item.image) {
      return (
        <View
          style={[
            styles.messageBubble,
            item.sender === "me" ? styles.myMessage : styles.otherMessage,
          ]}
        >
          <Image
            source={{ uri: item.image }}
            style={styles.messageImage}
            resizeMode="contain"
          />
        </View>
      );
    }
  };

  const handleLeaveChat = async () => {
    Alert.alert(
      "채팅방 나가기",
      "이 채팅방에서 나가면 모든 대화가 삭제됩니다. 정말로 나가시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "나가기",
          onPress: async () => {
            try {
              const accessToken = await getAccessToken();
              const exitChatResponse = await fetch(
                `${API_URL}/chats/${roomId}/exit`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `${accessToken}`,
                  },
                }
              );
              if (!exitChatResponse.ok) {
                throw new Error("Failed to exit chat room");
              }
              navigation.navigate("ChatList");
            } catch (error) {
              console.error("Error leaving chat room:", error);
              navigation.navigate("ChatList");
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.partnerProfileContainer}>
        <View style={styles.userInfoContainer}>
          <Image
            source={{
              uri: partnerProfile.profileImage || 'https://via.placeholder.com/40',
            }}
            style={styles.partnerProfileImage}
          />
          <Text style={styles.partnerName}>{partnerProfile.nickname}</Text>
        </View>
        <TouchableOpacity
          onPress={handleLeaveChat}
          style={styles.leaveButtonContainer}
        >
          <Image source={icons.exit} style={styles.leaveButtonIcon} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
        inverted
      />
      <View style={styles.inputContainer}>
        <TouchableOpacity
          onPress={handleImageSend}
          style={styles.imageContainer}
        >
          <Image source={icons.camera} style={styles.imageIcon} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="메시지 입력..."
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>전송</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: "#cccccc",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: colors.mainGreen,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  messageBubble: {
    maxWidth: "70%",
    padding: 10,
    borderRadius: 10,
    marginVertical: 2,
  },
  myMessage: {
    alignSelf: "flex-end",
    borderRadius: 10,
    backgroundColor: colors.secondYellow,
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: colors.secondGreen,
  },
  messageText: {
    fontSize: 16,
    color: "black",
  },
  messageImage: {
    width: "70%",
    aspectRatio: 1,
    borderRadius: 10,
  },
  partnerProfileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  partnerProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  partnerName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  leaveButtonContainer: {
    paddingHorizontal: 10,
  },
  leaveButtonIcon: {
    width: 25,
    height: 25,
    tintColor: colors.darkGray,
  },
  imageContainer: {
    paddingHorizontal: 10,
  },
  imageIcon: {
    width: 25,
    height: 25,
    tintColor: colors.mainGreen,
  },
});

export default ChatRoom;

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
import { colors, theme, icons } from '../styles/theme'; 
import { API_URL } from '../globalVariables.js';
import { storeAccessToken, getAccessToken, removeAccessToken } from '../token.js';

const Chat = ({ route, navigation }) => {
  const { roomId, user } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [partnerProfile, setPartnerProfile] = useState(user);

  useEffect(() => {
    //fetchChatMessages();
    setMessages(exampleMessages);
  }, []);
  
  const exampleMessages = [
    { id: 1, text: '달에게 말을 했죠', sender: 'partner' },
    { id: 2, text: '하늘 위로 올라가', sender: 'me' },
    { id: 3, text: '네모난 달이 떴죠', sender: 'partner' },
    { id: 4, text: '나는 꿈을 꾸었죠', sender: 'me' },
    // 나머지 채팅 메시지 예시 데이터 추가
  ];
  
  const fetchChatMessages = async () => {
    try {
      const response = await axios.get(API_URL + `/chats/${roomId}`);
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };

  const handleSend = () => {
    if (text.trim() !== '') {
      sendMessageToServer(text);
      setMessages([{ id: Date.now(), text, sender: 'me' }, ...messages]);
      setText('');
    }
  };

  const handleImageSend = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: true
      }, 
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('Image Error: ', response.errorCode);
        } else {
          sendImageToServer(response.assets[0].uri);
        }
      }
    );
  };

  const sendMessageToServer = (message) => {
    // send message to server logic
  };

  const sendImageToServer = async (uri) => {
    try {
      const formData = new FormData();
      formData.append('files', {
        uri: uri,
        type: 'image/jpeg',
        name: 'chatImage.jpg',
      });

      // 채팅방 이미지 업로드 API 호출
      const response = await fetch(`${API_URL}/chats/${roomId}/image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
      
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image');
    }
  };

  const renderItem = ({ item }) => {
    if (item.text) {
      return (
        <View style={[styles.messageBubble, item.sender === 'me' ? styles.myMessage : styles.otherMessage]}>
          <Text style={styles.messageText}>{item.text}</Text>
        </View>
      );
    } else if (item.image) {
      return (
        <View style={[styles.messageBubble, item.sender === 'me' ? styles.myMessage : styles.otherMessage]}>
          <Image source={{ uri: item.image }} style={styles.messageImage} resizeMode='contain'/>
        </View>
      );
    }
  };
  
  const handleLeaveChat = async () => {
    Alert.alert(
      '채팅방 나가기',
      '이 채팅방에서 나가면 모든 대화가 삭제됩니다. 정말로 나가시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '나가기',
          onPress: async () => {
            try {
              // 채팅방 나가기 API 호출
              const accessToken = await getAccessToken();
              const exitChatResponse = await fetch(`${API_URL}/chats/${roomId}/exit`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'accessToken': accessToken
                }
              });
  
              if (!exitChatResponse.ok) {
                throw new Error('Failed to exit chat room');
              }
  
              // 채팅방을 나갔으므로 이전 화면으로 이동
              navigation.navigate('ChatList');
            } catch (error) {
              console.error('Error leaving chat room:', error);
              // 에러가 발생한 경우에 대한 처리
              navigation.navigate('ChatList'); //나중에 지우기
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.partnerProfileContainer}>
        <View style={styles.userInfoContainer}>
          <Image source={{ uri: partnerProfile.profileImage }} style={styles.partnerProfileImage} />
          <Text style={styles.partnerName}>{partnerProfile.nickname}</Text>
        </View>
        <TouchableOpacity onPress={handleLeaveChat} style={styles.leaveButtonContainer}>
          <Image source={icons.exit} style={styles.leaveButtonIcon} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        inverted
      />
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={handleImageSend} style={styles.imageContainer}>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#CCCCCC',
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
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  messageBubble: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 10,
    marginVertical: 2,
  },
  myMessage: {
    alignSelf: 'flex-end',
    borderRadius: 10,
    backgroundColor: colors.secondYellow,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: colors.secondGreen,
  },
  messageText: {
    fontSize: 16,
    color: 'black',
  },
  messageImage: {
    width: '70%',
    aspectRatio: 1,
    borderRadius: 10,
  },
  partnerProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  partnerProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  partnerName: {
    fontSize: 18,
    fontWeight: 'bold',
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

export default Chat;

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
import { colors, theme, icons } from '../styles/theme'; 
import { API_URL } from '../globalVariables.js';

const Chat = ({ route }) => {
  const navigation = useNavigation();
  const { chatRoomId, user } = route.params;
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
      const response = await axios.get(API_URL+`/chats/${chatRoomId}/messages`);
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
      formData.append('image', {
        uri: uri,
        type: 'image/jpeg',
        name: 'chatImage.jpg',
      });

      // Implement your server request to send the image
      // After successful upload, add the image message to the messages list
      const newMessage = { id: Date.now(), image: uri, sender: 'me' };
      setMessages([newMessage, ...messages]);
    } catch (error) {
      console.error('Error sending image message:', error);
      Alert.alert('Error', 'Failed to send image message');
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

  return (
    <View style={styles.container}>
      <View style={styles.partnerProfileContainer}>
        <Image source={{ uri: partnerProfile.profileImage }} style={styles.partnerProfileImage} />
        <Text style={styles.partnerName}>{partnerProfile.nickname}</Text>
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
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

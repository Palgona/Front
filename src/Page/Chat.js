import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import axios from 'axios';
import { API_URL } from '../globalVariables.js';

const Chat = ({ route }) => {
  const { chatRoomId } = route.params;

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetchChatMessages(); // 채팅 메시지 데이터 가져오기
  }, []);

  // 채팅 메시지 데이터를 가져오는 함수
  const fetchChatMessages = async () => {
    try {
      const response = await axios.get(API_URL+`/chats/${chatRoomId}/messages`); // 채팅 메시지 가져오는 API 호출
      setMessages(response.data); // 가져온 채팅 메시지를 상태에 설정
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };

  const handleSend = () => {
    if (text.trim() !== '') {
      sendMessageToServer(text); // 서버로 메시지 전송
      setMessages([{ id: Date.now(), text, sender: 'me' }, ...messages]);
      setText('');
    }
  };

  const sendMessageToServer = (message) => {
    // 서버로 메시지를 전송하는 로직
    // axios 또는 Socket을 사용하여 서버로 메시지 전송
  };

  const renderItem = ({ item }) => (
    <View style={[styles.messageBubble, item.sender === 'me' ? styles.myMessage : styles.otherMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        inverted // 최신 메시지가 화면 하단에 표시되도록 역순으로 표시
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.inputContainer}
      >
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
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
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
    backgroundColor: '#007AFF',
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
    marginVertical: 5,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
  },
  messageText: {
    fontSize: 16,
  },
});

export default Chat;

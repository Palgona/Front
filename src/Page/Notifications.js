import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import axios from 'axios';
import {colors} from '../styles/theme';
import {API_URL} from '../globalVariables.js';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(API_URL + '/notifications'); // axios.get 사용
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const deleteNotification = async id => {
    try {
      await axios.delete(API_URL + `/notifications/${id}`); // axios.delete 사용
      setNotifications(
        notifications.filter(notification => notification.id !== id),
      );
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const renderNotificationItem = ({item}) => {
    const rightSwipeActions = () => (
      <TouchableOpacity
        onPress={() => deleteNotification(item.id)}
        style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>삭제</Text>
      </TouchableOpacity>
    );

    return (
      <Swipeable renderRightActions={rightSwipeActions}>
        <View style={styles.notificationContainer}>
          <View>
            <Text style={styles.notificationText}>{item.body}</Text>
            <Text style={styles.timeText}>
              {formatTime(new Date(item.time))}
            </Text>
          </View>
        </View>
      </Swipeable>
    );
  };

  const formatTime = time => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes}`;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  listContainer: {
    flexGrow: 1,
  },
  notificationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 30,
  },
  notificationText: {
    fontSize: 16,
    color: colors.darkGray,
  },
  timeText: {
    fontSize: 12,
    color: colors.darkGray,
  },
  deleteButton: {
    backgroundColor: colors.point,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: colors.background,
  },
});

export default Notifications;

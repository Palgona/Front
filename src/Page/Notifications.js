import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import axios from "axios";
import { colors } from "../styles/theme";
import { API_URL } from "../globalVariables.js";
import { getAccessToken, getRefreshToken } from "../token.js";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const accessToken = await getAccessToken(); // 액세스 토큰 가져오기
      const response = await axios.get(`${API_URL}/notifications`, {
        headers: {
          Authorization: `${accessToken}`, // 헤더에 액세스 토큰 추가
        },
      });
      setNotifications(response.data.values);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/v1/notifications/${id}`);
      setNotifications(
        notifications.filter((notification) => notification.id !== id)
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const renderNotificationItem = ({ item }) => {
    const rightSwipeActions = () => (
      <TouchableOpacity
        onPress={() => deleteNotification(item.id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonText}>삭제</Text>
      </TouchableOpacity>
    );

    return (
      <Swipeable renderRightActions={rightSwipeActions}>
        <View style={styles.notificationContainer}>
          <View>
            <Text style={styles.notificationText}>{item.body}</Text>
            {/* 아마도 시간 정보는 "time" 대신 "createdAt" 또는 "updatedAt" 일 것으로 추정됩니다. */}
            <Text style={styles.timeText}>
              {formatTime(new Date(item.time))}
            </Text>
          </View>
        </View>
      </Swipeable>
    );
  };

  const formatTime = (time) => {
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
        keyExtractor={(item) => item.id.toString()}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    justifyContent: "center",
  },
  deleteButtonText: {
    color: colors.background,
  },
});

export default Notifications;

import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { colors } from "../styles/theme.js";
import axios from "axios";
import { getAccessToken } from "../token.js";
import { API_URL, API_URL_WS } from "../globalVariables.js";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const Bidding = ({ route, navigation }) => {
  const { itemId, user } = route.params;
  const [item, setItem] = useState(null);
  const [currentBid, setCurrentBid] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [bids, setBids] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const client = useRef(null);

  useEffect(() => {
    fetchItemDetails();
    connectWebSocket();

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);

    return () => {
      if (client.current) {
        client.current.deactivate();
      }
      clearInterval(timer);
    };
  }, []);

  const fetchItemDetails = async () => {
    const accessToken = await getAccessToken();
    const token = accessToken.replace("Bearer ", "");
    try {
      const response = await axios.get(`${API_URL}/auction/${itemId}`, {
        headers: {
          Authorization: token,
        },
      });
      setItem(response.data.item);
      setCurrentBid(response.data.currentBid);
      setTimeLeft(response.data.timeLeft);
      setBids(response.data.bids);
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };

  const connectWebSocket = async () => {
    const accessToken = await getAccessToken();
    const token = accessToken.replace("Bearer ", "");

    client.current = new Client({
      webSocketFactory: () => new SockJS(`${API_URL_WS}/ws`),
      connectHeaders: {
        Authorization: token,
      },
      onConnect: () => {
        console.log("Connected to WebSocket");
        client.current.subscribe(`/sub/auction/${itemId}`, (message) => {
          const receivedBid = JSON.parse(message.body);
          setBids((prevBids) => [receivedBid, ...prevBids]);
          setCurrentBid(receivedBid.amount);
        });
      },
      onDisconnect: () => {
        console.log("Disconnected from WebSocket");
      },
      onStompError: (error) => {
        console.error("STOMP error:", error);
        Alert.alert("WebSocket Error", "Failed to connect to WebSocket.");
      },
    });

    client.current.activate();
  };

  const handleBid = () => {
    const bidValue = parseFloat(bidAmount);
    if (isNaN(bidValue) || bidValue <= currentBid) {
      Alert.alert("Invalid Bid", "Please enter a valid amount higher than the current bid.");
      return;
    }

    if (client.current && client.current.connected) {
      client.current.publish({
        destination: `/app/auction/${itemId}/bid`,
        body: JSON.stringify({
          amount: bidValue,
          bidderId: user.id,
          itemId: itemId,
        }),
      });
      setBidAmount("");
    } else {
      console.error("STOMP client is not connected");
    }
  };

  const renderBid = ({ item }) => (
    <View style={styles.bidContainer}>
      <Text style={styles.bidderName}>{item.bidderName}</Text>
      <Text style={styles.bidAmount}>{item.amount}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {item && (
        <>
          <View style={styles.itemDetailsContainer}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.currentBidText}>
                Current Bid: ${currentBid}
              </Text>
              <Text style={styles.timeLeftText}>Time Left: {timeLeft} seconds</Text>
            </View>
          </View>

          <FlatList
            data={bids}
            renderItem={renderBid}
            keyExtractor={(item, index) => index.toString()}
            style={styles.bidsList}
          />

          <View style={styles.bidInputContainer}>
            <TextInput
              style={styles.bidInput}
              value={bidAmount}
              onChangeText={setBidAmount}
              keyboardType="numeric"
              placeholder="Enter your bid..."
            />
            <TouchableOpacity style={styles.bidButton} onPress={handleBid}>
              <Text style={styles.bidButtonText}>Place Bid</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.background,
  },
  itemDetailsContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 14,
    color: colors.textGray,
  },
  currentBidText: {
    fontSize: 16,
    marginTop: 10,
    color: colors.mainGreen,
  },
  timeLeftText: {
    fontSize: 14,
    color: colors.mainRed,
  },
  bidsList: {
    flex: 1,
    marginVertical: 10,
  },
  bidContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  bidderName: {
    fontSize: 16,
  },
  bidAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bidInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  bidInput: {
    flex: 1,
    height: 40,
    borderColor: colors.borderGray,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  bidButton: {
    backgroundColor: colors.mainGreen,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  bidButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default Bidding;

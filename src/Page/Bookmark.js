import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_URL } from "../globalVariables.js";
import ProductList from "../Components/ProductList";
import { getAccessToken } from "../token.js";

const Bookmark = () => {
  const [bookmarkList, setBookmarkList] = useState([]);
  
  useEffect(() => {
    fetchBookmarkList();
  }, []);

  const fetchBookmarkList = async () => {
    const accessToken = await getAccessToken();
    try {
      const response = await axios.get(`${API_URL}/bookmarks`, {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      });
      setBookmarkList(response.data);
    } catch (error) {
      console.error("Error fetching bookmark list:", error);
    }
  };

  return (
    <View style={styles.container}>

      {/* 상품 리스트를 보여주는 ProductList 컴포넌트 */}
      <ProductList products={bookmarkList} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  backButton: {
    marginTop: 20,
    alignSelf: "center",
  },
  backButtonText: {
    fontSize: 16,
    color: "blue",
  },
});

export default Bookmark;

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme, colors, icons } from '../styles/theme';
import { buttonStyles } from '../styles/buttonStyles';
import { API_URL } from '../globalVariables.js';

const Search = () => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [previousSearches, setPreviousSearches] = useState([]);

  useEffect(() => {
    loadPreviousSearches();
  }, []);

  const loadPreviousSearches = async () => {
    try {
      const searches = await AsyncStorage.getItem('previousSearches');
      if (searches !== null) {
        setPreviousSearches(JSON.parse(searches));
      }
    } catch (error) {
      console.error('Error loading previous searches:', error);
    }
  };

  const saveSearchTerm = async () => {
    try {
      await AsyncStorage.setItem('previousSearches', JSON.stringify(previousSearches));
    } catch (error) {
      console.error('Error saving previous searches:', error);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      const updatedSearches = [...previousSearches, searchTerm];
      setPreviousSearches(updatedSearches);
      navigation.navigate('SearchResult', { searchTerm });
      setSearchTerm('');
      saveSearchTerm(); // Save the searches after adding the new one
    }
  };

  const handleDeleteSearch = index => {
    const updatedSearches = previousSearches.filter((_, i) => i !== index);
    setPreviousSearches(updatedSearches);
    saveSearchTerm(); // Save the searches after deleting one
  };

  return (
    <View style={theme.container}>
      {/* 검색 입력란 */}
      <TextInput
        style={buttonStyles.input}
        onChangeText={text => setSearchTerm(text)}
        value={searchTerm}
        onSubmitEditing={handleSearch}
      />

      {/* 이전 검색어 목록 */}
      <View>
        {previousSearches.map((prevSearch, index) => (
          <View key={index} style={buttonStyles.previousSearch}>
            <Text style={buttonStyles.previousSearchText}>{prevSearch}</Text>
            <TouchableOpacity onPress={() => handleDeleteSearch(index)} style={styles.iconContainer}>
              <Image source={icons.close} style={styles.icon} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default Search;

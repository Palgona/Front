import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { buttonStyles } from '../styles/buttonStyles'; 
import { theme } from '../styles/theme';

const Search = () => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [previousSearches, setPreviousSearches] = useState([]);

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      // Add the current search term to the list of previous searches
      setPreviousSearches(prevSearches => [...prevSearches, searchTerm]);
      // Navigate to SearchResult.js
      navigation.navigate('SearchResult', { searchTerm });
      // Clear the search bar
      setSearchTerm('');
    }
  };

  const handleDeleteSearch = index => {
    setPreviousSearches(prevSearches =>
      prevSearches.filter((_, i) => i !== index)
    );
  };

  return (
    <View style={theme.container}>
      <TextInput
        style={buttonStyles.input}
        onChangeText={text => setSearchTerm(text)}
        value={searchTerm}
        onSubmitEditing={handleSearch}
      />
      <View>
        {previousSearches.map((prevSearch, index) => (
          <View key={index} style={buttonStyles.previousSearch}>
            <Text style={buttonStyles.previousSearchText}>{prevSearch}</Text>
            <TouchableOpacity onPress={() => handleDeleteSearch(index)}>
              <Text>X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Search;

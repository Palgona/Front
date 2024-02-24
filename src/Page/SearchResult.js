import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { buttonStyles } from '../styles/buttonStyles'; 
import { theme } from '../styles/theme';
import ProductList from '../Components/ProductList';

const SearchResult = ({ route }) => {
  const { searchTerm } = route.params;
  const [searchTermInResult, setSearchTermInResult] = useState(searchTerm);
  const navigation = useNavigation();

  const handleSearch = () => {
    if (searchTermInResult.trim() !== '') {
      navigation.navigate('SearchResult', { searchTerm: searchTermInResult });
    }
  };

  return (
    <View style={theme.container}>
      <TextInput
        style={buttonStyles.input}
        onChangeText={text => setSearchTermInResult(text)}
        value={searchTermInResult}
        onSubmitEditing={handleSearch}
      />
      <ProductList/>
    </View>
  );
};


export default SearchResult;

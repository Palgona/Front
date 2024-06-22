import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {colors} from '../styles/theme';
import {API_URL} from '../globalVariables.js';
import axios from 'axios';
import {getAccessToken} from '../token.js';

const Mileage = ({user}) => {
  const [mileage, setMileage] = useState(0);

  useEffect(() => {
    fetchMileage();
  }, []);

  const fetchMileage = async () => {
    const accessToken = await getAccessToken();
    try {
      const response = await axios.get(`${API_URL}/mileages`, {
        headers: {
          Authorization: `${accessToken}`,
        },
      });
      setMileage(response.data);
    } catch (error) {
      console.error('Error fetching mileage:', error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.inText}>마일리지</Text>
      <Text style={styles.mileageText}>{mileage}P</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondYellow,
    justifyContent: 'space-between',
    padding: 30,
    paddingVertical: 30,
    borderRadius: 10,
    marginVertical: 10,
  },
  inText: {
    color: colors.darkGray,
    fontSize: 15,
  },
  mileageText: {
    color: colors.darkGray,
    fontSize: 17,
  },
});

export default Mileage;

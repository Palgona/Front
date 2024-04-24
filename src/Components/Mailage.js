import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {colors} from '../styles/theme';

const Mileage = ({user}) => {
  // 사용자 객체가 null이면 null을 반환하고, null이 아니면 mailage 속성을 참조
  const mileage = user ? user.mailage : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.inText}>마일리지</Text>
      <Text style={styles.mailageText}>{mileage}P</Text>
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
  mailageText: {
    color: colors.darkGray,
    fontSize: 17,
  },
});

export default Mileage;

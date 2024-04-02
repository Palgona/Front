import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { colors } from '../styles/theme';

const Mileage = ({ user, navigation }) => {
    return (
    <View style={styles.conatainer}>
        <Text style={styles.inText}>마일리지</Text>
        <Text style={styles.mailageText}>{user.mailage}P</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    conatainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.secondYellow,
        justifyContent: 'space-between',
        padding: 30,
        paddingVertical: 30,
        borderRadius: 10,
        marginVertical: 10,
    },
    inText:{
        color: colors.darkGray,
        fontSize: 15,
    },
    mailageText:{
        color: colors.darkGray,
        fontSize: 17,
    }
})

export default Mileage;

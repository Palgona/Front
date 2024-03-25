import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../Page/Home";
import { colors, theme } from '../styles/theme';
import { View, StyleSheet } from 'react-native';
import { StackNavigator } from "./StackNavigator";

const Drawer = createDrawerNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white, // 배경색 설정 가능
  },
  drawerContent: {
    flex: 1,
    paddingTop: 50,
  },
});

const drawerStyles = {
  screenOptions: {
    drawerActiveBackgroundColor: colors.secondYellow,
    drawerActiveTintColor: colors.darkGray,
    drawerPosition: 'right',
    paddingTop: 50,
  },
};

const Drawernavigator = () => {
    return (
        <View style={styles.container}>
            <Drawer.Navigator
                initialRouteName="Home"
                drawerPosition="right"
                paddingTop="50"
                screenOptions={{
                    ...drawerStyles.screenOptions,
                    contentContainerStyle: styles.drawerContent,
                }}>
                <Drawer.Screen name="홈" component={StackNavigator} options={{headerShown: false}}/>
                <Drawer.Screen name="디지털기기" component={Home} options={{ headerShown: false }}/>
                <Drawer.Screen name="의류" component={Home} options={{headerShown: false}}/>
                <Drawer.Screen name="식품" component={Home} options={{ headerShown: false }}/>
                <Drawer.Screen name="도서" component={Home} options={{headerShown: false}}/>
                <Drawer.Screen name="기타" component={Home} options={{ headerShown: false}}/>
            </Drawer.Navigator>
        </View>
    );
};

export default Drawernavigator;

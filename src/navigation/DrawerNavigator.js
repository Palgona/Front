import React from 'react';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { colors } from '../styles/theme';
import { View, StyleSheet } from 'react-native';
import { StackNavigator } from './StackNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';

const Drawer = createDrawerNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerContent: {
    flex: 1,
    paddingTop: '20%',
    backgroundColor: 'white',
  },
});

const drawerStyles = {
  screenOptions: {
    drawerActiveBackgroundColor: colors.secondYellow,
    drawerActiveTintColor: colors.darkGray,
    drawerPosition: 'right',
  },
};

const CustomDrawerContent = props => (
  <SafeAreaView style={styles.container}>
    <View style={styles.drawerContent}>
      {/* 네비게이션 메뉴 명시적으로 추가 */}
      <DrawerItemList {...props} />
    </View>
  </SafeAreaView>
);

const Drawernavigator = () => {
  return (
    <View style={styles.container}>
      <Drawer.Navigator
        initialRouteName="Home"
        backBehavior="history"
        screenOptions={{
          ...drawerStyles.screenOptions,
        }}
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="홈"
          component={StackNavigator}
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="디지털기기"
          component={StackNavigator}
          initialParams={{category: 'DIGITAL_DEVICE'}}
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="가구"
          component={StackNavigator}
          initialParams={{category: 'FURNITURE'}}
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="의류"
          component={StackNavigator}
          initialParams={{category: 'CLOTHING'}}
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="식품"
          component={StackNavigator}
          initialParams={{category: 'FOOD'}}
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="도서"
          component={StackNavigator}
          initialParams={{category: 'BOOK'}}
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="기타"
          component={StackNavigator}
          initialParams={{category: 'OTHER'}}
          options={{headerShown: false}}
        />
      </Drawer.Navigator>
    </View>
  );
};

export default Drawernavigator;

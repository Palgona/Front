import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import ChatList from './ChatList';
import MyPage from './MyPage';
import Search from './Search';
import ProductWrite from './ProductWrite';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}
      screenOptions={{
        headerShown: false, // 상단 헤더 숨기기
      }}
    >
      <Tab.Screen
        name="ChatList"
        component={ChatList}
        options={{
          tabBarLabel: '채팅',
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: '홈',
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{
          tabBarLabel: '마이페이지',
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Home"
          component={MainTabNavigator}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="ProductWrite"
          component={ProductWrite}
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

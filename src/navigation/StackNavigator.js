import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabNavigator from './MainTabNavigator';

import Login from '../Page/Login';
import Signup from '../Page/Signup';
import Search from '../Page/Search';
import ProductWrite from '../Page/ProductWrite';
import SearchResult from '../Page/SearchResult';
import ChatList from '../Page/ChatList';
import Chat from '../Page/Chat';
import ProductDetail from '../Page/ProductDetail'; 
import User from '../Page/User';
import SellList from '../Page/SellList';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
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
      <Stack.Screen
        name="SearchResult"
        component={SearchResult}
        options={{ headerShown: false }} 
      />
      <Stack.Screen
        name="ChatList"
        component={ChatList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{ headerShown: false }} 
      />
      <Stack.Screen
        name="User"
        component={User}
        options={{ headerShown: false }} 
      />
      <Stack.Screen
        name="SellList"
        component={SellList}
        options={{ headerShown: false }} 
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export { StackNavigator };

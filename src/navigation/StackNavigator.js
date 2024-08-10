import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainTabNavigator from './MainTabNavigator';

import Login from '../Page/Login';
import Signup from '../Page/Signup';
import Search from '../Page/Search';
import ProductWrite from '../Page/ProductWrite';
import SearchResult from '../Page/SearchResult';
import ChatList from '../Page/ChatList';
import ChatRoom from '../Page/ChatRoom';
import ProductDetail from '../Page/ProductDetail';
import User from '../Page/User';
import ProfileEdit from '../Page/ProfileEdit';
import MileageCharge from '../Page/MileageCharge';
import List from '../Page/List';
import Ask from '../Page/Ask';
import Notifications from '../Page/Notifications';
import Bookmark from '../Page/Bookmark';
import Bidding from '../Page/Bidding';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={MainTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          title: '알림',
        }}
      />
      <Stack.Screen
        name="ProductWrite"
        component={ProductWrite}
        options={{
          title: '상품 등록 페이지',
        }}
      />
      <Stack.Screen
        name="SearchResult"
        component={SearchResult}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChatList"
        component={ChatList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="User"
        component={User}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="List"
        component={List}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Bidding"
        component={Bidding}
        options={{
          title: '상품 경매',
        }}
        />
      <Stack.Screen
        name="ProfileEdit"
        component={ProfileEdit}
        options={{
          title: '프로필 편집',
        }}
      />
      <Stack.Screen
        name="MileageCharge"
        component={MileageCharge}
        options={{
          title: '마일리지 충전',
        }}
      />
      <Stack.Screen
        name="Bookmark"
        component={Bookmark}
        options={{
          title: '북마크',
        }}
      />
      <Stack.Screen name="Ask" component={Ask} options={{title: '문의사항'}} />
    </Stack.Navigator>
  );
};

export {StackNavigator};

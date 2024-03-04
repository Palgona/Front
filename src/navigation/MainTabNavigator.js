import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import ChatList from '../Page/ChatList';
import MainHome from '../Page/Home';
import MyPage from '../Page/MyPage';
import { icons, colors } from '../styles/theme'; 

const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'ChatList') {
            iconName = icons.chat;
          } else if (route.name === 'MainHome') {
            iconName = icons.home;
          } else if (route.name === 'MyPage') {
            iconName = icons.myPage;
          }

          return <Image source={iconName} style={{ tintColor: color, width: size, height: size }} />;
        },
        tabBarActiveTintColor: colors.main,
        tabBarInactiveTintColor: colors.secondary,
        tabBarLabelStyle: { display: 'none' },
        tabBarStyle: {
          display: 'flex',
        },
      })}
    >
      <Tab.Screen name="ChatList" component={ChatList} />
      <Tab.Screen name="MainHome" component={MainHome} />
      <Tab.Screen name="MyPage" component={MyPage} />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;

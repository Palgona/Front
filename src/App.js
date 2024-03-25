import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './navigation/StackNavigator';
import Drawernavigator from './navigation/DrawerNavigator';

function App() {
  return (
    <NavigationContainer>
      <Drawernavigator/>
    </NavigationContainer>
  );
}

export default App;

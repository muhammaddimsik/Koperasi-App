import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, Dashboard} from '../screens';

const {Navigator, Screen} = createNativeStackNavigator();

const AppStack: FC = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="singup" component={Home} />
      <Screen name="login" component={Dashboard} />
    </Navigator>
  );
};

export default AppStack;

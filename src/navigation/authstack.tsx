import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Signup, Login} from '../screens';

const {Navigator, Screen} = createNativeStackNavigator();

const AuthStack: FC = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="singup" component={Signup} />
      <Screen name="login" component={Login} />
    </Navigator>
  );
};

export default AuthStack;
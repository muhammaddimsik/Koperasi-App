import React, {FC, useRef, useState, useEffect} from 'react';
import {StyleSheet, AppState, EventSubscription} from 'react-native';
import {
  Home,
  Login,
  Profile,
  SimpananMenu,
  PembiayaanMenu,
  SimpananDetail,
  PembiayaanDetail,
  LoginB
} from '../screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomNavigation from '../components/bottomNabigation';
import {useAuthStore} from '../stores/NasabahStore';
import {Logout} from '../components';

export type RootStackParams = {
  Splash: undefined;
  Home: undefined;
  Profil: undefined;
  Login: undefined;
  Logout: undefined;
  MainApp: {
    screen: string;
    params?: {
      screen: string;
      params?: {norek: number};
    };
  };
  SimpananDetail: {norek: number};
  SimpananMenu: undefined;
  PembiayaanMenu: undefined;
  PembiayaanDetail: {norek: number};
  LoginB: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParams>();
const Tab = createBottomTabNavigator();

const SimpananScreen: FC = () => {
  return (
    <RootStack.Navigator initialRouteName="SimpananMenu">
      <RootStack.Screen
        name="SimpananMenu"
        component={SimpananMenu}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="SimpananDetail"
        component={SimpananDetail}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
};
const PembiayaanScreen: FC = () => {
  return (
    <RootStack.Navigator initialRouteName="PembiayaanMenu">
      <RootStack.Screen
        name="PembiayaanMenu"
        component={PembiayaanMenu}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="PembiayaanDetail"
        component={PembiayaanDetail}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
};

const MainApp: FC = () => {
  return (
    <Tab.Navigator
      tabBar={props => <BottomNavigation {...props} />}
      screenOptions={{tabBarHideOnKeyboard: true}}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen
        name="Simpanan"
        component={SimpananScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Pembiayaan"
        component={PembiayaanScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profil"
        component={Profile}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Logout"
        component={Logout}
        options={{headerShown: false}}
        listeners={({navigation}) => ({
          tabPress: event => {
            event.preventDefault()
            navigation.navigate("Logout")
          }
        })}
      />
    </Tab.Navigator>
  );
};

const Router: FC = () => {
  const accessToken = useAuthStore(state => state.accessToken);
  const autoLogout = useAuthStore(state => state.handleLogout);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const appStateChangeSubscription = useRef<EventSubscription | null>(null);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    return () => {
      appStateChangeSubscription.current?.remove();
    };
  }, []);

  const _handleAppStateChange = (nextAppState: any) => {
    if (
      // appState.current.match(/active|foreground/) &&
      nextAppState === 'background'
    ) {
      // autologout ketika berada pada background
      autoLogout();
    }
    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    // melihat active atau dibackground applikasinya
    // console.log('AppState :', appState.current)
  };

  return (
    <RootStack.Navigator>
      {accessToken !== null ? (
        <RootStack.Screen
          name="MainApp"
          component={MainApp}
          options={{headerShown: false}}
        />
      ) : (
        <RootStack.Screen
          name="Login"
          component={LoginB}
          options={{headerShown: false}}
        />
      )}
    </RootStack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({});

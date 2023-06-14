import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {Route} from '@react-navigation/native';
import Home from '../assets/icons/home.svg';
import HomeActive from '../assets/icons/homeActive.svg';
import Simpanan from '../assets/icons/simpanan.svg';
import SimpananActive from '../assets/icons/simpananActive.svg';
import Pembiayaan from '../assets/icons/pembiayaan.svg';
import PembiayaanActive from '../assets/icons/pembiayaanActive.svg';
import Profil from '../assets/icons/profil.svg';
import ProfilActive from '../assets/icons/profilActive.svg';
import Logout from '../assets/icons/logout.svg'
import LogoutActive from '../assets/icons/logoutActive.svg'

type TabBottomNavigation = {
  state: any;
  descriptors: any;
  navigation: any;
};

function BottomNavigation({
  state,
  descriptors,
  navigation,
}: TabBottomNavigation) {
  return (
    <View style={styles.container}>
      {state.routes.map((route: Route<any>, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const Icon = () => {
          if (label === 'Home') return isFocused ? <HomeActive /> : <Home />;
          if (label === 'Simpanan')
            return isFocused ? <SimpananActive /> : <Simpanan />;
          if (label === 'Pembiayaan')
            return isFocused ? <PembiayaanActive /> : <Pembiayaan />;
          if (label === 'Profil')
            return isFocused ? <ProfilActive /> : <Profil />;
          if (label === 'Logout')
            return isFocused ? <LogoutActive /> : <Logout />;
          return <HomeActive />;
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Icon />
            <Text style={{color: isFocused ? '#006BFF' : '#ABABAB', fontSize: 12}}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default BottomNavigation;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopColor: '#e0e0e0',
    borderTopWidth: 1,
    elevation: 40,
  },
});

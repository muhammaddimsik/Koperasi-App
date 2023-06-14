import React, {FC, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import LoginBgB from '../assets/images/loginBgB.png';
import Logo from '../assets/icons/logoFull.svg';
import {TextInput} from 'react-native-gesture-handler';
import ProfilIcon from '../assets/icons/login/profile.svg';
import LockIcon from '../assets/icons/login/lock.svg';
import {useAuthStore} from '../stores/NasabahStore';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import EyeSlash from '../assets/icons/eyeSlashGray.svg';
import Eye from '../assets/icons/eyeGray.svg';
import {Alert} from '../components';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const App: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSecureTextEnty, setIsSecureTextEntry] = useState(true);

  const login = useAuthStore(state => state.handleLogin);
  const msg = useAuthStore(state => state.message);
  const isLoading = useAuthStore(state => state.loading);

  const handleLogin = async () => {
    await login(username, password);
  };

  return (
    <KeyboardAwareScrollView
      style={{flex: 1}}
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <View style={{}}>
          <ImageBackground
            source={LoginBgB}
            resizeMode="stretch"
            style={styles.loginBg}>
            {msg === '' ? <Text></Text> : <Alert />}
            {isLoading && (
              <Spinner
                visible={isLoading}
                textContent={'Loading...'}
                textStyle={{color: '#FFF'}}
              />
            )}
            <View>
              <Logo />
            </View>
          </ImageBackground>
        </View>
        <View style={{paddingHorizontal: 30, marginTop: -20}}>
          <Text
            style={{
              color: '#006BFF',
              fontSize: 22,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Login Form
          </Text>
          <View>
            <View style={styles.inputContainer}>
              <ProfilIcon />
              <TextInput
                style={styles.inputText}
                placeholder="Username"
                placeholderTextColor={'#aaa'}
                onChangeText={text => setUsername(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <LockIcon />
              <TextInput
                style={styles.inputText}
                placeholder="Password"
                placeholderTextColor={'#aaa'}
                onChangeText={text => setPassword(text)}
                secureTextEntry={isSecureTextEnty}
              />
              <TouchableOpacity
                style={{marginRight: 10}}
                onPress={() => setIsSecureTextEntry(!isSecureTextEnty)}>
                {isSecureTextEnty ? <EyeSlash /> : <Eye />}
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: '#006BFF',
                width: width / 1.17,
                paddingVertical: 14,
                borderRadius: 10,
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={handleLogin}>
              <Text style={{color: '#FFF', fontWeight: 'bold'}}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
  loginBg: {
    width: width/1,
    height: height / 1.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  inputText: {
    fontSize: 16,
    width: width / 1.5,
    color: '#000',
  },
});

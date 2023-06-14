import React, {FC, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { Button, Alert} from '../components';
import LoginIcon from '../assets/icons/loginIcon.svg';
import LogoFull from '../assets/icons/logoFull.svg';
import {useAuthStore} from '../stores/NasabahStore';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import {TextInput} from 'react-native-gesture-handler';
import Eye from '../assets/icons/eye.svg';
import EyeSlash from '../assets/icons/eyeSlash.svg';
import LoginBg from '../assets/images/loginBg.png';

const {height, width} = Dimensions.get('screen');

const App: FC = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSecureTextEnty, setIsSecureTextEntry] = useState(true);

  const login = useAuthStore(state => state.handleLogin);
  const msg = useAuthStore(state => state.message);
  const isLoading = useAuthStore(state => state.loading);

  const handleLogin = async () => {
    await login(username, password);
  };

  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const [isFocusedTwo, setIsFocusedTwo] = useState(false);
  const handleFocusTwo = () => {
    setIsFocusedTwo(true);
  };

  const handleBlurTwo = () => {
    setIsFocusedTwo(false);
  };

  return (
    <KeyboardAwareScrollView
      style={{flex: 1}}
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="handled">
      <ImageBackground source={LoginBg} style={styles.container}>
        {msg === '' ? (
          <View>
            <Text></Text>
          </View>
        ) : (
          <Alert />
        )}
        {isLoading && (
          <Spinner
            visible={isLoading}
            textContent={'Loading...'}
            textStyle={{color: '#FFF'}}
          />
        )}
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <LogoFull />
          <View style={{flexDirection: 'row', gap: 5, marginVertical: 20}}>
            {/* <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                textTransform: 'uppercase',
                color: '#FFF',
              }}>
              isso
            </Text> */}
          </View>
          <View
            style={[
              styles.containerInput,
              isFocused && styles.containerInputFocused,
            ]}>
            <TextInput
              style={styles.input}
              secureTextEntry={false}
              onChangeText={text => setUsername(text)}
              placeholder="Username"
              placeholderTextColor={'#B5CDE5'}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </View>
          <View
            style={[
              styles.containerInput,
              isFocusedTwo && styles.containerInputFocused,
            ]}>
            <TextInput
              style={styles.input}
              secureTextEntry={isSecureTextEnty}
              onChangeText={text => setPassword(text)}
              placeholder="Password"
              placeholderTextColor={'#B5CDE5'}
              onFocus={handleFocusTwo}
              onBlur={handleBlurTwo}
            />
            <TouchableOpacity
              style={{marginRight: 10}}
              onPress={() => setIsSecureTextEntry(!isSecureTextEnty)}>
              {isSecureTextEnty ? <EyeSlash /> : <Eye />}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#FFF',
              width: width / 1.1,
              padding: 14,
              borderRadius: 30,
              marginTop: 40,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 6,
            }}
            onPress={handleLogin}>
            <LoginIcon />
            <Text
              style={{
                color: '#3E53B6',
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  baseText: {
    fontFamily: 'Robboto',
  },
  containerInput: {
    width: width / 1.1,
    alignSelf: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#B5CDE5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    paddingHorizontal: 12,
    color: '#FFF',
    fontSize: 16,
    width: width / 1.3,
  },
  containerInputFocused: {
    borderColor: '#FFF', // Ubah warna sesuai kebutuhan
  },
});

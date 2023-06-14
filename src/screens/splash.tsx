import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../router';
import React, {FC, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';

const App: FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>koperasi indonesia</Text>
      <Text style={styles.desc}>Aman dan terpercaya</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B4CC5A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFF',
    textTransform: 'uppercase',
    fontSize: 30,
    fontWeight: 'bold',
  },
  desc: {
    color: '#FFF',
    fontSize: 16,
  },
});

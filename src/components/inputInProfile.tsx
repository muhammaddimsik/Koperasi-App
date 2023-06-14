import React, {useState, FC} from 'react';
import {StyleSheet, Dimensions, TouchableOpacity, View} from 'react-native';
import Eye from '../assets/icons/eyeGray.svg';
import EyeSlash from '../assets/icons/eyeSlashGray.svg';
import {TextInput} from 'react-native-gesture-handler';

const {height, width} = Dimensions.get('screen');

interface Props {
  placeholder: string;
  onChangeText: (text: string) => void;
}

const App: FC<Props> = props => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={[styles.containerInput, isFocused && styles.containerInputFocused]}>
      <TextInput
        style={styles.input}
        secureTextEntry={isSecureTextEntry}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        placeholderTextColor={'#ccc'}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <TouchableOpacity
        style={{marginRight: 10}}
        onPress={() => setIsSecureTextEntry(!isSecureTextEntry)}>
        {isSecureTextEntry ? <EyeSlash /> : <Eye />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerInput: {
    width: width / 1.1,
    alignSelf: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    paddingHorizontal: 12,
    color: '#000',
    fontSize: 16,
    width: width / 1.3,
  },
  containerInputFocused: {
    borderColor: 'blue', // Ubah warna sesuai kebutuhan
  },
});

export default App;

import React, {FC, useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {View, Dimensions, StyleSheet, Text, TouchableOpacity} from 'react-native';

const {height, width} = Dimensions.get('screen');

interface Props {
  placeholder: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  label: string;
}

const Input: FC<Props> = props => {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={[style.container, isFocused && style.containerInputFocused]}>
      <Text style={style.textLabel}>{props.label}</Text>
      <TextInput
        style={style.input}
        secureTextEntry={props.secureTextEntry}
        onChangeText={props.onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </View>
  );
};

export default Input;

const style = StyleSheet.create({
  container: {
    width: width / 1.1,
    alignSelf: 'center',
    marginBottom: 10,
  },
  input: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    color: '#000'
  },
  textLabel: {
    marginBottom: 5,
    fontSize: 16,
    color: '#000'
  },
  containerInputFocused: {
    borderColor: '#FF0C0C', // Ubah warna sesuai kebutuhan
  },
});

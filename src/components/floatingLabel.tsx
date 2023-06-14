import React, {useState, FC, useEffect} from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import Eye from '../assets/icons/eyeGray.svg';
import EyeSlash from '../assets/icons/eyeSlashGray.svg';
import {TextInput} from 'react-native-gesture-handler';

const {height, width} = Dimensions.get('screen');

interface Props {
  placeholder: string;
  onChangeText: (text: string) => void;
  value: string;
}

const FloatingLabelInput: FC<Props> = props => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);
  const labelPosition = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(labelPosition, {
      toValue: props.value ? -26 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [props.value])

  const handleFocus = () => {
    setIsFocused(true);
    if (!props.value){
      Animated.timing(labelPosition, {
        toValue: -26,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if(!props.value){
      Animated.timing(labelPosition, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={{ marginTop: 6 }}>
      <View
        style={[
          styles.containerInput,
          isFocused && styles.containerInputFocused,
        ]}>
        <Animated.View
          style={[
            styles.labelContainer,
            {transform: [{translateY: labelPosition}]},
          ]}>
          <Animated.Text
            style={[styles.label, isFocused && styles.labelFocused]}>
            {props.placeholder}
          </Animated.Text>
        </Animated.View>
        <TextInput
          style={styles.input}
          secureTextEntry={isSecureTextEntry}
          onChangeText={props.onChangeText}
          value={props.value}
          placeholder=""
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
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    color: '#000',
    fontSize: 16,
  },
  labelContainer: {
    position: 'absolute',
    left: 10,
    top: 14,
    height: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 14,
    color: '#aaa',
  },
  labelFocused: {
    color: 'blue',
  },
  containerInputFocused: {
    borderColor: 'blue', // Ubah warna sesuai kebutuhan
  },
});

export default FloatingLabelInput;

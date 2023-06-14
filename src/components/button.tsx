import React, {FC} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const {height, width} = Dimensions.get('screen');

interface Props {
  title: string;
  onPress: () => void;
}

const App: FC<Props> = props => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#006BFF',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    width: width / 1.1,
  },
  text: {
    color: '#fff',
    padding: 6,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

import React, {FC} from 'react';
import {View, Text, Dimensions} from 'react-native';

const width = Dimensions.get('screen').width;

interface Props {
  judul: string;
  content: any;
}

const App: FC<Props> = props => {
  return (
    <View
      style={{
        marginTop: 10,
        paddingBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Text style={{fontSize: 16, color: '#000'}}>{props.judul}</Text>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: '#000',
          width: width / 2,
          paddingRight: 10,
          textAlign: 'right',
        }}
        numberOfLines={4}>
        {props.content}
      </Text>
    </View>
  );
};

export default App;

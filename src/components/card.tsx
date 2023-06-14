import React, {FC} from 'react';
import {StyleSheet, View, Text} from 'react-native/';

interface props {
  date: string;
  jenis: string;
  label: string;
  transaksiId: string;
  jumlah: string;
}

const App: FC<props> = props => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderText}>{props.date}</Text>
          <Text style={styles.cardHeaderText}>{props.jenis}</Text>
        </View>
        <View style={{marginTop: 10}}>
          <Text style={{fontSize: 16, color: '#000'}}>{props.label}</Text>
          <View style={styles.cardDescriptions}>
            <Text style={styles.cardDescriptionsText}>{props.transaksiId}</Text>
            <Text style={styles.cardDescriptionsText}>{props.jumlah}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F9F9FC',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: '#ccc'
  },
  cardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  cardHeaderText: {
    color: '#000'
  },
  cardDescriptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardDescriptionsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0E3AAA',
    marginBottom: 4,
  },
  cardContainer: {
    marginVertical: 8,
  },
});

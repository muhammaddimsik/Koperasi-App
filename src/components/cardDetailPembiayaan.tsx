import React, {FC} from 'react';
import {StyleSheet, View, Text} from 'react-native/';
import CalendarIcon from '../assets/icons/Calendar.svg';

interface Props {
  date: string;
  angsuranKe: number;
  label: string;
  transaksiId: any;
  jumlah: string;
  denda: string;
  petugas: string;
}

const App: FC<Props> = props => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <CalendarIcon />
            <Text style={styles.cardHeaderText}>{props.date}</Text>
          </View>
          <View>
            <Text style={styles.cardHeaderText}>
              Angsuran ke {props.angsuranKe}
            </Text>
          </View>
        </View>
        <View style={styles.cardDescriptions}>
          <View>
            <Text style={{fontSize: 16, color: '#000'}}>{props.label}</Text>
            <Text style={styles.cardDescriptionsText}>{props.transaksiId}</Text>
          </View>
          <View>
            <Text style={{fontSize: 16, color: '#000'}}>Jumlah Bayar</Text>
            <Text style={styles.cardDescriptionsText}>{props.jumlah}</Text>
          </View>
        </View>
        <View style={{marginTop: 6}}>
          <Text style={{color: '#000'}}>Denda: {props.denda}</Text>
          <Text style={{color: '#000'}}>Petugas: {props.petugas}</Text>
        </View>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 0,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  cardHeaderText: {
    color: '#646465',
  },
  cardDescriptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  cardDescriptionsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#006BFF',
    marginBottom: 4,
  },
  cardContainer: {
    marginVertical: 8,
  },
});

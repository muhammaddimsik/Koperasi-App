import React, {FC, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useAuthStore} from '../stores/NasabahStore';
import CalendarIcon from '../assets/icons/Calendar.svg';
import {formatTanggal} from '../constants/formatTanggal';
import {formatCurrency} from '../constants/formatCurrency';
import ArrowIcon from '../assets/icons/arrowIcon.svg';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../router';
import BackIcon from '../assets/icons/backIcon.svg';
import {ScrollView} from 'react-native-gesture-handler';

const App: FC = () => {
  const getPembiayaan = useAuthStore(state => state.getPembiayaan);
  const dataPembiayaan = useAuthStore(state => state.dataPembiayaan);
  const isLoading = useAuthStore(state => state.loading);

  useEffect(() => {
    getPembiayaan();
  }, []);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const goBack = () => {
    navigation.navigate('Home');
  };

  const goDetail = (norek: number) => {
    navigation.navigate('PembiayaanDetail', {norek});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{padding: 22}}
          onPress={() => {
            goBack();
          }}>
          <BackIcon />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            color: '#FFF',
            textAlign: 'center',
          }}>
          Pembiayaan
        </Text>
      </View>
      {isLoading ? (
        <View></View>
      ) : (
        <View style={{ paddingBottom: 60}}>
          {dataPembiayaan.length === 0 ? (
            <View style={{paddingLeft: 20}}>
              <Text>Tidak ada data pembiayaan</Text>
            </View>
          ) : (
            <ScrollView style={{paddingHorizontal: 20}}>
              {dataPembiayaan.map((item: any) => (
                <View key={item.norek} style={styles.card}>
                  <TouchableOpacity onPress={() => goDetail(item.norek)}>
                    <View style={styles.cardHeader}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 6,
                        }}>
                        <CalendarIcon />
                        <Text style={{color: '#818181'}}>
                          {formatTanggal(item.tgl_pinjam)}
                        </Text>
                      </View>
                      <Text style={{color: '#818181'}}>
                        {item.pembiayaan_jeni.title}
                      </Text>
                      <ArrowIcon />
                    </View>
                    <View style={styles.cardDescriptions}>
                      <View>
                        <Text style={{color: '#000'}}>Nomor Rekening</Text>
                        <Text style={styles.cardDescriptionsText}>
                          {item.norek}
                        </Text>
                      </View>
                      <View>
                        <Text style={{color: '#000'}}>Nominal</Text>
                        <Text style={styles.cardDescriptionsText}>
                          {formatCurrency(item.nominal)}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#006BFF',
  },
  card: {
    backgroundColor: '#FFF',
    padding: 20,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  cardDescriptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
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

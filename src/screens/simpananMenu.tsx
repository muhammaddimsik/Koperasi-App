import React, {FC, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useAuthStore} from '../stores/NasabahStore';
import {formatCurrency} from '../constants/formatCurrency';
import ArrowIcon from '../assets/icons/arrowIcon.svg';
import BackIcon from '../assets/icons/backIcon.svg';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../router';
import {ScrollView} from 'react-native-gesture-handler';

const App: FC = () => {
  const getSimpanan = useAuthStore(state => state.getSimpanan);
  const simpanan = useAuthStore(state => state.simpanan);
  const isLoading = useAuthStore(state => state.loading);

  useEffect(() => {
    getSimpanan();
  }, []);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const goBack = () => {
    navigation.navigate('Home');
  };

  const goDetail = (norek: number) => {
    navigation.navigate('SimpananDetail', {norek});
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
          Simpanan
        </Text>
      </View>
      {isLoading ? (
        <View></View>
      ) : (
        <View style={{ paddingBottom: 60}}>
          <ScrollView style={{paddingHorizontal: 20}}>
            {simpanan.map((s: any) => (
              <TouchableOpacity key={s.norek} onPress={() => goDetail(s.norek)}>
                <View style={styles.card}>
                  <View style={styles.cardHeader}>
                    <Text style={{color: '#818181'}}>
                      {s.simpananbiasajn.simpananbiasajns}
                    </Text>
                    <ArrowIcon />
                  </View>
                  <View style={styles.cardDescriptions}>
                    <View>
                      <Text style={{color: '#000'}}>No. Rekening</Text>
                      <Text style={styles.cardDescriptionsText}>{s.norek}</Text>
                    </View>
                    <View>
                      <Text style={{color: '#818181'}}>Sisa Saldo</Text>
                      <Text style={styles.cardDescriptionsText}>
                        {formatCurrency(s.saldo)}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
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

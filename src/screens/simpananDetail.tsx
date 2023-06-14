import React, {FC, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../router';
import BackIcon from '../assets/icons/backIcon.svg';
import CalendarIcon from '../assets/icons/Calendar.svg';
import {useAuthStore} from '../stores/NasabahStore';
import {formatCurrency} from '../constants/formatCurrency';
import {formatDateTime} from '../constants/formatDateTime';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import DatePicker from 'react-native-modern-datepicker';

const App: FC<{route: RouteProp<RootStackParams, 'SimpananDetail'>}> = ({
  route,
}) => {
  const {norek} = route.params;
  const rekeningDetData = useAuthStore(state => state.rekeningDetData);
  const rekeningDetResult = useAuthStore(state => state.rekeningDetResult);
  const getRekeningDet = useAuthStore(state => state.getRekeningDet);
  const isLoading = useAuthStore(state => state.loading);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const goBack = () => {
    navigation.navigate('SimpananMenu');
  };

  const [modalOne, setModalOne] = useState(false);
  const [modalTwo, setModalTwo] = useState(false);
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');

  const getRekeningdetByDate = useAuthStore(
    state => state.getRekeningdetByDate,
  );
  const handleSubmit = () => {
    getRekeningdetByDate(norek, dateStart, dateEnd);
  };

  const handlemodalOne = () => {
    setModalOne(!modalOne);
  };
  const handleModalTwo = () => {
    setModalTwo(!modalTwo);
  };

  useEffect(() => {
    getRekeningDet(norek);

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Menggunakan indeks bulan dari 0 hingga 11

    const formattedStartDate = `${currentYear}-${currentMonth
      .toString()
      .padStart(2, '0')}-01`;
    const formattedEndDate = currentDate
      .toISOString()
      .split('T')[0]
      .replace(/-/g, '-');

    setDateStart(formattedStartDate);
    setDateEnd(formattedEndDate);
  }, [norek]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View>
          <Spinner
            visible={isLoading}
            textContent={'Loading...'}
            textStyle={{color: '#FFF'}}
          />
        </View>
      ) : (
        <View>
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
              Detail Simpanan
            </Text>
          </View>
          {rekeningDetData.lenght === 0 ? (
            <View>
              <Text>Tidak ada transaksi</Text>
            </View>
          ) : (
            <View>
              <View
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 40,
                  backgroundColor: '#FFF',
                  borderRadius: 6,
                  marginTop: 20,
                }}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text>No. Rek: {rekeningDetData.rekening}</Text>
                  <Text>{rekeningDetData.jenis_simpanan}</Text>
                </View>
                <View style={{marginVertical: 20}}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}>
                    Sisa Saldo
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 26,
                      color: '#006BFF',
                      textAlign: 'center',
                    }}>
                    {formatCurrency(rekeningDetData.sisa_saldo)}
                  </Text>
                </View>
              </View>
            </View>
          )}
          <ScrollView>
            <View>
              <View style={{paddingHorizontal: 20}}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                  }}>
                  <Text
                    style={{color: '#000', marginVertical: 10, fontSize: 16}}>
                    Filter By Date :
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 4,
                      alignItems: 'center',
                    }}>
                    <View>
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          borderWidth: 1,
                          borderRadius: 4,
                          borderColor: '#ccc',
                          padding: 4,
                        }}
                        onPress={handlemodalOne}>
                        <Text
                          style={{
                            color: '#000',
                            marginRight: 3,
                            fontSize: 16,
                          }}>
                          {dateStart}
                        </Text>
                        <CalendarIcon />
                      </TouchableOpacity>
                      <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalOne}
                        style={{padding: 30}}>
                        <View style={styles.centeredView}>
                          <View style={styles.modalView}>
                            <DatePicker
                              mode="calendar"
                              onSelectedChange={selectedDate => {
                                const [year, month, day] =
                                  selectedDate.split('/');
                                const formattedDate = `${year}-${month}-${day}`;
                                setDateStart(formattedDate);
                              }}
                            />
                            <Text style={{marginBottom: 10}}>
                              *Pastikan anda telah memilih tanggal
                            </Text>
                            <TouchableOpacity
                              onPress={handlemodalOne}
                              style={{
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                              }}>
                              <Text
                                style={{
                                  backgroundColor: '#006BFF',
                                  padding: 10,
                                  color: 'white',
                                  borderRadius: 4,
                                }}>
                                OK
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </Modal>
                    </View>
                    <Text
                      style={{
                        color: '#000',
                        marginHorizontal: 4,
                        fontSize: 16,
                      }}>
                      To
                    </Text>
                    <View>
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          borderWidth: 1,
                          borderRadius: 4,
                          borderColor: '#ccc',
                          padding: 4,
                        }}
                        onPress={handleModalTwo}>
                        <Text
                          style={{
                            color: '#000',
                            marginRight: 3,
                            fontSize: 16,
                          }}>
                          {dateEnd}
                        </Text>
                        <CalendarIcon />
                      </TouchableOpacity>
                      <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalTwo}
                        style={{padding: 30}}>
                        <View style={styles.centeredView}>
                          <View style={styles.modalView}>
                            <DatePicker
                              mode="calendar"
                              onSelectedChange={date => setDateEnd(date)}
                            />
                            <TouchableOpacity
                              onPress={handleModalTwo}
                              style={{
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                              }}>
                              <Text style={{marginBottom: 10}}>
                                *Pastikan anda telah memilih tanggal
                              </Text>
                              <Text
                                style={{
                                  backgroundColor: '#006BFF',
                                  padding: 10,
                                  color: 'white',
                                  borderRadius: 4,
                                }}>
                                OK
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </Modal>
                    </View>
                    <TouchableOpacity
                      onPress={handleSubmit}
                      style={{
                        paddingVertical: 6,
                        paddingHorizontal: 16,
                        backgroundColor: '#006BFF',
                        borderRadius: 4,
                      }}>
                      <Text
                        style={{
                          color: '#FFF',
                          fontSize: 16,
                          fontWeight: 'bold',
                        }}>
                        Go
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            {rekeningDetResult.length === 0 ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 20,
                }}>
                <Text>Tidak ada transaksi bulan ini</Text>
              </View>
            ) : (
              <View>
                <View style={{paddingHorizontal: 20, marginBottom: 340}}>
                  {rekeningDetResult.map((item, index) => (
                    <View key={index} style={styles.cardContainer}>
                      <View style={styles.card}>
                        <View style={styles.cardHeader}>
                          <Text>{formatDateTime(item.tgl_transaksi)}</Text>
                          {item.akun === 'Setoran' ? (
                            <Text style={{fontWeight: 'bold', color: 'green'}}>
                              {item.akun}
                            </Text>
                          ) : (
                            <Text style={{fontWeight: 'bold', color: 'red'}}>
                              {item.akun}
                            </Text>
                          )}
                        </View>
                        <View style={styles.cardDescriptions}>
                          <View>
                            <Text style={{fontSize: 16}}>Transaksi ID</Text>
                            <Text style={styles.cardDescriptionsText}>
                              {item.id}
                            </Text>
                          </View>
                          <View>
                            <Text style={{fontSize: 16}}>Nominal</Text>
                            <Text style={styles.cardDescriptionsText}>
                              {formatCurrency(item.nominal)}
                            </Text>
                          </View>
                        </View>
                        <Text style={{}}>Keterangan: {item.ket}</Text>
                        {/* <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingVertical: 3,
                          paddingHorizontal: 10,
                          backgroundColor: '#F0F0F0',
                          borderRadius: 4,
                          marginTop: 5,
                        }}>
                        <Text style={{color: '#383838'}}>Saldo</Text>
                        <Text style={{color: '#383838'}}>
                          {formatCurrency(item.saldo)}
                        </Text>
                      </View> */}
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}
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
    borderRadius: 10,
    paddingBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 10,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    width: '90%',
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

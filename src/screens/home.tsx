import React, {FC, useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Modal,
} from 'react-native';
import {useAuthStore} from '../stores/NasabahStore';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../router';
import homeBgB from '../assets/images/homeBg1.png';
import CalendarIcon from '../assets/icons/Calendar.svg';
import ArrowIcon from '../assets/icons/arrowIcon.svg';
import PembiayaanIcon from '../assets/icons/pembiayaanIcon.svg';
import SimpananIcon from '../assets/icons/simpananIcon.svg';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import {useFocusEffect} from '@react-navigation/native';
import QuestionIcon from '../assets/icons/question.svg';
import {formatCurrency} from '../constants/formatCurrency';

const App: FC = () => {
  const getSimpanan = useAuthStore(state => state.getSimpanan);
  const userName = useAuthStore(state => state.username);
  const simpanan = useAuthStore(state => state.simpanan);
  const getPembiayaan = useAuthStore(state => state.getPembiayaan);
  const dataPembiayaan = useAuthStore(state => state.dataPembiayaan);
  const handleLogout = useAuthStore(state => state.handleLogout);
  const isLoading = useAuthStore(state => state.loading);
  const getProfil = useAuthStore(state => state.getProfil);

  //untuk modal confirmasi logout
  const [isShow, setIsShow] = useState(false);
  const handleBatal = () => {
    setIsShow(!isShow);
  };

  const scrollViewRef = useRef<ScrollView>(null);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const formatTanggal = (tanggal: any) => {
    const date = new Date(tanggal);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    getProfil();
    getSimpanan();
    getPembiayaan();
  }, []);

  useFocusEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({y: 0, animated: true});
    }
  });

  const goDetailPembiayaan = (norek: number) => {
    navigation.navigate('MainApp', {
      screen: 'Pembiayaan',
      params: {
        screen: 'PembiayaanDetail',
        params: {norek: norek},
      },
    });
  };

  const goDetailSimpanan = (norek: number) => {
    navigation.navigate('MainApp', {
      screen: 'Simpanan',
      params: {
        screen: 'SimpananDetail',
        params: {norek: norek},
      },
    });
  };

  const goSimpananMenu = () => {
    navigation.navigate('MainApp', {
      screen: 'Simpanan',
      params: {
        screen: 'SimpananMenu',
      },
    });
  };

  const goPembiayaanMenu = () => {
    navigation.navigate('MainApp', {
      screen: 'Pembiayaan',
      params: {
        screen: 'PembiayaanMenu',
      },
    });
  };

  return (
    <ScrollView style={styles.container} ref={scrollViewRef}>
      <View>
        {isShow && (
          <Modal animationType="fade" transparent={true} visible={isShow}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <QuestionIcon />
                <Text
                  style={{
                    fontSize: 18,
                    color: '#000',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    marginTop: 10,
                  }}>
                  Apakah anda yakin ingin keluar?
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => handleLogout()}
                    style={{
                      marginRight: 6,
                      marginTop: 20,
                      paddingVertical: 10,
                      paddingHorizontal: 30,
                      backgroundColor: '#006BFF',
                      borderRadius: 6,
                    }}>
                    <Text style={{color: '#FFF', fontWeight: 'bold'}}>OK</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleBatal}
                    style={{
                      marginTop: 20,
                      paddingVertical: 10,
                      paddingHorizontal: 30,
                      backgroundColor: '#FF0000',
                      borderRadius: 6,
                    }}>
                    <Text style={{color: '#FFF', fontWeight: 'bold'}}>
                      Batal
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}
      </View>
      <View>
        <ImageBackground source={homeBgB} style={styles.homeBg}>
          <View style={styles.header}>
            <View>
              <Text style={styles.text}>Selamat Datang,</Text>
              <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
                {userName}
              </Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => setIsShow(!isShow)}>
                <Text
                  style={{
                    color: '#FFF',
                    textDecorationLine: 'underline',
                    fontWeight: 'bold',
                  }}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.menu}>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={goSimpananMenu}>
              <SimpananIcon />
              <Text style={styles.text}>Simpanan</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={goPembiayaanMenu}>
              <PembiayaanIcon />
              <Text style={styles.text}>Pembiayaan</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <ScrollView style={styles.overview}>
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
              <View style={styles.cardContainer}>
                <View style={styles.overviewTitleContainer}>
                  <Text style={styles.overviewTitle}>Simpanan</Text>
                </View>
                {simpanan.length === 0 ? (
                  <View>
                    <Text style={{color: '#ccc'}}>Tidak ada transaksi</Text>
                  </View>
                ) : (
                  <View>
                    {simpanan.map((s: any) => (
                      <TouchableOpacity
                        key={s.norek}
                        onPress={() => goDetailSimpanan(s.norek)}>
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
                              <Text style={styles.cardDescriptionsText}>
                                {s.norek}
                              </Text>
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
                  </View>
                )}
              </View>
              <View style={styles.cardContainer}>
                <View style={styles.overviewTitleContainer}>
                  <Text style={styles.overviewTitle}>Pembiayaan</Text>
                </View>
                {dataPembiayaan.length === 0 ? (
                  <View>
                    <Text style={{color: '#000', margin: 10}}>
                      Tidak ada transaksi
                    </Text>
                  </View>
                ) : (
                  <View>
                    {dataPembiayaan.map((item: any) => (
                      <TouchableOpacity
                        key={item.norek}
                        onPress={() => goDetailPembiayaan(item.norek)}>
                        <View style={styles.card}>
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
                          <View style={{marginTop: 10}}>
                            <Text style={{color: '#000'}}>Nomor Rekening</Text>
                            <View style={styles.cardDescriptions}>
                              <Text style={styles.cardDescriptionsText}>
                                {item.norek}
                              </Text>
                              <Text style={styles.cardDescriptionsText}>
                                {formatCurrency(item.nominal)}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    color: '#fff',
  },
  homeBg: {
    height: 300,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 160,
    gap: 18,
  },
  text: {
    color: '#fff',
  },
  overview: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
  },
  overviewTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: '90%',
    paddingHorizontal: 35,
    paddingTop: 35,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 14,
  },
});

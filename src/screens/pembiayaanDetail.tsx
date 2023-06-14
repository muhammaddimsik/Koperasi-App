import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../router';
import BackIcon from '../assets/icons/backIcon.svg';
import {useAuthStore} from '../stores/NasabahStore';
import {CardDetailPembiayaan, Field, LastField} from '../components';
import {formatCurrency} from '../constants/formatCurrency';
import {formatTanggal} from '../constants/formatTanggal';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay/lib';

const App: FC<{route: RouteProp<RootStackParams, 'PembiayaanDetail'>}> = ({
  route,
}) => {
  const {norek} = route.params;
  const [isOpen, setIsOpen] = useState(false);
  const [accordionTwo, setAccordionTwo] = useState(false);
  const [accordionThree, setAccordionThree] = useState(true);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const goBack = () => {
    navigation.navigate('PembiayaanMenu');
  };

  const getDetailPembiayaan = useAuthStore(state => state.getDetailPembiayaan);
  const Angsuran = useAuthStore(state => state.detailPembiayaanAngsuran);
  const Pembiayaan = useAuthStore(state => state.detailPembiayaanPembiayaan);
  const isLoading = useAuthStore(state => state.loading);

  useEffect(() => {
    getDetailPembiayaan(norek);
  }, [norek]);

  function tanggalTempo(date: string): string {
    const newDate = moment(date).add(12, 'months').format('YYYY-MM-DD');
    return newDate;
  }

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
              Detail Pembiayaan
            </Text>
          </View>
          {}
          {Object.keys(Pembiayaan).length === 0 && Angsuran.length === 0 ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 30,
              }}>
              <Text>Tidak ada transaksi</Text>
            </View>
          ) : (
            <ScrollView style={{paddingHorizontal: 20, marginBottom: 100}}>
              <View
                style={{
                  marginTop: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: '#ccc',
                  paddingBottom: 6,
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  onPress={() => setIsOpen(!isOpen)}>
                  <Text
                    style={{fontSize: 18, fontWeight: 'bold', color: '#000'}}>
                    Data Nasabah
                  </Text>
                  <View>
                    {isOpen ? (
                      <AntDesign
                        name="up"
                        style={{fontSize: 18, color: '#000'}}
                      />
                    ) : (
                      <AntDesign
                        name="down"
                        style={{fontSize: 18, color: '#000'}}
                      />
                    )}
                  </View>
                </TouchableOpacity>
                {isOpen && (
                  <View>
                    <Field
                      judul={'Nama Nasabah'}
                      content={Pembiayaan.namepic}
                    />
                    <Field
                      judul={'No. KTP'}
                      content={Pembiayaan.nasabah.noKtp}
                    />
                    <LastField
                      judul={'Alamat'}
                      content={Pembiayaan.nasabah.alamat}
                    />
                  </View>
                )}
              </View>
              <View
                style={{
                  marginTop: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: '#ccc',
                  paddingBottom: 6,
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  onPress={() => setAccordionTwo(!accordionTwo)}>
                  <Text
                    style={{fontSize: 18, fontWeight: 'bold', color: '#000'}}>
                    Data Pembiayaan
                  </Text>
                  <View>
                    {accordionTwo ? (
                      <AntDesign
                        name="up"
                        style={{fontSize: 18, color: '#000'}}
                      />
                    ) : (
                      <AntDesign
                        name="down"
                        style={{fontSize: 18, color: '#000'}}
                      />
                    )}
                  </View>
                </TouchableOpacity>
                {accordionTwo && (
                  <View>
                    <Field judul={'No. Rekening'} content={Pembiayaan.norek} />
                    <Field
                      judul={'Jenis Pembiayaan'}
                      content={Pembiayaan.pembiayaan_jeni.title}
                    />
                    <Field
                      judul={'Jenis Nasabah'}
                      content={Pembiayaan.jnspic}
                    />
                    <Field
                      judul={'Tanggal Pencairan'}
                      content={formatTanggal(Pembiayaan.tgl_pinjam)}
                    />
                    <Field
                      judul={'Tanggal Tempo'}
                      content={formatTanggal(
                        tanggalTempo(Pembiayaan.tgl_pinjam),
                      )}
                    />
                    <Field
                      judul={'Lama Angsuran (Bln)'}
                      content={Pembiayaan.tenor}
                    />
                    <Field
                      judul={'Pokok Pembiayaan'}
                      content={formatCurrency(Pembiayaan.nominal)}
                    />
                    <Field
                      judul={'Biaya ADM + Materai'}
                      content={formatCurrency(Pembiayaan.biaya_adm)}
                    />
                    <Field
                      judul={'Angsuran Pokok'}
                      content={formatCurrency(Pembiayaan.angsuran_pokok)}
                    />
                    <Field
                      judul={'Margin 2.000%'}
                      content={formatCurrency(Pembiayaan.margin)}
                    />
                    <Field
                      judul={'Jumlah Angsuran'}
                      content={formatCurrency(Pembiayaan.jumlah_angsuran)}
                    />
                    <LastField
                      judul={'Total Tagihan'}
                      content={formatCurrency(Pembiayaan.total_tagihan)}
                    />
                  </View>
                )}
              </View>
              <View
                style={{
                  marginTop: 20,
                  borderBottomWidth: 2,
                  borderBottomColor: '#ccc',
                  paddingBottom: 6,
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  onPress={() => setAccordionThree(!accordionThree)}>
                  <Text
                    style={{fontSize: 18, fontWeight: 'bold', color: '#000'}}>
                    Detail Pembiayaan
                  </Text>
                  <View>
                    {accordionThree ? (
                      <AntDesign
                        name="up"
                        style={{fontSize: 18, color: '#000'}}
                      />
                    ) : (
                      <AntDesign
                        name="down"
                        style={{fontSize: 18, color: '#000'}}
                      />
                    )}
                  </View>
                </TouchableOpacity>
                {accordionThree && (
                  <View style={{marginTop: 10}}>
                    {Angsuran.length === 0 ? (
                      <View style={{marginLeft: 6}}>
                        <Text style={{color: '#000'}}>Tidak ada angsuran</Text>
                      </View>
                    ) : (
                      <View>
                        {Angsuran.map((item: any, index: number) => (
                          <CardDetailPembiayaan
                            key={index}
                            date={formatTanggal(item.tgl_bayar)}
                            label="Transaksi ID"
                            transaksiId={item.id}
                            angsuranKe={index + 1}
                            jumlah={formatCurrency(item.jumlah_bayar)}
                            denda={formatCurrency(item.denda)}
                            petugas={item.karyawan.nama}
                          />
                        ))}
                      </View>
                    )}
                  </View>
                )}
              </View>
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
});

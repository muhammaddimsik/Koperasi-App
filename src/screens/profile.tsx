import React, {FC, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Modal
} from 'react-native';
import {Button, FloatingLabel, AlertResetPassword} from '../components';
import {useAuthStore} from '../stores/NasabahStore';
import BackIcon from '../assets/icons/backIcon.svg';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {formatDateTime} from '../constants/formatDateTime';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import QuestionIcon from '../assets/icons/question.svg'

const {height, width} = Dimensions.get('screen');

const App: FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');

  const [isShow, setIsShow] = useState(false);
  const handleBatal = () => {
    setIsShow(!isShow);
  };

  const getProfil = useAuthStore(state => state.getProfil);
  const profil = useAuthStore(state => state.profil);
  const resetPassword = useAuthStore(state => state.resetPassword);
  const isLoading = useAuthStore(state => state.loading);
  const handleLogout = useAuthStore(state => state.handleLogout);
  const userName = useAuthStore(state => state.username);
  const noKtp = useAuthStore(state => state.noKtp);
  const msg = useAuthStore(state => state.messageErrResetPassword);

  const handleResetPassword = async () => {
    await resetPassword(password, confirmPassword, oldPassword);
  };

  useEffect(() => {
    getProfil();
  }, []);

  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAwareScrollView
      style={{flex: 1}}
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="handled">
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
      <View style={styles.container}>
        {msg !== '' && <AlertResetPassword />}
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
                Profil
              </Text>
            </View>
            <View style={{marginTop: 30, paddingHorizontal: 20}}>
              <Text style={styles.fontBold}>Profil</Text>
              <View style={styles.field}>
                <Text style={{fontSize: 16, color: '#000'}}>Nama</Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: '#000',
                    paddingRight: 10,
                  }}>
                  {userName as string}
                </Text>
              </View>
              <View style={styles.field}>
                <Text style={{fontSize: 16, color: '#000'}}>No. KTP</Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: '#000',
                    paddingRight: 10,
                  }}>
                  {noKtp as string}
                </Text>
              </View>
              <View style={styles.field}>
                <Text style={{fontSize: 16, color: '#000'}}>
                  Login Terakhir
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: '#000',
                    paddingRight: 10,
                  }}>
                  {formatDateTime(profil.last_login as unknown as string)}
                </Text>
              </View>
              <View style={{marginTop: 20}}>
                <Text style={styles.fontBold}>Ubah Password</Text>
                <FloatingLabel
                  placeholder="Password Baru"
                  onChangeText={text => setPassword(text)}
                  value={password}
                />
                <FloatingLabel
                  placeholder="Konfirmasi Password"
                  onChangeText={text => setConfirmPassword(text)}
                  value={confirmPassword}
                />
                <FloatingLabel
                  placeholder="Password Lama"
                  onChangeText={text => setOldPassword(text)}
                  value={oldPassword}
                />
                <Button title="Simpan" onPress={handleResetPassword} />
                <TouchableOpacity style={styles.logout} onPress={() => setIsShow(!isShow)}>
                  <Text style={styles.textLogout}>Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </KeyboardAwareScrollView>
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
  field: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
    marginVertical: 10,
  },
  fontBold: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  logout: {
    backgroundColor: '#F04949',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 8,
    width: width / 1.1,
    marginTop: 4,
  },
  textLogout: {
    color: '#fff',
    padding: 6,
    fontSize: 16,
    fontWeight: 'bold',
  },
  containerInput: {
    width: width / 1.1,
    alignSelf: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    paddingHorizontal: 12,
    color: '#000',
    fontSize: 16,
    width: width / 1.3,
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

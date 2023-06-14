import React, {FC, useState} from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import Attentions from '../assets/icons/Attention.svg';
import {useAuthStore} from '../stores/NasabahStore';

const App: FC = () => {
  const [isShow, setIsShow] = useState(true);
  const resetMsgResetPassword = useAuthStore(
    state => state.setDefaultMsgResetPassword,
  );
  const msg = useAuthStore(state => state.messageErrResetPassword);

  const handleShow = () => {
    resetMsgResetPassword();
    setIsShow(false);
  };

  let judul = '';
  let desc = '';

  switch (msg) {
    case 'old password wrong':
      judul = 'Password Lama Salah';
      desc = 'Pastikan password Lama yang anda masukan sudah benar';
      break;
    case 'password and confirm password not match':
      judul = 'Pasword tidak sesuai';
      desc = 'Pastikan password baru dan konfirmasi password sudah sesuai';
      break;
    default:
      judul = 'Error Reset Password';
      desc = 'Terjadi kesalahan saat melakukan permintaan reset password';
      break;
  }

  return (
    <Modal animationType="fade" transparent={true} visible={isShow}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Attentions />
          <Text
            style={{
              fontSize: 18,
              color: '#000',
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            {judul}
          </Text>
          <Text style={{fontSize: 16, color: '#000', textAlign: 'center'}}>
            {desc}
          </Text>
          <TouchableOpacity
            onPress={handleShow}
            style={{
              marginTop: 20,
              paddingVertical: 10,
              paddingHorizontal: 30,
              backgroundColor: '#006BFF',
              borderRadius: 6,
            }}>
            <Text style={{color: '#FFF', fontWeight: 'bold'}}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default App;

const styles = StyleSheet.create({
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

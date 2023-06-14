import React, {FC, useEffect, useState} from 'react';
import {View, Modal, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useAuthStore} from '../stores/NasabahStore';
import {RouteProp, useNavigation, useFocusEffect} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../router';
import QuestionIcon from '../assets/icons/question.svg'

const App: FC = () => {
  const handleLogout = useAuthStore(state => state.handleLogout);
  const [isShow, setIsShow] = useState(true);

  useFocusEffect(() => {
    setIsShow(true);

    return () => {
      setIsShow(false);
    };
  });

  const navigation = useNavigation();

  const handleBatal = () => {
    setIsShow(!isShow);
    navigation.goBack();
  };

  return (
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
              <Text style={{color: '#FFF', fontWeight: 'bold'}}>Batal</Text>
            </TouchableOpacity>
          </View>
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

import React, {FC, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import CalendarIcon from '../assets/icons/Calendar.svg';
import {useAuthStore} from '../stores/NasabahStore';

const App: FC = () => {
  const [modalOne, setModalOne] = useState(false);
  const [modalTwo, setModalTwo] = useState(false);
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');

  const getRekeningdetByDate = useAuthStore(state => state.getRekeningdetByDate)
  // const handleSubmit = () => {
  //   await getRekeningdetByDate(norek, dateStart, dateEnd)
  // }

  const handlemodalOne = () => {
    setModalOne(!modalOne);
  };
  const handleModalTwo = () => {
    setModalTwo(!modalTwo);
  };

  useEffect(() => {
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
  }, []);

  return (
    <View style={{padding: 20}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{color: '#000'}}>Filter By Date :</Text>
        <View style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
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
              <Text style={{color: '#000', marginRight: 3}}>{dateStart}</Text>
              <CalendarIcon />
            </TouchableOpacity>
            <Modal animationType="slide" transparent={true} visible={modalOne}>
              <DatePicker
                mode="calendar"
                onSelectedChange={selectedDate => {
                  const [year, month, day] = selectedDate.split('/');
                  const formattedDate = `${year}-${month}-${day}`;
                  setDateStart(formattedDate);
                }}
              />
              <TouchableOpacity onPress={handlemodalOne}>
                <Text>Close</Text>
              </TouchableOpacity>
            </Modal>
          </View>
          <Text style={{color: '#000', marginHorizontal: 4}}>To</Text>
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
              <Text style={{color: '#000', marginRight: 3}}>{dateEnd}</Text>
              <CalendarIcon />
            </TouchableOpacity>
            <Modal animationType="slide" transparent={true} visible={modalTwo}>
              <DatePicker
                mode="calendar"
                onSelectedChange={date => setDateEnd(date)}
              />
              <TouchableOpacity onPress={handleModalTwo}>
                <Text>Close</Text>
              </TouchableOpacity>
            </Modal>
          </View>
          <TouchableOpacity style={{padding: 6, backgroundColor: '#0E3AAA', borderRadius: 4}}>
            <Text style={{ color: '#FFF' }}>Go</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});

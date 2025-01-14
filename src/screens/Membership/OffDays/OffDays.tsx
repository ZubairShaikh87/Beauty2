import {Image, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import strings from '../../../utils/strings/strings';
import {Colors} from '../../../utils/colors/colors';
import Header from '../../../components/header/Header';
import {screenWidth} from '../../../utils/dimensions';
import {Images} from '../../../assets/images';
import CustomText from '../../../components/text/CustomText';
import ButtonWithImage from '../../../components/buttonWithImage/ButtonWithImage';
import {Calendar, LocaleConfig} from 'react-native-calendars';

const OffDays = () => {
  LocaleConfig.locales['fr'] = {
    monthNames: [
      'يناير',
      'شهر فبراير',
      'المريخ',
      'أبريل',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre',
    ],
    monthNamesShort: [
      'يناير',
      'شهر فبراير',
      'المريخ',
      'أبريل',
      'Mai',
      'Juin',
      'Juil.',
      'Août',
      'Sept.',
      'Oct.',
      'Nov.',
      'ديسمبر',
    ],
    dayNames: [
      'Dimanche',
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi',
    ],
    dayNamesShort: ['س', 'F', 'ت', 'ت', 'ت', 'م', 'س'],
    today: "Aujourd'hui",
  };

  LocaleConfig.defaultLocale = 'fr';

  const [selected, setSelected] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const handleShowCalendar = () => {
    setShowCalendar(true);
  };

  const handleCloseCalendar = () => {
    setShowCalendar(false);
  };

  return (
    <View style={styles.container}>
      <Header heading={strings?.offdays} />

      <View style={styles.dateContianer}>
        <Image source={Images.crosswhite} style={{width: 30, height: 30}} />
        <View style={styles.dateRow}>
          <CustomText text={strings.mon} />
          <CustomText text={strings.octfive} />
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <ButtonWithImage
          text={strings.addMoreOff}
          fontWeihgt="900"
          imageStyle={{width: 20, height: 20}}
          width={screenWidth / 1.2}
          borderRadius={30}
          paddingVerticel={10}
          onPress={handleShowCalendar}
        />
      </View>
      <Modal
        visible={showCalendar}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseCalendar}>
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={handleCloseCalendar}>
          <View style={styles.modalContainer}>
            <Calendar
              onDayPress={day => {
                setSelected(day.dateString);
              }}
              theme={{
                arrowColor: Colors.white,
                arrowStyle: {
                  width: 25,
                  height: 25,
                  padding: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: Colors.lightGrey,
                },
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: Colors.lightGrey,
                selectedDayBackgroundColor: Colors.primary,
                selectedDayTextColor: '#ffffff',
                todayButtonTextColor: 'red',
                todayTextColor: Colors.primary,
                dayTextColor: '#2d4150',
              }}
              markedDates={{
                [selected]: {selected: true, disableTouchEvent: true},
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default OffDays;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  dateContianer: {
    borderRadius: 10,
    borderWidth: 0.5,
    margin: 20,
    height: '10%',
    width: screenWidth / 3,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.grey100,
    justifyContent: 'space-evenly',
  },
  dateRow: {
    borderColor: Colors.grey100,
    borderWidth: 0.5,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginHorizontal: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
});

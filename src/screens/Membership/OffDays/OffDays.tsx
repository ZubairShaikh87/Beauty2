import {Alert, Image, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import strings from '../../../utils/strings/strings';
import {Colors} from '../../../utils/colors/colors';
import Header from '../../../components/header/Header';
import {screenWidth} from '../../../utils/dimensions';
import {Images} from '../../../assets/images';
import CustomText from '../../../components/text/CustomText';
import ButtonWithImage from '../../../components/buttonWithImage/ButtonWithImage';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import CustomButton from '../../../components/button/CustomButton';
import { useDayOffAddMutation, useLazyDeleteDayOffQuery, useLazyGetDayOffQuery } from '../../../Redux/services/app/AppApi';
import AppToast from '../../../components/appToast/AppToast';
import moment from 'moment';
const OffDays = () => {

  const [getDayOff, {data: dayOffData}] = useLazyGetDayOffQuery();
    const [dayOffAdd, {isLoading,error}] = useDayOffAddMutation();
    const [deleteDayOff] = useLazyDeleteDayOffQuery();

    const AddDayOffApi = () => {
      const formData = new FormData();
      formData.append('day', selected);
      formData.append('availibility', 'off');
  
  dayOffAdd(formData)
        ?.unwrap()
        .then(response => {
          handleCloseCalendar()
          AppToast({type: 'success', message: response[1]});
          GetOffDays()
        })
        .catch(error => {
          AppToast({type: 'error', message: error});
        });
    };

    const GetOffDays = () => {
      getDayOff('')
        .unwrap()
        ?.then(response => {
        })
        .catch(error => {
          console.log(error);
        });
    };

    const handleDeleteItem = id => {
      Alert.alert('Confirm Delete', 'Are you sure you want to delete?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            deleteDayOff(id)
              ?.unwrap()
              ?.then(() => {
                AppToast({type: 'success', message: "Deleted successfully"});
                GetOffDays()
              })
              .catch(error => {
                console.log('Error deleting service:', error);
              });
          },
        },
      ]);
    };

    useEffect(() => {
      GetOffDays()
    }, [])
    


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
    setSelected('')
  };

  return (
    <View style={styles.container}>
      <Header heading={strings?.offdays} />
      <View style={{flex:dayOffData?.length<1?0:1,flexWrap:"wrap",flexDirection:"row"}}>

      
      {dayOffData?.map((val,index)=>{
        return(
          <View style={styles.dateContianer} key={index}>
          <TouchableOpacity
          onPress={()=>{handleDeleteItem(val?.id)}}
          >
            <Image source={Images.crosswhite} style={{width: 30, height: 30}} />
          </TouchableOpacity>
          <View style={styles.dateRow}>
            <CustomText text={moment(val?.day).format('dddd')} />
            <CustomText text={moment(val?.day).format('YYYY-MM-DD')} />
          </View>
        </View>
        )
      })
      
      }
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
        {selected?  
        <View style={{alignItems: 'center',paddingBottom:50,backgroundColor: 'rgba(0, 0, 0, 0.5)',}}>
          <CustomButton
          fontWeight='900'
          text={strings.save}
          paddingVerticle={10}
          style={{width:screenWidth/1.2,borderRadius:30,}}
          onPress={()=>{AddDayOffApi()}}
          isLoader={isLoading}
          />
      </View>
      :null
      }
      </Modal>
    </View>
  );
};

export default OffDays;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  dateContianer: {
    borderRadius: 10,
    borderWidth: 1,
    margin: 3,
    height: '10%',
    width: screenWidth / 3.2,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.grey100,
    justifyContent: 'space-evenly',
  },
  dateRow: {
    borderColor: Colors.grey100,
    borderWidth: 1,
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

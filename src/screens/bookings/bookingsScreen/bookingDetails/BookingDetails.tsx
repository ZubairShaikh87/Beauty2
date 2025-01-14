import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {Colors} from '../../../../utils/colors/colors';
import strings from '../../../../utils/strings/strings';
import Header from '../../../../components/header/Header';
import CustomText from '../../../../components/text/CustomText';
import {screenHeight, screenWidth} from '../../../../utils/dimensions';
import TextWithImage from '../../../../components/textWithImage/TextWithImage';
import {Images} from '../../../../assets/images';
import FooterTwoButton from '../../../../components/footerTwoButton/FooterTwoButton';
import NewBookingRequest from '../../../../components/bookingScreenComponent/NewBookingRequest';
import PersonWithPrice from '../../../../components/bookingScreenComponent/PersonWithPrice';
import CostPrice from '../../../../components/bookingScreenComponent/CostPrice';
import DurationHours from '../../../../components/bookingScreenComponent/DurationHours';
import {useNavigation} from '@react-navigation/native';
import AppToast from '../../../../components/appToast/AppToast';
import { useArtistAddServicesMutation, useBookingStatusMutation } from '../../../../Redux/services/app/AppApi';
import Bookings from '../Bookings';
// interface BookingDetailProps {
//   navigation: any;
//   route: any;
// }
const BookingDetails=({route}:any) => {
  const navigation: any = useNavigation();
  const {bookingDetail} = route?.params;
  const {
    address,
    location,
    artist,
    cancelreason,
    created_at,
    customer,
    date,
    endtime,
    id,
    starttime,
    status,
    total_price,
    travelcost,
    updated_at,
    service
  } = bookingDetail;

  const [bookingStatus, {isLoading,error}] = useBookingStatusMutation();

  const BookingStatusApi = (status,navigationIndex) => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status);
bookingStatus(formData)
  ?.unwrap()
  .then(response => {
    AppToast({ type: 'success', message: response?.status });
    navigation.navigate("الحجوزات",navigationIndex)
  })
  .catch(error => {
    console.log("Error:", error);
    AppToast({ type: 'error', message: error });
  });
  };

  const handleCancel=()=>{
      Alert.alert(
        'Cancel Booking',
        'Are you sure to cancel the booking?',
          [
            { text: 'No' },
            {
            text: 'Yes',
            onPress: () =>
            BookingStatusApi('Cancel',3)
            },
          ]
        );
      };

  //Main Return
  return (
    <View style={styles.container}>
      <Header heading={strings?.booking_Detail} />
      <NewBookingRequest route={route?.params} />
      <View style={styles.paddingCommon}>
        <CustomText
          text={strings.booking_Detail}
          size={14}
          style={{textAlign: 'left'}}
        />
        <TextWithImage
          path={Images.location_Mark}
          text={address}
          size={14}
          alignSelf={'flex-start'}
        />
        <View style={styles.divider} />
      </View>
      <View style={styles.paddingCommon}>
        <View style={styles.distance}>
          <Image source={Images.send} resizeMode="contain" />
          <TextWithImage
            path={Images.running}
            text={location}
            textColor={Colors.black}
            size={14}
            alignSelf={'flex-end'}
          />
        </View>
        <View style={styles.divider} />
      </View>
      <View style={styles.paddingCommon}>
        {/* Service Below */}
        <CustomText
          text={strings.service_detial}
          size={14}
          style={{textAlign: 'left'}}
        />
        <View style={{marginVertical: 10}}>
          <CustomText
            text={service?.description}
            size={14}
            color={Colors.lightGrey}
            style={{textAlign: 'left'}}
          />
        </View>
      </View>
      <PersonWithPrice marginVerticle={10} textName={strings.side_part} />
      <PersonWithPrice textName={strings.side_part} />
      <CostPrice textName={strings.travel_Cost} textValue={travelcost} marginTop={10} />

      <DurationHours />
      <CostPrice textName={strings.total_Cost} textValue={total_price} />

      <View style={styles.footer}>
        {
          status == 'Active'?
          <FooterTwoButton
            onPressRight={() =>
              BookingStatusApi('Ongoing',1)
            }
            onPressLeft={()=>navigation.goBack()}
            marginTop={screenHeight / 16}
            marginBottom={2}
            textRight={'Accept'}
            textLeft={'Decline'}
          />
          :
          <FooterTwoButton
          onPressRight={() =>
            navigation.navigate(
                strings.getDirection,
                {param:bookingDetail},
            )

          }
          onPressLeft={()=>{
            handleCancel()
          }}
          marginTop={screenHeight / 16}
          // textRight="Start Now"
          textRight={'ابدأ الآن'}
          // textLeft="Cancel Reservation"
          textLeft={'إلغاء الحجز'}
        />
        }

      </View>
    </View>
  );
};

export default BookingDetails;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  divider: {
    borderTopWidth: 0.5,
    borderTopColor: Colors.grey100,
    width: screenWidth / 1.5,
    marginVertical: 15,
  },
  paddingCommon: {
    paddingHorizontal: '8%',
  },
  footer: {marginHorizontal: '5%'},
  distance: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

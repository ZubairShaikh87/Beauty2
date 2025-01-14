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
// const BookingDetails: FC<BookingDetailProps> = ({navigation, route}) => {
  const {bookingDetail} = route?.params;
  const {
    address,
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
  } = bookingDetail;
  console.log(bookingDetail, 'bookingDetail');
  console.log(id, 'bookingDetail');

  // const [artistCompletedApi, {data: artistCompletedData}] =
  // useLazyBookingStatusQuery();
  const [bookingStatus, {isLoading,error}] = useBookingStatusMutation();
    // const [artistAddServices, {isLoading,error}] = useArtistAddServicesMutation();
  


  const BookingStatusApi = (status,navigationIndex) => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status);

// console.log("itemData?.id",itemData?.id)
// console.log("addRecord",addRecord)
// console.log("serviceImages",serviceImages)
// console.log("paymentType",paymentType)
// console.log("description",description)

bookingStatus(formData)
  ?.unwrap()
  .then(response => {
    console.log("try", response);

    // Get the previous route in the navigation stack
    // const routes = navigation.getState().routes;
    // const previousRoute = routes[routes.length - 2];
    AppToast({ type: 'success', message: response?.status });
    // navigation.goBack({
    //   params: "response", // Pass the actual response
    // });
    // navigation.navigate(strings.user_Bottom_Stack, {
    //   response, // Pass the actual response here
    // });
    navigation.navigate("الحجوزات",navigationIndex)
    // Set params on the previous screen
    // navigation.setParams({
    //   params: { response }, // Pass the response here
    // });

    // // Navigate back to the previous screen
    // navigation.goBack();

    // navigation.reset({
    //   index: 0, // Reset to the first screen in the stack
    //   routes: [
    //     {
    //       name: Bookings, // The name of your tab
    //       params: { response: response }, // Pass the actual response here
    //     },
    //   ],
    // });

    // navigation.navigate('BottomStack, {
    //   screen: Bookings,
    //   params: { dataFromTwoScreen: 'Hello from twoScreen' },
    // });

    // navigation.navigate(Bookings,{ response: "response" });  // Update params for the current tab
      // navigation.goBack();
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

  const GetArtistCompletedBookingAPI = () => {
    artistCompletedApi('')
      .unwrap()
      ?.then(res => {
        console.log(res, 'artist complete api result');
      })
      .catch(error => {
        console.log(error, 'artist complete api catch');
      });
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
            text={strings.threeKm}
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
            text={strings.buzz_cut}
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
              // console.log("accept")
              BookingStatusApi('Active',1)
              // navigation.navigate(strings.bookingDetails_screen, {cancle: true})
            }
            onPressLeft={navigation.goBack()}
            marginTop={screenHeight / 16}
            marginBottom={2}
            textRight={'Accept'}
            textLeft={'Decline'}
          />
          :
          <FooterTwoButton
          onPressRight={() =>
            navigation.navigate(
              // route?.params?.cancle
                // ? strings.bookingAccepted
                // : 
                strings.getDirection,
                {param:bookingDetail},
            )
            // console.log("start now")

          }
          onPressLeft={()=>{
            handleCancel()
          }}
          marginTop={screenHeight / 16}
          textRight="Start Now"
          // textRight={'ابدأ الآن'}
          textLeft="Cancel Reservation"
          // textLeft={'إلغاء الحجز'}
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

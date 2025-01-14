import {StyleSheet, View} from 'react-native';
import React from 'react';
import CustomText from '../text/CustomText';
import strings from '../../utils/strings/strings';
import {Colors} from '../../utils/colors/colors';
import {screenWidth} from '../../utils/dimensions';

const NewBookingRequest = ({route}: {route: any}) => {
  // console.log(route, 'new booking request');
  const {bookingDetail} = route;
  return (
    <View style={styles.paddingContainer}>
      <CustomText
        text={
          route?.cancle ? strings.cancel_Request : strings.request_reservation
        }
        size={14}
        fontWeight="700"
        style={{textAlign: 'left'}}
      />
      <View style={{marginVertical: 10}}>
        <CustomText
          text={`${bookingDetail?.starttime} - ${bookingDetail?.date}`}
          size={14}
          style={{textAlign: 'left'}}
        />
      </View>
      <View style={styles.divider} />
    </View>
  );
};

export default NewBookingRequest;

const styles = StyleSheet.create({
  paddingContainer: {
    paddingVertical: 10,
    paddingHorizontal: '8%',
  },
  divider: {
    borderTopWidth: 0.5,
    borderTopColor: Colors.grey100,
    width: screenWidth / 1.5,
    marginVertical: 15,
  },
});

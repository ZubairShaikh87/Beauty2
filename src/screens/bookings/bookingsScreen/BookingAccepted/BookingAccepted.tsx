import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors} from '../../../../utils/colors/colors';
import {screenHeight, screenWidth} from '../../../../utils/dimensions';
import AcceptedBookingBox from '../../../../components/bookingScreenComponent/AcceptedBookingBox';
import CustomText from '../../../../components/text/CustomText';
import strings from '../../../../utils/strings/strings';
import TextWithImage from '../../../../components/textWithImage/TextWithImage';
import {Images} from '../../../../assets/images';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../../../components/button/CustomButton';
import Header from '../../../../components/header/Header';

const BookingAccepted = () => {
  const navigation: any = useNavigation();

  return (
    <View style={styles.container}>
      <Header heading={strings?.bookingAccepted} />

      <AcceptedBookingBox
        topText={strings.bookingAccepted}
        bgColor={Colors.white}
      />
      <View style={styles.paddingContainer}>
        <CustomText
          text={strings.contactUs}
          size={16}
          style={{paddingRight: 25}}
        />
        <View style={styles.divider} />
        <View style={styles.textImageContainer}>
          <TextWithImage
            path={Images.call}
            text={strings.callNumber}
            textColor={Colors.black}
            size={14}
            alignSelf={'flex-end'}
          />
        </View>
        <View style={styles.textImageContainer}>
          <TextWithImage
            path={Images.sms}
            text={strings.exampleEmail}
            textColor={Colors.black}
            size={14}
            alignSelf={'flex-end'}
          />
        </View>

        <View style={styles.viewOnMap}>
          <CustomText text={strings.viewOnMap} size={14} />
          <CustomText
            text={strings.address}
            size={14}
            style={{marginRight: '6%'}}
          />
        </View>
        <View style={styles.divider2} />
        <View style={styles.textImageContainer2}>
          <TextWithImage
            path={Images.location_Mark}
            text={strings.prestonRd}
            textColor={Colors.black}
            size={14}
            alignSelf={'flex-end'}
          />
        </View>
        <Image source={Images.locationImage} style={styles.imageStyle} />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          style={styles.button}
          text={strings.view_Detail}
          onPress={() => navigation.navigate(strings.booking_Completed)}
        />
      </View>
    </View>
  );
};

export default BookingAccepted;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  imageStyle: {width: screenWidth / 1.13, height: screenHeight / 4},
  divider: {
    borderTopWidth: 0.5,
    borderTopColor: Colors.grey100,
    marginVertical: 15,
    width: screenWidth / 1.13,
  },
  buttonContainer: {
    marginTop: 15,
    marginHorizontal: 5,
  },
  button: {width: '95%', marginHorizontal: 10},
  divider2: {
    borderTopWidth: 0.5,
    borderTopColor: Colors.grey100,
    marginVertical: 15,
    width: screenWidth / 1.19,
  },
  paddingContainer: {
    paddingLeft: 20,
  },
  textImageContainer: {paddingHorizontal: 20, paddingBottom: 5},
  textImageContainer2: {paddingHorizontal: 20},
  viewOnMap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    justifyContent: 'space-between',
  },
});

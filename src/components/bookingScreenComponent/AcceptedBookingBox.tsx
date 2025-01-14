import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/colors/colors';
import strings from '../../utils/strings/strings';
import CustomText from '../text/CustomText';
import TextWithImage from '../textWithImage/TextWithImage';
import {Images} from '../../assets/images';
import {screenWidth} from '../../utils/dimensions';

const AcceptedBookingBox = ({
  bgColor,
  topText,
  copyImage,
  ruppesText,
}: {
  bgColor: any;
  topText?: string;
  copyImage?: any;
  ruppesText?: string;
}) => {
  return (
    <View
      style={[
        styles.container,
        bgColor && {backgroundColor: bgColor},
        {
          marginHorizontal: copyImage ? 0 : '5%',
          marginVertical: copyImage ? 0 : '2%',
        },
      ]}>
      <CustomText text={topText} size={14} style={{textAlign: 'right'}} />
      {copyImage ? (
        <View style={styles.imageRow}>
          <Image source={copyImage} />
          <TextWithImage
            path={Images.location_Mark}
            text={strings.g85}
            size={14}
            alignSelf={'flex-end'}
          />
        </View>
      ) : (
        <TextWithImage
          path={Images.location_Mark}
          text={strings.g85}
          size={14}
          alignSelf={'flex-end'}
        />
      )}
      <View style={styles.divider} />
      <View style={styles.distance}>
        <Image source={Images.send} />
        <TextWithImage
          path={Images.running}
          text={strings.threeKm}
          textColor={Colors.black}
          size={14}
          alignSelf={'flex-end'}
        />
      </View>
      <View style={styles.divider} />
      <CustomText text={strings.serviceRequired} size={14} />
      <View style={styles.rowText}>
        <CustomText text={strings.shaving} size={14} color={Colors.lightGrey} />
        <CustomText
          text={strings.hair_Wash}
          size={14}
          color={Colors.lightGrey}
        />
        <CustomText
          text={strings.hair_Coloring}
          size={14}
          color={Colors.lightGrey}
        />
        <CustomText
          text={strings.hair_Cut}
          size={14}
          color={Colors.lightGrey}
        />
      </View>
      <View style={styles.textImageContainer}>
        <TextWithImage
          path={copyImage ? null : Images.dollar}
          text={copyImage ? ruppesText : strings.dollar_24}
          fontWeight="900"
          textColor={Colors.black}
          size={14}
          alignSelf={'flex-end'}
        />
        <CustomText />
      </View>
    </View>
  );
};

export default AcceptedBookingBox;

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.2,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: Colors.lightGrey,
  },
  textImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    borderTopWidth: 0.5,
    borderTopColor: Colors.grey100,
    marginVertical: 15,
    width: screenWidth / 1.28,
  },
  rowText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },

  imageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  distance: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

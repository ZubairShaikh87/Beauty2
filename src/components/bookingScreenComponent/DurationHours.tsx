import {StyleSheet, View} from 'react-native';
import React from 'react';
import {screenWidth} from '../../utils/dimensions';
import TextWithImage from '../textWithImage/TextWithImage';
import {Images} from '../../assets/images';
import {Colors} from '../../utils/colors/colors';
import CustomText from '../text/CustomText';
import strings from '../../utils/strings/strings';

const DurationHours = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textImageContainer}>
        <TextWithImage
          path={Images.calculator}
          text={'2hr          '}
          textColor={Colors.black}
          size={14}
          alignSelf={'flex-start'}
        />
        <CustomText text={strings.total_Duration} size={14} />
      </View>
    </View>
  );
};

export default DurationHours;

const styles = StyleSheet.create({
  container: {marginHorizontal: '5%', width: screenWidth / 1.1},
  textImageContainer: {
    marginHorizontal: 5,
    paddingHorizontal: 20,
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

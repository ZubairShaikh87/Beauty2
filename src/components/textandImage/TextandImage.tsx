import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {Colors} from '../../utils/colors/colors';
import {screenWidth} from '../../utils/dimensions';
import CustomText from '../text/CustomText';
import {Images} from '../../assets/images';
import {TextandImagePropTypes} from './types';
import {useNavigation} from '@react-navigation/native';
import strings from '../../utils/strings/strings';

const TextandImage: FC<TextandImagePropTypes> = ({
  topTextHide,
  text,
  topText,
}) => {
  const navigation: any = useNavigation();

  return (
    <TouchableOpacity
      style={styles.spaceContainer}
      onPress={() => navigation.navigate(strings.artistdetailscreen)}>
      {topTextHide && (
        <CustomText
          text={topText}
          color={Colors.black}
          size={18}
          style={{marginTop: 10}}
        />
      )}

      <View style={styles.rowContainer}>
        <Image source={Images.notification} />
        <CustomText
          size={16}
          color={Colors.lightGrey}
          text={text}
          style={styles.longTextStyle}
        />
      </View>
      <View style={styles.divider} />
    </TouchableOpacity>
  );
};

export default TextandImage;

const styles = StyleSheet.create({
  spaceContainer: {
    paddingHorizontal: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  divider: {
    borderTopWidth: 0.5,
    borderTopColor: Colors.grey100,
    width: screenWidth / 1.2,
  },
  longTextStyle: {marginLeft: 10, width: screenWidth / 1.35},
});

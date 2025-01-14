import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import strings from '../../utils/strings/strings';
import CustomText from '../text/CustomText';
import {Images} from '../../assets/images';
import {TextImageTextPropTypes} from './types';
import {Colors} from '../../utils/colors/colors';

const TextImageText: FC<TextImageTextPropTypes> = ({
  withImage,
  withoutImageText,
  onPress,
}) => {
  return (
    <View style={styles.buttonContainer}>
      <CustomText size={16} text={withoutImageText} />
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={strings.buttonopacity}
        style={[styles.flex, {marginHorizontal: 5}]}>
        <Image source={Images.edited} style={{marginLeft: 5}} />
        <CustomText color={Colors.primary} size={14} text={withImage} />
      </TouchableOpacity>
    </View>
  );
};

export default TextImageText;

const styles = StyleSheet.create({
  flex: {flexDirection: 'row', alignItems: 'center'},
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingHorizontal: 8,
  },
});

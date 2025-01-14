import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import CustomText from '../text/CustomText';
import {Images} from '../../assets/images';
import strings from '../../utils/strings/strings';
import {screenWidth} from '../../utils/dimensions';
import {Colors} from '../../utils/colors/colors';
import {ButtonWithImagePropsTypes} from './types';

const ButtonWithImage: FC<ButtonWithImagePropsTypes> = ({
  onPress,
  text,
  fontWeihgt,
  imageStyle,
  width,
  paddingVerticel,
  borderRadius,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        {
          width: width || screenWidth / 1.5,
          borderRadius: borderRadius || 22,
          paddingVertical: paddingVerticel || 12,
        },
      ]}
      onPress={onPress}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <CustomText
          text={text || strings.addService}
          style={{paddingLeft: 10}}
          color={Colors.white}
          size={18}
          fontWeight={fontWeihgt}
        />
        <Image source={Images.add} style={imageStyle} />
      </View>
    </TouchableOpacity>
  );
};

export default ButtonWithImage;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    width: screenWidth / 1.5,
    borderRadius: 22,
    marginTop: 10,
    paddingVertical: 12,
    borderColor: Colors.blue,
  },
});

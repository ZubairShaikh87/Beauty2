import {ActivityIndicator, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import CustomText from '../text/CustomText';
import {Colors} from '../../utils/colors/colors';
import {screenWidth} from '../../utils/dimensions';
import {CustomButtonPropsTypes} from './types';
import strings from '../../utils/strings/strings';

const CustomButton: FC<CustomButtonPropsTypes> = ({
  textColor,
  style,
  bgColor,
  text,
  borderWidth,
  onPress,
  paddingVerticle,
  fontWeight,
  lineHeight,
  isLoader,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        {
          backgroundColor: bgColor || Colors.primary,
          width: screenWidth / 1.2,
          borderRadius: 22,
          paddingVertical: paddingVerticle || 12,
          alignItems: 'center',
          borderWidth: borderWidth,
          borderColor: Colors.blue,
        },
        style,
      ]}>
      {isLoader ? (
        <ActivityIndicator color={'white'} size={'small'} />
      ) : (
        <CustomText
          lineHeight={lineHeight}
          text={text}
          size={16}
          fontWeight={fontWeight}
          color={textColor || Colors.white}
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

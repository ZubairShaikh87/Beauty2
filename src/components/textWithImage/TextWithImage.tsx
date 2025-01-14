import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import CustomText from '../text/CustomText';
import {Colors} from '../../utils/colors/colors';
import {TextWithImagePropTypes} from './types';

const TextWithImage: FC<TextWithImagePropTypes> = ({
  path,
  text,
  size,
  alignSelf,
  textColor,
  fontWeight,
  showImageAtBackofText = false,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: alignSelf || null,
      }}>
      {showImageAtBackofText && (
        <Image source={path} style={{marginRight: 15}} />
      )}
      <CustomText
        text={text}
        size={size || 12}
        fontWeight={fontWeight || '500'}
        color={textColor || Colors.lightGrey}
      />
      {!showImageAtBackofText && (
        <Image source={path} style={{marginLeft: 15}} />
      )}
    </View>
  );
};

export default TextWithImage;

const styles = StyleSheet.create({});

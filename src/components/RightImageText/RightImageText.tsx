import {Image, StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import CustomText from '../text/CustomText';
import {Colors} from '../../utils/colors/colors';
import {RightImageTextPropTypes} from './types';

const RightImageText: FC<RightImageTextPropTypes> = ({
  text,
  path,
  color,
  textSize,
  marginRight,
}) => {
  return (
    <View style={styling.rowImage}>
      <Image source={path} />
      <CustomText
        text={text}
        size={textSize || 14}
        style={{
          marginLeft: marginRight ? 0 : 5,
          marginRight: marginRight || undefined,
        }}
        fontWeight={'500'}
        color={color || Colors.lightGrey}
      />
    </View>
  );
};

export default RightImageText;
const styling = StyleSheet.create({
  rowImage: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

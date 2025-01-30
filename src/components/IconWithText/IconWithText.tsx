import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import CustomText from '../text/CustomText';
import {Colors} from '../../utils/colors/colors';
import {IconWithTextPropsTypes} from './types';

const IconWithText: FC<IconWithTextPropsTypes> = ({path, text,onpress}) => {
  return (
    <TouchableOpacity
      onPress={onpress}
      style={styles.flexContainer}>
      <Image source={path} />
      <CustomText
        size={12}
        text={text}
        style={{marginLeft: 10}}
        color={Colors.lightGrey}
      />
    </TouchableOpacity>
  );
};

export default IconWithText;

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 10,
  },
});

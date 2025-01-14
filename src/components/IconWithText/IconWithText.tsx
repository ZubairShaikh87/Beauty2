import {Image, StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import CustomText from '../text/CustomText';
import {Colors} from '../../utils/colors/colors';
import {IconWithTextPropsTypes} from './types';

const IconWithText: FC<IconWithTextPropsTypes> = ({path, text}) => {
  return (
    <View style={styles.flexContainer}>
      <Image source={path} />
      <CustomText
        size={12}
        text={text}
        style={{marginLeft: 10}}
        color={Colors.lightGrey}
      />
    </View>
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

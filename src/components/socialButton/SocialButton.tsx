import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {Colors} from '../../utils/colors/colors';
import {SocialButtonPropsTypes} from './types';
import strings from '../../utils/strings/strings';

const SocialButton: FC<SocialButtonPropsTypes> = ({icon}) => {
  return (
    <TouchableOpacity
      activeOpacity={strings.buttonopacity}
      style={{
        borderWidth: 1,
        borderColor: Colors.grey100,
        borderRadius: 99,
        padding: 20,
        marginRight: 16,
      }}>
      <Image source={icon} />
    </TouchableOpacity>
  );
};

export default SocialButton;

const styles = StyleSheet.create({});

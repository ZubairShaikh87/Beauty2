import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {Images} from '../../assets/images';
import CustomText from '../text/CustomText';
import strings from '../../utils/strings/strings';
import {Colors} from '../../utils/colors/colors';
import {ProfileDetailPropsTypes} from './types';

const ProfileDetail: FC<ProfileDetailPropsTypes> = ({
  icon,
  heading,
  onPress,
  fontSize,
  iconStyle,
}) => {
  return (
    <View style={{marginHorizontal: 24, paddingVertical: 10}}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={strings.buttonopacity}
        style={styles.container}>
        <View style={styles.content}>
          <Image style={iconStyle} source={icon} />
          <CustomText
            style={{marginLeft: 11}}
            size={fontSize || 20}
            text={heading}
          />
        </View>
        <Image
          style={{transform: [{scaleX: -1}]}}
          source={Images.rightArrowPrimary}
        />
      </TouchableOpacity>
      <View
        style={{borderTopWidth: 1, borderColor: Colors.grey100, marginTop: 15}}
      />
    </View>
  );
};

export default ProfileDetail;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flexDirection: 'row',
  },
});

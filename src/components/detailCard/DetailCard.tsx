import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import CustomText from '../text/CustomText';
import {Colors} from '../../utils/colors/colors';
import {screenHeight, screenWidth} from '../../utils/dimensions';
import {DetailCardPropsTypes} from './types';

const DetailCard: FC<DetailCardPropsTypes> = ({
  bgcolor,
  count,
  heading,
  countColor,
  headingColor,
}) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: Colors.grey100,
        width: screenWidth / 2.3,
        borderRadius: 16,
        padding: 10,
        paddingTop: screenHeight * 0.08,
        backgroundColor: bgcolor || Colors.white,
      }}>
      <CustomText
        color={countColor || Colors.primary}
        size={40}
        fontWeight="bold"
        text={count}
        style={{alignSelf: 'flex-start'}}
      />
      <CustomText
        color={headingColor || Colors.primary}
        size={14}
        text={heading}
      />
    </View>
  );
};

export default DetailCard;

const styles = StyleSheet.create({});

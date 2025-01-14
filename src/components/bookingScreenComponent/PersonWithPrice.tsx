import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {screenWidth} from '../../utils/dimensions';
import CustomText from '../text/CustomText';
import {Images} from '../../assets/images';

const PersonWithPrice = ({
  marginVerticle,
  textName,
}: {
  marginVerticle?: any;
  textName?: string;
}) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.personPriceContainer,
          {
            marginVertical: marginVerticle || null,
          },
        ]}>
        <CustomText text={'SR50.00'} size={14} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CustomText text={' 2 '} size={14} />
          <Image source={Images.user} style={{width: 15, height: 15}} />
          <CustomText text={'1hr '} size={14} />
          <Image source={Images.calculator} />
        </View>
        <CustomText text={textName} size={14} />
      </View>
    </View>
  );
};

export default PersonWithPrice;

const styles = StyleSheet.create({
  personPriceContainer: {
    marginHorizontal: 5,
    borderWidth: 0.5,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {marginHorizontal: '9%', width: screenWidth / 1.15},
});

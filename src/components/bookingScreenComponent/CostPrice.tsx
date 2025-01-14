import {StyleSheet, View} from 'react-native';
import React from 'react';
import {screenWidth} from '../../utils/dimensions';
import TextWithImage from '../textWithImage/TextWithImage';
import {Images} from '../../assets/images';
import CustomText from '../text/CustomText';
import {Colors} from '../../utils/colors/colors';

const CostPrice = ({
  textName,
  textValue,
  marginTop,
}: {
  textName?: string;
  textValue?: string;
  marginTop?: number;
}) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.textImageContainer,
          {
            marginTop: marginTop || 0,
          },
        ]}>
        <TextWithImage
          path={Images.dollar}
          // text={'SR100.00'}

          text={'SR'+textValue+'.00'}
          textColor={Colors.black}
          size={14}
          alignSelf={'flex-end'}
        />
        <CustomText text={textName} size={14} />
      </View>
    </View>
  );
};

export default CostPrice;

const styles = StyleSheet.create({
  container: {marginHorizontal: '5%', width: screenWidth / 1.1},
  textImageContainer: {
    marginHorizontal: 5,
    paddingVertical: 7,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import CustomButton from '../button/CustomButton';
import {FooterButtonPropsTypes} from './types';
import {Colors} from '../../utils/colors/colors';

const FooterTwoButton: FC<FooterButtonPropsTypes> = ({
  marginTop,
  textRight,
  textLeft,
  onPressRight,
  style,
  marginBottom,
  onPressLeft,
}) => {
  return (
    <View style={style || styles.buttonContainer}>
      <CustomButton
        style={[
          styles.button,
          {
            marginTop: marginTop || '8%',
            marginBottom: marginBottom || 0,
          },
        ]}
        text={textRight}
        onPress={onPressRight}
      />
      <CustomButton
        style={[
          styles.button,
          {
            borderWidth: 1,
            borderColor: Colors.primary,
            marginTop: marginTop || '8%',
            marginBottom: marginBottom || 0,
          },
        ]}
        textColor={Colors.primary}
        text={textLeft}
        onPress={onPressLeft}
        bgColor={Colors.white}
      />
    </View>
  );
};

export default FooterTwoButton;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  button: {
    width: '48%',
    marginHorizontal: 3,
    paddingVertical: 11,
  },
});

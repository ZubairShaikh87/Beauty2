import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import CustomText from '../text/CustomText';
import {CustomTextBoxPropsTypes} from './type';
import {Colors} from '../../utils/colors/colors';
import {useNavigation} from '@react-navigation/native';
import strings from '../../utils/strings/strings';

const CustomeTextBox: FC<CustomTextBoxPropsTypes> = ({
  labelText,
  priceText,
  dateText,
  headingText,
}) => {
  const navigation: any = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(strings.addresses)}
      style={{marginBottom: 10}}>
      {labelText ? (
        <CustomText text={labelText} style={{marginVertical: 10}} size={16} />
      ) : (
        <View style={{marginVertical: 10}} />
      )}
      <View style={styles.borderContainer}>
        <CustomText text={priceText} color={Colors.primary} />
        <View style={{alignItems: 'flex-end'}}>
          <CustomText text={headingText} />
          <CustomText text={dateText} color={Colors?.lightGrey} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomeTextBox;

const styles = StyleSheet.create({
  borderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors?.grey100,
    padding: 10,
  },
});

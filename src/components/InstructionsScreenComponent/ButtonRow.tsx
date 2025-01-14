import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../text/CustomText';
import {Colors} from '../../utils/colors/colors';
import strings from '../../utils/strings/strings';

const ButtonRow = () => {
  return (
    <View style={styles.rowContainer}>
      <View style={styles.withoutColor}>
        <CustomText
          text={strings?.account}
          style={styles.buttonStyle}
          color={Colors?.lightGrey}
          size={14}
        />
      </View>
      <View style={styles.withoutColor}>
        <CustomText
          text={strings?.general}
          style={styles.buttonStyle}
          size={14}
          color={Colors?.lightGrey}
        />
      </View>
      <View style={styles.withoutColor}>
        <CustomText
          text={strings.services}
          style={styles.buttonStyle}
          size={14}
          color={Colors?.lightGrey}
        />
      </View>

      <View style={styles.borderContainer}>
        <CustomText
          text={strings.everyone}
          color={Colors?.white}
          size={14}
          style={styles.buttonStyle}
        />
      </View>
    </View>
  );
};

export default ButtonRow;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '3%',
  },

  borderContainer: {
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: Colors.primary,
  },
  withoutColor: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors?.grey100,
    backgroundColor: Colors?.grey100,
  },
  buttonStyle: {paddingVertical: 5, paddingHorizontal: 15},
});

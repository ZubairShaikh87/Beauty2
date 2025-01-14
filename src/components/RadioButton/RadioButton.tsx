import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/colors/colors';

const RadioButton = ({selected, onPress}: {selected: any; onPress: any}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.radioButton}>
      {selected && <View style={styles.radioButtonInner} />}
    </TouchableOpacity>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
});

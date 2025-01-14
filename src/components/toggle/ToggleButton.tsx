import {StyleSheet, View} from 'react-native';
import React from 'react';
import ToggleSwitch from 'toggle-switch-react-native';
import CustomText from '../text/CustomText';
import {Colors} from '../../utils/colors/colors';

const ToggleButton = ({
  labelText,
  isOn,
  onToggle,
}: {
  labelText: any;
  isOn: boolean;
  onToggle: any;
}) => {
  return (
    <View style={styles.toggleContainer}>
      <ToggleSwitch
        isOn={isOn}
        onColor={Colors.primary}
        offColor={Colors.lightGrey}
        labelStyle={{color: 'black', fontWeight: '900'}}
        size="medium"
        onToggle={onToggle}
      />
      <CustomText
        style={{marginHorizontal: 10}}
        color={isOn ? Colors.primary : Colors.lightGrey}
        size={14}
        text={isOn ? labelText : 'Off'}
      />
    </View>
  );
};

export default ToggleButton;

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

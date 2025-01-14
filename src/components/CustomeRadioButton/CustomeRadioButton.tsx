import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from '../../utils/colors/colors';
import CustomText from '../text/CustomText';

const CustomRadioButton = ({
  selected,
  onSelect,
  text,
}: {
  selected: boolean;
  text: string;
  onSelect: (text: string) => void;
}) => {
  const handlePress = () => {
    onSelect(text);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <View
          style={[
            styles.buttonView,
            {
              borderColor: selected ? Colors.primary : Colors.lightGrey,
            },
          ]}>
          {selected && <View style={styles.selectedView} />}
        </View>
        <CustomText
          text={text}
          size={18}
          color={Colors.black}
          style={styles.text}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CustomRadioButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '2%',
  },
  buttonView: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginLeft: '4%',
    fontSize: 16,
    color: Colors.black,
  },
  selectedView: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
});

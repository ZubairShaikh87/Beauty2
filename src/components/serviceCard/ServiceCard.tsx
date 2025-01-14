import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import CustomText from '../text/CustomText';
import strings from '../../utils/strings/strings';
import {Images} from '../../assets/images';
import {Colors} from '../../utils/colors/colors';
interface ServiceCardTypes {
  itemData: any;
  index: Number;
  removeService: Function;
}
const ServiceCard: FC<ServiceCardTypes> = ({
  itemData,
  index,
  removeService,
}) => {
  const {title, quantity, rates, duration} = itemData;
  return (
    <View style={[styles.selectedView, {marginVertical: 20}]}>
      <TouchableOpacity onPress={() => removeService(index)}>
        <Image source={Images.crossRed} />
      </TouchableOpacity>

      <CustomText
        size={16}
        fontWeight="700"
        text={`${rates * quantity} ${strings.saudiRiyal}`}
      />
      <CustomText size={16} color={Colors.lightGrey} text={quantity} />
      <Image style={styles.icon} source={Images.user} />
      <CustomText size={16} color={Colors.lightGrey} text={duration} />
      <Image style={styles.icon} source={Images.duration} />
      <CustomText
        size={16}
        text={title}
        style={{width: 50}}
        numberOfLines={1}
      />
    </View>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  selectedView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.grey100,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 6,
    paddingVertical: 16,
    marginRight: 25,
    justifyContent: 'space-evenly',
  },
});

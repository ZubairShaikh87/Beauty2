import {Alert, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC, useState} from 'react';
import CustomText from '../text/CustomText';
import {Images} from '../../assets/images';
import {Colors} from '../../utils/colors/colors';
import {HairCutCardPropsTypes} from './types';

const HairCutCard: FC<HairCutCardPropsTypes> = ({
  itemData,
  heading,
  duration,
  price,
  icon,
  bgColor,
  borderColor,
  handleQuantity,
}) => {
  // Alert.alert(JSON.stringify(itemData?.quantity));
  const [count, setCount] = useState(1);
  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderColor: borderColor || Colors.grey100,
        backgroundColor: bgColor || Colors.white,
      }}>
      <View style={styles.flexbox}>
        <CustomText
          size={19}
          text={heading}
          style={{width: 210}}
          numberOfLines={1}
        />
        <View style={styles.flex}>
          <CustomText fontWeight="600" size={18} text={price} />
          <Image style={styles.icon} source={icon} />
        </View>
      </View>
      <View style={styles.flexbox}>
        <View style={styles.flex}>
          <Image
            style={{tintColor: Colors.black, marginRight: 5}}
            source={Images.duration}
          />
          <CustomText size={15} color={Colors.lightGrey} text={duration} />
        </View>
        {itemData?.isSelected && (
          <View style={styles.flex}>
            <Image style={styles.user} source={Images.user} />
            <CustomText size={15} color={Colors.lightGrey} text={'شخص'} />
            <TouchableOpacity
              onPress={() => handleQuantity(itemData?.id, 'ADD')}>
              <Image style={styles.plus} source={Images.plus} />
            </TouchableOpacity>
            <CustomText
              style={{marginLeft: 8}}
              size={15}
              text={itemData?.quantity ? itemData?.quantity : 0}
            />
            <TouchableOpacity
              onPress={() => {
                handleQuantity(itemData?.id, 'REMOVE');
                // if (count > 1) {
                //   setCount(count - 1);
                // }
              }}>
              <Image style={{marginLeft: 7}} source={Images.minus} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default HairCutCard;

const styles = StyleSheet.create({
  flexbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {marginLeft: 10, width: 15, height: 15},
  flex: {flexDirection: 'row', alignItems: 'center'},
  user: {width: 20, height: 20, marginRight: 7},
  plus: {marginLeft: 7, width: 13, height: 13},
});

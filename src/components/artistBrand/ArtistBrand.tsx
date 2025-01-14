import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {Images} from '../../assets/images';
import CustomText from '../text/CustomText';
import {ArtistBrandPropsTypes} from './types';
import strings from '../../utils/strings/strings';
import {Colors} from '../../utils/colors/colors';

const ArtistBrand: FC<ArtistBrandPropsTypes> = ({
  image,
  heading,
  distance,
  time,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={strings.buttonopacity}>
      <Image style={styles.heart} source={Images.heart} />
      <Image source={image} />
      <View style={styles.rating}>
        <CustomText text={'4.8'} />
        <Image style={{marginLeft: 3}} source={Images.star} />
      </View>
      <CustomText
        style={{marginTop: 9, marginLeft: 8}}
        size={20}
        text={heading}
      />
      <View style={styles.footer}>
        <CustomText color={Colors.lightGrey} size={15} text={distance} />
        <View style={styles.dot} />
        <CustomText color={Colors.lightGrey} size={15} text={time} />
        <Image source={Images.clock} />
      </View>
    </TouchableOpacity>
  );
};

export default ArtistBrand;

const styles = StyleSheet.create({
  dot: {
    backgroundColor: Colors.lightGrey,
    height: 5,
    width: 5,
    borderRadius: 99,
    marginHorizontal: 5,
  },
  heart: {
    position: 'absolute',
    zIndex: 1,
    left: 10,
    top: 10,
    tintColor: 'white',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    position: 'absolute',
    bottom: 67,
    left: 10,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    marginLeft: 8,
  },
  container: {
    backgroundColor: Colors.white,
    marginRight: 15,
    shadowColor: Colors.lightGrey,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 12,
    borderBottomWidth: 0.5,
    borderColor: Colors.grey100,
    paddingBottom: 6,
  },
});

import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/colors/colors';
import strings from '../../utils/strings/strings';
import Header from '../../components/header/Header';
import CustomText from '../../components/text/CustomText';
import {Images} from '../../assets/images';

const Addresses = () => {
  return (
    <View style={styles.container}>
      <Header heading={strings?.addresses} />
      <View style={styles.imageContainer}>
        <Image source={Images.edited} style={styles.imageStyle} />
        <View style={styles.textContainer}>
          <CustomText
            text={strings.address_Dummy}
            style={styles.textStyle}
            size={14}
            numberOfLines={1}
          />
          <CustomText
            text={strings.newYork_address}
            size={14}
            color={Colors?.lightGrey}
            style={styles.newTextStyle}
          />
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image source={Images.edited} style={styles.imageStyle} />

        <View style={styles.textContainer}>
          <CustomText
            text={strings.address_Dummy}
            style={styles.textStyle}
            size={14}
            numberOfLines={1}
          />
          <CustomText
            text={strings.newYork_address}
            size={14}
            color={Colors?.lightGrey}
            style={styles.newTextStyle}
          />
        </View>
      </View>
    </View>
  );
};

export default Addresses;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  imageContainer: {
    borderWidth: 1,
    borderColor: Colors.grey100,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingLeft: 15,
    marginVertical: 10,
  },
  textContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  textStyle: {
    width: '99%',
    overflow: 'hidden',
  },
  imageStyle: {marginRight: 10, marginBottom: 10},
  newTextStyle: {
    textAlign: 'right',
    marginRight: 5,
  },
});

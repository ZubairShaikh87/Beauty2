import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {screenWidth} from '../../utils/dimensions';
import strings from '../../utils/strings/strings';
import {Images} from '../../assets/images';
import CustomText from '../../components/text/CustomText';
import {Colors} from '../../utils/colors/colors';

const WaletBox = () => {
  return (
    <View style={styles.boxContainer}>
      <View style={styles.boxInnerContainer}>
        <View style={styles.walletContainer}>
          <Image source={Images.walet} />
          <CustomText
            style={styles.walletText}
            size={14}
            color={Colors.walletText}
            text={strings.wallet}
          />
        </View>
        <CustomText
          style={styles.priceText}
          size={14}
          color={Colors.walletText}
          text={'671.00 ' + strings.$}
        />
      </View>
      <TouchableOpacity style={styles.managePayout}>
        <Text style={styles.managePayoutText}>{strings.managePayout}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WaletBox;

const styles = StyleSheet.create({
  boxContainer: {
    margin: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.grey100,
  },
  boxInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 25,
    justifyContent: 'space-between',
  },
  walletContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletText: {marginLeft: 10, fontWeight: 'bold', color: Colors.walletText},
  priceText: {fontWeight: 'bold', color: Colors.black},
  managePayout: {
    width: screenWidth / 1.2,
    borderWidth: 1,
    borderColor: Colors.grey100,
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 5,
  },
  managePayoutText: {
    textAlign: 'center',
    padding: 10,
    color: Colors.primary,
    fontWeight: 'bold',
  },
});

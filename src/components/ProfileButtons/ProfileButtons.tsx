import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../text/CustomText';
import {Colors} from '../../utils/colors/colors';
import strings from '../../utils/strings/strings';
import {Images} from '../../assets/images';

const ProfileButtons = () => {
  return (
    <View style={styles.rowContainer}>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
        <View style={styles.withoutColor}>
          <CustomText
            text={strings?.opennow}
            style={styles.buttonStyle}
            color={Colors?.black}
            size={14}
          />
        </View>
        <View style={styles.withoutColor}>
          <CustomText
            text={strings?.detailedreview}
            style={styles.buttonStyle}
            size={12}
            color={Colors?.black}
          />
        </View>
        <View style={styles.withoutColor}>
          <CustomText
            text={strings.withphotos}
            style={styles.buttonStyle}
            size={12}
            color={Colors?.black}
          />
        </View>

        <View style={styles.borderContainer}>
          <CustomText
            text={strings.latest}
            color={Colors?.white}
            size={12}
            style={styles.buttonStyle}
          />
        </View>
        <View style={styles.borderContainer}>
          <CustomText
            text={strings.verified}
            color={Colors?.white}
            size={12}
            style={styles.buttonStyle}
          />
        </View>
        <View style={styles.filterView}>
          <Image source={Images.arrow_Down_Bold} />
          <CustomText
            text={strings.filter}
            style={styles.buttonStyle}
            size={14}
            color={Colors?.black}
          />
          <Image source={Images.filter} tintColor={Colors.black} />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileButtons;

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
    marginHorizontal: 2,
    backgroundColor: Colors.primary,
  },
  withoutColor: {
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 2,
    borderColor: Colors?.grey100,
  },
  buttonStyle: {paddingVertical: 5, paddingHorizontal: 10},
  filterView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 0.5,
    paddingHorizontal: 5,
  },
});

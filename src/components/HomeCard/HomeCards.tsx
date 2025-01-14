import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {Images} from '../../assets/images';
import CustomText from '../text/CustomText';
import strings from '../../utils/strings/strings';
import CustomButton from '../button/CustomButton';
import {Colors} from '../../utils/colors/colors';
import {screenHeight, screenWidth} from '../../utils/dimensions';
import Utility from '../../utils/utility/Utility';

const HomeCards = ({data}) => {
  // console.log(data,"data cards");
  const {category_detail} = data;
  const itemImage = Utility.getImageUrl(category_detail?.iconimage);
  // console.log(itemImage,"itemImage");
  return (
    <View style={styling.borderContainer}>
      <Image source={{uri: itemImage}} style={{width: 110, height: 110}} />
      <View style={styling.center}>
        <CustomText
          text={category_detail?.category}
          color={Colors.black}
          size={18}
        />

        <View style={styling.rowFlex}>
          <Image source={Images.discount_shape} />
          <CustomText
            text={strings.special_Offer}
            style={styling.specialOfferText}
          />
        </View>
        <View style={styling.textStyle}>
          <CustomText
            text={strings.onetwofiveDollar}
            fontWeight="bold"
            color={Colors.primary}
          />
          <CustomButton text={strings.bookNow} style={styling.buttonStyle} />
        </View>
      </View>
    </View>
  );
};

export default HomeCards;

const styling = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  rowContainer: {flexDirection: 'row'},
  buttonStyle: {width: screenWidth / 5, paddingVertical: 5, marginLeft: '9%'},
  textStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  seeAllView: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  marginText: {marginBottom: -10, marginLeft: 12},
  borderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 5,
    width: screenWidth / 1.23,
    backgroundColor: Colors.white,
    borderColor: Colors.grey100,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  specialOfferText: {width: screenWidth / 4},
  loc: {
    color: Colors.lightGrey,
  },
  center: {
    alignItems: 'center',
  },
  flex: {flexDirection: 'row', alignItems: 'center'},
  locDropdown: {
    borderColor: 'transparent',
    width: screenWidth / 1.5,
    backgroundColor: 'transparent',
  },
  approve: {
    backgroundColor: Colors.green,
    flexDirection: 'row',
    padding: 10,
    borderRadius: 8,
    marginBottom: 18,
  },
  online: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderColor: Colors.grey100,
    borderWidth: 1,
  },
  price: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    marginTop: 7,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  monthdropDown: {
    borderColor: 'transparent',
    width: screenWidth / 3.5,
    backgroundColor: 'transparent',
  },
});

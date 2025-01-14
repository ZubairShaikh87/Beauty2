import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/colors/colors';
import strings from '../../utils/strings/strings';
import Header from '../../components/header/Header';
import CustomText from '../../components/text/CustomText';
import {Images} from '../../assets/images';
import CustomButton from '../../components/button/CustomButton';
import {screenHeight, screenWidth} from '../../utils/dimensions';
import {useNavigation} from '@react-navigation/native';

const Membership = () => {
  const navigation: any = useNavigation();

  return (
    <View style={styles.container}>
      <Header heading={strings?.membership} />
      <View style={styles.radiosBox}>
        <View style={{padding: 10}}>
          <CustomText size={15} text={strings?.basic_Membership_Plan} />
          <CustomText
            text={strings?.free}
            color={Colors.primary}
            size={18}
            fontWeight="900"
          />
          <CustomText
            size={13}
            text={strings?.includes}
            style={styles.customeStyle}
            color={Colors.lightGrey}
          />
          <View style={styles.flex}>
            <Image style={styles.tick} source={Images.checksmall} />
            <CustomText
              size={13}
              text={strings?.offline_booking}
              style={styles.customeStyle}
              color={Colors.black}
            />
          </View>
          <View style={styles.flex}>
            <Image style={styles.tick} source={Images.checksmall} />
            <CustomText
              size={13}
              text={strings?.chat_with_custumer}
              style={styles.customeStyle}
              color={Colors.black}
            />
          </View>

          <View style={styles.flex}>
            <Image style={styles.tick} source={Images.checksmall} />
            <CustomText
              size={13}
              text={strings?.future_booking}
              style={styles.customeStyle}
              color={Colors.black}
            />
          </View>
          <CustomButton
            text={strings.active}
            bgColor={Colors.white}
            fontWeight={'900'}
            lineHeight={18}
            textColor={Colors.primary}
            style={styles.activeButton}
            onPress={() => navigation.navigate(strings?.travelcost)}
          />
        </View>
      </View>
      <TouchableOpacity
        style={{padding: 20}}
        onPress={() => navigation.navigate(strings.paymentmethod)}>
        <ImageBackground
          resizeMode="stretch"
          style={styles.pinkimg}
          source={Images.pinkbg}>
          <View style={styles.curveContainer}>
            <View style={styles.polygon}>
              <CustomText color={Colors.white} text={'50%'} />
              <CustomText
                style={{marginTop: -4}}
                color={Colors.white}
                text={strings.off}
              />
            </View>
            <Image style={{marginTop: -1}} source={Images.Polygon2} />
          </View>
          <CustomText
            style={{paddingTop: 12}}
            size={18}
            color={Colors.primary}
            text={strings.premiummember}
          />
          <CustomText
            style={{paddingTop: 1}}
            size={24}
            fontWeight="bold"
            color={Colors.primary}
            text={strings.riyal50}
          />
          <View style={{zIndex: 1}}>
            <CustomText
              size={13}
              text={strings?.includes}
              style={styles.customeStyle}
              color={Colors.lightGrey}
            />
            <View style={styles.flex}>
              <Image style={styles.tick} source={Images.checksmall} />
              <CustomText
                size={13}
                text={strings?.offline_booking}
                style={styles.customeStyle}
                color={Colors.primary}
              />
            </View>
            <View style={styles.flex}>
              <Image style={styles.tick} source={Images.checksmall} />
              <CustomText
                size={13}
                text={strings?.chat_with_custumer}
                style={styles.customeStyle}
                color={Colors.primary}
              />
            </View>

            <View style={styles.flex}>
              <Image style={styles.tick} source={Images.checksmall} />
              <CustomText
                size={13}
                text={strings?.future_booking}
                style={styles.customeStyle}
                color={Colors.primary}
              />
            </View>
            <CustomButton
              text={strings.subcribenow}
              fontWeight={'900'}
              lineHeight={18}
              style={styles.activeButton}
              onPress={() => navigation.navigate(strings?.travelcost)}
            />
          </View>
          <ImageBackground
            resizeMode="stretch"
            style={styles.layers}
            source={Images.purplecurve}
          />
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default Membership;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  radiosBox: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.grey100,
    marginHorizontal: '5%',
    marginTop: 20,
  },
  customeStyle: {paddingVertical: 5},
  activeButton: {
    width: '45%',
    marginTop: 10,
    borderColor: Colors.primary,
    borderWidth: 1,
    height: screenHeight / 19,
  },
  pinkimg: {
    width: screenWidth / 1.12,
    height: screenHeight / 3.2,
    borderRadius: 12,
    paddingLeft: 20,
  },
  layers: {
    height: screenHeight / 9,
    width: screenWidth / 1.12,
    position: 'absolute',
    bottom: 0,
  },
  tick: {
    marginRight: 5,
    width: 10.3,
    height: 7.8,
  },
  flex: {flexDirection: 'row', alignItems: 'center'},
  polygon: {
    backgroundColor: Colors.primary,
    width: 38,
    height: 32,
    alignItems: 'center',
  },
  curveContainer: {position: 'absolute', right: 15},
});

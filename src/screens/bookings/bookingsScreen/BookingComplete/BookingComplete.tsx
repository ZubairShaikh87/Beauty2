import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../../../utils/colors/colors';
import {Images} from '../../../../assets/images';
import {screenHeight, screenWidth} from '../../../../utils/dimensions';
import CustomText from '../../../../components/text/CustomText';
import strings from '../../../../utils/strings/strings';
import CustomInput from '../../../../components/input/CustomInput';
import {Rating} from 'react-native-ratings';
import TextWithImage from '../../../../components/textWithImage/TextWithImage';
import CustomButton from '../../../../components/button/CustomButton';
import {useNavigation} from '@react-navigation/native';

const BookingComplete = () => {
  const navigation: any = useNavigation();

  const ratingCompleted = () => {};
  return (
    <>
      <View style={styles.container}>
        <Image source={Images.good} style={{marginTop: screenHeight / 10}} />
        <View style={{marginTop: '9%'}}>
          <CustomText
            text={strings.booking_Completed}
            size={18}
            fontWeight="900"
          />
        </View>
        <CustomText
          text={strings.you_Have_Been}
          size={16}
          color={Colors.lightGrey}
          style={styles.textMargin}
        />
        <View>
          <CustomText
            text={strings.How_was}
            size={16}
            style={styles.textMargin}
          />
        </View>
        <View style={styles.divider} />
        <View style={{marginVertical: '1%'}}>
          <CustomText
            text={strings.your_Overall}
            size={16}
            color={Colors.lightGrey}
          />
        </View>
        <Rating
          ratingColor={Colors.primary}
          type="custom"
          tintColor="white"
          ratingBackgroundColor={Colors.grey100}
          onFinishRating={ratingCompleted}
          style={{paddingVertical: 10, borderColor: Colors.white}}
        />

        <CustomInput
          width={screenWidth / 1.1}
          paddingBottom={45}
          heigth={screenHeight / 10}
          placeholder={strings.enter_Here}
          placeHolderTextColor={Colors.lightGrey}
          label={strings.add_Detail_Review}
        />
        <View style={styles.textImageContainer}>
          <TextWithImage
            path={Images.camera1}
            text={strings.addPhoto}
            textColor={Colors.black}
            size={14}
            alignSelf={'flex-start'}
          />
        </View>
      </View>
      <View style={{backgroundColor: Colors.white}}>
        <CustomButton
          style={styles.button}
          text={strings.submit}
          onPress={() => navigation.navigate(strings.cancellation_Boking)}
        />
      </View>
    </>
  );
};

export default BookingComplete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  button: {width: '95%', marginHorizontal: 5},

  divider: {
    borderTopWidth: 0.5,
    borderTopColor: Colors.grey100,
    width: screenWidth / 1,
    margin: 15,
  },
  inputMargin: {marginVertical: 8},
  textMargin: {marginVertical: '3%'},
  textImageContainer: {
    paddingHorizontal: 20,
    alignSelf: 'flex-end',
    paddingVertical: 5,
  },
});

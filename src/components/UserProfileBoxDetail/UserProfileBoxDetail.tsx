import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {Colors} from '../../utils/colors/colors';
import {screenWidth} from '../../utils/dimensions';
import {UserProfileBoxDetailPropsTypes} from './type';
import CustomText from '../text/CustomText';
import ToggleButton from '../toggle/ToggleButton';
import strings from '../../utils/strings/strings';
import {Images} from '../../assets/images';
import CustomButton from '../button/CustomButton';
import FooterTwoButton from '../footerTwoButton/FooterTwoButton';
import RightImageText from '../RightImageText/RightImageText';

const UserProfileBoxDetail: FC<UserProfileBoxDetailPropsTypes> = ({
  dateText,
  hideToggle,
  isOn,
  image,
  onPress,
  onToggle,
  buttonText,
  marginRight,
}) => {
  return (
    <View style={styles.boxContainer}>
      <View style={styles.toggleContainer}>
        <CustomText text={dateText} />
        {hideToggle ? (
          <Text style={{color: 'transparent'}}>sss</Text>
        ) : (
          <ToggleButton
            labelText={strings.remind_Me}
            onToggle={onToggle}
            isOn={isOn}
          />
        )}
      </View>
      <View style={styles.divider} />

      <View style={styles.detailContainer}>
        <Image style={{marginHorizontal: 10}} source={image} />

        <View style={styles.nameContainer}>
          <CustomText
            text={strings.jenny}
            size={14}
            style={{textAlign: 'left'}}
          />
          <RightImageText
            path={Images.location_Mark}
            text={strings.g85}
            color={Colors.lightGrey}
            textSize={12}
            marginRight={marginRight}
          />
          <RightImageText
            path={Images.check_Image}
            text={strings.service_id}
            color={Colors.lightGrey}
            textSize={12}
            marginRight={marginRight}
          />
        </View>
      </View>
      <View style={styles.divider} />
      {hideToggle ? (
        <CustomButton style={styles.button} text={buttonText} />
      ) : (
        <View style={{paddingVertical: 10}}>
          <FooterTwoButton
            onPressRight={onPress}
            marginTop={5}
            textRight={strings.view_Detail}
            textLeft={strings.cancle}
          />
        </View>
      )}
    </View>
  );
};

export default UserProfileBoxDetail;

const styles = StyleSheet.create({
  boxContainer: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 0.5,
    padding: 10,
    borderColor: Colors.lightGrey,
    marginHorizontal: 10,
    marginTop: '5%',
    marginBottom: 10,
  },
  button: {width: '100%', marginVertical: 10, marginRight: 10},

  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  divider: {
    borderTopWidth: 0.5,
    borderTopColor: Colors.lightGrey,
    width: screenWidth / 1.35,
    margin: 10,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  nameContainer: {
    marginBottom: 10,
    marginRight: 5,
  },
});

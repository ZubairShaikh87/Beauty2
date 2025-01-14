import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import {Colors} from '../../../utils/colors/colors';
import Header from '../../../components/header/Header';
import strings from '../../../utils/strings/strings';
import CustomText from '../../../components/text/CustomText';
import {Images} from '../../../assets/images';
import ProfileDetail from '../../../components/profileDetail/ProfileDetail';
import {useNavigation} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {screenHeight} from '../../../utils/dimensions';
import FooterTwoButton from '../../../components/footerTwoButton/FooterTwoButton';

const UserProfile = () => {
  const navigation: any = useNavigation();
  const bottomSheetRef = useRef<RBSheet>(null);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Header heading={strings.profile} />
      <View style={styles.headerContainer}>
        <View style={styles.flex}>
          <Image style={styles.img} source={Images.profilepic} />
          <View style={{marginLeft: 10}}>
            <CustomText size={18} color={Colors.white} text={strings.jenny} />
            <CustomText
              size={15}
              style={{marginTop: 4}}
              color={Colors.lightWhite}
              text={strings.newYork_address}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate(strings.artistdetailscreen)}>
          <Image
            style={{transform: [{scaleX: -1}]}}
            source={Images.rightArrowPrimary}
          />
        </TouchableOpacity>
      </View>
      <View>
        <ProfileDetail
          heading={strings.yourprofile}
          icon={Images.user}
          onPress={() => navigation.navigate(strings.useryourprofile_screen)}
        />

        <ProfileDetail
          heading={strings.paymentmethod}
          icon={Images.card}
          onPress={() => navigation.navigate(strings.paymentmethod)}
        />
        <ProfileDetail
          heading={strings.saved}
          icon={Images.primaryheart}
          onPress={() => navigation.navigate(strings.saved_screen)}
        />
        <ProfileDetail
          heading={strings.settings}
          icon={Images.setting}
          onPress={() => navigation.navigate(strings.settings)}
        />
        <ProfileDetail
          heading={strings.transaction}
          icon={Images.refresh}
          onPress={() => navigation.navigate(strings.your_Transaction)}
        />
        <ProfileDetail
          heading={strings.addresses}
          iconStyle={{width: 31, height: 31, tintColor: Colors.primary}}
          icon={Images.location_Mark}
          onPress={() => navigation.navigate(strings.membership)}
        />
        <ProfileDetail
          heading={strings.helpcenter}
          icon={Images.info}
          onPress={() => navigation.navigate(strings.helpcenter)}
        />
        <ProfileDetail
          heading={strings.privacypolicy}
          icon={Images.lock}
          onPress={() => navigation.navigate(strings.privacy_Policy)}
        />
        <ProfileDetail
          heading={strings.logout}
          icon={Images.logout}
          onPress={() => bottomSheetRef.current?.open()}
        />
        <RBSheet
          ref={bottomSheetRef}
          height={screenHeight / 5}
          openDuration={250}
          closeOnDragDown={true}
          customStyles={{
            draggableIcon: {
              backgroundColor: Colors.grey100,
              width: 123,
            },
          }}>
          <View style={styles.contentContainer}>
            <CustomText
              style={styles.textStyle}
              size={22}
              text={strings?.logout}
            />
            <View style={styles.divider} />
            <CustomText
              style={styles.textStyle}
              color={Colors.lightGrey}
              size={14}
              text={strings?.are_You_Sure}
            />
            <View style={{marginTop: '2%'}}>
              <FooterTwoButton
                marginTop={15}
                textLeft={strings.cancle}
                textRight={strings.yes_Logout}
              />
            </View>
          </View>
        </RBSheet>
      </View>
    </ScrollView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingVertical: 10,
  },
  textStyle: {textAlign: 'center'},
  headerContainer: {
    backgroundColor: Colors.black100,
    marginHorizontal: 24,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    marginVertical: 15,
  },
  flex: {flexDirection: 'row', alignItems: 'center'},
  img: {width: 60, height: 60},
  contentContainer: {
    paddingHorizontal: 30,
  },
  divider: {
    borderTopColor: Colors.grey100,
    borderTopWidth: 1,
    marginTop: 11,
    marginBottom: 7,
  },
});

import {
  Alert,
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
import {useDispatch} from 'react-redux';
import {changeStack} from '../../../navigators/NavigationService';
import {localStorage,getDataFromLocalStorage} from '../../../utils/mmkv/MMKV';
import {MMKV_KEYS} from '../../../constants/MMKV_KEY';
import {setUserType} from '../../../Redux/Reducers/UserTypeSlice';
import {setToken, setUser} from '../../../Redux/Reducers/UserSlice';

const Profile = () => {
  const userData = getDataFromLocalStorage(MMKV_KEYS?.USER_DATA);
  const userDataParse=  JSON.parse(userData);
  console.log("userDataParse",userDataParse)
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  const bottomSheetRef = useRef<RBSheet>(null);

  const handleLogOut = () => {
    bottomSheetRef.current?.close();
    setTimeout(() => {
      localStorage?.clearAll();
      dispatch(setUserType(null));
      dispatch(setToken(null));
      dispatch(setUser(null));

      changeStack('AuthStack');
    }, 400);
  };
  // Main Return
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Header heading={strings.profile} />
      <View style={styles.headerContainer}>
        <View style={styles.flex}>
          <Image style={styles.img} source={Images.profilepic} />
          <View style={{marginLeft: 10}}>
            <CustomText size={18} color={Colors.white} text={userDataParse?.name} textTransform={"capitalize"}/>
            <CustomText
              size={15}
              style={{marginTop: 4}}
              color={Colors.white}
              text={userDataParse?.role}
              textTransform={"capitalize"}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate(strings.artistdetailscreen)}>
          <Image source={Images.rightArrowPrimary} />
        </TouchableOpacity>
      </View>
      <View>
        <ProfileDetail
          heading={strings.yourprofile}
          icon={Images.user}
          onPress={() => navigation.navigate(strings.artistdetailscreen)}
        />
        <ProfileDetail
          heading={strings.offdays}
          icon={Images.cost}
          onPress={() => navigation.navigate("OffDays")}
        />
        <ProfileDetail
          heading={strings.onlinestorescreen}
          icon={Images.cost}
          onPress={() => navigation.navigate("OnlineStores",{ itemData: 81 })}
        />
        <ProfileDetail
          heading={strings.membership}
          icon={Images.receipt}
          onPress={() => navigation.navigate("Membership",)}
        />
        <ProfileDetail
          heading={strings.paymentmethod}
          icon={Images.card}
          onPress={() => navigation.navigate("ManagePayment")}
        />
        <ProfileDetail
          heading={strings.travelcost}
          icon={Images.cost}
          onPress={() => navigation.navigate("TravelCost")}
        />
        <ProfileDetail
          heading={strings.settings}
          icon={Images.setting}
          onPress={() => navigation.navigate("Settings")}
        />
        <ProfileDetail
          heading={strings.transaction}
          icon={Images.refresh}
          onPress={() => navigation.navigate("Transactions")}
        />
        <ProfileDetail
          heading={strings.helpcenter}
          icon={Images.info}
          onPress={() => navigation.navigate("HelpCenter")}
        />
        <ProfileDetail
          heading={strings.privacypolicy}
          icon={Images.lock}
          onPress={() => navigation.navigate("PrivacyPolicy")}
        />
        <ProfileDetail
          heading={strings.logout}
          icon={Images.logout}
          onPress={() => bottomSheetRef.current?.open()}
        />
        <RBSheet
          ref={bottomSheetRef}
          height={screenHeight / 3.5}
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
                onPressLeft={() => bottomSheetRef.current?.close()}
                onPressRight={() => handleLogOut()}
              />
            </View>
          </View>
        </RBSheet>
      </View>
    </ScrollView>
  );
};

export default Profile;

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

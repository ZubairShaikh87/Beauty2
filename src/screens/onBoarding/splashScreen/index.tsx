import {Image, I18nManager, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {Colors} from '../../../utils/colors/colors';
import {Images} from '../../../assets/images';
import {useNavigation} from '@react-navigation/native';
import strings from '../../../utils/strings/strings';
import {default as RNRestart} from 'react-native-restart';
import {getDataFromLocalStorage} from '../../../utils/mmkv/MMKV';
import {changeStack} from '../../../navigators/NavigationService';
import {MMKV_KEYS} from '../../../constants/MMKV_KEY';
import {useSelector} from 'react-redux';
import {getToken, getUser} from '../../../Redux/Reducers/UserSlice';
import {getUserType} from '../../../Redux/Reducers/UserTypeSlice';
import AppToast from '../../../components/appToast/AppToast';

const Splash = () => {
  const checkType = useSelector(getUserType);
  const navigation: any = useNavigation();

  useEffect(() => {
    I18nManager.forceRTL(true);
    !I18nManager.isRTL && RNRestart.Restart();
    setTimeout(() => {
      const isToken = getDataFromLocalStorage(MMKV_KEYS?.AUTH_TOKEN);
      const userData = getDataFromLocalStorage(MMKV_KEYS?.USER_DATA);
      console.log(isToken, 'AccessToken:');
      // NOTE:
      // This is done from my side just backend has to add keys
      // Its handle to check for location and documents for artist as its required.

      // if (isToken) {
      //   if (!userData?.lat && !userData?.long) {
      //     AppToast({type: 'error', message: 'Add your Location'});
      //     navigation.navigate(strings.locationscreen);
      //   } else if (checkType == 'business') {
      //     if (!userData?.documents && !userData?.ducument) {
      //       // checkType == 'user'
      //       //   ? navigation.navigate(strings.loginscreen)
      //       //   : navigation.navigate(strings.uploaddocsscreen);
      //       navigation.navigate(strings.uploaddocsscreen);
      //       AppToast({type: 'error', message: 'Upload Document'});
      //     }
      //   } else {
      //     changeStack('AppStack');
      //   }
      // } else {
      //   navigation.replace(strings.onboardingscreen);
      // }

      isToken
        ? changeStack('AppStack')
        : navigation.replace(strings.onboardingscreen);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={Images.nagsh} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

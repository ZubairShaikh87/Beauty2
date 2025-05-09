import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../../utils/colors/colors';
import {Images} from '../../../assets/images';
import CustomText from '../../../components/text/CustomText';
import strings from '../../../utils/strings/strings';
import CustomInput from '../../../components/input/CustomInput';
import {useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import CustomButton from '../../../components/button/CustomButton';
import {screenWidth} from '../../../utils/dimensions';
import SocialButton from '../../../components/socialButton/SocialButton';
import {
  useGoogleLoginMutation,
  useSignUpArtistGoogleMutation,
  useSignUpArtistMutation,
  useSignUpMutation,
  useSignUpStoreMutation,
} from '../../../Redux/services/auth/AuthApi';
import AppToast from '../../../components/appToast/AppToast';
import Utility from '../../../utils/utility/Utility';
import {useDispatch} from 'react-redux';
import {setUserType} from '../../../Redux/Reducers/UserTypeSlice';
import {setToken, setUser} from '../../../Redux/Reducers/UserSlice';
import {setDataInLocalStorage} from '../../../utils/mmkv/MMKV';
import {changeStack} from '../../../navigators/NavigationService';
import {MMKV_KEYS} from '../../../constants/MMKV_KEY';
import DropDownPicker from 'react-native-dropdown-picker';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

const Signup = () => {
  const dispatch = useDispatch();
  // API initialization
  const [signupArtistApi, {isLoading}] = useSignUpArtistMutation();
  const [signupArtistApiGoogle, {isLoadingg}] = useSignUpArtistGoogleMutation();
    const [googleLloginApi,] = useGoogleLoginMutation();
  const [signupStoreApi ] = useSignUpStoreMutation();
  const navigation: any = useNavigation();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [open, setOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState(1);
  const [value, setValue] = useState(strings.newyork);
  const [googleLoginSuccess, setGoogleLoginSuccess] = useState(false);

  const [items, setItems] = useState([
    {label: strings.artist, value: 'artist'},
    {label: strings.onlinestore, value: 'onlineStore'},
  ]);

  // TESTING Data Enter for now
  // const [inputsDetails, setinputsDetails] = useState({
  //   name: 'mehran',
  //   phone: '12345678901',
  //   email: 'beauty@gmail.com',
  //   category: value,
  //   address: 'karachi',
  //   business_email: 'beauty@gmail.com',
  //   business_name: 'beatuy',
  //   business_brand: 'brand',
  //   services: 'Hair',
  //   business_payment_account: 'GB33BUKB20201555555555',
  //   password: 'Asdf!123',
  //   password_confirmation: 'Asdf!123',
  //   gender: 'male',
  //   dob: '12-09-2015',
  //   image: 'none',
  // });
  const [inputsDetails, setinputsDetails] = useState({
    name: '',
    phone: '',
    email: '',
    category: categoryValue,
    address: '',
    business_email: '',
    business_name: '',
    business_brand: '',
    services: '',
    business_payment_account: '',
    password: '',
    password_confirmation: '',
    gender: '',
    dob: '',
    image: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
    category: '',
    address: '',
    business_email: '',
    business_name: '',
    business_brand: '',
    services: '',
    business_payment_account: '',
    password: '',
    password_confirmation: '',
    gender: 'male',
    dob: '12-09-2015',
    image: 'none',
  });

  // Handle SignUp Functions
  console.log("value",value)

  const handleSignup = async () => {
    const validate = Utility.signupArtistValidation(
      inputsDetails,
      handleErrors,
    );
    console.log(validate, 'validatevalidatevalidate');
    // navigation.navigate(strings.locationscreen);
    // Comment for now Testing perpose

    if (validate === true) {
      const keys = Object.keys(inputsDetails);
      const values = Object.values(inputsDetails);
      console.log(keys, 'KEYSHDHF');
      console.log(values, 'KEYSHDHFValue');
      const formData = new FormData();
      for (let i of keys) {
        formData.append(i, inputsDetails[i]);
      }
      console.log("value",value)
      if(value=="artist"){
        if(googleLoginSuccess){
          console.log("Update record after google login")
          await signupArtistApiGoogle(formData)
        .unwrap()
        .then(response => {
          console.log(response, '34343434mkjk3434431');
          if (response) {
            const userRole =
            Number(response?.data?.role) === 0 ? 'user' : 'business';
            dispatch(setUserType(userRole));
            navigation.navigate(strings.locationscreen);
            AppToast({
              type: 'success',
              message: 'Artist Registered Sucessfully',
            });
          } else {
            AppToast({
              type: 'success',
              message: response?.email,
            });
          }
        })
        .catch(error => {
          console.log(error, 'skdjfkdERR');
        });
        }
        else {
          console.log("Update record without google login")
      // artist 
      await signupArtistApi(formData)
        .unwrap()
        .then(response => {
          console.log(response, '34343434mkjk343443');
          if (response?.data) {
            const userRole =
              Number(response?.data?.role) === 0 ? 'user' : 'business';
            dispatch(setUserType(userRole));
            dispatch(setToken(response?.data?.token));
            dispatch(setUser(response?.data));
            setDataInLocalStorage(MMKV_KEYS.AUTH_TOKEN, response?.data?.token);
            setDataInLocalStorage(MMKV_KEYS.USER_DATA, response?.data);
            navigation.navigate(strings.locationscreen);
            AppToast({
              type: 'success',
              message: 'Artist Registered Sucessfully',
            });
          } else {
            AppToast({
              type: 'success',
              message: response?.email,
            });
          }
        })
        .catch(error => {
          console.log(error, 'skdjfkdERR');
        });
      }

      }
        // store
      else if(value=="onlineStore"){
        await signupStoreApi(formData)
        .unwrap()
        .then(response => {
          console.log(response, 'sotere console');
          if (response?.data) {
            const userRole = 'store'
            dispatch(setUserType(userRole));
            dispatch(setToken(response?.data?.token));
            dispatch(setUser(response?.data));
            setDataInLocalStorage(MMKV_KEYS.STORE_TOKEN, response?.data?.token);
            setDataInLocalStorage(MMKV_KEYS.USER_DATA, response?.data);
            navigation.navigate(strings.locationscreen);
            AppToast({
              type: 'success',
              message: 'Store Registered Sucessfully',
            });
          } else {
            AppToast({
              type: 'success',
              message: response?.email,
            });
          }
        })
        .catch(error => {
          console.log(error, 'skdjfkdERR');
        });
      }
    }
  };
// Google login
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '476821168024-ak2q019ts9l47qb8jgk2ep1u91e3ncdo.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  const handleGoogleSignUp = async (details) => {
  console.log("googleInfo", details?.data?.idToken);
  const formdata = new FormData();
  formdata.append('token', details?.data?.idToken);
  formdata.append('role', 'artist');
  
  await googleLloginApi(formdata)
    .unwrap()
    .then(response => {
      console.log("response google1", response?.data?.token);
      if (response?.success) {
        // Update inputs with Google data
        setinputsDetails(prev => ({
          ...prev,
          name: response.data.name,
          email: response.data.email,
          // Add any other fields you want to auto-fill
        }));
        setGoogleLoginSuccess(true);
        dispatch(setToken(response?.data?.token));
        setDataInLocalStorage(MMKV_KEYS.AUTH_TOKEN, response?.data?.token);
        AppToast({
          type: 'success',
          message: "Account Created",
        });
      }
    })
    .catch(errorResponse => {
      console.log("first", errorResponse);
      const {data} = errorResponse?.data;
      const {error} = data;
      AppToast({type: 'error', message: error});
    });
};

     const googleSignUp = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          console.log('User Info:', userInfo);
          // setGoogleInfo("userInfo12");
          handleGoogleSignUp(userInfo);
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log('User cancelled the login');
          } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log('Sign in is in progress');
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log('Play services not available');
          } else {
            console.log('Some other error:', error);
          }
        }
      };

      const handleFacebookLogin = async () => {
        try {
          // Attempt login with permissions
          const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
          
          if (result.isCancelled) {
            console.log('Login cancelled');
            // Handle cancel case
            return;
          }
      
          // Get the access token
          const data = await AccessToken.getCurrentAccessToken();
          
          if (!data) {
            throw new Error('Something went wrong obtaining access token');
          }
      
          const accessToken = data.accessToken.toString();
          console.log('Facebook access token:', accessToken);
      
          // Get user info from Graph API
          const response = await fetch(
            `https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${accessToken}`
          );
          const userInfo = await response.json();
          
          console.log('User info:', userInfo);
          
          // Here you would typically send the token to your backend
          // or handle the login in your app state
          // await authenticateWithBackend(accessToken, userInfo);
      
        } catch (error) {
          console.error('Login failed with error:', error);
          // Handle error
        }
      };
  // Functions
  const handleInputs = (key: string) => (error: string) => (value: string) => {
    setinputsDetails(prevState => ({...prevState, [key]: value}));
    handleErrors(error, key);
  };
  const handleErrors = (errorMessage: string, input: string) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };
  //Main Return
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={Images.back} style={styles.backImage} />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <CustomText size={24} text={strings.createacc} />
          <CustomText
            style={styles.text}
            size={13}
            color={Colors.lightGrey}
            text={strings.fillinfo}
          />
          <CustomInput
  style={{marginVertical: 8}}
  placeholder={strings.jhon}
  label={strings.name}
  onChangeText={handleInputs('name')('')}
  errorIndicator={errors.name}
  value={inputsDetails.name}
  editable={!googleLoginSuccess} // Make read-only when Google login succeeds
/>
          <CustomInput
            style={{marginVertical: 8}}
            placeholder={strings.num}
            label={strings.phonenum}
            onChangeText={handleInputs('phone')('')}
            errorIndicator={errors.phone}
          />
          <CustomInput
  style={{marginVertical: 8}}
  placeholder={strings.expemail}
  label={strings.email}
  onChangeText={handleInputs('email')('')}
  errorIndicator={errors.email}
  keyboardType="email-address"
  value={inputsDetails.email}
  editable={!googleLoginSuccess} // Make read-only when Google login succeeds
/>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={styles.locDropdown}
            placeholder={strings.selectCategory}
            placeholderStyle={{color: Colors.lightGrey}}
            dropDownContainerStyle={{
              width: '93%',
              alignSelf: 'center',
              borderColor: Colors.grey100,
            }}
            textStyle={{textAlign: 'left'}}
          />
          {/* <CustomInput
            dropdown
            value={categoryValue}
            setValue={setCategoryValue}
            open={open}
            setOpen={setOpen}
            items={items}
            setItems={setItems}
            dropdownPlaceholder={strings.selectCategory}
            label={strings.category}
            onChangeText={handleInputs('category')('')}
            errorIndicator={errors.category}
          /> */}
          <CustomInput
            style={{marginVertical: 8}}
            placeholder={strings.address}
            label={strings.address}
            onChangeText={handleInputs('address')('')}
            errorIndicator={errors.address}
          />
          <CustomInput
            style={{marginVertical: 8}}
            placeholder={strings.expemail}
            label={strings.businessemail}
            onChangeText={handleInputs('business_email')('')}
            errorIndicator={errors.business_email}
          />
          <CustomInput
            style={{marginVertical: 8}}
            placeholder={strings.businessname}
            label={strings.businessname}
            onChangeText={handleInputs('business_name')('')}
            errorIndicator={errors.business_name}
          />
          <CustomInput
            style={{marginVertical: 8}}
            placeholder={strings.Businessbrand}
            label={strings.Businessbrand}
            onChangeText={handleInputs('business_brand')('')}
            errorIndicator={errors.business_brand}
          />
          <CustomInput
            style={{marginVertical: 8}}
            placeholder={strings.services}
            label={strings.services}
            onChangeText={handleInputs('services')('')}
            errorIndicator={errors.services}
          />
          <CustomInput
            style={{marginVertical: 8}}
            placeholder={strings.ibannum}
            label={strings.businesspayment}
            onChangeText={handleInputs('business_payment_account')('')}
            errorIndicator={errors.business_payment_account}
          />
          <CustomInput
            style={{marginTop: 8}}
            password={true}
            placeholder={strings.pass}
            label={strings.password}
            onChangeText={handleInputs('password')('')}
            errorIndicator={errors.password}
          />
          <CustomInput
            style={{marginTop: 8}}
            password={true}
            placeholder={strings.pass}
            label={strings.password}
            onChangeText={handleInputs('password_confirmation')('')}
            errorIndicator={errors.password_confirmation}
          />
          <View style={styles.check}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              boxType={'square'}
              tintColors={{
                true: Colors.primary,
                false: Colors.lightGrey,
              }}
              onValueChange={newValue => setToggleCheckBox(newValue)}
              style={{width: 22, height: 22}}
            />
            <CustomText style={styles.terms} text={strings.agreewithterms} />
          </View>
          <CustomButton
            isLoader={isLoading}
            onPress={() => handleSignup()}
            text={strings.signup}
          />
          {!googleLoginSuccess && (
  <>
    <View style={styles.orsign}>
      <View style={styles.divider} />
      <CustomText
        style={{marginHorizontal: 8}}
        color={Colors.lightGrey}
        text={strings?.orsignup}
      />
      <View style={styles.divider} />
    </View>
    <View style={styles.social}>
      <SocialButton icon={Images.google} onPress={googleSignUp}/>
      <SocialButton icon={Images.fb} onPress={handleFacebookLogin}/>
    </View>
  </>
)}


          <TouchableOpacity
            style={styles.alreadyText}
            activeOpacity={strings.buttonopacity}>
            <CustomText text={strings?.alreadyhaveacc} />
            <CustomText text={strings?.sign_In} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  locDropdown: {
    marginTop: 15,
    borderColor: Colors.grey100,
    width: '93%',
    alignSelf: 'center',

    alignItems: 'center',
  },
  contentContainer: {
    paddingTop: 16,
    alignItems: 'center',
  },
  alreadyText: {
    marginBottom: '8%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    marginVertical: '11%',
  },
  divider: {
    borderTopWidth: 0.5,
    borderTopColor: Colors.lightGrey,
    width: screenWidth / 5,
  },
  orsign: {flexDirection: 'row', alignItems: 'center', marginTop: '12%'},
  social: {
    marginVertical: '8%',
    flexDirection: 'row',
  },
  terms: {
    marginLeft: 6,
  },
  check: {
    marginBottom: '12%',
    marginTop: 10,
    marginLeft: 15,
    alignSelf: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  backImage: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
});

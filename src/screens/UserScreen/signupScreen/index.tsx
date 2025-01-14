import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import {Images} from '../../../assets/images';
import CustomText from '../../../components/text/CustomText';
import CustomInput from '../../../components/input/CustomInput';
import CustomButton from '../../../components/button/CustomButton';
import SocialButton from '../../../components/socialButton/SocialButton';
import {screenWidth} from '../../../utils/dimensions';
import PhoneInput from 'react-native-phone-number-input';
import strings from '../../../utils/strings/strings';
import {Colors} from '../../../utils/colors/colors';
import {useSignUpMutation} from '../../../Redux/services/auth/AuthApi';
import AppToast from '../../../components/appToast/AppToast';
import Utility from '../../../utils/utility/Utility';
import {useDispatch} from 'react-redux';
import {setUserType} from '../../../Redux/Reducers/UserTypeSlice';
import {setToken, setUser} from '../../../Redux/Reducers/UserSlice';
import {setDataInLocalStorage} from '../../../utils/mmkv/MMKV';
import {MMKV_KEYS} from '../../../constants/MMKV_KEY';

const SignupUser = () => {
  const dispatch = useDispatch();
  // API initialization
  const [signUpApi, {isLoading}] = useSignUpMutation();
  const navigation: any = useNavigation();
  const phoneRef: any = useRef(null);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [numSignup, setNumSignup] = useState<number>(0);
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  //Filled for Testing purposes
  const [inputsDetails, setinputsDetails] = useState({
    name: 'Mehran',
    email: '',
    password: 'Asdf!123',
    password_confirmation: 'Asdf!123',
    contact: '03120987654',
  });
  // const [inputsDetails, setinputsDetails] = useState({
  //   name: '',
  //   email: '',
  //   password: '',
  //   password_confirmation: '',
  //   contact: '',
  // });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    contact: '',
  });

  const handleSignup = async () => {
    // const isFieldsFilled = Object.values(inputsDetails)?.every(
    //   val => val?.trim('') !== '',
    // );
    const validate = Utility.signupCustomerValidation(
      inputsDetails,
      handleErrors,
    );

    if (validate === true) {
      const keys = Object.keys(inputsDetails);
      const formData = new FormData();
      for (let i of keys) {
        formData.append(i, inputsDetails[i]);
      }
      await signUpApi(formData)
        .unwrap()
        .then(response => {
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
    //  else {
    //   AppToast({type: 'error', message: 'All fields required'});
    // }
  };
  // Functions
  const handleInputs = (key: string) => (error: string) => (value: string) => {
    setinputsDetails(prevState => ({...prevState, [key]: value}));
    handleErrors(error, key);
  };
  const handleErrors = (errorMessage: string, input: string) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };
  //Main return
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{alignSelf: 'flex-end'}}
        onPress={() => navigation.goBack()}>
        <Image source={Images.back} />
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
          {numSignup === 0 ? (
            <>
              <CustomInput
                style={{marginVertical: 8}}
                placeholder={strings.jhon}
                label={strings.name}
                onChangeText={handleInputs('name')('')}
                errorIndicator={errors?.name}
              />
              <CustomInput
                style={{marginVertical: 8}}
                placeholder={strings.num}
                label={strings.phonenum}
                onChangeText={handleInputs('contact')('')}
                errorIndicator={errors?.contact}
              />
              <CustomInput
                style={{marginVertical: 8}}
                placeholder={strings.expemail}
                label={strings.email}
                onChangeText={handleInputs('email')('')}
                errorIndicator={errors?.email}
              />
              <CustomInput
                style={{marginTop: 8}}
                password={true}
                placeholder={strings.pass}
                label={strings.password}
                onChangeText={handleInputs('password')('')}
                errorIndicator={errors?.password}
              />
              <CustomInput
                style={{marginTop: 8}}
                password={true}
                placeholder={strings.pass}
                label={strings.password}
                onChangeText={handleInputs('password_confirmation')('')}
                errorIndicator={errors?.password_confirmation}
              />
            </>
          ) : (
            <View style={{marginTop: 20}}>
              <CustomText
                style={{marginLeft: 8}}
                color={Colors.primary}
                size={13}
                text={strings?.phonenum}
              />
              <PhoneInput
                ref={phoneRef}
                defaultValue={value}
                codeTextStyle={{display: 'none'}}
                containerStyle={styles.inputContainer}
                textContainerStyle={styles.textContainer}
                placeholder="5151 255121"
                defaultCode="SA"
                layout="first"
                onChangeText={text => {
                  setValue(text);
                }}
                onChangeFormattedText={text => {
                  setFormattedValue(text);
                }}
                withDarkTheme
                withShadow
                autoFocus
              />
            </View>
          )}
          <View style={styles.check}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              boxType={'square'}
              onFillColor={Colors.primary}
              onCheckColor={Colors.white}
              onTintColor={Colors.primary}
              onValueChange={newValue => setToggleCheckBox(newValue)}
              style={{width: 22, height: 22}}
            />
            <CustomText
              style={styles.terms}
              size={13}
              color={Colors.primary}
              text={strings.agreewithterms}
            />
          </View>
          <CustomButton
            onPress={() => handleSignup()}
            text={strings.signup}
            isLoader={isLoading}
          />
          {numSignup === 0 && (
            <TouchableOpacity
              onPress={() => setNumSignup(1)}
              activeOpacity={strings.buttonopacity}
              style={styles.mobilebtn}>
              <Image source={Images.phone} />
              <CustomText
                style={styles.mobile}
                size={16}
                color={Colors.lightGrey}
                text={strings?.continuemobile}
              />
            </TouchableOpacity>
          )}
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
            <SocialButton icon={Images.google} />
            <SocialButton icon={Images.fb} />
          </View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{marginBottom: '6%'}}
            activeOpacity={strings.buttonopacity}>
            <CustomText text={strings?.alreadyhaveacc} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignupUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  contentContainer: {
    paddingTop: 16,
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
    textDecorationLine: 'underline',
  },
  check: {
    marginBottom: '9%',
    marginTop: 10,
    marginLeft: 15,
    alignSelf: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  mobilebtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.grey100,
    borderRadius: 20,
    marginTop: 12,
    width: screenWidth / 1.2,
    paddingHorizontal: 22,
    paddingVertical: 7,
  },
  mobile: {marginLeft: '20%'},
  inputContainer: {
    borderWidth: 1,
    borderColor: Colors.grey100,
    borderRadius: 16,
    width: screenWidth / 1.18,
    marginTop: 5,
  },
  textContainer: {
    backgroundColor: Colors.white,
    paddingVertical: 5,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
});

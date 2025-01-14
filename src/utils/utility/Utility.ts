import {Alert} from 'react-native';
import AppToast from '../../components/appToast/AppToast';
import strings from '../strings/strings';
import {
  HandleErrorsFunction,
  LoginUserObject,
  SignupArtistObject,
  SignupCustomerObject,
} from './types';

const Utility = {
  // Regex functions for validataions
  validateEmail: function (email: string) {
    var re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },
  // validate phone regex
  validatePhone: function (text: string) {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(text);
  },
  validateFullName: function (name: any) {
    var regex = /[A-zÀ-úÀ-ÿA-Za-z][A-Za-zÀ-ÖØ-öø-ÿžźż]+$/;
    return regex.test(name);
  },
  validateName: function (name: any) {
    var regex = /[A-zÀ-úÀ-ÿA-Za-z][A-Za-zÀ-ÖØ-öø-ÿžźż]+$/;
    return regex.test(name);
  },
  // validate password regex
  validatePassword: function (password: any) {
    var re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return re.test(password);
  },
  validateIBANRegex: function (number: any) {
    var regex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/;
    return regex.test(number);
  },
  // Validation functions
  //=>Login

  loginValidation: function (
    obj: LoginUserObject,
    handleErrors: HandleErrorsFunction,
  ) {
    let validation: any = !obj.email
      ? [
          handleErrors(strings.emailIsRequired, 'email'),
          AppToast({
            type: 'error',
            message: strings.emailIsRequired,
          }),
        ]
      : !Utility.validateEmail(obj.email)
      ? handleErrors(strings.invalidEmail, 'email')
      : !obj.password
      ? handleErrors(strings.passwordIsRequired, 'password')
      : // : !Utility.validatePassword(obj.password)
        // ? handleErrors(labels.invalidPassword, labels.passwordKey)
        true;

    return validation;
  },
  // => Signup
  signupCustomerValidation: function (
    obj: SignupCustomerObject,
    handleErrors: HandleErrorsFunction,
  ) {
    let validation: any = !obj?.name
      ? [
          handleErrors(strings.nameIsRequired, 'name'),
          AppToast({
            type: 'error',
            message: strings.nameIsRequired,
          }),
        ]
      : !obj?.contact
      ? [
          handleErrors(strings.contactIsRequired, 'contact'),
          AppToast({
            type: 'error',
            message: strings.contactIsRequired,
          }),
        ]
      : !Utility.validatePhone(obj?.contact)
      ? [
          handleErrors(strings.invalidcontact, 'contact'),
          AppToast({
            type: 'error',
            message: strings.invalidcontact,
          }),
        ]
      : !obj?.email
      ? [
          handleErrors(strings.emailIsRequired, 'email'),
          AppToast({
            type: 'error',
            message: strings.emailIsRequired,
          }),
        ]
      : !Utility.validateEmail(obj?.email)
      ? [
          handleErrors(strings.invalidEmail, 'email'),
          AppToast({
            type: 'error',
            message: strings.invalidEmail,
          }),
        ]
      : !obj?.password
      ? [
          handleErrors(strings.passwordIsRequired, 'password'),
          AppToast({
            type: 'error',
            message: strings.passwordIsRequired,
          }),
        ]
      : !Utility.validatePassword(obj?.password)
      ? [
          handleErrors(strings.invalidPassword, 'password'),
          AppToast({
            type: 'error',
            message: strings.invalidPassword,
          }),
        ]
      : !obj?.password_confirmation
      ? [
          handleErrors(
            strings.confirmPasswordIsRequired,
            'password_confirmation',
          ).AppToast({
            type: 'error',
            message: strings.confirmPasswordIsRequired,
          }),
        ]
      : !Utility.validatePassword(obj?.password_confirmation)
      ? [
          handleErrors(strings.invalidConfirmPassword, 'password_confirmation'),
          AppToast({
            type: 'error',
            message: strings.invalidConfirmPassword,
          }),
        ]
      : obj?.password !== obj?.password_confirmation
      ? AppToast({type: 'error', message: strings.passwordsDontMatch})
      : true;

    return validation;
  },

  signupArtistValidation: function (
    obj: SignupArtistObject,
    handleErrors: HandleErrorsFunction,
  ) {
    let validation: any = !obj?.name
      ? [
          handleErrors(strings.nameIsRequired, 'name'),
          AppToast({
            type: 'error',
            message: strings.nameIsRequired,
          }),
        ]
      : !obj?.phone
      ? [
          handleErrors(strings.contactIsRequired, 'phone'),
          AppToast({
            type: 'error',
            message: strings.contactIsRequired,
          }),
        ]
      : !Utility.validatePhone(obj?.phone)
      ? [
          handleErrors(strings.invalidcontact, 'phone'),
          AppToast({
            type: 'error',
            message: strings.invalidcontact,
          }),
        ]
      : !obj?.email
      ? [
          handleErrors(strings.emailIsRequired, 'email'),
          AppToast({
            type: 'error',
            message: strings.emailIsRequired,
          }),
        ]
      : !Utility.validateEmail(obj?.email)
      ? [
          handleErrors(strings.invalidEmail, 'email'),
          AppToast({
            type: 'error',
            message: strings.invalidEmail,
          }),
        ]
      : !obj?.category
      ? [
          handleErrors(strings.emailIsRequired, 'category'),
          AppToast({
            type: 'error',
            message: strings.emailIsRequired,
          }),
        ]
      : !obj?.address
      ? [
          handleErrors(strings.emailIsRequired, 'address'),
          AppToast({
            type: 'error',
            message: strings.emailIsRequired,
          }),
        ]
      : !obj?.business_email
      ? [
          handleErrors(strings.emailIsRequired, 'business_email'),
          AppToast({
            type: 'error',
            message: strings.emailIsRequired,
          }),
        ]
      : !Utility.validateEmail(obj?.business_email)
      ? [
          handleErrors(strings.invalidEmail, 'business_email'),
          AppToast({
            type: 'error',
            message: strings.invalidEmail,
          }),
        ]
      : !obj?.business_name
      ? [
          handleErrors(strings.nameIsRequired, 'business_name'),
          AppToast({
            type: 'error',
            message: strings.nameIsRequired,
          }),
        ]
      : !obj?.business_brand
      ? [
          handleErrors(strings.nameIsRequired, 'business_brand'),
          AppToast({
            type: 'error',
            message: strings.nameIsRequired,
          }),
        ]
      : !obj?.services
      ? [
          handleErrors(strings.nameIsRequired, 'services'),
          AppToast({
            type: 'error',
            message: strings.nameIsRequired,
          }),
        ]
      : !obj?.business_payment_account
      ? [
          handleErrors(strings.nameIsRequired, 'business_payment_account'),
          AppToast({
            type: 'error',
            message: strings.nameIsRequired,
          }),
        ]
      : !Utility.validateIBANRegex(obj?.business_payment_account)
      ? [
          handleErrors(strings.nameIsRequired, 'business_payment_account'),
          AppToast({
            type: 'error',
            message: strings.nameIsRequired,
          }),
        ]
      : !obj?.password
      ? [
          handleErrors(strings.passwordIsRequired, 'password'),
          AppToast({
            type: 'error',
            message: strings.passwordIsRequired,
          }),
        ]
      : !Utility.validatePassword(obj?.password)
      ? [
          handleErrors(strings.invalidPassword, 'password'),
          AppToast({
            type: 'error',
            message: strings.invalidPassword,
          }),
        ]
      : !obj?.password_confirmation
      ? [
          handleErrors(
            strings.confirmPasswordIsRequired,
            'password_confirmation',
          ).AppToast({
            type: 'error',
            message: strings.confirmPasswordIsRequired,
          }),
        ]
      : !Utility.validatePassword(obj?.password_confirmation)
      ? [
          handleErrors(strings.invalidConfirmPassword, 'password_confirmation'),
          AppToast({
            type: 'error',
            message: strings.invalidConfirmPassword,
          }),
        ]
      : obj?.password !== obj?.password_confirmation
      ? AppToast({type: 'error', message: strings.passwordsDontMatch})
      : true;

    return validation;
  },
  // signUpValidation: function (obj, handleErrors) {
  //   let validation = !obj?.email
  //     ? handleErrors(strings.emailIsRequired, 'email')
  //     : !Utility.validateName(obj?.email)
  //     ? handleErrors(strings.invalidemail, 'email')
  //     : !obj?.lastName
  //     ? handleErrors(strings.lastNameIsRequired, 'lastName')
  //     : !Utility.validateName(obj?.lastName)
  //     ? handleErrors(strings.invalidlasttName, 'lastName')
  //     : !obj?.userName
  //     ? handleErrors(strings.userNameIsRequired, 'userName')
  //     : !Utility.validateUsername(obj?.userName)
  //     ? handleErrors(strings.invalidUserName, 'userName')
  //     : !obj?.email
  //     ? handleErrors(strings.emailIsRequired, 'email')
  //     : !Utility.validateEmail(obj?.email)
  //     ? handleErrors(strings.invalidEmail, 'email')
  //     : !obj?.phoneNumber
  //     ? handleErrors(strings.phoneNumberIsRequired, 'phoneNumber')
  //     : !Utility.validatePhone(obj?.phoneNumber)
  //     ? handleErrors(strings.invalidPhoneNumber, 'phoneNumber')
  //     : !obj?.city
  //     ? handleErrors(strings.cityIsRequired, 'city')
  //     : !Utility.validateName(obj?.city)
  //     ? handleErrors(strings.invalidCity, 'city')
  //     : !obj?.name
  //     ? handleErrors(strings.nameIsRequired, 'name')
  //     : !obj?.password
  //     ? handleErrors(strings.passwordIsRequired, 'password')
  //     : !Utility.validatePassword(obj?.password)
  //     ? handleErrors(strings.invalidPassword, 'password')
  //     : !obj?.confirmPassword
  //     ? handleErrors(strings.confirmPasswordRequired, 'confirmPassword')
  //     : !Utility.validatePassword(obj?.confirmPassword)
  //     ? handleErrors(strings.invalidConfirmPassword, 'confirmPassword')
  //     : obj?.password !== obj?.confirmPassword
  //     ? AppToast({type: 'error', message: strings.passwordsDontMatch})
  //     : true;

  //   return validation;
  // },
  myServicesDataFormat: function (data: any) {
    return data.reduce((acc, item) => {
      if (!acc[item.service]) {
        acc[item.service] = [];
      }
      acc[item.service].push(item);
      return acc;
    }, {});
  },
  getImageUrl: function (imagePath: string) {
    const assetsUrl = 'http://vdz.wic.temporary.site//';
    return assetsUrl + imagePath;
  },
  selectItemMethod: function (data: any, itemIndex: any) {
    let selectedData = data?.map((item: any, index: any) => {
      if (index === itemIndex) {
        return {...item, selected: true};
      }
      return {...item, selected: false};
    });
    return selectedData;
  },
  handleQuantity: function (services, _serviceId, type) {
    const serviceQuantityAdded = services?.map(item => {
      const currentQuantity =
        typeof item?.quantity === 'number' ? item?.quantity : 0;
      console.log(currentQuantity, 'sjdfkdsjfjkdfjdkjf');
      return {
        ...item,
        quantity:
          item.id === _serviceId
            ? Math.max(
                0,
                currentQuantity +
                  (type === 'ADD' ? 1 : type === 'REMOVE' ? -1 : 0),
              )
            : currentQuantity,
      };
    });
    console.log(serviceQuantityAdded, 'sfjdsjfj32323');
    return serviceQuantityAdded;
  },
  selectingItem: function (itemToSelect, data) {
    const mappedSelectedItem = data?.map(item =>
      item === itemToSelect
        ? {...item, isSelected: true}
        : {...item, isSelected: false},
    );
    return mappedSelectedItem;
  },
  selectMultipleItem: function (itemToSelect, data) {
    const mappedSelectedItem = data?.map(item =>
      item === itemToSelect
        ? {...item, isSelected: item?.isSelected ? false : true}
        : {...item, isSelected: item?.isSelected},
    );
    return mappedSelectedItem;
  },
};
export default Utility;

import {StyleSheet, View} from 'react-native';
import React from 'react';
import Header from '../../../components/header/Header';
import strings from '../../../utils/strings/strings';
import {Colors} from '../../../utils/colors/colors';
import CustomInput from '../../../components/input/CustomInput';
import CustomText from '../../../components/text/CustomText';
import CustomButton from '../../../components/button/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {screenWidth} from '../../../utils/dimensions';

const PasswordManager = () => {
  const navigation: any = useNavigation();

  return (
    <View style={styles.container}>
      <Header heading={strings?.password_manager} />
      <View style={{marginHorizontal: 20}}>
        <CustomInput
          style={styles.password}
          placeholder={strings.password}
          password={true}
          label={strings.current_Password}
          width={screenWidth / 1.15}
        />
        <CustomText
          style={styles.forget}
          color={Colors.primary}
          text={strings?.forgotpassword}
        />
        <CustomInput
          style={styles.password}
          placeholder={strings.password}
          password={true}
          label={strings.new_Password}
          width={screenWidth / 1.15}
        />
        <CustomInput
          style={styles.password}
          placeholder={strings.password}
          password={true}
          label={strings.confirm_Password}
          width={screenWidth / 1.15}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          text={strings.change_Password}
          style={{width: '100%'}}
          onPress={() => navigation.navigate(strings.helpcenter)}
        />
      </View>
    </View>
  );
};

export default PasswordManager;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  password: {
    marginTop: 22,
  },
  forget: {
    alignSelf: 'flex-start',
    marginRight: 30,
    textDecorationLine: 'underline',
    marginTop: 8,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

import {Image, ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../components/header/Header';
import strings from '../../../utils/strings/strings';
import {Colors} from '../../../utils/colors/colors';
import {Images} from '../../../assets/images';
import CustomInput from '../../../components/input/CustomInput';
import CustomButton from '../../../components/button/CustomButton';

const UserYourProfile = () => {
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
    {label: 'Pear', value: 'pear'},
  ]);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Header heading={strings?.yourprofile} />
      <View style={styles.editImageContainer}>
        <Image style={styles.imgStyle} source={Images.edit} />
        <Image style={styles.personImageStle} source={Images.personProfile} />
      </View>

      <View style={styles.contentContainer}>
        <CustomInput
          style={styles.inputStyle}
          placeholder={strings.jhon}
          label={strings.name}
        />
        <CustomInput
          style={styles.inputStyle}
          placeholder={strings.num}
          label={strings.phonenum}
          changeText
        />
        <CustomInput
          style={styles.inputStyle}
          placeholder={strings.expemail}
          label={strings.email}
        />
        <CustomInput
          style={styles.inputStyle}
          placeholder={strings.dayMonthYear}
          label={strings.dateOfBirth}
        />
        <CustomInput
          dropdown
          value={value}
          setValue={setValue}
          open={open}
          setOpen={setOpen}
          items={items}
          setItems={setItems}
          dropdownPlaceholder={strings.heChooses}
          label={strings.gender}
          errorIndicator={false}
        />

        <View style={styles.buttonContainer}>
          <CustomButton text={strings.updateProfile} style={{width: '100%'}} />
        </View>
      </View>
    </ScrollView>
  );
};

export default UserYourProfile;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  editImageContainer: {
    borderWidth: 7,
    borderColor: Colors.white,
    alignSelf: 'center',
    borderRadius: 99,
    zIndex: 2,
    marginTop: '3%',
  },
  imgStyle: {zIndex: 3, position: 'absolute', bottom: 5, left: 9},
  personImageStle: {
    width: 112,
    height: 112,
  },
  inputStyle: {marginVertical: 8},
  contentContainer: {
    paddingTop: 16,
    alignItems: 'center',
    paddingBottom: 10,
  },
  buttonContainer: {
    width: '100%',
    paddingTop: '13%',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
});

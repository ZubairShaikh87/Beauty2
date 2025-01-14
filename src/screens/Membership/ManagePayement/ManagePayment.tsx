import {StyleSheet, View} from 'react-native';
import React, {FC, useState} from 'react';
import {Colors} from '../../../utils/colors/colors';
import strings from '../../../utils/strings/strings';
import Header from '../../../components/header/Header';
import CustomText from '../../../components/text/CustomText';
import TextWithImage from '../../../components/textWithImage/TextWithImage';
import {Images} from '../../../assets/images';
import RadioButton from '../../../components/RadioButton/RadioButton';
import CustomButton from '../../../components/button/CustomButton';
interface ManagePaymentTypes {
  navigation: any;
}
const ManagePayment: FC<ManagePaymentTypes> = ({navigation}) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleRadioButtonPress = (item?: any) => {
    setSelectedItem(item);
  };

  return (
    <View style={styles.container}>
      <Header heading={strings?.paymentmethod} />
      <View style={{padding: 20}}>
        <CustomText
          text={strings.pay_Cash}
          size={16}
          color={Colors.black}
          style={{textAlign: 'left'}}
        />
        <View style={styles.rowContainer}>
          <TextWithImage
            text={strings.Cash}
            path={Images.money}
            size={13}
            showImageAtBackofText={true}
          />
          <RadioButton
            selected={selectedItem === strings.Cash}
            onPress={() => handleRadioButtonPress(strings.Cash)}
          />
        </View>
        <CustomText
          text={strings.credit_Debit}
          size={16}
          color={Colors.black}
          style={{textAlign: 'left'}}
        />
        <View style={styles.rowContainer}>
          <TextWithImage
            text={strings.add_New_Card}
            path={Images.cardblue}
            size={13}
            showImageAtBackofText={true}
          />
          <RadioButton
            selected={selectedItem === strings.add_New_Card}
            onPress={() => handleRadioButtonPress(strings.add_New_Card)}
          />
        </View>
      </View>
      <CustomButton
        text={strings.bookapointment}
        // onPress={() => navigation.navigate(strings.bookAppointment_screen)}
        style={{position: 'absolute', bottom: 0, alignSelf: 'center'}}
      />
    </View>
  );
};

export default ManagePayment;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  rowContainer: {
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    borderWidth: 0.5,
    borderColor: Colors.grey100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

import React, {FC, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Header from '../../../../components/header/Header';
import CustomText from '../../../../components/text/CustomText';
import {Colors} from '../../../../utils/colors/colors';
import strings from '../../../../utils/strings/strings';
import {radioButton} from '../../../../utils/dummyData';
import CustomRadioButton from '../../../../components/CustomeRadioButton/CustomeRadioButton';
import {screenHeight, screenWidth} from '../../../../utils/dimensions';
import CustomInput from '../../../../components/input/CustomInput';
import CustomButton from '../../../../components/button/CustomButton';
import {useNavigation} from '@react-navigation/native';

const CancellationBooking = () => {
  const navigation: any = useNavigation();

  const [selectedItem, setSelectedItem] = useState(null);
  const handleSelectItem = (text: any) => {
    setSelectedItem(text);
  };

  const renderItem: FC<{item: {text: string}}> = ({item}) => (
    <CustomRadioButton
      text={item.text}
      selected={selectedItem === item.text}
      onSelect={handleSelectItem}
    />
  );
  return (
    <View style={styles.container}>
      <Header heading={strings?.cancellation_Boking} />
      <View style={{paddingHorizontal: '7%'}}>
        <CustomText
          text={strings.please_specify}
          size={18}
          color={Colors.lightGrey}
          style={{marginVertical: 20}}
        />
        <FlatList
          data={radioButton}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        <View style={styles.divider} />
        <CustomInput
          width={screenWidth / 1.15}
          paddingBottom={70}
          labelSize={18}
          heigth={screenHeight / 8}
          placeholder={strings.enter_Your_Reason}
          placeHolderTextColor={Colors.lightGrey}
          label={strings.last}
        />
        <View style={styles.buttonContainer}>
          <CustomButton
            style={styles.button}
            text={strings.submit}
            onPress={() => navigation.navigate(strings.membership)}
          />
        </View>
      </View>
    </View>
  );
};

export default CancellationBooking;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  divider: {
    borderTopWidth: 0.5,
    borderTopColor: Colors.lightGrey,
    marginVertical: 15,
    width: screenWidth / 1.15,
  },
  button: {width: '95%', marginHorizontal: 5},
  buttonContainer: {marginTop: screenHeight / 5.5},
});

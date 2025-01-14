import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../../../utils/colors/colors';
import strings from '../../../../utils/strings/strings';
import Header from '../../../../components/header/Header';
import CustomText from '../../../../components/text/CustomText';
import {Images} from '../../../../assets/images';
import CustomButton from '../../../../components/button/CustomButton';

const ArrivedLocation = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Image source={Images.good} style={{marginBottom: '5%'}} />
        <CustomText
          text={'You Have Arrived'}
          size={14}
          style={{
            marginBottom: '5%',
          }}
        />
        <CustomText text={strings.you_have} size={14} />
      </View>

      <CustomButton style={styles.button} text={strings.view_Detail} />
    </View>
  );
};

export default ArrivedLocation;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  button: {width: '90%', margin: 10},
});

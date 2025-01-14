import React, {useCallback, useRef, useState} from 'react';
import strings from '../../../utils/strings/strings';
import Header from '../../../components/header/Header';
import {Colors} from '../../../utils/colors/colors';
import {Images} from '../../../assets/images';
import {screenHeight, screenWidth} from '../../../utils/dimensions';
import CustomText from '../../../components/text/CustomText';
import ButtonWithImage from '../../../components/buttonWithImage/ButtonWithImage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  useLazyArtistGetMyServicesQuery,
  useLazyDeleteServiceTypeQuery,
} from '../../../Redux/services/app/AppApi';
import CustomeType from '../../../components/CustomType/CustomeType';
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AppToast from '../../../components/appToast/AppToast';

import RBSheet from 'react-native-raw-bottom-sheet';
import FooterTwoButton from '../../../components/footerTwoButton/FooterTwoButton';
import Utility from '../../../utils/utility/Utility';
import CustomDeleteType from '../../../components/CustomType/CustomDeleteType';
import Services from './Services';
const MyService = ({navigation}: {navigation: any}) => {
 
  // console.log(sheetData, 'DJFKDFKDSHETTDAT');
  // console.log(myServiceData, 'MYSErvie', myServiceData?.data?.length);
  // const handleDeleteItem = id => {
  //   Alert.alert(JSON.stringify(id));
  //   deleteServiceAPI(id)
  //     ?.unwrap()
  //     ?.then(response => {
  //       console.log(response, 'ttt');
  //     })
  //     .catch(error => {
  //       console.log(error, 'uuu');
  //     });
  // };

  


  // Main Return
  return (
    <View style={styles.container}>
      <Header heading={strings?.myServices} />
      {/* <ScrollView
        // contentContainerStyle={
        //   styles.serviceContainer
        // }
        //   services?.length > 0
        //     ? styles.serviceContainer
        //     : styles.centeredContainer
        // }
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}> */}
        <Services navigation={navigation}/>

        <View style={{justifyContent:"center",alignSelf:"center"}}>

        <ButtonWithImage
          text={strings.addService}
          fontWeihgt="900"
          imageStyle={styles.buttonStyle}
          width={screenWidth / 1.6}
          borderRadius={30}
          paddingVerticel={10}
          onPress={() => navigation.navigate('AddServicesSelected')}
        />
        </View>
      {/* </ScrollView> */}
      
    </View>
  );
};

export default MyService;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  textStyle: {color: Colors.black, fontWeight: 'bold', marginVertical: 20},
  loriumText: {color: Colors.black, fontWeight: 'bold', textAlign: 'center'},
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  serviceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  button: {width: '80%', marginVertical: 10},
  buttonStyle: {width: 20, height: 20},
  sheetScrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

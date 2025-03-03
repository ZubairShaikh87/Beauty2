import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, { useCallback, useState } from 'react';

import {useNavigation} from '@react-navigation/native';
import ArtistHeader from '../../../components/artistHeaderbutton/ArtistHeader';
import {Images} from '../../../assets/images';
import CustomText from '../../../components/text/CustomText';
import {Colors} from '../../../utils/colors/colors';
import strings from '../../../utils/strings/strings';
import {photosData} from '../../../utils/dummyData';
import CustomButton from '../../../components/button/CustomButton';
import {screenHeight, screenWidth} from '../../../utils/dimensions';
import Header from '../../../components/header/Header';
import CustomInput from '../../../components/input/CustomInput';
import DottedBorder from '../../../components/dottedBorder/DottedBorder';
import ImageCropPicker from 'react-native-image-crop-picker';

const OnlineStoresDetail = () => {
  const navigation: any = useNavigation();
    const [title, setTitle] = useState('');
    const [keywords, setKeyword] = useState('');
   const [serviceBanner, setServiceBanner] = useState([]);
const [storeImages, setStoreImages] = useState([]);
const [description, setDescription] = useState('');

  

const uploadImages = (index: number, type: 'banner' | 'store') => {
  ImageCropPicker.openPicker({
    cropping: true,
    width: 300,
    height: 400,
    compressImageQuality: 0.4,
    mediaType: 'photo',
    minFiles: 1,
    smartAlbums: [
      'UserLibrary',
      'Favorites',
      'Screenshots',
      'RecentlyAdded',
      'Regular',
      'Generic',
      'Imported',
      'SelfPortraits',
      'PhotoStream',
      'SyncedAlbum',
    ],
  }).then(image => {
    let obj = {
      uri: image?.path,
      type: image?.mime,
      name: image?.filename,
      index: index,
    };

    if (type === 'banner') {
      setServiceBanner([obj]); // Only one image for banner
    } else {
      setStoreImages(prev => {
        const isIndexExist = prev.findIndex(item => item?.index === index);
        return isIndexExist !== -1
          ? prev.map((item, i) => (i === isIndexExist ? obj : item))
          : [...prev, obj];
      });
    }
  });
};


const renderImagesUI = useCallback((imageCount: number, images: any[], type: 'banner' | 'store') => {
  return Array.from({ length: imageCount }, (_, index) => {
    const imagesObj = images?.find(item => item?.index === index);
    return (
      <DottedBorder
        key={index}
        width={type !== 'banner'? screenWidth / 5.3:'100%'}
        height={type !== 'banner'? screenHeight / 11:screenHeight / 6}
        imageSource={imagesObj ? imagesObj?.uri : null}
        onHandlePress={() => uploadImages(index, type)}
      />
    );
  });
}, []);

    

    
  return (
   <View style={styles.container}>
      <Header heading='إضافة متجر' />
      <ScrollView
              style={styles.scroolViewPadding}
              contentContainerStyle={styles.contentContainerStyle}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}>
        {/* <CustomText
            style={styles.text}
            size={14}
            color={Colors.black}
            text={'عنوان'}
          /> */}
          
          <CustomInput
            style={styles.inputMargin}
            width={screenWidth / 1.1}
            placeholder={'اسم العلامة التجارية'}
            label={'عنوان'}
            placeHolderTextColor={Colors.lightGrey}
            onChangeText={text => setTitle(text)}
            value={title}
          />
          <CustomInput
            style={styles.inputMargin}
            width={screenWidth / 1.1}
            placeholder={'رابط الموقع'}
            label={'رابط الموقع'}
            placeHolderTextColor={Colors.lightGrey}
            onChangeText={text => setTitle(text)}
            value={title}
          />

<CustomText
          text={'إضافة شعار الخدمة'}
          size={14}
          style={{width: '100%', textAlign: 'left',marginTop:20}}
        />
         <View style={styles.dottedBorderContainer}>
  {renderImagesUI(1, serviceBanner, 'banner')}
</View>

<CustomText
          text={'إضافة صور المتجر'}
          size={14}
          style={{width: '100%', textAlign: 'left',marginTop:20}}
        />
         <CustomText
          text={strings?.lorem_ipsum}
          size={14}
          color={Colors.lightGrey}
          style={{width: '100%', textAlign: 'left'}}
        />
          <View style={styles.dottedBorderContainer}>
  {renderImagesUI(4, storeImages, 'store')}
</View>
<CustomInput
          width={screenWidth / 1.1}
          paddingBottom={45}
          style={{marginTop: 30}}
          heigth={screenHeight / 10}
          placeholder={"وصف"}
          placeHolderTextColor={Colors.lightGrey}
          label={"وصف"}
          onChangeText={text => setDescription(text)}
        />
        <CustomInput
          style={styles.inputMargin}
          width={screenWidth / 1.1}
          placeholder={"الكلمات الرئيسية"}
          label={"الكلمات الرئيسية"}
          placeHolderTextColor={Colors.lightGrey}
          onChangeText={text => setKeyword(text)}
          value={title}
        />
        <CustomText
            style={styles.addMoreText}
            size={14}
            color={Colors.primary}
            fontWeight="900"
            text={"إضافة المزيد من الأنواع +"}
          />
          <CustomButton
            style={styles.button}
            text={"يحفظ"}
            // isLoader={isLoading}
            // onPress={() => AddServiceApi()}
          />
        </ScrollView>
   </View>
  );
};

export default OnlineStoresDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,

  },
  contentContainerStyle: {
    paddingHorizontal: 15,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  inputMargin: {marginVertical: 0},
  text: {
    marginVertical: '3%',
    width: '100%',
    textAlign: 'left',
  },
  dottedBorderContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  addMoreText: {
    textAlign: 'center',
  },
  button: {width: '100%', marginVertical: 10},
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
});

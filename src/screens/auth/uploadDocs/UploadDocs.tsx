import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../utils/colors/colors';
import CustomText from '../../../components/text/CustomText';
import strings from '../../../utils/strings/strings';
import Header from '../../../components/header/Header';
import DottedBorder from '../../../components/dottedBorder/DottedBorder';
import {screenHeight, screenWidth} from '../../../utils/dimensions';
import {Images} from '../../../assets/images';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../../components/button/CustomButton';
import {RequestGalleryPermission} from '../../../utils/GalleryPermission/GalleryPermission';
import ImagePicker from 'react-native-image-crop-picker';
import {useUploadArtistDocumentMutation} from '../../../Redux/services/auth/AuthApi';
import AppToast from '../../../components/appToast/AppToast';
import {localStorage, setDataInLocalStorage} from '../../../utils/mmkv/MMKV';
import {setUserType} from '../../../Redux/Reducers/UserTypeSlice';
import {setToken, setUser} from '../../../Redux/Reducers/UserSlice';
import {useDispatch} from 'react-redux';
import {changeStack} from '../../../navigators/NavigationService';

const UploadDocs = () => {
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  //API initialization
  const [uploadDocuments] = useUploadArtistDocumentMutation();

  const [documentsImages, setDocumentsImages] = useState();
  const [workPhotos, setWorkPhotos] = useState([]);
  // API functions
  const UploadDocuments = () => {
    // const workImages = Object.values(workPhotos).map(value => {
    //   console.log("workPhotos va", value); // Prints each image object
    //   return value; // Returning the image object for formData
    // });
    const workImages = Object.values(workPhotos);
    console.log("workImages",workImages)
    
    if (documentsImages?.license && documentsImages?.nationalId) {
      const formData = new FormData();
      formData.append('licenseimage', documentsImages?.license);
      formData.append('idimage', documentsImages?.nationalId);
      // formData.append('workimages[]', workPhotos?.workPic1);
      workImages.forEach((image, index) => {
        if (image?.uri && image?.type) {
          const fileName = image?.name || `image_${index}.jpg`; // Ensure name is provided
          formData.append('workimages[]', {
            uri: image.uri,
            type: image.type,
            name: fileName,
          });
          console.log("img11", image);
        }
      });
      // formData.append('workimages[]', workImages.forEach((image, index) => {
      //   if (image?.uri && image?.type && image?.name) {
      //     formData.append(`workimages[${index}]`, {
      //       uri: image.uri,
      //       type: image.type,
      //       name: image.name || `image_${index}.jpg`, // Ensure name is provided
      //     });
      //   }
      //   console.log("img11",image)
      // }));

      // formData.append('workimages[]',JSON.stringify(workImages));
      // formData.append('workimages[]',JSON.stringify(workImages));
      console.log(formData, 'sdjfksdfjksdjfkds');
      // return;
      uploadDocuments(formData)
        ?.unwrap()
        ?.then(response => {
          console.log(response, 'dsjfkdsjfkdsjfk');

          // localStorage?.clearAll();
          // dispatch(setUserType(null));
          // dispatch(setToken(null));
          // dispatch(setUser(null));
          // NOTE:
          // Will be redirect to login once the user(artist) upload the document while completing the signup process.
          // navigation.navigate(strings.loginscreen);
          changeStack('AppStack')
          AppToast({type: 'success', message: 'Success'});
        })
        .catch(error => {
          AppToast({type: 'error', message: 'Unauthorized access'});
        });
    } else {
      AppToast({type: 'error', message: 'Pick Images'});
    }
  };
  // FUnction to pick images
  const uploadImages = (key: string) => {
    ImagePicker.openPicker({
      cropping: true,
      width: 300,
      height: 400,
      compressImageQuality: 0.4 || null,
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
        name: "image",
      };
      let obbb = {[key]: obj};
      console.log(obbb);
      key === 'license' || key === 'nationalId'
        ? setDocumentsImages(prev => ({...prev, [key]: obj}))
        : setWorkPhotos(prev => ({...prev, [key]: obj}));
    });
  };
  console.log(documentsImages, 'sdkjfkdjsdfdfd');
  console.log(workPhotos, 'WOkdffjROK');

  // MAIN Return
  return (
    <ScrollView
      // style={styles.container}
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <CustomText
        style={styles.alignleft}
        size={14}
        text={strings.uploaddocs}
      />
      <View style={styles.borderPadding}>
        <CustomText
          style={styles.alignleft}
          size={14}
          text={strings.uploadworklicense}
        />
        <DottedBorder
          width={'100%'}
          height={screenHeight / 6}
          imageSource={documentsImages?.license?.uri}
          text={strings.uploadyourdocs}
          onHandlePress={() => uploadImages('license')}
        />
        <CustomText
          style={styles.alignleft}
          size={14}
          text={strings.uploadIdcard}
        />
        <DottedBorder
          width={'100%'}
          height={screenHeight / 6}
          imageSource={documentsImages?.nationalId?.uri}
          text={strings.uploadyourdocs}
          onHandlePress={() => uploadImages('nationalId')}
        />
        <CustomText
          style={styles.alignleft}
          size={14}
          text={strings.uploadwork}
        />
        <CustomText
          style={styles.dummyText}
          color={Colors.lightGrey}
          size={14}
          text={strings.dumytext}
        />
        <View style={styles.uploadPhotosContainer}>
          <DottedBorder
            width={'48%'}
            height={screenHeight / 8}
            imageSource={workPhotos?.workPic1?.uri}
            text={strings.uploadphotos}
            onHandlePress={() => uploadImages('workPic1')}
          />

          <DottedBorder
            width={'48%'}
            height={screenHeight / 8}
            imageSource={workPhotos?.workPic2?.uri}
            text={strings.uploadphotos}
            onHandlePress={() => uploadImages('workPic2')}
          />
        </View>
        <CustomButton
          style={styles.button}
          text={strings.compsignup}
          onPress={() => UploadDocuments()}
        />
      </View>
    </ScrollView>
  );
};

export default UploadDocs;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 25,
  },
  borderContainer: {
    justifyContent: 'center',
    marginHorizontal: 5,
    height: 100,
    width: screenWidth / 2.45,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 30,
    borderColor: Colors.primary,
    alignItems: 'center',
  },
  button: {width: '100%'},
  uploadPhotosContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
    marginTop: 15,
  },
  borderPadding: {
    paddingVertical: 20,
  },
  dummyText: {textAlign: 'left'},
  alignleft: {textAlign: 'left', marginBottom: 15, marginTop: 15},
});

import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../components/header/Header';
import strings from '../../../utils/strings/strings';
import {Colors} from '../../../utils/colors/colors';
import {Images} from '../../../assets/images';
import CustomInput from '../../../components/input/CustomInput';
import CustomButton from '../../../components/button/CustomButton';
import {useSelector} from 'react-redux';
import {getUser} from '../../../Redux/Reducers/UserSlice';
import {
  useLazyGetArtistsProfileQuery,
  useUpdateArtistImageMutation,
  useUpdateArtistsProfileMutation,
} from '../../../Redux/services/app/AppApi';
import AppToast from '../../../components/appToast/AppToast';
import ImagePicker from 'react-native-image-crop-picker';
import Utility from '../../../utils/utility/Utility';

const YourProfile = ({navigation}) => {
  //API initialization
  const userDetail = useSelector(getUser);
  // console.log(userDetail, 'userDetailuserDetail111');
  const [getArtistProfile, {data: artistProfileData}] =
    useLazyGetArtistsProfileQuery();
  const [updateArtistImage] = useUpdateArtistImageMutation();
  const [updateArtistProfile, {isLoading: updatingArtistProfileLoader}] =
    useUpdateArtistsProfileMutation();
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
    {label: 'Pear', value: 'pear'},
  ]);
  useEffect(() => {
    if (value) {
      setProfileDetail((prevState) => ({
        ...prevState,
        category: value,
      }));
    }
  }, [value]);
  const [valueGender, setValueGender] = useState(null);
  const [openGender, setOpenGender] = useState(false);
  const [itemsGender, setItemsGender] = useState([
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
  ]);
  useEffect(() => {
    if (valueGender) {
      setProfileDetail((prevState) => ({
        ...prevState,
        gender: valueGender,
      }));
    }
  }, [valueGender]);
  
  const [profileImage, setProfileImage] = useState();
  const [profileDetail, setProfileDetail] = useState({
    address: artistProfileData?.profile?.address,
    banner: artistProfileData?.profile?.banner,
    business_brand: artistProfileData?.profile?.business_brand,
    business_email: artistProfileData?.profile?.business_email,
    business_name: artistProfileData?.profile?.business_name,
    business_payment_account: 'stripe',
    category: artistProfileData?.profile?.category,
    dob: artistProfileData?.profile?.dob,
    email: artistProfileData?.profile?.email,
    gender: artistProfileData?.profile?.gender,
    id: artistProfileData?.profile?.id,
    image: artistProfileData?.profile?.image,
    name: '',
    phone: artistProfileData?.profile?.phone,
    services: artistProfileData?.profile?.services,
    status: artistProfileData?.profile?.status,
    travelingcost: artistProfileData?.profile?.travelingcost,
    updated_at: artistProfileData?.profile?.updated_at,
    user_id: artistProfileData?.profile?.user_id,
  });
  // console.log(artistProfileData, 'artistProfileData33');
  useEffect(() => {
    GetArtistProfile();
  }, []);

  // API function to get artist profile data and set to State
  const GetArtistProfile = () => {
    getArtistProfile('')
      .unwrap()
      ?.then(response => {
        const {profile} = response;
        const keys = Object.keys(profile);
        setProfileDetail(prev => {
          const updatedProfile = {...prev};

          keys.forEach(key => {
            updatedProfile[key] = profile[key];
          });

          return updatedProfile;
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  // API to update Artist profile
  const UpdateArtistProfile = () => {
    const keys = Object.keys(profileDetail);
    // console.log(keys, 'KEYSHDHF');
    const formData = new FormData();
    for (let i of keys) {
      formData.append(i, profileDetail[i]);
    }
    // console.log(formData, 'fksdjfk{{PPFFF');
    // return;
    updateArtistProfile(formData)
      ?.unwrap()
      ?.then(response => {
        AppToast({type: 'success', message: 'profile updated successfully'});
        navigation.goBack();
      })
      .catch(error => {
        AppToast({type: 'error', message: error});
      });
  };
  // Upload Image for profile
  const uploadImages = () => {
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
        'SelfPortraits',
        'PhotoStream',
        'SyncedAlbum',
        'Imported',
      ],
    }).then(image => {
      let obj = {
        uri: image?.path,
        type: image?.mime,
        name: "image",
      };
      // console.log("image?.path obj3",obj)

      setProfileImage(obj);
      const formData = new FormData();
      formData.append('image', obj);
      updateArtistImage(formData)
        .then(res => {
          // console.log("res",res);
          // console.log("data?.status",data?.status);
          const {data} = res;
          if(res.data?.status){
            AppToast({type: 'success', message: data?.status});
          }else{
            AppToast({type: 'error', message: "Something went wrong"});
          }
        })
        .catch(error => {
          AppToast({type: 'error', message: error});
        });
    });
  };
  const userImage = Utility.getImageUrl(profileDetail?.image);
  // console.log("userImage",userImage)
  //Main Return
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Header heading={strings?.yourprofile} />
      <View style={styles.editImageContainer}>
        <TouchableOpacity
          style={styles.imgStyle}
          onPress={() => uploadImages()}>
          <Image source={Images.edit} />
        </TouchableOpacity>
        {/* {console.log("profileImage?.uri3",profileImage)} */}
        <Image
          style={styles.personImageStle}
          source={{uri: profileImage?.uri || userImage}}
          defaultSource={Images.personProfile}
        />
      </View>

      <View style={styles.contentContainer}>
        <CustomInput
          style={styles.inputStyle}
          value={profileDetail?.name}
          placeholder={strings.jhon}
          label={strings.name}
          onChangeText={text =>
            setProfileDetail(prev => ({...prev, name: text}))
          }
        />
        <CustomInput
          style={styles.inputStyle}
          placeholder={strings.num}
          value={profileDetail?.phone}
          label={strings.phonenum}
          onChangeText={text =>
            setProfileDetail(prev => ({...prev, phone: text}))
          }
        />
        <CustomInput
          style={styles.inputStyle}
          placeholder={strings.expemail}
          value={profileDetail?.email}
          label={strings.email}
          editable={false}
          onChangeText={text =>
            setProfileDetail(prev => ({...prev, email: text}))
          }
        />
        <CustomInput
          style={styles.inputStyle}
          placeholder={strings.dayMonthYear}
          value={profileDetail?.dob}
          label={strings.dateOfBirth}
          onChangeText={text =>
            setProfileDetail(prev => ({...prev, dob: text}))
          }
        />
        
        <CustomInput
          dropdown
          value={valueGender?valueGender:profileDetail?.gender}
          setValue={setValueGender}
          open={openGender}
          setOpen={setOpenGender}
          items={itemsGender}
          setItems={setItemsGender}
          // setItems={setItemsGender}
          dropdownPlaceholder={strings.heChooses}
          label={strings.gender}
          errorIndicator={false}
        />
        <CustomInput
          style={styles.inputStyle}
          placeholder={strings.jhon}
          value={profileDetail?.name}
          label={strings.name}
          onChangeText={text =>
            setProfileDetail(prev => ({...prev, name: text}))
          }
        />
        <CustomInput
          style={styles.inputStyle}
          placeholder={strings.num}
          value={profileDetail?.phone}
          label={strings.phonenum}
          onChangeText={text =>
            setProfileDetail(prev => ({...prev, phone: text}))
          }
        />
        <CustomInput
          style={styles.inputStyle}
          placeholder={strings.expemail}
          value={profileDetail?.email}
          label={strings.email}
          onChangeText={text =>
            setProfileDetail(prev => ({...prev, email: text}))
          }
        />
        <CustomInput
          dropdown
          value={value?value:profileDetail?.category}
          setValue={setValue}
          open={open}
          setOpen={setOpen}
          items={items}
          setItems={setItems}
          dropdownPlaceholder={strings.selectCategory}
          label={strings.category}
        />
        <CustomInput
          style={styles.inputStyle}
          placeholder={strings.address}
          value={profileDetail?.address}
          label={strings.address}
          onChangeText={text =>
            setProfileDetail(prev => ({...prev, address: text}))
          }
        />
        <CustomInput
          style={styles.inputStyle}
          placeholder={strings.expemail}
          label={strings.businessemail}
          value={profileDetail?.business_email}
          onChangeText={text =>
            setProfileDetail(prev => ({...prev, business_email: text}))
          }
        />
        <CustomInput
          style={styles.inputStyle}
          placeholder={strings.businessname}
          value={profileDetail?.business_name}
          label={strings.businessname}
          onChangeText={text =>
            setProfileDetail(prev => ({...prev, business_name: text}))
          }
        />
        <CustomInput
          style={styles.inputStyle}
          placeholder={strings.Businessbrand}
          value={profileDetail?.business_brand}
          label={strings.Businessbrand}
          onChangeText={text =>
            setProfileDetail(prev => ({...prev, business_brand: text}))
          }
        />
        <CustomInput
          style={styles.inputStyle}
          placeholder={strings.services}
          value={profileDetail?.services}
          label={strings.services}
          onChangeText={text =>
            setProfileDetail(prev => ({...prev, services: text}))
          }
        />
        <CustomInput
          style={styles.inputStyle}
          placeholder={strings.ibannum}
          label={strings.businesspayment}
          value={profileDetail?.business_payment_account}
          onChangeText={text =>
            setProfileDetail(prev => ({
              ...prev,
              business_payment_account: text,
            }))
          }
        />
        <View style={styles.buttonContainer}>
          <CustomButton
            text={strings.updateProfile}
            style={{width: '100%'}}
            onPress={() => UpdateArtistProfile()}
            isLoader={updatingArtistProfileLoader}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default YourProfile;

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
    borderRadius: 100,
  },
  inputStyle: {marginVertical: 8},
  contentContainer: {
    paddingTop: 16,
    alignItems: 'center',
    paddingBottom: 10,
  },
  buttonContainer: {
    width: '100%',
    paddingTop: '20%',
    paddingHorizontal: 20,
    paddingBottom: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
});

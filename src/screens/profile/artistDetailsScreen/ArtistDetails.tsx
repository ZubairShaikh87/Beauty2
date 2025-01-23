import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Colors} from '../../../utils/colors/colors';
import {Images} from '../../../assets/images';
import {screenHeight, screenWidth} from '../../../utils/dimensions';
import CustomText from '../../../components/text/CustomText';
import strings from '../../../utils/strings/strings';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import CustomeType from '../../../components/CustomType/CustomeType';
import RBSheet from 'react-native-raw-bottom-sheet';
import {photosData, profileData, weekdays} from '../../../utils/dummyData';
import FooterTwoButton from '../../../components/footerTwoButton/FooterTwoButton';
import DottedBorder from '../../../components/dottedBorder/DottedBorder';
import CustomInput from '../../../components/input/CustomInput';
import ProfileCard from '../../../components/profileCard/ProfileCard';
import ProfileButtons from '../../../components/ProfileButtons/ProfileButtons';
import IconWithText from '../../../components/IconWithText/IconWithText';
import TextImageText from '../../../components/textImageText/TextImageText';
import TextWithImage from '../../../components/textWithImage/TextWithImage';
import {
  useAddArtistWorkingHoursMutation,
  useAddBannerPictureMutation,
  useAddGalleryMutation,
  useAddSocialLinksMutation,
  useLazyGetArtistsProfileQuery,
  useUpdateArtistAboutUsMutation,
  useUpdateArtistImageMutation,
  useUpdateArtistsProfileMutation,
} from '../../../Redux/services/app/AppApi';
import Utility from '../../../utils/utility/Utility';
import AppToast from '../../../components/appToast/AppToast';
import ImagePicker from 'react-native-image-crop-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Services from '../../myServices/myServiceScreen/Services';
const ArtistDetails = () => {
  //API initialization
  const [getArtistProfile, {data: artistProfileData}] =
    useLazyGetArtistsProfileQuery();
  // console.log("sdfkjdsjf11231231021",artistProfileData, 'sdfkjdsjf11231231021');
  const [updateAboutUs] = useUpdateArtistAboutUsMutation();
  const [updateArtistImage] = useUpdateArtistImageMutation();
  const [addWorkingHours] = useAddArtistWorkingHoursMutation();
  const [addGallery] = useAddGalleryMutation();
  const [addSocialLinksAPI] = useAddSocialLinksMutation();
  const [addBannerPicAPI] = useAddBannerPictureMutation();
  // States
  const bottomSheetRef = useRef<RBSheet>(null);
  const photoSheetRef = useRef<RBSheet>(null);
  const descriptionSheetRef = useRef<RBSheet>(null);
  const socialLinksSheetRef = useRef<RBSheet>(null);
  const addressSheetRef = useRef<RBSheet>(null);
  const navigation: any = useNavigation();
  const [index, setIndex] = useState(0);
  const [serviceForSheet, setServiceForSheet] = useState([]);
  const [profileBannerImage, setProfileBannerImage] = useState();
  const [galleryImages, setGalleryImages] = useState();
  const [galleryCategoryName, setGalleryCategoryName] = useState();
  const [aboutUs, setAboutUs] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [socialInputs, setSocialInputs] = useState({
    facebook: artistProfileData?.sociallinks[0]?.facebook || '',
    instagram: artistProfileData?.sociallinks[0]?.instagram || '',
    otherurl: artistProfileData?.sociallinks[0]?.otherurl || '',
    linkedin: artistProfileData?.sociallinks[0]?.linkedin || '',
    twiter: artistProfileData?.sociallinks[0]?.twiter || '',
  });

  const [profileDetail, setProfileDetail] = useState({
    address: artistProfileData?.profile?.address,
    email: artistProfileData?.profile?.email,
    id: artistProfileData?.profile?.id,
    phone: artistProfileData?.profile?.phone,
    user_id: artistProfileData?.profile?.user_id,
  });
const [updateArtistProfile, {isLoading: updatingArtistProfileLoader}] =
    useUpdateArtistsProfileMutation();

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
      AppToast({type: 'success', message: 'information updated successfully'});
      addressSheetRef?.current?.close();
      GetArtistProfile()
    })
    .catch(error => {
      AppToast({type: 'error', message: error});
    });
};
  const [schedule, setSchedule] = useState([
    {
      date: 'الاثنين',
      startTime: '09:00',
      endTime: '17:00',
      availability: 'On',
      id: 1,
    },
    {
      date: 'يوم الثلاثاء',
      startTime: '09:00',
      endTime: '17:00',
      availability: 'On',
      id: 2,
    },
    {
      date: 'الأربعاء',
      startTime: '09:00',
      endTime: '17:00',
      availability: 'off',
      id: 3,
    },
    {
      date: 'يوم الخميس',
      startTime: '09:00',
      endTime: '17:00',
      availability: 'off',
      id: 4,
    },
    {
      date: 'جمعة',
      startTime: '09:00',
      endTime: '17:00',
      availability: 'On',
      id: 5,
    },
    {
      date: 'السبت',
      startTime: '10:00',
      endTime: '14:00',
      availability: 'off',
      id: 6,
    },
    {
      date: 'الأحد',
      startTime: 'Closed',
      endTime: 'Closed',
      availability: 'On',
      id: 7,
    },
  ]);
  const isFocused = useIsFocused();
  useEffect(() => {
    GetArtistProfile();
  }, [isFocused]);

  const GetArtistProfile = () => {
    // console.log("console1")
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
        console.log("response artist profile1",response,"response artist profile1")
      }
      )
      .catch(error => {
        console.log("error get artist profile",error);
      });
  };
  const UpdateAboutUs = (aboutUsText: string) => {
    const formData = new FormData();
    formData.append('description', aboutUsText);
    updateAboutUs(formData)
      ?.unwrap()
      ?.then(response => {
        const {status} = response;
        // console.log(response, 'responseresponsedfd');
        descriptionSheetRef?.current?.close();
        GetArtistProfile();
        AppToast({type: 'success', message: status});
        setAboutUs('');
      });
  };
  const AddGalleryAPI = () => {
    if (galleryImages?.uri && galleryCategoryName) {
      const formData = new FormData();
      formData.append('category', galleryCategoryName);
      formData.append('image', {"index": 1, "name": "img1", "type": "image/jpeg", "uri": galleryImages?.uri});
      addGallery(formData)
        .unwrap()
        ?.then(res => {
          // console.log("resres",res)
          GetArtistProfile();
          setGalleryCategoryName('');
          setGalleryImages()
          AppToast({type: 'success', message: res.status});
          photoSheetRef?.current?.close();
        })
        .catch(error => {});
    } else {
      AppToast({type: 'error', message: 'Please add details'});
    }
  };
  const AddSocialLinksAPI = () => {
    const keys = Object.keys(socialInputs);

    const formData = new FormData();
    for (let i of keys) {
      formData.append(i, socialInputs[i]);

      addSocialLinksAPI(formData)
        .unwrap()
        ?.then(res => {
          // console.log(res, 'sdfjksdjfkdsjfksdjfk');
          GetArtistProfile();
          AppToast({type: 'success', message: 'Social Links updated'});
          resetSocialInputs();
        })
        .catch(error => {
          AppToast({type: 'error', message: 'Please add details'});
        });
    }
  };

  const AddArtistWorkingHours = () => {
    const formData = new FormData();

    schedule.forEach((item, index) => {
      formData.append(`date[]`, item.date);
      formData.append(`starttime[]`, item.startTime);
      formData.append(`endtime[]`, item.endTime);
      formData.append(`availability[]`, item.availability);
      formData.append(`id[]`, item.id);
    });
    addWorkingHours(formData)
      .unwrap()
      .then(response => {
        // console.log("working hr response",response);
        bottomSheetRef?.current?.close()
        GetArtistProfile();
      })
      .catch(error => {
        // console.log(error, 'sdjfkdsjfkdsjfkdsfj');
      });
  };
  const AddBannerPic = (bannerImg) => {
    // console.log("AddBannerPic1",bannerImg)
    
    if (bannerImg?.uri) {
      // console.log("bannerImg?.uri1",bannerImg?.uri)
      const formData = new FormData();
      formData.append('image', {"index": 0, "name": "img1", "type": "image/jpeg", "uri": bannerImg?.uri});
      addBannerPicAPI(formData)
        .unwrap()
        ?.then(res => {
          // console.log("res1",res)
          GetArtistProfile();
          setProfileBannerImage('');
        })
        .catch(error => {
          // console.log("error error1",error)
        });
    } else {
      AppToast({type: 'error', message: 'Please add details'});
    }
  };
  // Upload Image for profile
  const uploadImages = (type: String) => {
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
        name: image?.filename,
        index: index,
      };
      // console.log("obj",obj)
      type === 'banner'
        ? [setProfileBannerImage(obj), AddBannerPic(obj)]
        : setGalleryImages(obj);
    });
  };
  //Image of Artist
  const artistImage = artistProfileData?.profile?.image
    ? Utility.getImageUrl(artistProfileData?.profile?.image)
    : null;
    // console.log("artistBannerImage artistBannerImage",artistProfileData?.profile?.image)
  const artistBannerImage = artistProfileData?.profile?.banner
    ? Utility.getImageUrl(artistProfileData?.profile?.banner)
    : null;
  const [routes] = useState([
    {key: 'first', title: strings.services},
    {key: 'second', title: strings.gallery},
    {key: 'third', title: strings.review1},
    {key: 'fourth', title: strings.aboutus},
  ]);

  const serviceWithCategory = artistProfileData?.services?.reduce(
    (acc, currentItem) => {
      const category = currentItem?.category_detail?.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(currentItem);
      return acc;
    },
    {},
  );
  const [currentField, setCurrentField] = useState(null); // To track startTime or endTime
  const [currentItemIndex, setCurrentItemIndex] = useState(null); // Track the selected schedule item

  const handleInputChange = (key, text) => {
    setSocialInputs(prev => ({...prev, [key]: text}));
  };
  const showDatePicker = (field, index) => {
    setCurrentField(field);
    setCurrentItemIndex(index);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedTime) => {
    const formattedTime = selectedTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  
    setSchedule((prevSchedule) => {
      const updatedSchedule = [...prevSchedule];
      if (currentField === 'startTime') {
        updatedSchedule[currentItemIndex].startTime = formattedTime;
        setCurrentField('endTime'); // Prepare for endTime picker
        setTimeout(() => {
          setDatePickerVisibility(true); // Show the endTime picker after updating startTime
        }, 100); // Small delay to ensure state updates
      } else if (currentField === 'endTime') {
        updatedSchedule[currentItemIndex].endTime = formattedTime;
      }
      return updatedSchedule;
    });
  
    if (currentField === 'endTime') {
      hideDatePicker(); // Close the picker after selecting endTime
    } else {
      hideDatePicker(); // Temporarily close the picker before showing endTime
    }
  };
  
  // Function to reset all inputs
  const resetSocialInputs = () => {
    setSocialInputs({
      facebook: '',
      instagram: '',
      otherurl: '',
      linkedin: '',
      twiter: '',
    });
    socialLinksSheetRef.current?.close();
  };

  ///////////////////////////// Tabs Routes and UI /////////////////////////////
  const FirstRoute = () => (
    <ScrollView
      style={styles.flexContainer}
      showsVerticalScrollIndicator={false}>
      <View style={styles.flexContainer}>
        <View style={styles.alserviceContainer}>
          <CustomText
            size={20}
            text={`${strings?.allservice} (${artistProfileData?.services?.length})`}
          />
          <TouchableOpacity
            // onPress={() => bottomSheetRef.current?.open()}
            onPress={() => navigation.navigate('AddServicesSelected')}
            activeOpacity={strings.buttonopacity}>
            <CustomText size={14} text={strings?.addservices} />
          </TouchableOpacity>
        </View>
        <View style={styles.centerView}>
          {/* <FlatList
            data={artistProfileData?.services}
            renderItem={({item, index}) => (
              <CustomeType
                textName={item?.category_detail?.category}
                onPress={() => {
                  // bottomSheetRef?.current?.open(),
                  setServiceForSheet(serviceWithCategory[item?.service]);
                }}
                text={strings?.type20}
              />
            )}
          /> */}
          <Services navigation={navigation}/>
        </View>
      </View>
    </ScrollView>
  );
  const SecondRoute = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.photoContainer}>
        <CustomText size={20} 
        text={`${strings.photos} (${artistProfileData?.gallary?.length})`}
        // text={strings.photos} 
        />
        <TouchableOpacity
          onPress={() => photoSheetRef.current?.open()}
          activeOpacity={strings.buttonopacity}
          style={[styles.flex, {gap: 5}]}>
          <Image source={Images.gallery} />
          <CustomText size={14} text={strings.addphotos} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={artistProfileData?.gallary}
        numColumns={2}
        scrollEnabled={false}
        renderItem={({item, index}) => {
          // console.log(item?.image, 'IMAJAJA');
          const picture = Utility.getImageUrl(item?.image);
          // console.log(picture, 'ksjfkdsjiJIII');
          return (
            <ImageBackground
              key={index}
              style={styles.bgImage}
              borderRadius={12}
              source={picture ? {uri: picture} : Images.img1}
              defaultSource={Images.img1}>
              {item?.category && (
                <View style={styles.categoryContainer}>
                  <CustomText
                    color={Colors.white}
                    text={item?.category}
                    style={{textAlign: 'left'}}
                  />
                </View>
              )}
            </ImageBackground>
          );
        }}
      />
    </ScrollView>
  );
  const ThirdRoute = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{paddingHorizontal: 15, paddingTop: 10}}>
        <CustomText size={22} text={strings.reviews} />
        <View style={styles.input}>
          <View style={[styles.flex, {height: 40}]}>
            <Image source={Images.search} />
            <TextInput
              style={styles.textInput}
              placeholder={strings.searchreviews}
              placeholderTextColor={Colors.lightGrey}
            />
          </View>
        </View>
      </View>
      <ProfileButtons />
      <View style={styles.profileCardContainer}>
        <FlatList
          data={profileData}
          scrollEnabled={false}
          renderItem={({item, index}) => {
            return (
              <ProfileCard
                name={item?.name}
                image={item?.img}
                duration={item?.duration}
                desc={item?.desc}
                followers={item?.followers}
                rating={item?.rating}
                imagesArray={item?.imagesArray}
              />
            );
          }}
        />
      </View>
    </ScrollView>
  );
  const fourthRoute = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.buttonContainer}>
        <CustomText size={20} text={strings.aboutus} />
        <TouchableOpacity
          onPress={() => {setAboutUs(artistProfileData?.aboutus?.description || '');descriptionSheetRef?.current?.open()}}
          activeOpacity={strings.buttonopacity}
          style={styles.flex}>
          <CustomText
            color={Colors.primary}
            size={14}
            text={strings.edit_About}
          />
          <Image source={Images.edited} style={{marginLeft: 5}} />
        </TouchableOpacity>
      </View>
      <CustomText
        text={artistProfileData?.aboutus?.description}
        color={Colors.lightGrey}
        style={{marginHorizontal: 10, textAlign: 'left'}}
      />
      <TextImageText
        onPress={() => bottomSheetRef?.current?.open()}
        withImage={strings.modify_Working_Hour}
        withoutImageText={strings.workinghours}
      />
      <View style={styles.divider2} />
      {artistProfileData?.workinghours?.map((item, index) => {
        return (
          <View key={index} style={styles.sheetContainer4}>
            <CustomText
              color={Colors.lightGrey}
              size={16}
              text={`${item?.starttime}-${item?.endtime}`}
            />
            <View style={styles.flex}>
              <CustomText size={14} fontWeight="400" text={item?.date} />
            </View>
          </View>
        );
      })}
      <TextImageText
        withoutImageText={strings.social_Media}
        withImage={strings.social_Media_Editing}
        onPress={() => {
          setSocialInputs({
            facebook: artistProfileData?.sociallinks[0]?.facebook || '',
            instagram: artistProfileData?.sociallinks[0]?.instagram || '',
            otherurl: artistProfileData?.sociallinks[0]?.otherurl || '',
            linkedin: artistProfileData?.sociallinks[0]?.linkedin || '',
            twiter: artistProfileData?.sociallinks[0]?.twiter || '',
          });
          socialLinksSheetRef.current?.open();
        }}
      />
      <View style={styles.divider2} />
      <IconWithText
        path={Images.facbook}
        text={artistProfileData?.sociallinks[0]?.facebook}
      />
      <IconWithText
        path={Images.insta}
        text={artistProfileData?.sociallinks[0]?.instagram}
      />
      <IconWithText
        path={Images.dribbble}
        text={artistProfileData?.sociallinks[0]?.otherurl}
      />
      <IconWithText
        path={Images.LinkedIn}
        text={artistProfileData?.sociallinks[0]?.linkedin}
      />
      <IconWithText
        path={Images.twitterS}
        text={artistProfileData?.sociallinks[0]?.twiter}
      />
      <TextImageText
        onPress={() => addressSheetRef?.current?.open()}
        withoutImageText={strings.contactUs}
        withImage={strings.editing_Contact_Detail}
      />
      <View style={styles.divider2} />
      <View style={styles.textImageContainer}>
        <TextWithImage
          path={Images.call}
          text={artistProfileData?.profile?.phone}
          textColor={Colors.black}
          size={14}
          alignSelf={'flex-start'}
        />
      </View>
      <View style={[styles.textImageContainer,{marginBottom:20}]}>
        <TextWithImage
          path={Images.sms}
          text={artistProfileData?.profile?.email}
          textColor={Colors.black}
          size={14}
          alignSelf={'flex-start'}
        />
      </View>
      {/* <TextImageText
        onPress={() => Alert.alert('MapScreen')}
        withImage={strings.viewOnMap}
        withoutImageText={strings.address}
      /> */}

      {/* <View style={styles.divider2} />
      <View style={styles.textImageContainer2}>
        <TextWithImage
          path={Images.location_Mark}
          text={strings.prestonRd}
          textColor={Colors.black}
          size={14}
          alignSelf={'flex-end'}
        />
      </View>
      <Image source={Images.locationImage} style={styles.imageStyle} /> */}
    </ScrollView>
  );
  /////////////////////////// Tabs UI End /////////////////////////////////////////
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: fourthRoute,
  });
  /// Tab RENDER UI
  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      labelStyle={{color: Colors.black}}
      indicatorStyle={styles.indicatorStyle}
      style={{backgroundColor: Colors.white}}
    />
  );
  // console.log(profileBannerImage, 'sdkjfkdsjfsdkfjdsps');
  artistProfileData;
  ////////// Main Return /////////////////
  return (
    <View style={styles.container}>
      {/* {console.log("artistProfileData?.profile?.banner",artistProfileData?.profile?.banner)}
      {console.log("artistBannerImage",artistBannerImage)}
      {console.log("profileBannerImage?.uri",profileBannerImage?.uri)}
      {console.log("Images.profilebg",profileBannerImage?.uri)}
      {console.log("xyz2",
      artistProfileData?.profile?.banner
            ? "1:"+artistBannerImage
            : "2:"+profileBannerImage?.uri
            ? "3:"+profileBannerImage?.uri
            : "4:"+Images.profilebg)} */}
      <ImageBackground
        style={styles.bgImageStyle}
        source={
          artistProfileData?.profile?.banner
            ? {uri: artistBannerImage}
            : profileBannerImage?.uri
            ? {uri: profileBannerImage?.uri}
            : Images.profilebg
        }>
        <TouchableOpacity
          style={styles.backImage}
          activeOpacity={strings.buttonopacity}
          onPress={() => navigation.goBack()}>
          <Image source={Images.back} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={strings.buttonopacity}
          onPress={() => uploadImages('banner')}
          style={styles.editContainer}>
          <Image style={{marginRight: 4}} source={Images.camera} />
          <CustomText size={14} color={Colors.lightGrey} text={strings.edit} />
        </TouchableOpacity>
      </ImageBackground>
      <View style={styles.topContainer}>
        <View style={styles.iconMainContainer}>
          <View style={[styles.artistContainer,{width:100}]}>
            <CustomText
              color={Colors.lightGrey}
              size={14}
              text={artistProfileData?.sociallinks[0]?.instagram}
            />
            <Image style={styles.instaImage} source={Images.insta} />
          </View>
          <View style={styles.avatarContainer}>
            <TouchableOpacity
              style={styles.editImage}
              onPress={() => navigation.navigate('YourProfile')}>
              <Image source={Images.edit} />
            </TouchableOpacity>
            <Image
              style={styles.profilePicStyle}
              source={{uri: artistImage}}
              defaultSource={Images.profilepic}
            />
          </View>
          <View style={styles.artistContainer}>
            <CustomText
              color={Colors.lightGrey}
              size={14}
              text={artistProfileData?.sociallinks[0]?.facebook}
            />
            <Image style={styles.instaImage} source={Images.facbook} />
          </View>
        </View>
        <View style={styles.jennyContainer}>
          <CustomText size={24} text={artistProfileData?.profile?.name} />
          <View style={styles.artistContainer}>
            <CustomText
              color={Colors.lightGrey}
              size={16}
              text={strings.jobdone+artistProfileData?.completebooking}
            />
            <Text style={styles.jobCancleLine}> | </Text>
            <CustomText
              color={Colors.lightGrey}
              size={16}
              text={strings.jobcancel + artistProfileData?.cancelbooking}
            />
          </View>
          <View style={styles.artistContainer}>
            <Image style={styles.clockImage} source={Images.clock} />
            <CustomText
              color={Colors.lightGrey}
              size={15}
              text={strings.min15}
            />
            <View style={styles.dot} />
            <CustomText
              color={Colors.lightGrey}
              size={15}
              text={strings.km15}
            />
            <View style={styles.dot} />
            <CustomText
              color={Colors.lightGrey}
              size={15}
              text={strings.pm11}
            />
            <CustomText
              color={Colors.lightGrey}
              size={15}
              text={strings.am11}
            />
            <Text style={styles.monsunText}> | </Text>
            <CustomText
              color={Colors.lightGrey}
              size={15}
              text={strings.monsun}
            />
          </View>
          <View style={styles.runningContainer}>
            <Image style={styles.runningImage} source={Images.running} />
            <CustomText
              color={Colors.lightGrey}
              size={15}
              text={`${strings.travelingCost} ${artistProfileData?.profile?.travelingcost}`}
            />
          </View>
          <View style={styles.reviewContainer}>
            <CustomText fontWeight="600" size={15} text={artistProfileData?.AvgRating+' ('+artistProfileData?.RatingCount+' '+strings.review+')'} />
            <Image style={styles.startImage} source={Images.star} />

            <CustomText fontWeight="600" size={15} text={strings.favorite} />
            <Image style={styles.heartImg} source={Images.heart} />
          </View>
        </View>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
          initialLayout={{width: screenWidth}}
          style={styles.tabViewStyle}
        />
        <RBSheet
          ref={bottomSheetRef}
          height={screenHeight }
          // openDuration={250}
          // closeOnDragDown={true}
          customStyles={{
            draggableIcon: {
              // backgroundColor: Colors.grey100,
              // width: 123,
            },
          }}>
           <ScrollView contentContainerStyle={[styles.contentContainer, { paddingBottom: 50 }]}>
      <CustomText style={styles.alignText} size={22} text="Working Hours" />
      <View style={styles.divider} />
      {schedule.map((item, index) => (
        <Pressable
          key={index}
          style={styles.sheetContainer}
          onPress={() => showDatePicker('startTime', index)}
        >
          <CustomText color={Colors.lightGrey} size={16} text={item.date} />
          <View style={styles.flex}>
            <CustomText
              size={14}
              fontWeight="400"
              text={`${item.startTime} - ${item.endTime}`}
            />
                              <Image style={{marginLeft: 5}} source={Images.arrow_down} />

            {/* <Image style={{ marginLeft: 5 }} source={{ uri: 'arrow_down_image_url' }} /> */}
          </View>
        </Pressable>
      ))}

<FooterTwoButton
              marginTop={15}
              textLeft={strings.cancle}
              textRight={strings.addhours}
              onPressLeft={() => bottomSheetRef?.current?.close()}
              onPressRight={() => {
                AddArtistWorkingHours();
              }}
            />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        confirmTextIOS={currentField === 'startTime' ? 'Start Time' : 'End Time'} // Update text
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </ScrollView>
        </RBSheet>
        {/*...................... PHOTO PICK SHEET...................... */}
        <RBSheet
          ref={photoSheetRef}
          height={screenHeight / 1.5}
          openDuration={250}
          closeOnDragDown={true}
          customStyles={{
            draggableIcon: {
              backgroundColor: Colors.grey100,
              width: 123,
            },
          }}>
          <View style={styles.contentContainer}>
            <CustomText
              style={styles.alignText}
              size={22}
              text={strings?.addphotos}
            />
            <View style={styles.divider} />
            <CustomText
              size={18}
              text={strings?.uploadworkphotos}
              style={{textAlign: 'left'}}
            />
            <CustomText
              size={15}
              color={Colors.lightGrey}
              text={strings?.lorem_ipsum}
              style={{textAlign: 'left'}}
            />
            <DottedBorder
              width={screenWidth / 1.15}
              height={screenHeight / 7}
              imageSource={galleryImages?.uri}
              text={strings?.uploadphotoshere}
              textColor={Colors.lightGrey}
              bgColor={Colors.grey10}
              marginBottom={20}
              onHandlePress={() => uploadImages()}
            />
            <CustomInput
              label={strings.photocategory}
              placeholder={strings.hairname}
              value={galleryCategoryName}
              placeHolderTextColor={Colors.black}
              onChangeText={text => setGalleryCategoryName(text)}
            />
            <FooterTwoButton
              marginTop={15}
              textLeft={strings.cancle}
              textRight={strings.addtype}
              onPressLeft={() => photoSheetRef?.current?.close()}
              onPressRight={() => {
                AddGalleryAPI();
              }}
            />
          </View>
        </RBSheet>
        {/* To Change About Us BottomSheet */}
        <RBSheet
          ref={descriptionSheetRef}
          height={screenHeight / 2.2}
          openDuration={250}
          closeOnDragDown={true}
          customStyles={{
            draggableIcon: {
              backgroundColor: Colors.grey100,
              width: 123,
            },
          }}>
          <View style={styles.contentContainer}>
            <CustomText
              style={styles.alignText}
              size={22}
              text={strings?.adddesc}
            />
            <View style={[styles.divider, {marginBottom: 17}]} />
            <CustomText
              text={strings.description}
              style={{textAlign: 'left'}}
            />
            <TextInput
              // numberOfLines={6}
              style={styles.descInput}
              placeholder={strings.enterdesc}
              // value={aboutUs?aboutUs:artistProfileData?.aboutus?.description }
              value={aboutUs}
              onChangeText={text => setAboutUs(text)}
              
            />
            <FooterTwoButton
              marginTop={15}
              textLeft={strings.cancle}
              textRight={strings.adddesc}
              onPressLeft={() => descriptionSheetRef?.current?.close()}
              onPressRight={() => UpdateAboutUs(aboutUs)}
            />
          </View>
        </RBSheet>
        {/* End */}
        {/* Add/Update Social Links */}

        <RBSheet
          ref={socialLinksSheetRef}
          height={screenHeight / 1.3}
          openDuration={250}
          closeOnDragDown={true}
          customStyles={{
            draggableIcon: {
              backgroundColor: Colors.grey100,
              width: 123,
            },
          }}>
          <ScrollView
            contentContainerStyle={[
              styles.contentContainer,
              {paddingBottom: 50},
            ]}>
            <CustomText
              style={styles.alignText}
              size={22}
              text={strings?.contactndadress}
            />
            <View style={[styles.divider, {marginBottom: 17}]} />

            <CustomInput
              style={{marginTop: 10}}
              label={'Facebook'}
              value={socialInputs?.facebook}
              placeholder={'Facebook'}
              onChangeText={text => handleInputChange('facebook', text)}
            />
            <CustomInput
              style={{marginTop: 10}}
              value={socialInputs?.instagram}
              label={'Instagram'}
              placeholder={'Instagram'}
              onChangeText={text => handleInputChange('instagram', text)}
            />
            <CustomInput
              style={{marginTop: 10}}
              value={socialInputs?.otherurl}
              label={'otherurl'}
              placeholder={'otherurl'}
              onChangeText={text => handleInputChange('otherurl', text)}
            />
            <CustomInput
              style={{marginTop: 10}}
              label={'LinkedIn'}
              value={socialInputs?.linkedin}
              placeholder={'LinkedIn'}
              onChangeText={text => handleInputChange('linkedin', text)}
            />
            <CustomInput
              style={{marginTop: 10}}
              label={'twitter'}
              value={socialInputs?.twiter}
              placeholder={'twitter'}
              onChangeText={text => handleInputChange('twiter', text)}
            />

            <FooterTwoButton
              marginTop={15}
              textLeft={strings.cancle}
              textRight={strings.contactndadress}
              onPressLeft={() => socialLinksSheetRef.current?.close()}
              onPressRight={() => {
                AddSocialLinksAPI();
              }}
            />
          </ScrollView>
        </RBSheet>
        {/* To Change Address Us BottomSheet  */}
        <RBSheet
          ref={addressSheetRef}
          height={screenHeight / 1.3}
          openDuration={250}
          closeOnDragDown={true}
          customStyles={{
            draggableIcon: {
              backgroundColor: Colors.grey100,
              width: 123,
            },
          }}>
          <ScrollView
            contentContainerStyle={[
              styles.contentContainer,
              {paddingBottom: 50},
            ]}>
            <CustomText
              style={styles.alignText}
              size={22}
              text={strings?.contactndadress}
            />
            <View style={[styles.divider, {marginBottom: 17}]} />
            {/* <CustomInput label={strings.phonenum} placeholder={strings.num} /> */}
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
            {/* <CustomInput
              style={{marginTop: 10}}
              label={strings.email}
              placeholder={strings.expemail}
            /> */}
            <CustomInput
          style={styles.inputStyle}
          placeholder={strings.address}
          value={profileDetail?.address}
          label={strings.address}
          onChangeText={text =>
            setProfileDetail(prev => ({...prev, address: text}))
          }
        />
            {/* <CustomInput
              style={{marginTop: 10}}
              label={strings.address}
              placeholder={strings.prestonRd}
            /> */}
            {/* <Image source={Images.locationImage} style={styles.imageStyle} /> */}
            
            <FooterTwoButton
              marginTop={15}
              textLeft={strings.cancle}
              textRight={strings.contactndadress}
              onPressLeft={() => addressSheetRef?.current?.close()}
              onPressRight={() => {
                UpdateArtistProfile()
              }}
            />
            {/* <FooterTwoButton
              marginTop={15}
              textLeft={strings.cancle}
              textRight={strings.contactndadress}
            /> */}
          </ScrollView>
        </RBSheet>
        {/* End */}
      </View>
    </View>
  );
};

export default ArtistDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  dot: {
    backgroundColor: Colors.lightGrey,
    height: 5,
    width: 5,
    borderRadius: 99,
    marginHorizontal: 5,
  },
  contentContainer: {
    paddingHorizontal: 30,
  },
  divider: {
    borderTopColor: Colors.grey100,
    borderTopWidth: 1,
    marginTop: 11,
    marginBottom: 7,
  },
  divider2: {
    borderTopColor: Colors.grey100,
    borderTopWidth: 1,
    width: screenWidth / 1.1,
    marginHorizontal: 5,
    marginTop: 11,
    marginBottom: 7,
  },
  bgImageStyle: {
    height: screenHeight / 3.8,
    width: screenWidth,
    alignSelf: 'center',
  },
  alignText: {textAlign: 'center'},
  tabViewStyle: {marginHorizontal: 8},
  heartImg: {height: 20, width: 20, marginRight: 3},
  startImage: {height: 20, width: 20, marginLeft: 3},
  reviewContainer: {flexDirection: 'row', alignItems: 'center', marginTop: 5},
  runningContainer: {flexDirection: 'row', alignItems: 'center'},
  runningImage: {height: 20, width: 20, marginRight: 3},
  profilePicStyle: {
    width: 112,
    height: 112,
    borderRadius: 100,
  },
  monsunText: {fontSize: 20, color: Colors.lightGrey},
  jobCancleLine: {fontSize: 24, color: Colors.lightGrey},
  jennyContainer: {marginTop: '8%', alignItems: 'center'},
  clockImage: {height: 20, width: 20, marginRight: 3},
  instaImage: {marginLeft: 5, height: 30, width: 30},
  artistContainer: {flexDirection: 'row', alignItems: 'center'},
  iconMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  topContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    zIndex: 1,
    marginTop: -35,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  editImage: {zIndex: 3, position: 'absolute', bottom: 5, left: 9},
  editView: {
    borderWidth: 7,
    borderColor: Colors.white,
    alignSelf: 'center',
    borderRadius: 99,
    zIndex: 2,
    marginTop: '13%',
    backgroundColor: 'pink',
  },
  avatarContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    left: '38%',
    bottom: 0,
    borderRadius: 100,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editContainer: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 30,
    bottom: 55,
    // borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: 57,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    // borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  backImage: {marginTop: 25, marginRight: 25, alignSelf: 'flex-end'},
  indicatorStyle: {
    backgroundColor: Colors.primary,
    height: 4,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  alserviceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  centerView: {alignItems: 'center'},
  photoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  categoryContainer: {
    backgroundColor: Colors.primary,
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 8,
    right: 11,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  bgImage: {height: 165, width: 165, margin: 4},
  profileCardContainer: {marginVertical: 10},
  flexContainer: {flex: 1},
  sheetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.grey100,
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
  },
  sheetContainer4: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: Colors.grey100,
    padding: 5,
    marginHorizontal: 7,
    marginVertical: 2,
  },
  input: {
    borderColor: Colors.grey100,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 16,
    marginTop: 8,
  },
  flex: {flexDirection: 'row', alignItems: 'center'},
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  textInput: {
    marginLeft: 11,
    width: screenWidth / 1.5,
    color: Colors.lightGrey,
    textAlign: 'right',
  },
  textImageContainer: {paddingHorizontal: 20, paddingBottom: 5},
  textImageContainer2: {paddingHorizontal: 20},
  viewOnMap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  imageStyle: {
    width: screenWidth / 1.15,
    backgroundColor: 'red',
    height: screenHeight / 6,
    marginVertical: 10,
    alignSelf: 'center',
  },
  descInput: {
    height: 141,
    borderColor: Colors.grey100,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 5,
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
    textAlign: 'right',
    paddingHorizontal: 10,
    color:"black"
  },
});

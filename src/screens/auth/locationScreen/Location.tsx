import {
  Alert,
  AppState,
  BackHandler,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  PermissionsAndroid, Platform
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Images} from '../../../assets/images';
import {Colors} from '../../../utils/colors/colors';
import {screenHeight, screenWidth} from '../../../utils/dimensions';
import CustomText from '../../../components/text/CustomText';
import strings from '../../../utils/strings/strings';
import CustomButton from '../../../components/button/CustomButton';
import CustomInput from '../../../components/input/CustomInput';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getUserType} from '../../../Redux/Reducers/UserTypeSlice';
import Geolocation from 'react-native-geolocation-service';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import AppToast from '../../../components/appToast/AppToast';
import {staticLocations, staticlocations} from '../../../config/LocationsData';
import DropDownPicker from 'react-native-dropdown-picker';
import {useAddLocationMutation} from '../../../Redux/services/auth/AuthApi';
import {setDataInLocalStorage} from '../../../utils/mmkv/MMKV';
import {setUser} from '../../../Redux/Reducers/UserSlice';
import {MMKV_KEYS} from '../../../constants/MMKV_KEY';
import {changeStack} from '../../../navigators/NavigationService';
import { ActivityIndicator } from 'react-native-paper';

const Location = ({navigation}) => {
  const dispatch = useDispatch();
  const bottomSheetRef = useRef<RBSheet>(null);

  // States
  const [addLocationAPI, { isLoading }] = useAddLocationMutation();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationCoords, setLocationCoords] = useState(null);
  console.log("first",locationCoords,selectedLocation)
  const [address, setAddress] = useState('');
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  console.log("locationCoords",locationCoords)
  console.log("address",address)
  // Request location permission
  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      return true;
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
  };

const [lod, setLod] = useState(false)

  // Get the user's current location
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        // setLocationCoords(position.coords);
        const { latitude, longitude } = position.coords;
        setLocationCoords({ latitude, longitude });
        getAddressFromCoordinates(latitude, longitude);

        console.log(latitude, longitude, 'khi',"fsdf")
        handleAddLocation('khi',latitude, longitude)
        // navigation.navigate(strings.uploaddocsscreen);
        setLod(false)
      },
      (error) => {
        console.error('Location error:', error);
        if (error.code === 1) {
          AppToast({ type: 'error', message: error.message });
          handlePermissionError();
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  };
  const getAddressFromCoordinates = async (latitude, longitude) => {
    const API_KEY = 'AIzaSyAvHAetjATvxwlJPmApeheUlEcbUjXeoR8'; 
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`;
    console.log("url",url)
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const address = data.results[0].formatted_address;
        setAddress(address);
        setLod(false)
      } else {
        setAddress('Address not found');
      }
    } catch (error) {
      console.error(error);
    }
  };
  // Handle permission error and show alert
  const handlePermissionError = () => {
    Alert.alert(
      'Location Permission Denied',
      'We need access to your location to provide better service. Please enable location services in your settings.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => openSettings() },
      ],
      { cancelable: false }
    );
  };

  // Initialize permissions and get location on screen load
  const currentLocation= async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        setHasLocationPermission(true);
        getLocation();
      } else {
        setHasLocationPermission(false);
        handlePermissionError();
      }
  }
  // useEffect(() => {
    
  //   initializeLocation();
  // }, []);

  // Add location handler
  const handleAddLocation = (city, lat, long) => {
    console.log("re",city,lat,long)
    if (selectedLocation || locationCoords) {
      const formData = new FormData();
      formData.append('city', city);
      formData.append('locationlat', lat);
      formData.append('locationlong', long);

      addLocationAPI(formData)
        .unwrap()
        .then((response) => {
          // dispatch(setUser(response?.user));
          // setDataInLocalStorage(MMKV_KEYS.USER_DATA, response?.user);
          // changeStack('AppStack');
          navigation.navigate(strings.uploaddocsscreen);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      AppToast({ type: 'error', message: 'Select Location' });
    }
  };
  console.log("selectedLocation",selectedLocation)

  //Main Return
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <Image
        style={{marginTop: screenHeight * 0.09}}
        source={Images.currentloc}
      />

      <CustomText
        size={24}
        fontWeight="bold"
        style={{marginTop: 25}}
        text={strings.whatloction}
      />
      <CustomText
        color={Colors.lightGrey}
        style={{marginVertical: 15}}
        text={strings.needlocation}
      />
      {/* <CustomInput
        value={value}
        setValue={setValue}
        open={open}
        setOpen={setOpen}
        items={items}
        setItems={setItems}
        dropdownPlaceholder={strings.allcities}
        label={strings.selectcity}
        errorIndicator={false}
      /> */}
      <CustomText
        text={strings.selectcity}
        style={{textAlign: 'left', width: '82%'}}
      />
      <Pressable
        onPress={() => {
          bottomSheetRef?.current?.open();
        }}
        style={styles.inputButtonCity}>
        <CustomText text={selectedLocation?.name_ar || strings.allcities} />
        <Image source={Images.arrow_Down_Bold} />
      </Pressable>
      <Pressable
        style={styles.currentLocation}
        // onPress={() =>
        //   handleAddLocation(
        //     '',
        //     locationCoords?.latitude,
        //     locationCoords?.longitude,
        //   )
        // }
        >
          {
            lod?
            <ActivityIndicator/>
            :
            <Image style={{marginRight: 10}} source={Images.locationmark} />
          }
        <TouchableOpacity
        onPress={()=>{currentLocation(),setLod(true)}}
        >
          <CustomText size={16} text={strings.usecurrenloc} />
        </TouchableOpacity>
      </Pressable>
      <CustomButton
        onPress={() => {
          if(selectedLocation != null){
            handleAddLocation(
              selectedLocation?.name_ar,
              selectedLocation?.center[0],
              selectedLocation?.center[1],
            );
          }
          else if(selectedLocation == null){
            AppToast({ type: 'error', message: 'Please Select City' });
          }
          else{
            AppToast({ type: 'error', message: 'something went wrong' });
          }
        }}
        isLoader={isLoading}
        style={{marginTop: 20}}
        text={strings.addLocation}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate(strings.manuallocationscreen)}
        activeOpacity={strings.buttonopacity}>
        <CustomText
          size={18}
          color={Colors.primary}
          style={{marginTop: 15}}
          text={strings.enterlocman}
        />
      </TouchableOpacity>
      <RBSheet
        ref={bottomSheetRef}
        height={screenHeight / 1.2}
        openDuration={500}
        closeOnDragDown={true}
        dragFromTopOnly={true}
        closeOnPressMask={true}
        animationType="slide"
        customStyles={{
          draggableIcon: {
            backgroundColor: Colors.grey100,
            width: screenWidth / 4,
          },
        }}>
        <View>
          <CustomText
            text={strings.allcities}
            size={18}
            style={{alignSelf: 'center'}}
          />
          <ScrollView contentContainerStyle={styles.sheetScrollContainer}>
            <CustomText
              color={Colors.lightGrey}
              text={strings.searchresult}
              style={{textAlign: 'left'}}
            />
            {staticLocations?.map(item => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedLocation(item);
                    bottomSheetRef?.current?.close();
                  }}>
                  <View
                    style={{
                      marginLeft: 20,
                      marginTop: 10,
                      borderBottomColor: Colors.grey100,
                      borderBottomWidth: 0.5,
                      width: '90%',
                      alignSelf: 'center',
                      // paddingHorizontal: 10,
                    }}>
                    <View style={styles.locContainer}>
                      <Image
                        style={{marginRight: 5, width: 17, height: 17}}
                        source={Images.locationmark}
                      />
                      <CustomText
                        size={16}
                        text={item?.name_ar}
                        style={{textAlign: 'left'}}
                      />
                    </View>

                    <CustomText
                      color={Colors.lightGrey}
                      text={item?.name_ar}
                      style={{textAlign: 'left'}}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </RBSheet>
    </ScrollView>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  sheetScrollContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingHorizontal: 34,
  },
  inputButtonCity: {
    borderColor: Colors.grey100,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 50,
    width: screenWidth / 1.2,
  },
  locContainer: {
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    width: '82%',
  },
});

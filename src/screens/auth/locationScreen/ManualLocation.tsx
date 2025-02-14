import {
  Alert,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../components/header/Header';
import strings from '../../../utils/strings/strings';
import {Images} from '../../../assets/images';
import {Colors} from '../../../utils/colors/colors';
import {screenWidth} from '../../../utils/dimensions';
import CustomText from '../../../components/text/CustomText';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {getUserType} from '../../../Redux/Reducers/UserTypeSlice';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const ManualLocation = () => {
  const checkType = useSelector(getUserType);
  // const [searchTerm, setSearchTerm] = useState('');
  // const [locations, setLocations] = useState([]);
  // const [selectedLocation, setSelectedLocation] = useState(null);
  const [location, setLocation] = useState({
    lat: null,
    lng: null,
    address: '',
  });
  const navigation: any = useNavigation();

  // MAIN RETURN
  return (
    <View style={styles.container}>
      <Header heading={strings?.enteryourlocation} />
      <View style={styles.input}>
        <View style={styles.flex}>
          <Image source={Images.search} />
          <TextInput
            style={styles.textInput}
            placeholder={strings.goldenavnue}
            placeholderTextColor={Colors.lightGrey}
          />
        </View>
        <Image source={Images.cross} />
      </View>
      {/* <GooglePlacesAutocomplete
        placeholder="Enter location"
        onPress={(data, details = null) => {
          // 'data' contains the description and place ID
          // 'details' contains additional information about the place
          console.log(data);
          console.log(details);
        }}
        query={{
          key: 'AIzaSyAvHAetjATvxwlJPmApeheUlEcbUjXeoR8', // Replace with your API key
          language: 'en',
        }}
        fetchDetails={true} // Fetch details about the location
        styles={{
          textInput: styles.textInput,
        }}
      /> */}
      {/* <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        onPress={(data, details = null) => {
          Alert.alert('dkjfksdjfk');
          console.log(data, 'details', details);
          // Get the latitude and longitude from details
          const lat = details.geometry.location.lat;
          const lng = details.geometry.location.lng;

          // Set the location state
          setLocation({
            lat,
            lng,
            address: data.description, // Get address
          });

          console.log('Location:', {lat, lng, address: data.description});
        }}
        query={{
          key: 'AIzaSyAvHAetjATvxwlJPmApeheUlEcbUjXeoR8', // Replace with your Google Maps API key
          language: 'en',
          components: 'country:ae', // Restrict to UAE
        }}
        styles={{
          container: {
            flex: 1,
          },
          textInputContainer: {
            width: '100%',
          },
          textInput: {
            height: 40,
            color: '#5d5d5d',
            fontSize: 16,
            backgroundColor: 'red',
          },
          listView: {
            backgroundColor: 'blue',
          },
        }}
      /> */}
      <View style={styles.currentLocation}>
        <Image style={{marginRight: 10}} source={Images.locationmark} />
        <CustomText size={16} text={strings.usecurrenloc} />
      </View>
      <View style={styles.divider} />
      <View style={{marginLeft: 20, marginTop: 10}}>
        <CustomText color={Colors.lightGrey} text={strings.searchresult} />
        <View style={styles.locContainer}>
          <Image
            style={{marginRight: 5, width: 17, height: 17}}
            source={Images.locationmark}
          />
          <CustomText size={16} text={strings.goldenavnue} />
        </View>
        <TouchableOpacity
          onPress={() => {
            checkType == 'user'
              ? navigation.navigate('UserStack', {
                  screen: strings.user_Bottom_Stack,
                })
              : navigation.navigate(strings.uploaddocsscreen);
          }}>
          <CustomText color={Colors.lightGrey} text={strings.prestonroad} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ManualLocation;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.grey100,
    borderWidth: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    borderRadius: 6,
    marginHorizontal: 20,
    paddingVertical: 10,
    marginTop: 12,
  },
  flex: {flexDirection: 'row', alignItems: 'center'},
  textInput: {
    marginLeft: 11,
    width: screenWidth / 1.5,
  },
  divider: {
    borderTopColor: Colors.grey100,
    borderTopWidth: 1,
    marginHorizontal: 20,
  },
  currentLocation: {flexDirection: 'row', alignItems: 'center', padding: 20},
  locContainer: {
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

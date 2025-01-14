import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {Colors} from '../../utils/colors/colors';
import {screenWidth} from '../../utils/dimensions';
import strings from '../../utils/strings/strings';
import FooterTwoButton from '../footerTwoButton/FooterTwoButton';
import {Images} from '../../assets/images';
import TextWithImage from '../textWithImage/TextWithImage';
import CustomText from '../text/CustomText';
import ToggleButton from '../toggle/ToggleButton';
import {ProfileDetailBoxPropsTypes} from './types';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../button/CustomButton';
import Utility from '../../utils/utility/Utility';
import AppToast from '../appToast/AppToast';
import { useBookingStatusMutation } from '../../Redux/services/app/AppApi';
const ProfileDetailBox: FC<ProfileDetailBoxPropsTypes> = ({
  itemData,
  dateText,
  hideToggle,
  isOn,
  image,
  onPress,
  onToggle,
}) => {
  // console.log("itemData",itemData.service.category_detail.image)
  const serviceImage=Utility.getImageUrl(itemData?.service?.category_detail?.image)
  // console.log("dateText",dateText)
  console.log("serviceImage",serviceImage)
  // console.log("hideToggle",hideToggle)
  // console.log("isOn",isOn)
  // console.log("onPress",onPress)
  // console.log("image",image)
  // console.log("onToggle",onToggle)
  const navigation: any = useNavigation();
  const handlePress = () => {
    navigation.navigate(strings.bookingDetails_screen, {
      bookingDetail: itemData,
    });
  };
    const [bookingStatus, {isLoading,error}] = useBookingStatusMutation();
  
  const BookingStatusApi = (status,navigationIndex) => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status);

bookingStatus(formData)
  ?.unwrap()
  .then(response => {
    AppToast({ type: 'success', message: response?.status });
    navigation.navigate("الحجوزات",navigationIndex)
  })
  .catch(error => {
    console.log("Error:", error);
    AppToast({ type: 'error', message: error });
  });

  };

  const handleCancel=()=>{
      Alert.alert(
                              'Cancel Booking',
                              'Are you sure to cancel the booking?',
                              [
                                { text: 'No' },
                                {
                                  text: 'Yes',
                                  onPress: () =>
                                    BookingStatusApi('Cancel',3)
                                },
                              ]
                            );
        };
  // Destructuring Data
  const {
    date,
    address,
    starttime,
    endtime,
    status,
    travelcost,
    total_price,
    id,
    artist,
  } = itemData || {};
  console.log("status p",status)

  return (
    <View style={styles.boxContainer}>
      <View style={styles.toggleContainer}>
        {hideToggle ? (
          <Text style={{color: 'transparent'}}></Text>
        ) : (
          <ToggleButton
            labelText={strings.remind_Me}
            onToggle={onToggle}
            isOn={isOn}
          />
        )}
        <CustomText text={`${date} - ${starttime}`} />
      </View>
      <View style={styles.divider} />

      <View style={styles.detailContainer}>
        <View style={styles.nameContainer}>
          <CustomText text={artist} size={14} style={{textAlign: 'right'}} />
          <TextWithImage path={Images.location_Mark} text={address} />
          <TextWithImage path={Images.check_Image} text={strings.service_id+ itemData.id} />
        </View>
        <Image style={{marginHorizontal: 10}} source={{uri: serviceImage}} width={86} height={86} />
        {/* <Image style={{marginHorizontal: 10}} source={{uri:'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg'}} /> */}
      </View>
      <View style={styles.divider} />
      {hideToggle || status=='Cancel' || status == 'Complete' ? (
        <CustomButton style={styles.button} text={strings.view_Detail} />
      ) : (
        <FooterTwoButton
          onPressRight={()=>handlePress()}
          onPressLeft={()=>{
            handleCancel()
          }}
          marginTop={5}
          textRight={strings.view_Detail}
          textLeft={strings.cancle}
        />
      )}
    </View>
  );
};

export default ProfileDetailBox;

const styles = StyleSheet.create({
  boxContainer: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 0.5,
    padding: 10,
    marginHorizontal: 10,
    marginTop: '7%',
  },
  button: {width: '100%', marginVertical: 10, marginRight: 10},

  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  divider: {
    borderTopWidth: 0.5,
    borderTopColor: Colors.lightGrey,
    width: screenWidth / 1.35,
    margin: 10,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  nameContainer: {
    marginBottom: 10,
    marginRight: 5,
  },
});

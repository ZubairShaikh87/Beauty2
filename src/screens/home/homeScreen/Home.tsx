import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../../utils/colors/colors';
import strings from '../../../utils/strings/strings';
import {Images} from '../../../assets/images';
import CustomText from '../../../components/text/CustomText';
import DetailCard from '../../../components/detailCard/DetailCard';
import DropDownPicker from 'react-native-dropdown-picker';
import {screenWidth} from '../../../utils/dimensions';
import ToggleSwitch from 'toggle-switch-react-native';
// import {BookingData} from '../../../utils/dummyData';
import HomeCards from '../../../components/HomeCard/HomeCards';
import CustomeType from '../../../components/CustomType/CustomeType';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {getUserType} from '../../../Redux/Reducers/UserTypeSlice';
import {
  useArtistAvailablityMutation,
  useLazyGetArtistAvailablityQuery,
  useLazyGetArtistsHomeDataQuery,
  useLazyGetArtistsStatusQuery,
} from '../../../Redux/services/app/AppApi';
import AppToast from '../../../components/appToast/AppToast';

const Home = () => {
  //API initialization
  const [artistAvailabilityApi] = useArtistAvailablityMutation();
  const [artistStatusApi, {isLoading}] = useLazyGetArtistsStatusQuery();
  const [getArtistAvailability] = useLazyGetArtistAvailablityQuery();
  const [artistHomeDataApi] = useLazyGetArtistsHomeDataQuery();
  const navigation: any = useNavigation();
  const [open, setOpen] = useState(false);
  const userType = useSelector(getUserType);
  const [toggleState, setToggleState] = useState(true);
  const [artistStatus, setArtistStatus] = useState();
  const [homeData, setHomeData] = useState();
  const [value, setValue] = useState(strings.newyork);
  const [items, setItems] = useState([
    {label: strings.newyork, value: strings.newyork},
    {label: 'Banana', value: 'banana'},
    {label: 'Pear', value: 'pear'},
  ]);
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(strings.thismonth);
  const [items1, setItems1] = useState([
    {label: strings.thismonth, value: strings.thismonth},
    {label: 'الجميع', value: 'all'},
  ]);

  useEffect(() => {
    GetArtistStatus();
    GetArtistAvailability();
  }, []);
  const GetArtistStatus = () => {
    artistStatusApi('')
      ?.unwrap()
      ?.then(response => {
        const {status} = response;
        setArtistStatus(status);
      })
      .catch(() => {});
  };
  const handleToggle = (isOn: boolean) => {
    ArtistAvailability(isOn);
    setToggleState(isOn);
  };
  useEffect(() => {
    GetArtistHomeData();
  }, []);
  const GetArtistHomeData = () => {
    artistHomeDataApi('')
      ?.unwrap()
      ?.then(response => {
        console.log(response, 'GetArtistHomeData');
        setHomeData(response);
        // AppToast({
        //   type: 'success',
        //   message: response?.status,
        // });
      })
      .catch(() => {});
  };
  const ArtistAvailability = (isOn: boolean) => { 
    const availabilty = isOn ? 'On' : 'Off';
    const formData = new FormData();
    formData.append('availibilty', availabilty);
    artistAvailabilityApi(formData)
      ?.unwrap()
      ?.then(response => {
        GetArtistAvailability();
        AppToast({
          type: 'success',
          message: response?.status,
        });
      })
      .catch(error => {
        console.error(error, 'Error updating artist availability');
      });
  };
  
  const GetArtistAvailability = () => {
    getArtistAvailability('')
      ?.unwrap()
      ?.then(response => {
        const { status } = response;
        const Status = status === 'On';
        setToggleState(Status);
      })
      .catch(error => {
        console.error(error, 'Error fetching artist availability');
      });
  };
  
  const BookingData = [
    {
      count: homeData?.Activebooking,
      heading: 'الحجوزات النشطة',
    },
    {
      count: homeData?.Totalbooking,
      heading: 'مجموع حجوزات',
    },
    {
      count: homeData?.Totalviews,
      heading: 'إجمالي العرض',
    },
    {
      count: homeData?.Totalfav,
      heading: 'مجموع المفضلة',
    },
  ];
  const renderItem = (item: any, index: number) => {
    return (
      <View style={{paddingVertical: 6, paddingHorizontal: 4}}>
        <DetailCard
          bgcolor={index === 0 ? Colors.primary : Colors.white}
          countColor={index === 0 ? Colors.white : Colors.primary}
          headingColor={index === 0 ? Colors.white : Colors.primary}
          count={item?.count}
          heading={item?.heading}
        />
      </View>
    );
  };
  return (
    <View style={styling.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomText
          color={Colors.lightGrey}
          size={14}
          text={strings?.location}
        />
        <Pressable
          style={[styling.flex, {paddingVertical: 10, gap: 10}]}
          onPress={() => {
            navigation.navigate('ManualLocation');
          }}>
          <Image source={Images.location} />
          <CustomText text={strings.newyork} />
          {/* <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={styling.locDropdown}
            placeholder={strings.location}
            placeholderStyle={{color: Colors.lightGrey}}
            listMode="MODAL"
          /> */}
        </Pressable>
        <TouchableOpacity
          activeOpacity={strings.buttonopacity}
          onPress={() =>
            navigation.navigate(
              userType === 'user'
                ? strings.userNotificationsScreen
                : strings.notification_screen,
            )
          }
          style={styling.bell}>
          <Image source={Images.bell} />
        </TouchableOpacity>
        <View style={styling.approve(artistStatus)}>
          <Image style={{marginRight: 5}} source={Images.tick} />
          <CustomText
            size={14}
            color={Colors.white}
            text={strings.profileapprove}
          />
        </View>
        <View style={styling.online}>
          <CustomText size={13} text={strings.setavailability} />
          <View style={styling.rowContainer}>
            
            {toggleState?
              <CustomText
                color={Colors.green}
                style={{marginRight: 6}}
                size={13}
                text={strings.online}
              />
            :
              <CustomText
                color={Colors.textColorRed}
                style={{marginRight: 6}}
                size={13}
                text={strings.offline}
              />
            }
            <ToggleSwitch
              isOn={toggleState}
              onToggle={handleToggle}
              onColor={Colors.primary}
              offColor={Colors.lightGrey}
              size="small"
            />
          </View>
        </View>
        <FlatList
          scrollEnabled={false}
          data={BookingData}
          numColumns={2}
          renderItem={({item, index}) => renderItem(item, index)}
        />
        <View style={styling.price}>
          <CustomText
            size={24}
            style={{width: 95}}
            color={Colors.primary}
            fontWeight="bold"
            text={value1=="This Month"? homeData?.Thismonth + ' ' + strings.sr:homeData?.Allmonths + ' ' + strings.sr}
          />
          <View>
            <CustomText
              style={styling.marginText}
              text={strings.myearning}
              size={16}
              color={Colors.primary}
            />
            <DropDownPicker
              open={open1}
              value={value1}
              items={items1}
              setOpen={setOpen1}
              setValue={setValue1}
              setItems={setItems1}
              labelStyle={{color: Colors.primary, fontSize: 16}}
              style={styling.monthdropDown}
              placeholder={strings.location}
              placeholderStyle={{color: Colors.lightGrey}}
              listMode="SCROLLVIEW"
            />
          </View>
        </View>
        <View style={styling.seeAllView}>
          <CustomText size={14} text={strings.seeall} />
          <CustomText
            size={16}
            text={strings.myservices + ` (${homeData?.services?.length})`}
          />
        </View>
        <FlatList
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={homeData?.services}
          renderItem={({item, index}) => {
            return <HomeCards data={item} />;
          }}
        />
        {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <HomeCards />
          <HomeCards />
          <HomeCards />
        </ScrollView> */}
        {/* <View style={styling.seeAllView}>
          <CustomText size={14} text={strings.seeall} />
          <CustomText
            size={16}
            text={strings.myservices + ` (${homeData?.services?.length})`}
          />
        </View>
        <CustomeType
          bgColor={Colors.white}
          text={strings.type20}
          textName={strings.hair_Cut}
        />
        <CustomeType
          bgColor={Colors.white}
          text={strings.type12}
          textName={strings.hair_Coloring}
        />
        <CustomeType
          bgColor={Colors.white}
          text={strings.type08}
          textName={strings.hair_Wash}
        />
        <CustomeType
          bgColor={Colors.white}
          text={strings.type20}
          textName={strings.hair_Cut}
        />
        <CustomeType
          bgColor={Colors.white}
          text={strings.type12}
          textName={strings.hair_Coloring}
        />
        <CustomeType
          bgColor={Colors.white}
          text={strings.type08}
          textName={strings.hair_Wash}
        /> */}
      </ScrollView>
    </View>
  );
};

export default Home;

const styling = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },
  rowContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  buttonStyle: {width: screenWidth / 6, marginLeft: '9%'},
  textStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  seeAllView: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  marginText: {
    marginBottom: 5,
    paddingRight: 10,
    textAlign: 'right',
  },
  borderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: Colors.white,
    borderColor: Colors.grey100,
  },
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  specialOfferText: {width: screenWidth / 4},
  loc: {
    color: Colors.lightGrey,
  },
  center: {
    alignItems: 'center',
  },
  flex: {flexDirection: 'row', alignItems: 'center'},
  locDropdown: {
    borderColor: 'transparent',
    width: screenWidth / 1.5,
    backgroundColor: 'transparent',
  },
  approve: isApproved => ({
    backgroundColor:
      isApproved === 'Accepted' ? Colors.green : Colors.textColorRed,
    flexDirection: 'row',
    padding: 10,
    borderRadius: 8,
    marginBottom: 18,
  }),
  online: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderColor: Colors.grey100,
    borderWidth: 1,
  },
  price: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    marginTop: 7,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    zIndex: 100,
  },
  monthdropDown: {
    borderColor: 'transparent',
    width: screenWidth / 4,
    backgroundColor: 'transparent',
    flexDirection: 'row-reverse',
    zIndex: 10000,
  },
  bell: {position: 'absolute', right: 0, top: 15},
});

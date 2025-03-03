import {Alert, FlatList, Image, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import ArtistBrand from '../../../components/artistBrand/ArtistBrand';
import ArtistDetail from '../../../components/artistDetail/ArtistDetail';
import strings from '../../../utils/strings/strings';
import {Colors} from '../../../utils/colors/colors';
import Header from '../../../components/header/Header';
import CustomText from '../../../components/text/CustomText';
import {nearAtristDetail, topAtristDetail} from '../../../utils/dummyData';
import {useLazyGetArtistsForServiceQuery} from '../../../Redux/services/app/AppApi';
import { Images } from '../../../assets/images';
import { screenWidth } from '../../../utils/dimensions';
import DetailCard from '../../../components/detailCard/DetailCard';
import ButtonWithImage from '../../../components/buttonWithImage/ButtonWithImage';

const OnlineStores = ({route}: {route: Object}) => {
   const navigation: any = useNavigation();
  const BookingData = [
    {
      count: '05',
      heading: 'إجمالي المشاهدات',
    },
    {
      count: '345',
      heading: 'إجمالي الإشارات المرجعية',
    },
    
  ];
  const renderItem = (item: any, index: number) => {
    return (
      <View style={{paddingVertical: 6, paddingHorizontal: 4}}>
        <DetailCard
          bgcolor={index === 0 ? Colors.white : Colors.primary}
          countColor={index === 0 ? Colors.primary : Colors.white}
          headingColor={index === 0 ? Colors.primary : Colors.white}
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
        </Pressable>
        <FlatList
                  scrollEnabled={false}
                  data={BookingData}
                  numColumns={2}
                  renderItem={({item, index}) => renderItem(item, index)}
                />
                <View style={styling.noStore}>
            <Image source={Images.calendar_clock} />
            <CustomText
              style={styling.textStyle}
              text={'No Store Added'}
              size={20}
              color='#262626'
            />
            <CustomText
              style={styling.loriumText}
              text={strings.loriumText}
              size={14}
            />
          <ButtonWithImage
          text={strings.addService}
          fontWeihgt="900"
          imageStyle={styling.buttonStyle}
          width={screenWidth / 1.6}
          borderRadius={30}
          paddingVerticel={10}
          onPress={() => navigation.navigate('OnlineStoresDetail')}
        />
          </View>
      </ScrollView>
      </View>
  );
};

export default OnlineStores;


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
  buttonStyle: {width: 20, height: 20},
  textStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
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
  loriumText: {color: Colors.lightGrey, fontWeight: 'bold', textAlign: 'center'},
  noStore:{alignItems:"center",marginTop:50}
});

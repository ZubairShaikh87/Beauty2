import {Alert, FlatList, ScrollView, StyleSheet, View} from 'react-native';
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

const OnlineStores = ({route}: {route: Object}) => {
  const navigation: any = useNavigation();
  const {itemData} = route?.params;
  // Alert.alert(JSON.stringify(itemData?.id));
  //API initialization
  const [getArtist] = useLazyGetArtistsForServiceQuery();
  // States
  const [artistList, setArtistList] = useState([]);
  useEffect(() => {
    // itemData?.id && getArtist(itemData?.id);
    itemData?.id && GetArtist(itemData?.id);
  }, []);
  const GetArtist = (serviceId: string) => {
    getArtist(serviceId)
      .unwrap()
      ?.then(response => {
        const {data} = response;

        const getArtistsList = data?.reduce((acc, item) => {
          if (item?.artist) {
            const existingArtist = acc?.find(
              artist => artist?.id === item?.artist?.id,
            );
            if (existingArtist === undefined) {
              acc?.push(item?.artist);
            }
          }
          return acc;
        }, []);
        setArtistList(getArtistsList);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const renderItemTopArtist = (item: any, index: number) => {
    return (
      <ArtistBrand
        onPress={() => navigation.navigate(strings.userArtist)}
        image={item?.img}
        heading={item?.heading}
        distance={item?.distance}
        time={item?.time}
      />
    );
  };
  const renderItemNearArtist = (item: any, index: number) => {
    return (
      <ArtistDetail
        artistDetail={item}
        image={item?.img}
        heading={item?.heading}
        distance={item?.distance}
        time={item?.time}
        desc={item?.desc}
        address={item?.address}
      />
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <Header heading={itemData?.category} />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {/* <View style={[styles.searchContainer, {marginTop: 8}]}>
          <CustomText size={18} text={strings.toprated} />
          <CustomText size={13} color={Colors.primary} text={strings.seeall} />
        </View> */}
        {/* <FlatList
          style={{marginTop: 10, marginLeft: 15}}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={topAtristDetail}
          renderItem={({item, index}) => renderItemTopArtist(item, index)}
        /> */}
        <View style={[styles.searchContainer, {marginTop: 8}]}>
          <CustomText size={18} text={strings.nearartist} />
          {/* <CustomText size={13} color={Colors.primary} text={strings.seeall} /> */}
        </View>
        <FlatList
          style={styles.nearFlatlist}
          contentContainerStyle={{
            width: '100%',
            paddingHorizontal: 24,
          }}
          data={artistList}
          scrollEnabled={false}
          renderItem={({item, index}) => renderItemNearArtist(item, index)}
        />
      </ScrollView>
    </View>
  );
};

export default OnlineStores;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  nearFlatlist: {
    marginTop: 10,
  },
});

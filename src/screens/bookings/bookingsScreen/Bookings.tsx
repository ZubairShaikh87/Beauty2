import {Alert, Dimensions, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Header from '../../../components/header/Header';
import strings from '../../../utils/strings/strings';
import {Colors} from '../../../utils/colors/colors';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import Upcoming from '../../../navigators/bookingTab/Upcoming';
import Ongoing from '../../../navigators/bookingTab/Ongoing';
import Completed from '../../../navigators/bookingTab/Completed';
import Cancle from '../../../navigators/bookingTab/Cancle';
import {useSelector} from 'react-redux';
import {getUserType} from '../../../Redux/Reducers/UserTypeSlice';
import {
  useLazyArtistBookingsQuery,
  useLazyCustomerBookingsQuery,
  useLazyCustomerCancelBookingsQuery,
  useLazyCustomerCompleteBookingsQuery,
  useLazyCustomerUpcomingBookingsQuery,
} from '../../../Redux/services/app/AppApi';
import { useFocusEffect } from '@react-navigation/native';

const Bookings = ({navigation,route}:any) => {
  // const [statusBool, setStatusBool] = useState(false)
  const indexValue=route?.params;
  console.log("route date",route)
  //API initialization
  const [customerUpcomingApi, {data: customerUpcomingData}] =
    useLazyCustomerUpcomingBookingsQuery();
  const [customerCompletedApi, {data: customerCompletedData}] =
    useLazyCustomerCompleteBookingsQuery();
  const [customerCancelApi, {data: customerCancelData}] =
    useLazyCustomerCancelBookingsQuery();

    const [artistBookingApi, {data: artistBookingData}] =
    useLazyArtistBookingsQuery();
  //Store
  const userType = useSelector(getUserType);
  //Consts
  const isBusiness = userType === 'business' ? true : false;
  // States
  const [index, setIndex] = React.useState(indexValue?indexValue:0);
  console.log("indexValue",indexValue);
  console.log("index",index);
useEffect(() => {
  
}, [index])

  // useFocusEffect(
  //   React.useCallback(() => {
  //     // Fetch updated data here
  //     console.log("indexValue b",indexValue)
  //     setIndex(indexValue)
  //   }, [indexValue])
  // );
  const [routes, setRoutes] = useState([
    { key: 'first', title: strings.upcoming },
    { key: 'second', title: strings.onGoing },
    { key: 'third', title: strings.completed },
    { key: 'fourth', title: strings.cancle },
  ]);
  useEffect(() => {
    setIndex(indexValue !== undefined ? indexValue : 0);
    const updatedRoutes = [
      { key: 'first', title: strings.upcoming },
      { key: 'second', title: strings.onGoing },
      { key: 'third', title: strings.completed },
      { key: 'fourth', title: strings.cancle },
    ];

    setRoutes(updatedRoutes);
  }, [indexValue]);
  /// APIs
  useEffect(() => {
    // Check Type and HIT APIs
    if (isBusiness) {
      index === 0
        ? GetArtistBookingAPI()
        : index === 1
        ? GetArtistBookingAPI()
        : index === 2
        ? GetArtistBookingAPI()
        : GetArtistBookingAPI();
    } else {
      index === 0
        ? GetCustomerUpcomingBookingAPI()
        : index === 1
        ? GetCustomerCompeletedBookingAPI()
        : GetCustomerCancelBookingAPI();
    }
  }, [index]);

  // Artist-Business APIs below
  // upcoming
  const GetArtistBookingAPI = () => {
    artistBookingApi('')
      .unwrap()
      ?.then(res => {
        console.log(res, 'GetArtistBookingAPI restult');
      })
      .catch(error => {
        console.log(error, 'GetArtistBookingAPI catch');
      });
  };
  ///////////////////////////////////////////
  // Customers APIs below
  const GetCustomerUpcomingBookingAPI = () => {
    customerUpcomingApi('')
      .unwrap()
      ?.then(res => {
        console.log(res, 'upcoming api result');
      })
      .catch(error => {
        console.log(error, 'upcoming api catch');
      });
  };
  const GetCustomerCompeletedBookingAPI = () => {
    customerCompletedApi('')
      .unwrap()
      ?.then(res => {
        console.log(res, 'completed api result');
      })
      .catch(error => {
        console.log(error, 'completed api catch');
      });
  };
  const GetCustomerCancelBookingAPI = () => {
    customerCancelApi('')
      .unwrap()
      ?.then(res => {
        console.log(res, 'cancel api result');
      })
      .catch(error => {
        console.log(error, 'cancel api catch');
      });
  };
  ///////////////////////////////////////////////
  // UI functions below
  const renderCustomerScene = SceneMap({
    first: () => <Upcoming data={customerUpcomingData?.data} />,
    second: () => <Ongoing data={customerUpcomingData?.data} />,
    third: () => <Completed data={customerCompletedData?.data} />,
    fourth: () => <Cancle data={customerCancelData?.data} />,
  });
  const renderArtistScene = SceneMap({
    first: () => <Upcoming data={artistBookingData?.data} />,
    second: () => <Ongoing data={artistBookingData?.data} />,
    third: () => <Completed data={artistBookingData?.data} />,
    fourth: () => <Cancle data={artistBookingData?.data} />,
  });
  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      labelStyle={{color: Colors.black}}
      indicatorStyle={{backgroundColor: Colors.primary}}
      style={{backgroundColor: Colors.white}}
    />
  );
  // User TYPE RENDERING CONDITIONS
  const renderScene = isBusiness ? renderArtistScene : renderCustomerScene;

  // MAIN RETURN
  return (
    <View style={styles.container}>
      <Header heading={strings?.booking} searchCircle={true} />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={{width: Dimensions.get('window').width}}
        style={styles.tabView}
      />
    </View>
  );
};

export default Bookings;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  tabView: {
    marginHorizontal: 15,
  },
  scene: {
    flex: 1,
  },
});

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
  useLazyArtistCancelBookingsQuery,
  useLazyArtistCompleteBookingsQuery,
  useLazyArtistUpcomingBookingsQuery,
  useLazyCustomerBookingsQuery,
  useLazyCustomerCancelBookingsQuery,
  useLazyCustomerCompleteBookingsQuery,
  useLazyCustomerUpcomingBookingsQuery,
} from '../../../Redux/services/app/AppApi';
import { useFocusEffect } from '@react-navigation/native';

const Bookings = ({navigation,route}:any) => {
  console.log("route book",route?.params)
  const indexValue=route?.params;
  console.log("index value",indexValue)
  // useEffect(() => {
  //   if (route.params?.response) {
  //     console.log('Received params:', params);
  //   }
  // }, [route.params?.response]);
  const [refresh, setRefresh] = useState(false)
  useFocusEffect(
    useCallback(() => {
      console.log("firstfirstr")
      // This will run whenever this screen comes into focus
      if (route) {
        console.log('Response received in Bookings:', route);
  
        // Handle the response, maybe update state to trigger a re-render
        setRefresh(true);
  
        // Clear the params to avoid re-triggering
        // navigation.setParams({ response: null });
      }
    }, [route, navigation])
  );
  //API initialization
  const [customerUpcomingApi, {data: customerUpcomingData}] =
    useLazyCustomerUpcomingBookingsQuery();
  const [customerCompletedApi, {data: customerCompletedData}] =
    useLazyCustomerCompleteBookingsQuery();
  const [customerCancelApi, {data: customerCancelData}] =
    useLazyCustomerCancelBookingsQuery();
  const [customerBookingApi, {data: customerBookingData}] =
    useLazyCustomerBookingsQuery();

  const [artistOngoingApi, {data: artistOngoingData}] =
    useLazyArtistUpcomingBookingsQuery();
  const [artistCompletedApi, {data: artistCompletedData}] =
    useLazyArtistCompleteBookingsQuery();
  const [artistCancelApi, {data: artistCancelData}] =
    useLazyArtistCancelBookingsQuery();
  const [artistBookingApi, {data: artistBookingData}] =
    useLazyArtistBookingsQuery();
  //Store
  const userType = useSelector(getUserType);
  //Consts
  const isBusiness = userType === 'business' ? true : false;
  console.log("isBusiness",isBusiness)
  // States
  const [index, setIndex] = React.useState(0);
  console.log("indexValue condition",indexValue !=undefined?indexValue:0)
  console.log("indexValue condition1",indexValue)
  const [routes, setRoutes] = useState([
    { key: 'first', title: strings.upcoming },
    { key: 'second', title: strings.onGoing },
    { key: 'third', title: strings.completed },
    { key: 'fourth', title: strings.cancle },
  ]);
  useEffect(() => {
    console.log("IndexValue changed:", indexValue);

    setIndex(indexValue !== undefined ? indexValue : 0);

    const updatedRoutes = [
      { key: 'first', title: strings.upcoming },
      { key: 'second', title: strings.onGoing },
      { key: 'third', title: strings.completed },
      { key: 'fourth', title: strings.cancle },
    ];

    setRoutes(updatedRoutes);
  }, [indexValue]);
  // const [customerRoutes] = React.useState([
  //   {key: 'first', title: strings.upcoming},
  //   {key: 'second', title: strings.completed},
  //   {key: 'third', title: strings.cancle},
  // ]);

  /// APIs
  useEffect(() => {
    console.log("first",index)
    console.log("second2",indexValue)
    // Check Type and HIT APIs
    if (isBusiness) {
      index === 0
        // ? GetArtistUpcomingBookingAPI()
        ? GetArtistBookingAPI()
        : index === 1
        // ? GetArtistOngoingBookingAPI()
        ? GetArtistBookingAPI()
        // ? GetArtistCompletedBookingAPI()
        : index === 2
        // ? GetArtistBookingAPI()
        ? GetArtistBookingAPI()
        // ? GetArtistCompletedBookingAPI()
        // ? GetArtistOngoingBookingAPI()
        : GetArtistBookingAPI();
        // : GetArtistCancelBookingAPI();
    } else {
      index === 0
        ? GetCustomerUpcomingBookingAPI()
        : index === 1
        ? GetCustomerCompeletedBookingAPI()
        : GetCustomerCancelBookingAPI();
    }
  }, [index,indexValue]);

  //Getting All Data but revert for now
  const fetchArtistBookingData = async () => {
    try {
      const [
        upcomingResponse,
        completedResponse,
        cancelResponse,
        bookingResponse,
      ] = await Promise.all([
        customerUpcomingApi('').unwrap(),
        customerCompletedApi('').unwrap(),
        customerCancelApi('').unwrap(),
        customerBookingApi('')?.unwrap(),
      ]);
    } catch (error) {}
  };
  ///

  /// API functions
  //API Functions

  // Artist-Business APIs below
  const GetArtistOngoingBookingAPI = () => {
    artistOngoingApi('')
      .unwrap()
      ?.then(res => {
        console.log(res, 'artist ongoing result');
      })
      .catch(error => {
        console.log(error, 'artist Ongoing catch');
      });
  };
  const GetArtistCompletedBookingAPI = () => {
    artistCompletedApi('')
      .unwrap()
      ?.then(res => {
        console.log(res, 'artist complete api result');
      })
      .catch(error => {
        console.log(error, 'artist complete api catch');
      });
  };
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
  const GetArtistCancelBookingAPI = () => {
    artistCancelApi('')
      .unwrap()
      ?.then(res => {
        console.log(res, 'artist cancel api resutl');
      })
      .catch(error => {
        console.log(error, 'artist cancel api catch');
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
  const GetCustomerBookingAPI = () => {
    customerBookingApi('')
      .unwrap()
      ?.then(res => {
        console.log(res, 'RESDFD');
      })
      .catch(error => {
        console.log(error, 'sdjfkdsjfk');
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
    // second: () => <Ongoing data={artistOngoingData?.data} />,
    // third: () => <Completed data={artistCompletedData?.data} />,
    // fourth: () => <Cancle data={artistCancelData?.data} />,
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
  // const Routes = isBusiness ? artistRoutes : customerRoutes;
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

import * as React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Header from '../../../components/header/Header';
import {Colors} from '../../../utils/colors/colors';
import strings from '../../../utils/strings/strings';
import CustomText from '../../../components/text/CustomText';
import NamePriceComponent from '../NamePriceComponent';
import {useNavigation} from '@react-navigation/native';
import WaletBox from '../WaletBox';
import {
  useLazyArtistEarningsQuery,
  useLazyArtistPendingEarningsQuery,
} from '../../../Redux/services/app/AppApi';

const FirstRoute = ({data}) => (
  // <ScrollView showsVerticalScrollIndicator={false}>

  //   <NamePriceComponent
  //     priceText={'+ ' + strings.price}
  //     textColor={Colors.textColor}
  //   />
  //   <NamePriceComponent
  //     priceText={'- ' + strings.saudiaPrice}
  //     textColor={Colors.textColorRed}
  //   />
  //   <NamePriceComponent
  //     priceText={'+ ' + strings.price}
  //     textColor={Colors.textColor}
  //   />
  //   <NamePriceComponent
  //     priceText={'+ ' + strings.price}
  //     textColor={Colors.textColorRed}
  //   />
  //   <NamePriceComponent
  //     priceText={'+ ' + strings.price}
  //     textColor={Colors.textColor}
  //   />
  //   <NamePriceComponent
  //     priceText={'+ ' + strings.price}
  //     textColor={Colors.textColorRed}
  //   />
  // </ScrollView>
  <FlatList
    data={data}
    renderItem={({item, index}) => (
      <NamePriceComponent
        priceText={'+' + item?.total_price + strings.rs}
        textColor={Colors.textColor}
        title={item?.title}
        description={item?.description}
      />
    )}
  />
);

const SecondRoute = ({data}) => (
  // <ScrollView showsVerticalScrollIndicator={false}>
  //   <NamePriceComponent
  //     priceText={'+ ' + strings.price}
  //     textColor={Colors.textColor}
  //   />
  //   <NamePriceComponent
  //     priceText={'+ ' + strings.price}
  //     textColor={Colors.textColor}
  //   />
  //   <NamePriceComponent
  //     priceText={'- ' + strings.saudiaPrice}
  //     textColor={Colors.textColorRed}
  //   />
  //   <NamePriceComponent
  //     priceText={'+ ' + strings.price}
  //     textColor={Colors.textColor}
  //   />
  //   <NamePriceComponent
  //     priceText={'+ ' + strings.price}
  //     textColor={Colors.textColorRed}
  //   />
  //   <NamePriceComponent
  //     priceText={'+ ' + strings.price}
  //     textColor={Colors.textColor}
  //   />
  //   <NamePriceComponent
  //     priceText={'+ ' + strings.price}
  //     textColor={Colors.textColorRed}
  //   />
  // </ScrollView>
  <FlatList
    data={data}
    renderItem={({item, index}) => (
      <NamePriceComponent
        priceText={'+' + item?.total_price + strings.rs}
        textColor={Colors.textColor}
        title={item?.title}
        description={item?.description}
      />
    )}
  />
);
// const ThirdRoute = () => (
//   <ScrollView showsVerticalScrollIndicator={false}>
//     <NamePriceComponent
//       priceText={'+ ' + strings.price}
//       textColor={Colors.textColor}
//     />
//     <NamePriceComponent
//       priceText={'+ ' + strings.price}
//       textColor={Colors.textColor}
//     />
//     <NamePriceComponent
//       priceText={'- ' + strings.saudiaPrice}
//       textColor={Colors.textColorRed}
//     />
//     <NamePriceComponent
//       priceText={'+ ' + strings.price}
//       textColor={Colors.textColor}
//     />
//     <NamePriceComponent
//       priceText={'+ ' + strings.price}
//       textColor={Colors.textColorRed}
//     />
//     <NamePriceComponent
//       priceText={'+ ' + strings.price}
//       textColor={Colors.textColor}
//     />
//     <NamePriceComponent
//       priceText={'+ ' + strings.price}
//       textColor={Colors.textColorRed}
//     />
//   </ScrollView>
// );

const Earnings = () => {
  const [artistEarningsApi, {data: earningsData}] =
    useLazyArtistEarningsQuery();
  const [artistPendingEarnings, {data: pendingEarningsData}] =
    useLazyArtistPendingEarningsQuery();
  console.log(earningsData?.Earning, 'earningsData');
  const navigation: any = useNavigation();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: strings.earning},
    {key: 'second', title: strings.pendigEarnings},
    // {key: 'third', title: strings.widthraw},
  ]);
  React.useEffect(() => {
    artistEarningsApi('')?.unwrap();
    artistPendingEarnings()?.unwrap();
  }, [navigation]);
  const renderScene = SceneMap({
    first: () => <FirstRoute data={earningsData?.Earning} />,
    second: () => <SecondRoute data={pendingEarningsData?.Earning} />,
    // third: ThirdRoute,
  });
  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      labelStyle={{color: Colors.black}}
      indicatorStyle={{backgroundColor: Colors.primary}}
      style={{backgroundColor: Colors.white}}
    />
  );
  return (
    <View style={styles.container}>
      <Header heading={strings?.earning} />
      <WaletBox />
      <TouchableOpacity
        style={{marginHorizontal: 15}}
        onPress={() => navigation.navigate(strings.myServices)}>
        <CustomText
          style={{textAlign: 'left', marginTop: 10}}
          color={Colors.walletText}
          size={14}
          text={strings.paymentHistory}
        />
      </TouchableOpacity>
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

export default Earnings;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  tabView: {
    marginHorizontal: 15,
  },
  scene: {
    flex: 1,
  },
});

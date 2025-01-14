import {Dimensions, StyleSheet, View} from 'react-native';
import React from 'react';
import Header from '../../../components/header/Header';
import strings from '../../../utils/strings/strings';
import {Colors} from '../../../utils/colors/colors';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import Coming from '../../../navigators/userBookingTab/Coming';
import Completed from '../../../navigators/userBookingTab/Completed';
import Cancle from '../../../navigators/userBookingTab/Cancle';

const UserBooking = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: strings.cancled},
    {key: 'second', title: strings.completed},
    {key: 'third', title: strings.comming_Tab},
  ]);
  const renderScene = SceneMap({
    first: Cancle,
    second: Completed,
    third: Coming,
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

export default UserBooking;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  tabView: {
    marginHorizontal: 15,
  },
  scene: {
    flex: 1,
  },
});

import {Dimensions, Image, StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import {Colors} from '../../../utils/colors/colors';
import strings from '../../../utils/strings/strings';
import Header from '../../../components/header/Header';
import {screenWidth} from '../../../utils/dimensions';
import {Images} from '../../../assets/images';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import Instructions from '../../../navigators/HelpCenterTab/Instructions';
import CallUs from '../../../navigators/HelpCenterTab/CallUs';

const HelpCenter = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: strings.callUs},
    {key: 'second', title: strings.instructions},
  ]);
  const renderScene = SceneMap({
    first: CallUs,
    second: Instructions,
  });
  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      labelStyle={{color: Colors.black}}
      indicatorStyle={styles.indicatorStyle}
      style={{backgroundColor: Colors.white}}
    />
  );
  return (
    <View style={styles.container}>
      <Header heading={strings?.helpcenter} />
      <View style={styles.input}>
        <View style={styles.flex}>
          <Image source={Images.search} tintColor={Colors?.primary} />
          <TextInput
            style={styles.textInput}
            placeholder={strings.seek}
            placeholderTextColor={Colors.lightGrey}
          />
        </View>
      </View>
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

export default HelpCenter;

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
    marginTop: 12,
  },
  flex: {flexDirection: 'row', alignItems: 'center'},
  textInput: {
    marginLeft: 11,
    width: screenWidth / 1.5,
  },
  tabView: {
    marginHorizontal: 15,
  },
  scene: {
    flex: 1,
  },
  indicatorStyle: {
    backgroundColor: Colors.primary,
    height: 4,
    borderRadius: 10,
  },
});

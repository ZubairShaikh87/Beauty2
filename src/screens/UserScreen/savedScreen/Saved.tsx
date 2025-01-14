import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Colors} from '../../../utils/colors/colors';
import Header from '../../../components/header/Header';
import strings from '../../../utils/strings/strings';
import {servicesData, sortByServices} from '../../../utils/dummyData';
import CustomText from '../../../components/text/CustomText';

const Saved = () => {
  const renderItem = (item: any, index: number) => {
    return (
      <TouchableOpacity
        activeOpacity={strings.buttonopacity}
        style={[
          styles.flatlist,
          {backgroundColor: index === 0 ? Colors.primary : Colors.grey100},
        ]}>
        <CustomText
          size={17}
          color={index === 0 ? Colors.white : Colors.lightGrey}
          text={item}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Header heading={strings.saved} />
      <FlatList
        style={{marginVertical: 8}}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={servicesData}
        renderItem={({item, index}) => renderItem(item, index)}
      />
      <View>
        <CustomText text={'frgthyjkl'} />
      </View>
    </View>
  );
};

export default Saved;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: Colors.white,
  },
  flatlist: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 99,
    marginHorizontal: 6,
  },
});

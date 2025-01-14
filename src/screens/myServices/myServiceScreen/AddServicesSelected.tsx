import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../../../components/header/Header';
import strings from '../../../utils/strings/strings';
import {Colors} from '../../../utils/colors/colors';
import CustomText from '../../../components/text/CustomText';
import CircleImage from '../../../components/CircleImage/CircleImage';
import CustomButton from '../../../components/button/CustomButton';
import {screenHeight, screenWidth} from '../../../utils/dimensions';
import {Images} from '../../../assets/images';
import {useLazyGetCategoryListQuery} from '../../../Redux/services/app/AppApi';

const AddServicesSelected = () => {
  const [getCategoryList, {data: categories}] = useLazyGetCategoryListQuery();
  useEffect(() => {
    GetCategoryList();
  }, []);
  const GetCategoryList = () => {
    getCategoryList('').unwrap();
  };

  return (
    <View style={styles.container}>
      <Header heading={strings?.addService} />
      <View style={styles.innerContainer}>
        <CustomText
          text={strings.services}
          style={styles.serviceText}
          size={14}
        />
        {console.log("categories",categories)}
        <FlatList
          data={categories?.data}
          horizontal={false}
          numColumns={3}
          columnWrapperStyle={styles.columnStyle}
          renderItem={({item}) => (
            <CircleImage itemData={item} image={item?.image} />
          )}
        />
      </View>
    </View>
  );
};

export default AddServicesSelected;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  columnStyle: {},
  rowCon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceText: {textAlign: 'left', paddingHorizontal: 5},
  innerContainer: {paddingHorizontal: 15},
});

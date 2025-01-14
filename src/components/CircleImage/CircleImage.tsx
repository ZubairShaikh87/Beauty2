import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Images} from '../../assets/images';
import CustomText from '../text/CustomText';
import {useNavigation} from '@react-navigation/native';
import strings from '../../utils/strings/strings';
import Utility from '../../utils/utility/Utility';
import {useSelector} from 'react-redux';
import {getUserType} from '../../Redux/Reducers/UserTypeSlice';

const CircleImage = ({
  itemData,
  text,
  image,
}: {
  itemData: Object;
  text?: any;
  image?: any;
}) => {
  const userType = useSelector(getUserType);
  const navigation: any = useNavigation();
  const _image = Utility.getImageUrl(image);
  console.log(_image, '_image');

  const handlePressAction = () => {
    userType === 'business'
      ? navigation.navigate(strings.addServices, {
          itemData: itemData,
        })
      : navigation.navigate(strings.onlinestorescreen, {itemData: itemData});
  };
  return (
    <TouchableOpacity
      onPress={() => handlePressAction()}
      style={styles.containerStyle}>
      <Image source={{uri: _image}} width={86} height={86} borderRadius={100} />
      <CustomText text={itemData?.category} style={{margin: 12}} />
    </TouchableOpacity>
  );
};

export default CircleImage;

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
    flex: 1,
  },
});

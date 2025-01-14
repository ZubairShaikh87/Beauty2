import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {Images} from '../../assets/images';
import CustomText from '../text/CustomText';
import {AtristDetailPropsTypes} from './types';
import {Colors} from '../../utils/colors/colors';
import Utility from '../../utils/utility/Utility';
import {useNavigation} from '@react-navigation/native';
import strings from '../../utils/strings/strings';
import {useSelector} from 'react-redux';
import {getUserType} from '../../Redux/Reducers/UserTypeSlice';

const ArtistDetail: FC<AtristDetailPropsTypes> = ({
  artistDetail,
  image,
  heading,
  time,
  distance,
  desc,
  address,
}) => {
  console.log(artistDetail, 'sdjfkdsjfkdsj artistDetail');
  const navigation = useNavigation();
  const userType = useSelector(getUserType);
  const imageUrl = console.log(Utility.getImageUrl(artistDetail?.image));
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        userType === 'business'
          ? navigation.navigate(strings.artistdetailscreen)
          : navigation.navigate(strings.artistDetailsUser, {
              artistDetail: artistDetail,
            });
      }}>
      {/* <Image source={{uri: Utility.getImageUrl(artistDetail?.image)}} /> */}
      <Image style={styles.heart} source={Images.heart2} />
      <Image
        source={imageUrl ? {uri: imageUrl} : Images.img3}
        // borderRadius={16}
        borderTopLeftRadius={16}
        borderTopRightRadius={16}
        style={{width: '100%'}}
      />
      <View style={styles.rating}>
        <CustomText text={'4.8 (1k+ مراجعة)'} />
        <Image style={{marginLeft: 3}} source={Images.star} />
      </View>
      <View style={{paddingHorizontal: 10}}>
        <CustomText
          style={{marginTop: 9}}
          size={20}
          text={artistDetail?.name}
          style={{textAlign: 'left'}}
        />
        <CustomText
          color={Colors.lightGrey}
          size={18}
          text={artistDetail?.services}
          style={{textAlign: 'left'}}
        />
        <View
          style={{
            borderTopWidth: 1,
            borderColor: Colors.grey100,
            marginVertical: 6,
          }}
        />
        <View>
          <View style={styles.footer}>
            <Image source={Images.location} />
            <CustomText
              color={Colors.lightGrey}
              size={16}
              text={artistDetail?.address}
            />
          </View>
          <View style={styles.footer}>
            <Image source={Images.clock} />
            <CustomText color={Colors.lightGrey} size={15} text={'مون صن '} />
            <View style={styles.dot} />
            <CustomText
              color={Colors.lightGrey}
              size={15}
              text={'مون صن | 11 صباحًا - 11 مساءً'}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ArtistDetail;

const styles = StyleSheet.create({
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    position: 'absolute',
    top: 102,
    left: 10,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  dot: {
    backgroundColor: Colors.lightGrey,
    height: 5,
    width: 5,
    borderRadius: 99,
    marginHorizontal: 5,
  },
  container: {
    marginBottom: 20,
    borderWidth: 0.5,
    borderRadius: 16,
    borderColor: Colors.grey100,
    paddingBottom: 7,
    backgroundColor: Colors.white,
    // backgroundColor: 'red',
    width: '100%',
  },
  heart: {position: 'absolute', zIndex: 1, left: 10, top: 10},
});

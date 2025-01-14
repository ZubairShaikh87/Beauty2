import {FlatList, Image, StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {ProfileCardPropsTypes} from './types';
import {Images} from '../../assets/images';
import CustomText from '../text/CustomText';
import {Colors} from '../../utils/colors/colors';
import {Rating} from 'react-native-ratings';

const ProfileCard: FC<ProfileCardPropsTypes> = ({
  image,
  name,
  duration,
  desc,
  followers,
  rating,
  imagesArray,
}) => {
  const ratingCompleted = () => {};
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.flex}>
          <View>
            <Image style={{height: 40, width: 40}} source={image} />
            <Image style={styles.verifyimg} source={Images.verified} />
          </View>
          <View style={{marginLeft: 7}}>
            <CustomText size={14} text={name} />
            <CustomText color={Colors.lightGrey} text={followers} />
          </View>
        </View>
        <View style={{alignItems: 'flex-start'}}>
          <View style={styles.flex}>
            <CustomText size={14} color={Colors.primary} text={rating} />
            <Image style={{marginLeft: 5}} source={Images.star2} />
          </View>
          <CustomText color={Colors.lightGrey} text={duration} />
        </View>
      </View>
      <View style={{paddingHorizontal: 10}}>
        <CustomText text={desc} color={Colors.lightGrey} />
        <View style={styles.ratingView}>
          <CustomText size={15} color={Colors.primary} text={'5.0'} />
          <Rating
            ratingColor={Colors.primary}
            startingValue={5}
            type="custom"
            imageSize={20}
            tintColor="white"
            ratingBackgroundColor={Colors.grey100}
            onFinishRating={ratingCompleted}
            style={styles.rating}
          />
        </View>
        <FlatList
          data={imagesArray}
          numColumns={2}
          scrollEnabled={false}
          renderItem={({item, index}) => {
            return (
              <View style={{marginLeft: 15}}>
                <Image source={item} />
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 0.8,
    borderTopColor: Colors.grey100,
  },
  contentContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  flex: {flexDirection: 'row', alignItems: 'center'},
  verifyimg: {position: 'absolute', bottom: 0, width: 15, height: 15},
  ratingView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  rating: {
    paddingVertical: 10,
    borderColor: Colors.white,
    marginLeft: 3,
  },
});

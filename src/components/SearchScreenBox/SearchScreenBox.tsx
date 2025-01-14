import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {Images} from '../../assets/images';
import strings from '../../utils/strings/strings';
import RightImageText from '../RightImageText/RightImageText';
import CustomText from '../text/CustomText';
import {Colors} from '../../utils/colors/colors';
import {Rating} from 'react-native-ratings';
import {searchCardImages} from '../../utils/dummyData';
import {screenHeight, screenWidth} from '../../utils/dimensions';
import {SearchScreenBoxPropTypes} from './types';

const SearchScreenBox: FC<SearchScreenBoxPropTypes> = ({bgImage}) => {
  const renderItem = ({item}: {item: any}) => (
    <Image source={item.img} style={styling.image} />
  );
  return (
    <View style={styling.cardContainer}>
      <Image source={bgImage} style={styling.imgStyle} />
      <View style={styling.textContainer}>
        <CustomText
          text={strings.jenny}
          size={16}
          style={{textAlign: 'left'}}
        />
        <RightImageText
          path={Images.cost}
          text={strings.travelCost_20}
          color={Colors.lightGrey}
          textSize={14}
          marginRight={0}
        />
        <RightImageText
          path={Images.clock}
          text={strings.moonSoon}
          color={Colors.lightGrey}
          textSize={14}
          marginRight={0}
        />
        <View style={styling.ratingContainer}>
          <CustomText text={'5.0'} size={14} />
          <Rating
            ratingColor={Colors.yellow}
            startingValue={5}
            type="custom"
            imageSize={20}
            tintColor="white"
            ratingBackgroundColor={Colors.grey100}
            style={styling.rating}
          />
          <CustomText
            text={strings.comments}
            style={styling.marginStyle}
            color={Colors.lightGrey}
            size={14}
          />
        </View>
        <View style={styling.divider} />
        <View style={styling.rowCont}>
          <View>
            <CustomText
              text={strings.cancelation}
              color={Colors.lightGrey}
              size={14}
            />
            <CustomText
              text={'26'}
              color={Colors.black}
              size={14}
              style={{textAlign: 'center'}}
            />
          </View>
          <View>
            <CustomText
              text={strings.jobDone}
              color={Colors.lightGrey}
              size={14}
            />
            <CustomText
              text={'25'}
              color={Colors.black}
              size={14}
              style={{textAlign: 'center'}}
            />
          </View>
        </View>
        <View style={styling.divider} />
        <View style={styling.rowCont2}>
          <RightImageText
            path={Images.running}
            text={strings.threeKm}
            color={Colors.black}
            textSize={14}
            marginRight={0}
          />
          <RightImageText
            path={Images.dollar}
            text={strings.startingFrom}
            color={Colors.black}
            textSize={14}
            marginRight={0}
          />
        </View>
        <View style={styling.divider} />
        <View style={{marginBottom: 10}}>
          <FlatList
            data={searchCardImages}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        </View>
      </View>
    </View>
  );
};

export default SearchScreenBox;
const styling = StyleSheet.create({
  cardContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 10,
    borderWidth: 1,
    marginBottom: 20,
    borderColor: Colors.grey100,
  },
  imgStyle: {
    width: screenWidth / 1.1,
    height: screenHeight / 6,
  },
  textContainer: {
    marginTop: 10,
    marginLeft: 10,
  },
  rowImage: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    marginTop: 10,
  },
  marginStyle: {marginLeft: 10},
  rating: {
    borderColor: Colors.white,
    marginLeft: 10,
  },
  divider: {
    borderTopColor: Colors.grey100,
    borderTopWidth: 1,
    marginTop: 11,
    marginBottom: 7,
    marginLeft: 8,
    marginRight: 15,
  },
  rowCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  rowCont2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  image: {
    width: 50, // Adjust the width as needed
    height: 50, // Adjust the height as needed
    borderRadius: 10, // Optional: Add borderRadius to images for rounded corners
    marginRight: 10, // Optional: Add some margin between images
  },
});

import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';

import {useNavigation} from '@react-navigation/native';
import ArtistHeader from '../../../components/artistHeaderbutton/ArtistHeader';
import {Images} from '../../../assets/images';
import CustomText from '../../../components/text/CustomText';
import {Colors} from '../../../utils/colors/colors';
import strings from '../../../utils/strings/strings';
import {photosData} from '../../../utils/dummyData';
import CustomButton from '../../../components/button/CustomButton';
import {screenHeight, screenWidth} from '../../../utils/dimensions';

const OnlineStoresDetail = () => {
  const navigation: any = useNavigation();

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <ImageBackground style={styles.bgImageStyle} source={Images.profilebg}>
        <ArtistHeader />

        <View style={styles.editView}>
          <Image style={styles.profilePicStyle} source={Images.tools} />
        </View>
      </ImageBackground>
      <View style={styles.topContainer}>
        <View style={styles.iconMainContainer}>
          <View style={styles.artistContainer}>
            <CustomText
              color={Colors.lightGrey}
              size={12}
              text={'@artistuser'}
            />
            <Image style={styles.instaImage} source={Images.facbook} />
          </View>
          <View style={styles.artistContainer}>
            <CustomText
              color={Colors.lightGrey}
              size={12}
              text={'@artistuser'}
            />
            <Image style={styles.instaImage} source={Images.instagram1} />
          </View>
        </View>
        <CustomText
          text={strings.brand_Name}
          size={18}
          style={styles.brandStyle}
        />

        <FlatList
          data={photosData}
          numColumns={2}
          contentContainerStyle={{marginLeft: 10}}
          scrollEnabled={true}
          renderItem={({item, index}) => {
            return (
              <ImageBackground
                key={index}
                style={styles.bgImage}
                source={item.img}>
                {item?.category && (
                  <View style={styles.categoryContainer}>
                    <CustomText color={Colors.white} text={item?.category} />
                  </View>
                )}
              </ImageBackground>
            );
          }}
        />

        <View style={styles.buttonView}>
          <CustomButton
            onPress={() => navigation.navigate(strings.notice)}
            text={strings.visiting_Site}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default OnlineStoresDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  buttonView: {marginTop: '15%', alignSelf: 'center'},
  brandStyle: {textAlign: 'center', marginTop: 30},
  arrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 10,
  },
  bgImageStyle: {
    height: screenHeight / 4,
    width: screenWidth,
    alignSelf: 'center',
  },
  profilePicStyle: {
    width: 112,
    height: 112,
  },
  topContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    zIndex: 1,
    marginTop: -15,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  editView: {
    borderWidth: 7,
    borderColor: Colors.white,
    alignSelf: 'center',
    borderRadius: 99,
    zIndex: 2,
    marginTop: '8%',
  },
  instaImage: {marginLeft: 5, height: 30, width: 30},
  artistContainer: {flexDirection: 'row', alignItems: 'center'},
  iconMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  categoryContainer: {
    backgroundColor: Colors.primary,
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 8,
    right: 11,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  bgImage: {
    height: 160,
    width: 160,
    margin: 4,
  },
});

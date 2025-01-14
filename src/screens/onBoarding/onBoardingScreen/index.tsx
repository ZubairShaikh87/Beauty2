import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../../utils/colors/colors';
import strings from '../../../utils/strings/strings';
import Slick from 'react-native-slick';
import {Images} from '../../../assets/images';
import {onBoardingData} from '../../../utils/dummyData';
import CustomText from '../../../components/text/CustomText';
import {useNavigation} from '@react-navigation/native';
import {
  useLazyOnBoardScreen1Query,
  useLazyOnBoardScreen2Query,
  useLazyOnBoardScreen3Query,
} from '../../../Redux/services/app/AppApi';
import Utility from '../../../utils/utility/Utility';
import {screenHeight, screenWidth} from '../../../utils/dimensions';

const OnBoarding = () => {
  const navigation: any = useNavigation();
  const [screen1Api] = useLazyOnBoardScreen1Query();
  const [screen2Api] = useLazyOnBoardScreen2Query();
  const [screen3Api] = useLazyOnBoardScreen3Query();
  // useStates
  const [onBoardingData, setonBoardingData] = useState([]);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    getOnboardingData();
    return () => {
      setIndex(0);
    };
  }, []);
  const getOnboardingData = async () => {
    try {
      // Start all queries
      const [response1, response2, response3] = await Promise.all([
        screen1Api('').unwrap(), // Ensure .unwrap() is used and API calls are awaited
        screen2Api('').unwrap(),
        screen3Api('').unwrap(),
      ]);

      // Set the data to state
      const responseData = [response1?.data, response2?.data, response3?.data];
      console.log(responseData, 'sdjfksdDAATTATTANN');
      setonBoardingData(responseData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };
  const next = () => {
    if (index < 2) {
      setIndex(index + 1);
    } else {
      navigation.navigate(strings.welcomescreen);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={strings.buttonopacity}
        onPress={() => navigation.navigate(strings.welcomescreen)}>
        <CustomText
          size={13}
          text={strings?.skip}
          style={styles.skipTextStyle}
        />
      </TouchableOpacity>

      <View style={styles.content}>
        <Slick
          loop={false}
          index={index}
          scrollEnabled={false}
          dotStyle={styles.dot}
          activeDotStyle={styles.activedot}
          paginationStyle={{flexDirection: 'row-reverse'}}
          showsButtons={false}>
          {onBoardingData?.map((item, index) => {
            return (
              <View style={styles.map} key={index}>
                <Image
                  style={{
                    width: '90%',
                    height: screenHeight / 2.6,
                  }}
                  borderRadius={8}
                  resizeMode="cover"
                  source={{uri: Utility.getImageUrl(item?.image)}}
                />
                <CustomText
                  style={styles.heading}
                  size={25}
                  fontWeight="700"
                  text={item?.heading}
                />
                <CustomText
                  size={15}
                  color={Colors.lightGrey}
                  style={styles.description}
                  text={item?.detail}
                />
              </View>
            );
          })}
        </Slick>
        <TouchableOpacity
          activeOpacity={strings.buttonopacity}
          onPress={next}
          style={styles.button}>
          <Image style={{resizeMode: 'center'}} source={Images.rightarrow} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  skip: {
    paddingVertical: 10,
    paddingRight: 20,
    paddingHorizontal: 15,
    width: 100,
  },
  skipTextStyle: {
    textAlign: 'left',
    paddingHorizontal: 15,
  },
  content: {flex: 1, marginBottom: '10%'},
  dot: {right: 120, width: 9, height: 9, borderRadius: 99},
  activedot: {
    right: 120,
    width: 14,
    height: 14,
    borderRadius: 99,
    backgroundColor: Colors.primary,
  },
  map: {alignItems: 'center', marginTop: 25},
  heading: {
    marginTop: '17%',
  },
  description: {
    marginTop: 15,
    textAlign: 'center',
    marginHorizontal: 34,
  },
  button: {position: 'absolute', bottom: 15, left: 25},
});

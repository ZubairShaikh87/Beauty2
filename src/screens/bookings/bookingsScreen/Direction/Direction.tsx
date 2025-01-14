import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../../components/header/Header';
import strings from '../../../../utils/strings/strings';
import {Colors} from '../../../../utils/colors/colors';
import MapView, {Marker} from 'react-native-maps';
import CustomButton from '../../../../components/button/CustomButton';
import FooterTwoButton from '../../../../components/footerTwoButton/FooterTwoButton';
import {useNavigation} from '@react-navigation/native';
import AcceptedBookingBox from '../../../../components/bookingScreenComponent/AcceptedBookingBox';
import {Images} from '../../../../assets/images';

const Direction = ({route}) => {
  console.log("route.param",route)
  const navigation: any = useNavigation();

  const [showFooter, setShowFooter] = useState(false);

  const handleCustomButtonPress = () => {
    setShowFooter(true);
  };

  return (
    <View style={styles.container}>
      <Header heading={strings?.getDirection} style={styles.header} />
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 31.5204,
            longitude: 74.3587,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        <Marker
          coordinate={{
            latitude: 31.5204,
            longitude: 74.3587,
          }}
        />
      </View>
      {showFooter && (
        <View style={styles.centerProfile}>
          <AcceptedBookingBox
            bgColor={Colors.white}
            topText={strings.request_reservation}
            copyImage={Images.copy1}
            ruppesText={strings.rs}
          />
        </View>
      )}

      <View style={styles.footer}>
        {showFooter ? (
          <FooterTwoButton
            onPressRight={() =>
              navigation.navigate(strings.bookingDetails_screen, {cancle: true})
            }
            marginTop={2}
            marginBottom={2}
            textRight={'Accept'}
            textLeft={'Decline'}
          />
        ) : (
          <CustomButton
            style={styles.button}
            text={strings.view_Detail}
            onPress={handleCustomButtonPress}
          />
        )}
      </View>
    </View>
  );
};

export default Direction;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  button: {width: '95%', marginHorizontal: 10},
  mapContainer: {flex: 1},
  map: {...StyleSheet.absoluteFillObject},
  header: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  footer: {
    marginVertical: 10,
    flexDirection: 'row',
  },
  centerProfile: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    top: '52%', // Adjust this value as needed
    left: 0,
    right: 0,
    zIndex: 1,
    // transform: [{ translateY: -50% }]
  },
});

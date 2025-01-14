import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Images} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';

const ArtistHeader = () => {
  const navigation: any = useNavigation();

  return (
    <View style={styles.arrowContainer}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity activeOpacity={0.7}>
          <Image source={Images.favorite} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.shareBack}>
          <Image source={Images.share} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.marginView}
        onPress={() => navigation.goBack()}>
        <Image style={styles.backImage} source={Images.back} />
      </TouchableOpacity>
    </View>
  );
};

export default ArtistHeader;

const styles = StyleSheet.create({
  arrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  backImage: {marginTop: 40, marginRight: 10, alignSelf: 'flex-end'},
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareBack: {marginLeft: 10},
  marginView: {marginBottom: 20},
});

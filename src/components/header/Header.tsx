import {
  I18nManager,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect} from 'react';
import {Images} from '../../assets/images';
import {HeaderPropsTypes} from './types';
import CustomText from '../text/CustomText';
import {Colors} from '../../utils/colors/colors';
import {useNavigation} from '@react-navigation/native';
import strings from '../../utils/strings/strings';

const Header: FC<HeaderPropsTypes> = ({heading, searchCircle, style}) => {
  const navigation: any = useNavigation();

  return (
    <View style={style || styles.container}>
      {searchCircle ? (
        <Image
          source={Images.search_Circle}
          style={{resizeMode: 'contain', alignSelf: 'center'}}
        />
      ) : (
        <Text style={{color: 'transparent'}}></Text>
      )}
      <CustomText size={17} text={heading} />
      <TouchableOpacity
        activeOpacity={strings.buttonopacity}
        onPress={() => navigation.goBack()}>
        <View>
          <Image source={Images.back} style={styles.backImage} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  backImage: {
    resizeMode: 'contain',
  },
  imageContainerRTL: {
    transform: [{scaleX: -1}],
  },
});

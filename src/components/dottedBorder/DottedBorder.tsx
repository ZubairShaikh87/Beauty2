import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {Colors} from '../../utils/colors/colors';
import {Images} from '../../assets/images';
import CustomText from '../text/CustomText';
import {DottedBorderPropsTypes} from './types';

const DottedBorder: FC<DottedBorderPropsTypes> = ({
  width,
  text,
  height,
  textColor,
  bgColor,
  marginBottom,
  onHandlePress,
  imageSource,
}) => {
  return (
    <TouchableOpacity
      onPress={onHandlePress}
      style={[
        styles.borderContainer(imageSource),
        {
          width: width,
          height: height,
          backgroundColor: bgColor || Colors.white,
          marginBottom: marginBottom || 0,
        },
      ]}>
      {imageSource ? (
        <Image source={{uri: imageSource}} style={styles.imageStyle} />
      ) : (
        <View style={styles.imageContainer}>
          <View style={styles.imageView}>
            <Image source={Images.add} />
          </View>
          {text && <CustomText color={textColor} size={14} text={text} />}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default DottedBorder;

const styles = StyleSheet.create({
  borderContainer: isImage => ({
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderWidth: isImage ? 0 : 2,
    borderRadius: 10,
    borderColor: Colors.primary,
  }),
  imageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageStyle: {width: '100%', height: '100%', borderRadius: 20},
  imageView: {
    backgroundColor: Colors.primary,
    width: 35,
    height: 35,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

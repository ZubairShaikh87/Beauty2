import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC, useState} from 'react';
import {Images} from '../../assets/images';
import CustomText from '../text/CustomText';
import strings from '../../utils/strings/strings';
import {Colors} from '../../utils/colors/colors';
import {screenWidth} from '../../utils/dimensions';
import {CallUsOpenClosePropsTypes} from './types';

const CallUsOpenClose: FC<CallUsOpenClosePropsTypes> = ({text, path}) => {
  const [isTextVisible, setIsTextVisible] = useState(false);

  const toggleTextVisibility = () => {
    setIsTextVisible(!isTextVisible);
  };
  return (
    <TouchableOpacity onPress={toggleTextVisibility}>
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Image source={Images.arrow_down} />
          <View style={styles.imagePathRow}>
            <CustomText text={text} style={{marginRight: 30}} size={14} />
            <Image source={path} />
          </View>
        </View>

        {isTextVisible && (
          <>
            <View style={styles.divider} />
            <View style={styles.dotContainer}>
              <CustomText
                text={strings.four_Number}
                color={Colors.lightGrey}
                style={styles.customText}
              />
              <Image source={Images?.dot} />
            </View>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CallUsOpenClose;
const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.grey100,
    marginVertical: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginHorizontal: '10%',
  },
  imagePathRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    borderTopWidth: 0.5,
    borderTopColor: Colors.grey100,
    marginVertical: 5,
    marginHorizontal: 15,
    width: screenWidth / 1.2,
  },
  customText: {
    paddingHorizontal: 15,
    textAlign: 'right',
    paddingVertical: 5,
  },
});

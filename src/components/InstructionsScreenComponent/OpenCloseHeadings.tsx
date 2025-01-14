import React, {FC, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomText from '../text/CustomText';
import strings from '../../utils/strings/strings';
import {Images} from '../../assets/images';
import {Colors} from '../../utils/colors/colors';
import {screenWidth} from '../../utils/dimensions';
import {OpenCloseHeadingPropsTypes} from './types';

const OpenCloseHeadings: FC<OpenCloseHeadingPropsTypes> = ({text}) => {
  const [isTextVisible, setIsTextVisible] = useState(false);

  const toggleTextVisibility = () => {
    setIsTextVisible(!isTextVisible);
  };

  return (
    <TouchableOpacity onPress={toggleTextVisibility}>
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Image source={Images.arrow_down} />
          <CustomText text={text} size={14} />
        </View>

        {isTextVisible && (
          <>
            <View style={styles.divider} />
            <CustomText
              text={strings.lorium_ispum_text}
              color={Colors.lightGrey}
              style={styles.customText}
            />
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

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
  divider: {
    borderTopWidth: 0.5,
    borderTopColor: Colors.grey100,
    marginVertical: 5,
    marginHorizontal: 15,
    width: screenWidth / 1.2,
  },
  customText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default OpenCloseHeadings;

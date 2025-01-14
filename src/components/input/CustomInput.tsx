import {
  Alert,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import CustomText from '../text/CustomText';
import {Colors} from '../../utils/colors/colors';
import {Images} from '../../assets/images';
import {screenWidth} from '../../utils/dimensions';
import {CustomInputPropsTypes} from './types';
import DropDownPicker from 'react-native-dropdown-picker';
import strings from '../../utils/strings/strings';

const CustomInput: FC<CustomInputPropsTypes> = ({
  password,
  label,
  placeholder,
  style,
  dropdown,
  open,
  value,
  items,
  setOpen,
  setItems,
  setValue,
  dropdownPlaceholder,
  heigth,
  paddingBottom,
  placeHolderTextColor,
  width,
  labelSize,
  changeText,
  onChangeText = () => {},
  additionalInputTextStyle,
  additionalContainerStyle,
  errorIndicator,
  editable = true,
  keyboardType = 'default',
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={style}>
      <CustomText text={label} size={labelSize} style={styles.labelTestStyle} />
      <View style={[styles.containerStyle(heigth, width, errorIndicator)]}>
        {dropdown ? (
          <View style={{left: 0, position: 'absolute'}}>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              style={{
                borderColor: Colors.grey100,
                width: screenWidth / 1.2,
              }}
              textStyle={{textAlign: 'left'}}
              placeholder={dropdownPlaceholder}
              placeholderStyle={{color: Colors.lightGrey}}
              listMode="MODAL"
            />
          </View>
        ) : (
          <TextInput
            style={[
              styles.inputTextContainer(paddingBottom),
              {...additionalInputTextStyle},
            ]}
            editable={editable}
            secureTextEntry={password && !visible}
            placeholder={placeholder}
            placeholderTextColor={placeHolderTextColor || Colors.lightGrey}
            value={value}
            // onChange={}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            // keyboardType='email-address'
          />
        )}
        {changeText && (
          <CustomText size={14} color={Colors.primary} text={strings.change} />
        )}
        {password && (
          <TouchableOpacity onPress={() => setVisible(!visible)}>
            <Image
              style={{width: 25, height: 25}}
              source={visible ? Images?.visible : Images.eye_slash}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  labelTestStyle: {
    textAlign: 'left',
  },
  containerStyle: (height: number, width: number, errorIndicator: boolean) => ({
    borderColor: errorIndicator ? Colors.textColorRed : Colors.grey100,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: height || 50,
    width: width || screenWidth / 1.2,
  }),
  inputTextContainer: (paddingBottom: number) => ({
    width: screenWidth / 1.47,
    height: '100%',
    textAlign: 'right',
    paddingBottom: paddingBottom || null,
    color: Colors.black,
  }),
});

import {Text} from 'react-native';
import {Colors} from '../../utils/colors/colors';
import {FC} from 'react';
import {CustomTextPropTypes} from './types';

const CustomText: FC<CustomTextPropTypes> = ({
  color,
  size,
  text,
  style,
  lineHeight,
  numberOfLines,
  fontWeight,
  textTransform,
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          textTransform: textTransform || "none",
          // {textTransform:"uppercase"}
          color: color || Colors.black,
          fontSize: size || 12,
          fontWeight: fontWeight || '500',
          ...(lineHeight && {lineHeight: lineHeight}),
        },
        style,
      ]}>
      {text}
    </Text>
  );
};
export default CustomText;

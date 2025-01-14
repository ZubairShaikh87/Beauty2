import Toast from 'react-native-toast-message';

const AppToast = ({
  message,
  title = '',
  type = null,
  position = 'top',
  topOffset,
}) => {
  Toast.show({
    type: type,
    position: position,
    text1: message,
    text2: title,
    text1Style: {textAlign: 'left'},
    visibilityTime: 4000,
    autoHide: true,
    topOffset: topOffset ? topOffset : 50,
    bottomOffset: 50,
    swipeable: true,
  });
};
export default AppToast;

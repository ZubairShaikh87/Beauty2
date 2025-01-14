import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../utils/colors/colors';
import Header from '../../../components/header/Header';
import strings from '../../../utils/strings/strings';
import CustomText from '../../../components/text/CustomText';
import ToggleSwitch from 'toggle-switch-react-native';

const Notifications = () => {
  const [toggleState, setToggleState] = useState(true);
  const handleToggle = (isOn: boolean) => {
    setToggleState(isOn);
  };
  return (
    <View style={styles.container}>
      <Header heading={strings.notification} />
      <View style={styles.flex}>
        <CustomText size={14} text={'على'} />
        <ToggleSwitch
          isOn={toggleState}
          onToggle={handleToggle}
          onColor={Colors.primary}
          offColor={Colors.lightGrey}
          size="small"
        />
      </View>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
    justifyContent: 'space-between',
  },
});

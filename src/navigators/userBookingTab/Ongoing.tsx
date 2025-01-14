import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ProfileDetailBox from '../../components/ProfileDetailbox/ProfileDetailBox';
import {Colors} from '../../utils/colors/colors';
import {Images} from '../../assets/images';
import strings from '../../utils/strings/strings';
import {useNavigation} from '@react-navigation/native';

const Ongoing = () => {
  const navigation: any = useNavigation();
  const [toggleState, setToggleState] = useState(true);

  const handleToggle = (isOn: boolean) => {
    setToggleState(isOn);
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ProfileDetailBox
        dateText={strings.aug_25}
        image={Images.addImage}
        isOn={toggleState}
        onToggle={handleToggle}
        onPress={() => navigation.navigate(strings.booking_Detail)}
      />
    </ScrollView>
  );
};

export default Ongoing;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
});

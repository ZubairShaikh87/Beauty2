import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/colors/colors';
import strings from '../../utils/strings/strings';
import Header from '../../components/header/Header';
import ProfileDetail from '../../components/profileDetail/ProfileDetail';
import {Images} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';

const Settings = () => {
  const navigation: any = useNavigation();

  return (
    <View style={styles.container}>
      <Header heading={strings?.settings} />
      <View>
        <ProfileDetail
          heading={strings.notification_setting}
          icon={Images.user}
          fontSize={18}
          onPress={() => navigation.navigate(strings.notification_screen)}
        />
        <ProfileDetail
          heading={strings.password_manager}
          icon={Images.key}
          fontSize={18}
          onPress={() => navigation.navigate(strings.password_manager)}
        />
        <ProfileDetail
          heading={strings.delete_account}
          icon={Images.card}
          fontSize={18}
          onPress={() => navigation.navigate(strings.your_Transaction)}
        />
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
});

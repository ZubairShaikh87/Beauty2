import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Profile from '../../screens/profile/profileScreen/Profile';
import strings from '../../utils/strings/strings';
import ArtistDetails from '../../screens/profile/artistDetailsScreen/ArtistDetails';

const {Navigator, Screen} = createNativeStackNavigator();

const ProfileNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name={strings.profilescreen} component={Profile} />
      <Screen name={strings.artistdetailscreen} component={ArtistDetails} />
    </Navigator>
  );
};

export default ProfileNavigator;

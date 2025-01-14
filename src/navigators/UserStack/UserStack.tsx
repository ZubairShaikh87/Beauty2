import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import strings from '../../utils/strings/strings';
import SignupUser from '../../screens/UserScreen/signupScreen';
import UserHome from '../../screens/UserScreen/home/homeScreen/Home';
import OnlineStores from '../../screens/UserScreen/onlineStores/OnlineStores';
import {Colors} from '../../utils/colors/colors';
import OnlineStoresDetail from '../../screens/UserScreen/onlineStores/OnlineStoresDetail';
import ArtistDetailsUser from '../../screens/UserScreen/artistDetailsScreen/ArtistDetails';
import UserBottomStack from '../UserBottomStack/UserBottomStack';
import BookApointment from '../../screens/UserScreen/artistDetailsScreen/BookApointment';
import UserYourProfile from '../../screens/UserScreen/UserProfile/UserYourProfile';
import ManagePayment from '../../screens/Membership/ManagePayement/ManagePayment';
import Saved from '../../screens/UserScreen/savedScreen/Saved';
import UserNotifications from '../../screens/userNotificationScreen/UserNotifications';

const UserStack = () => {
  const User = createNativeStackNavigator();

  return (
    <User.Navigator initialRouteName={strings?.SignupUser}>
      <User.Screen
        name={strings.SignupUser}
        component={SignupUser}
        options={{title: strings.SignupUser, headerShown: false}}
      />
      <User.Screen
        name={strings.userHome}
        component={UserHome}
        options={{title: strings.userHome, headerShown: false}}
      />
      <User.Screen
        name={strings.onlinestorescreen}
        component={OnlineStores}
        options={{
          title: strings.onlinestorescreen,
          headerShown: false,
          statusBarColor: Colors.white,
          statusBarStyle: 'dark',
        }}
      />
      <User.Screen
        name={strings.onlinestoresdetailcreen}
        component={OnlineStoresDetail}
        options={{
          title: strings.onlinestoresdetailcreen,
          headerShown: false,
          statusBarColor: Colors.white,
          statusBarStyle: 'dark',
        }}
      />
      <User.Screen
        name={strings.userArtist}
        component={ArtistDetailsUser}
        options={{
          title: strings.userArtist,
          headerShown: false,
          statusBarColor: Colors.white,
          statusBarStyle: 'dark',
        }}
      />
      <User.Screen
        name={strings.user_Bottom_Stack}
        component={UserBottomStack}
        options={{
          title: strings.user_Bottom_Stack,
          headerShown: false,
          statusBarColor: Colors.white,
          statusBarStyle: 'dark',
        }}
      />
      <User.Screen
        name={strings.bookapointment_screen}
        component={BookApointment}
        options={{
          title: strings.bookapointment_screen,
          headerShown: false,
          statusBarColor: Colors.white,
          statusBarStyle: 'dark',
        }}
      />
      <User.Screen
        name={strings.useryourprofile_screen}
        component={UserYourProfile}
        options={{
          title: strings.useryourprofile_screen,
          headerShown: false,
          statusBarColor: Colors.white,
          statusBarStyle: 'dark',
        }}
      />
      <User.Screen
        name={strings.paymentmethod}
        component={ManagePayment}
        options={{
          title: strings.paymentmethod,
          headerShown: false,
          statusBarColor: Colors.white,
          statusBarStyle: 'dark',
        }}
      />
      <User.Screen
        name={strings.saved_screen}
        component={Saved}
        options={{
          title: strings.saved_screen,
          headerShown: false,
          statusBarColor: Colors.white,
          statusBarStyle: 'dark',
        }}
      />
      <User.Screen
        name={strings.notify_screen}
        component={UserNotifications}
        options={{
          title: strings.notify_screen,
          headerShown: false,
          statusBarColor: Colors.white,
          statusBarStyle: 'dark',
        }}
      />
    </User.Navigator>
  );
};

export default UserStack;

const styles = StyleSheet.create({});

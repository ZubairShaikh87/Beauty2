import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import strings from '../../utils/strings/strings';
import Splash from '../../screens/onBoarding/splashScreen';
import OnBoarding from '../../screens/onBoarding/onBoardingScreen';
import Welcome from '../../screens/onBoarding/welcomeScreen';
import Login from '../../screens/auth/loginScreen';
import Signup from '../../screens/auth/signupScreen';
import Location from '../../screens/auth/locationScreen/Location';
import ManualLocation from '../../screens/auth/locationScreen/ManualLocation';
import UploadDocs from '../../screens/auth/uploadDocs/UploadDocs';
import Home from '../../screens/home/homeScreen/Home';
import BottomStack from '../bottomStack/BottomStack';
import AddServicesSelected from '../../screens/myServices/myServiceScreen/AddServicesSelected';
import Services from '../../screens/myServices/myServiceScreen/Services';
import AddServices from '../../screens/myServices/myServiceScreen/AddServices';
import Bookings from '../../screens/bookings/bookingsScreen/Bookings';
import BookingDetails from '../../screens/bookings/bookingsScreen/bookingDetails/BookingDetails';
import ArrivedLocation from '../../screens/bookings/bookingsScreen/ArrivedLocation/ArrivedLocation';
import Direction from '../../screens/bookings/bookingsScreen/Direction/Direction';
import BookingAccepted from '../../screens/bookings/bookingsScreen/BookingAccepted/BookingAccepted';
import BookingComplete from '../../screens/bookings/bookingsScreen/BookingComplete/BookingComplete';
import CancellationBooking from '../../screens/bookings/bookingsScreen/CancellationBooking/CancellationBooking';
import Membership from '../../screens/Membership/Membership';
import TravelCost from '../../screens/Membership/TravelCost/TravelCost';
import OffDays from '../../screens/Membership/OffDays/OffDays';
import ManagePayment from '../../screens/Membership/ManagePayement/ManagePayment';
import Settings from '../../screens/Settings/Settings';
import Transactions from '../../screens/Transactions/Transactions';
import PasswordManager from '../../screens/auth/PasswordManager/PasswordManager';
import HelpCenter from '../../screens/Settings/HelpCenter/HelpCenter';
import Addresses from '../../screens/Addresses/Addresses';
import YourProfile from '../../screens/profile/YourProfile/YourProfile';
import PrivacyPolicy from '../../screens/PrivacyPolicy/PrivacyPolicy';
import Notifications from '../../screens/home/NotificationScreen/Notifications';
import UserNotifications from '../../screens/userNotificationScreen/UserNotifications';
import {useSelector} from 'react-redux';
import {getUserType} from '../../Redux/Reducers/UserTypeSlice';
import {appRoutes} from './AppRoutes';

const AppStack = () => {
  const Stack = createNativeStackNavigator();
  const routes = appRoutes;
  return (
    <Stack.Navigator initialRouteName={strings?.splashscreen}>
      {routes?.map(route => (
        <Stack.Screen
          name={route?.name}
          component={route?.component}
          options={{title: route?.name, headerShown: false}}
        />
      ))}

      {/* Previous Code */}
      {/* <Stack.Screen
        name={strings.splashscreen}
        component={Splash}
        options={{title: strings.splashscreen, headerShown: false}}
      />
      <Stack.Screen
        name={strings.onboardingscreen}
        component={OnBoarding}
        options={{title: strings.onboardingscreen, headerShown: false}}
      />
      <Stack.Screen
        name={strings.welcomescreen}
        component={Welcome}
        options={{title: strings.welcomescreen, headerShown: false}}
      />
      <Stack.Screen
        name={strings.loginscreen}
        component={Login}
        options={{title: strings.loginscreen, headerShown: false}}
      />
      <Stack.Screen
        name={strings.signupscreen}
        component={Signup}
        options={{title: strings.signupscreen, headerShown: false}}
      />

      <Stack.Screen
        name={strings.locationscreen}
        component={Location}
        options={{title: strings.locationscreen, headerShown: false}}
      />
      <Stack.Screen
        name={strings.manuallocationscreen}
        component={ManualLocation}
        options={{title: strings.manuallocationscreen, headerShown: false}}
      />
      <Stack.Screen
        name={strings.uploaddocsscreen}
        component={UploadDocs}
        options={{title: strings.uploaddocsscreen, headerShown: false}}
      />
      <Stack.Screen
        name={strings.homescreen}
        component={Home}
        options={{title: strings.homescreen, headerShown: false}}
      />
      <Stack.Screen
        name={strings.bottomTab}
        component={BottomStack}
        options={{title: strings.bottomTab, headerShown: false}}
      />
      <Stack.Screen
        name={strings.addService}
        component={AddServicesSelected}
        options={{title: strings.addService, headerShown: false}}
      />
      <Stack.Screen
        name={strings.addServices}
        component={AddServices}
        options={{title: strings.addServices, headerShown: false}}
      />
      <Stack.Screen
        name={strings.Services}
        component={Services}
        options={{title: strings.Services, headerShown: false}}
      />
      <Stack.Screen
        name={strings.booking}
        component={Bookings}
        options={{title: strings.booking, headerShown: false}}
      />
      <Stack.Screen
        name={strings.booking_Detail}
        component={BookingDetails}
        options={{title: strings.booking_Detail, headerShown: false}}
      />
      <Stack.Screen
        name={strings.arrived}
        component={ArrivedLocation}
        options={{title: strings.arrived, headerShown: false}}
      />
      <Stack.Screen
        name={strings.getDirection}
        component={Direction}
        options={{title: strings.getDirection, headerShown: false}}
      />
      <Stack.Screen
        name={strings.bookingAccepted}
        component={BookingAccepted}
        options={{title: strings.bookingAccepted, headerShown: false}}
      />
      <Stack.Screen
        name={strings.booking_Completed}
        component={BookingComplete}
        options={{title: strings.booking_Completed, headerShown: false}}
      />
      <Stack.Screen
        name={strings.cancellation_Boking}
        component={CancellationBooking}
        options={{title: strings.cancellation_Boking, headerShown: false}}
      />
      <Stack.Screen
        name={strings.membership}
        component={Membership}
        options={{title: strings.membership, headerShown: false}}
      />
      <Stack.Screen
        name={strings.travelcost}
        component={TravelCost}
        options={{title: strings.travelcost, headerShown: false}}
      />
      <Stack.Screen
        name={strings.offdays}
        component={OffDays}
        options={{title: strings.offdays, headerShown: false}}
      />
      <Stack.Screen
        name={strings.paymentmethod}
        component={ManagePayment}
        options={{title: strings.paymentmethod, headerShown: false}}
      />
      <Stack.Screen
        name={strings.settings}
        component={Settings}
        options={{title: strings.settings, headerShown: false}}
      />
      <Stack.Screen
        name={strings.your_Transaction}
        component={Transactions}
        options={{title: strings.your_Transaction, headerShown: false}}
      />
      <Stack.Screen
        name={strings.password_manager}
        component={PasswordManager}
        options={{title: strings.password_manager, headerShown: false}}
      />
      <Stack.Screen
        name={strings.helpcenter}
        component={HelpCenter}
        options={{title: strings.helpcenter, headerShown: false}}
      />
      <Stack.Screen
        name={strings.addresses}
        component={Addresses}
        options={{title: strings.addresses, headerShown: false}}
      />
      <Stack.Screen
        name={strings.yourprofile}
        component={YourProfile}
        options={{title: strings.yourprofile, headerShown: false}}
      />
      <Stack.Screen
        name={strings.privacy_Policy}
        component={PrivacyPolicy}
        options={{title: strings.privacy_Policy, headerShown: false}}
      />
      <Stack.Screen
        name={strings.notification_screen}
        component={Notifications}
        options={{title: strings.notification_screen, headerShown: false}}
      />
      <Stack.Screen
        name={strings.notify_screen}
        component={UserNotifications}
        options={{
          title: strings.notify_screen,
          headerShown: false,
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default AppStack;

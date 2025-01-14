import {useSelector} from 'react-redux';
import Addresses from '../../screens/Addresses/Addresses';
import ArrivedLocation from '../../screens/bookings/bookingsScreen/ArrivedLocation/ArrivedLocation';
import BookingAccepted from '../../screens/bookings/bookingsScreen/BookingAccepted/BookingAccepted';
import BookingComplete from '../../screens/bookings/bookingsScreen/BookingComplete/BookingComplete';
import BookingDetails from '../../screens/bookings/bookingsScreen/bookingDetails/BookingDetails';
import CancellationBooking from '../../screens/bookings/bookingsScreen/CancellationBooking/CancellationBooking';
import Direction from '../../screens/bookings/bookingsScreen/Direction/Direction';
import Home from '../../screens/home/homeScreen/Home';
import Notifications from '../../screens/home/NotificationScreen/Notifications';
import ManagePayment from '../../screens/Membership/ManagePayement/ManagePayment';
import Membership from '../../screens/Membership/Membership';
import OffDays from '../../screens/Membership/OffDays/OffDays';
import TravelCost from '../../screens/Membership/TravelCost/TravelCost';
import AddServices from '../../screens/myServices/myServiceScreen/AddServices';
import AddServicesSelected from '../../screens/myServices/myServiceScreen/AddServicesSelected';
import MyService from '../../screens/myServices/myServiceScreen/MyService';
import Services from '../../screens/myServices/myServiceScreen/Services';
import PrivacyPolicy from '../../screens/PrivacyPolicy/PrivacyPolicy';
import ArtistDetails from '../../screens/profile/artistDetailsScreen/ArtistDetails';
import Profile from '../../screens/profile/profileScreen/Profile';
import YourProfile from '../../screens/profile/YourProfile/YourProfile';
import HelpCenter from '../../screens/Settings/HelpCenter/HelpCenter';
import Settings from '../../screens/Settings/Settings';
import Transactions from '../../screens/Transactions/Transactions';
import UserNotifications from '../../screens/userNotificationScreen/UserNotifications';
import OnlineStores from '../../screens/UserScreen/onlineStores/OnlineStores';
import OnlineStoresDetail from '../../screens/UserScreen/onlineStores/OnlineStoresDetail';
import Saved from '../../screens/UserScreen/savedScreen/Saved';
import UserSearch from '../../screens/UserScreen/search/UserSearch';
import BottomStack from '../bottomStack/BottomStack';
import {getUserType} from '../../Redux/Reducers/UserTypeSlice';
import UserBottomStack from '../UserBottomStack/UserBottomStack';
import BookApointment from '../../screens/UserScreen/artistDetailsScreen/BookApointment';
import ArtistDetailsUser from '../../screens/UserScreen/artistDetailsScreen/ArtistDetails';
import ManualLocation from '../../screens/auth/locationScreen/ManualLocation';

// Get user type for stacks management

export const appRoutes = [
  {
    name: 'BottomTab',
    component: BottomStack,
  },
  {
    name: 'ArtistDetails',
    component: ArtistDetails,
  },
  {
    name: 'ArtistDetailsUser',
    component: ArtistDetailsUser,
  },

  {
    name: 'Profile',
    component: Profile,
  },
  {
    name: 'Addresses',
    component: Addresses,
  },
  {
    name: 'AddServices',
    component: AddServices,
  },
  {
    name: 'AddServicesSelected',
    component: AddServicesSelected,
  },
  {
    name: 'Services',
    component: Services,
  },
  {
    name: 'BookingDetails',
    component: BookingDetails,
  },
  {
    name: 'BookingCompleted',
    component: BookingComplete,
  },
  {
    name: 'BookingAccepted',
    component: BookingAccepted,
  },
  {
    name: 'CancellationBooking',
    component: CancellationBooking,
  },
  {
    name: 'Direction',
    component: Direction,
  },
  {
    name: 'ArrivedLocation',
    component: ArrivedLocation,
  },
  {
    name: 'Notifications',
    component: Notifications,
  },
  {
    name: 'UserNotifications',
    component: UserNotifications,
  },

  {
    name: 'PrivacyPolicy',
    component: PrivacyPolicy,
  },
  {
    name: 'YourProfile',
    component: YourProfile,
  },
  {
    name: 'ManagePayment',
    component: ManagePayment,
  },
  {
    name: 'Saved',
    component: Saved,
  },
  {
    name: 'HelpCenter',
    component: HelpCenter,
  },
  {
    name: 'Settings',
    component: Settings,
  },
  {
    name: 'Transactions',
    component: Transactions,
  },
  {
    name: 'Membership',
    component: Membership,
  },
  {
    name: 'TravelCost',
    component: TravelCost,
  },
  {
    name: 'OffDays',
    component: OffDays,
  },
  ////
  {
    name: 'OnlineStores',
    component: OnlineStores,
  },
  {
    name: 'OnlineStoresDetail',
    component: OnlineStoresDetail,
  },
  {
    name: 'BookAppointment',
    component: BookApointment,
  },
  {
    name: 'ManualLocation',
    component: ManualLocation,
  },
];

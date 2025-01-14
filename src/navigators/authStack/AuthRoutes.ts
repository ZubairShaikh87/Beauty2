import Location from '../../screens/auth/locationScreen/Location';
import ManualLocation from '../../screens/auth/locationScreen/ManualLocation';
import Login from '../../screens/auth/loginScreen';
import PasswordManager from '../../screens/auth/PasswordManager/PasswordManager';
import Signup from '../../screens/auth/signupScreen';
import UploadDocs from '../../screens/auth/uploadDocs/UploadDocs';
import OnBoarding from '../../screens/onBoarding/onBoardingScreen';
import Splash from '../../screens/onBoarding/splashScreen';
import Welcome from '../../screens/onBoarding/welcomeScreen';
import PrivacyPolicy from '../../screens/PrivacyPolicy/PrivacyPolicy';
import SignupUser from '../../screens/UserScreen/signupScreen';

export const authRoutes = [
  {
    name: 'Splash',
    component: Splash,
  },
  {
    name: 'SignupArtist',
    component: Signup,
  },
  {
    name: 'SignupUser',
    component: SignupUser,
  },
  {
    name: 'Login',
    component: Login,
  },
  {
    name: 'PasswordManager',
    component: PasswordManager,
  },
  {
    name: 'OnBoarding',
    component: OnBoarding,
  },
  {
    name: 'Welcome',
    component: Welcome,
  },
  {
    name: 'Location',
    component: Location,
  },

  {
    name: 'ManualLocation',
    component: ManualLocation,
  },
  {
    name: 'UploadDocuments',
    component: UploadDocs,
  },
  {
    name: 'PrivacyPolicy',
    component: PrivacyPolicy,
  },
];

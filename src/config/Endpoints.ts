export const Endpoints = {
  //AUTH
  login: 'login',
  signUp: 'register_user',
  signUpArtist: 'register_artist',
  signUpArtistGoogle: 'Social/Profile/Artist',
  signUpStore: 'Store/Role',
  forgotPassword: 'users/forget-password',
  verifyOTP: 'users/otp-verification',
  resetPassword: 'users/reset-password',
  documents: 'documents',
  addLocation: 'Location',
  //Onboarding
  onBoardScreen1: 'onboarding_screen_01',
  onBoardScreen2: 'onboarding_screen_02',
  onBoardScreen3: 'onboarding_screen_03',
  //APP
  customerBookingService: 'Booking/Customer/Store',
  customerUpcomingBookings: 'Booking/Customer/Activebooking',
  artistUpcomingBookings: 'Booking/Artist/Activebooking',
  customerCompleteBookings: 'Booking/Customer/Completebooking',
  artistCompleteBookings: 'Booking/Artist/Completebooking',
  customerCancelBookings: 'Booking/Customer/Cancelbooking',
  artistCancelBookings: 'Booking/Artist/Cancelbooking',
  customerBookings: 'Booking/Customer/Bookings',
  artistBookings: 'Booking/Artist/Bookings',
  bookingStatuss: 'Booking/Customer/Status',

  // Artist Services
  artistAddService: 'Services/Store',
  artistMyService: 'Services/MyServices',
  artistServices: 'Services/Get/',
  artistDetails: 'Artist/Profile/Detail/',
  artistProfile: 'artist_profile',
  updateArtistProfile: 'update_artist_profile',
  updateArtistAboutUs: 'Artist/AboutUs',
  artistImage: 'Artist/Image',
  artistGallery: 'Artist/Gallary',
  artistWorkingHours: 'Artist/Working/Hours',
  artistTravelCost: 'Artist/Traval/Cost',
  artistSocialLinks: 'Artist/Social/links',
  addBannerPicture: 'Artist/Banner',
  artistStatus: 'Artist/Status',
  artistAvailability: 'Artist/Available',
  getArtistAvailability: 'Artist/Available/Status',
  artistHomeData: 'Artist/Home/Screen',
  deleteService: 'Services/Delete/',
  // deleteService: 'Services/Detail/Delete/',
  artistEarning: 'Artist/Earning',
  artistPendingEarning: 'Artist/Earning/Pending',
  // dayoff
  dayOff:'Offdays/Store',
  getDayOff:'Offdays/Get',
  deleteDayOff:'Offdays/Delete/',

  //Category
  listCategory: 'list_category',

  // social login
  googleLogin: 'google/socialite',
};

import {Endpoints} from '../../../config/Endpoints';
import {apiMethods, baseApi} from '../api';

const customerBookingService = (body: any) => {
  return {
    url: Endpoints.customerBookingService,
    method: apiMethods.post,
    body,
    headers: {
      'Content-type': 'application/json',
    },
  };
};
const customerUpcomingBookings = () => {
  return {
    url: Endpoints.customerUpcomingBookings,
    method: apiMethods.get,
    headers: {
      'Content-type': 'application/json',
    },
  };
};
const artistUpcomingBookings = () => {
  return {
    url: Endpoints.artistUpcomingBookings,
    method: apiMethods.get,
    headers: {
      'Content-type': 'application/json',
    },
  };
};
const customerCompleteBookings = () => {
  return {
    url: Endpoints.customerCompleteBookings,
    method: apiMethods.get,
    headers: {
      'Content-type': 'application/json',
    },
  };
};
const artistCompleteBookings = () => {
  return {
    url: Endpoints.artistCompleteBookings,
    method: apiMethods.get,
    headers: {
      'Content-type': 'application/json',
    },
  };
};
const customerCancelBookings = () => {
  return {
    url: Endpoints.customerCancelBookings,
    method: apiMethods.get,
    headers: {
      'Content-type': 'application/json',
    },
  };
};
const artistCancelBookings = () => {
  return {
    url: Endpoints.artistCancelBookings,
    method: apiMethods.get,
    headers: {
      'Content-type': 'application/json',
    },
  };
};
const customerBookings = () => {
  return {
    url: Endpoints.customerBookings,
    method: apiMethods.get,
    headers: {
      'Content-type': 'application/json',
    },
  };
};
const artistBookings = () => {
  return {
    url: Endpoints.artistBookings,
    method: apiMethods.get,
    headers: {
      'Content-type': 'application/json',
    },
  };
};
// const bookingStatus = () => {
//   return {
//     url: Endpoints.bookingStatus,
//     method: apiMethods.get,
//     headers: {
//       'Content-type': 'application/json',
//     },
//   };
// };
const bookingStatus = (body: any) => {
  return {
    url: Endpoints.bookingStatuss,
    method: apiMethods.post,
    body,
    // headers: {
    //   'Content-type': 'application/json',
    // },
  };
};
const artistAddServices = (body: any) => {
  return {
    url: Endpoints.artistAddService,
    method: apiMethods.post,
    body,
    // headers: {
    //   'Content-type': 'application/json',
    // },
  };
};
const artistGetMyServices = () => {
  return {
    url: Endpoints.artistMyService,
    method: apiMethods.get,
    headers: {
      'Content-type': 'application/json',
    },
  };
};
const getCategoryList = () => {
  return {
    url: Endpoints.listCategory,
    method: apiMethods.get,
    headers: {
      'Content-type': 'application/json',
    },
  };
};
//OnBoarding
const onBoardScreen1 = () => {
  return {
    url: Endpoints.onBoardScreen1,
    method: apiMethods.get,
    headers: {
      'Content-type': 'application/json',
    },
  };
};
const onBoardScreen2 = () => {
  return {
    url: Endpoints.onBoardScreen2,
    method: apiMethods.get,
    headers: {
      'Content-type': 'application/json',
    },
  };
};
const onBoardScreen3 = () => {
  return {
    url: Endpoints.onBoardScreen3,
    method: apiMethods.get,
    headers: {
      'Content-type': 'application/json',
    },
  };
};
const getArtistsForService = (id: string) => {
  return {
    url: `${Endpoints.artistServices}${id}`,
    method: apiMethods.get,
    headers: {
      'Content-type': 'application/json',
    },
  };
};
const getArtistsDetails = (id: string) => {
  return {
    url: `${Endpoints.artistDetails}${id}`,
    method: apiMethods.get,
    headers: {
      'Content-type': 'application/json',
    },
  };
};
const getArtistsProfile = (id: string) => {
  return {
    url: `${Endpoints.artistProfile}`,
    method: apiMethods.get,
    headers: {
      'Content-type': 'application/json',
    },
  };
};
const getArtistsStatus = (id: string) => {
  return {
    url: `${Endpoints.artistStatus}`,
    method: apiMethods.get,
    headers: {
      'Content-type': 'application/json',
    },
  };
};
const getArtistsHomeData = (id: string) => {
  return {
    url: `${Endpoints.artistHomeData}`,
    method: apiMethods.get,
    headers: {
      'Content-type': 'application/json',
    },
  };
};
const deleteServiceType = (id: string) => {
  return {
    url: `${Endpoints.deleteService}${id}`,
    method: apiMethods.get,
    headers: {
      'Content-type': 'application/json',
    },
  };
};
const artistEarnings = () => {
  return {
    url: `${Endpoints.artistEarning}`,
    method: apiMethods.get,
    headers: {
      'Content-type': 'application/json',
    },
  };
};
const artistPendingEarnings = () => {
  return {
    url: `${Endpoints.artistPendingEarning}`,
    method: apiMethods.get,
    headers: {
      'Content-type': 'application/json',
    },
  };
};
const updateArtistsProfile = body => {
  return {
    url: Endpoints.updateArtistProfile,
    method: apiMethods.post,
    body,
    // headers: {
    //   'Content-type': 'application/json',
    // },
  };
};
const updateArtistAboutUs = body => {
  return {
    url: Endpoints.updateArtistAboutUs,
    method: apiMethods.post,
    body,
    // headers: {
    //   'Content-type': 'application/json',
    // },
  };
};
const updateArtistImage = body => {
  return {
    url: Endpoints.artistImage,
    method: apiMethods.post,
    body,
    // headers: {
    //   'Content-type': 'application/json',
    // },
  };
};
const addGallery = body => {
  return {
    url: Endpoints.artistGallery,
    method: apiMethods.post,
    body,
    // headers: {
    //   'Content-type': 'application/json',
    // },
  };
};
const addArtistWorkingHours = body => {
  return {
    url: Endpoints.artistWorkingHours,
    method: apiMethods.post,
    body,
    // headers: {
    //   'Content-type': 'application/json',
    // },
  };
};
const updateArtistTravelCost = body => {
  return {
    url: Endpoints.artistTravelCost,
    method: apiMethods.post,
    body,
    // headers: {
    //   'Content-type': 'application/json',
    // },
  };
};
const addSocialLinks = body => {
  return {
    url: Endpoints.artistSocialLinks,
    method: apiMethods.post,
    body,
    // headers: {
    //   'Content-type': 'application/json',
    // },
  };
};
const addBannerPicture = body => {
  return {
    url: Endpoints.addBannerPicture,
    method: apiMethods.post,
    body,
    // headers: {
    //   'Content-type': 'application/json',
    // },
  };
};
const artistAvailablity = body => {
  return {
    url: Endpoints.artistAvailability,
    method: apiMethods.post,
    body,
    // headers: {
    //   'Content-type': 'application/json',
    // },
  };
};
const getArtistAvailablity = body => {
  return {
    url: Endpoints.getArtistAvailability,
    method: apiMethods.get,
    body,
    // headers: {
    //   'Content-type': 'application/json',
    // },
  };
};

// day off
const dayOffAdd = (body: any) => {
  return {
    url: Endpoints.dayOff,
    method: apiMethods.post,
    body,
    // headers: {
    //   'Content-type': 'application/json',
    // },
  };
};
const getDayOff = () => {
  return {
    url: Endpoints.getDayOff,
    method: apiMethods.get,
    headers: {
      'Content-type': 'application/json',
    },
  };
};
const deleteDayOff = (id: string) => {
  return {
    url: `${Endpoints.deleteDayOff}${id}`,
    method: apiMethods.get,
    headers: {
      'Content-type': 'application/json',
    },
  };
};

////
export const AppApi = baseApi.injectEndpoints({
  endpoints: build => ({
    //Onboarding
    onBoardScreen1: build.query({
      query: onBoardScreen1,
    }),
    onBoardScreen2: build.query({
      query: onBoardScreen2,
    }),
    onBoardScreen3: build.query({
      query: onBoardScreen3,
    }),
    // Booking
    customerBookingService: build.mutation({
      query: customerBookingService,
    }),
    customerUpcomingBookings: build.query({
      query: customerUpcomingBookings,
    }),
    artistUpcomingBookings: build.query({
      query: artistUpcomingBookings,
    }),
    customerCompleteBookings: build.query({
      query: customerCompleteBookings,
    }),
    artistCompleteBookings: build.query({
      query: artistCompleteBookings,
    }),
    customerCancelBookings: build.query({
      query: customerCancelBookings,
    }),
    artistCancelBookings: build.query({
      query: artistCancelBookings,
    }),
    customerBookings: build.query({
      query: customerBookings,
    }),
    artistBookings: build.query({
      query: artistBookings,
    }),
    bookingStatus: build.mutation({
      query: bookingStatus,
    }),
    artistAddServices: build.mutation({
      query: artistAddServices,
    }),
    artistGetMyServices: build.query({
      query: artistGetMyServices,
    }),
    getCategoryList: build.query({
      query: getCategoryList,
    }),
    getArtistsForService: build.query({
      query: getArtistsForService,
    }),
    getArtistsDetails: build.query({
      query: getArtistsDetails,
    }),
    getArtistsProfile: build.query({
      query: getArtistsProfile,
    }),
    updateArtistsProfile: build.mutation({
      query: updateArtistsProfile,
    }),

    updateArtistAboutUs: build.mutation({
      query: updateArtistAboutUs,
    }),
    updateArtistImage: build.mutation({
      query: updateArtistImage,
    }),
    addGallery: build.mutation({
      query: addGallery,
    }),
    addArtistWorkingHours: build.mutation({
      query: addArtistWorkingHours,
    }),
    updateArtistTravelCost: build.mutation({
      query: updateArtistTravelCost,
    }),
    addSocialLinks: build.mutation({
      query: addSocialLinks,
    }),
    addBannerPicture: build.mutation({
      query: addBannerPicture,
    }),
    getArtistsStatus: build.query({
      query: getArtistsStatus,
    }),
    artistAvailablity: build.mutation({
      query: artistAvailablity,
    }),
    getArtistAvailablity: build.query({
      query: getArtistAvailablity,
    }),
    getArtistsHomeData: build.query({
      query: getArtistsHomeData,
    }),
    deleteServiceType: build.query({
      query: deleteServiceType,
    }),
    artistEarnings: build.query({
      query: artistEarnings,
    }),
    artistPendingEarnings: build.query({
      query: artistPendingEarnings,
    }),
    dayOffAdd: build.mutation({
      query: dayOffAdd,
    }),
    getDayOff: build.query({
      query: getDayOff,
    }),
    deleteDayOff: build.query({
      query: deleteDayOff,
    }),
  }),
});

export const {
  //onboarding
  useLazyOnBoardScreen1Query,
  useLazyOnBoardScreen2Query,
  useLazyOnBoardScreen3Query,
  // Booking
  useCustomerBookingServiceMutation,
  useLazyArtistBookingsQuery,
  useBookingStatusMutation,
  useLazyArtistUpcomingBookingsQuery,
  useLazyArtistCompleteBookingsQuery,
  useLazyArtistCancelBookingsQuery,
  useLazyCustomerBookingsQuery,
  useLazyCustomerCancelBookingsQuery,
  useLazyCustomerCompleteBookingsQuery,
  useLazyCustomerUpcomingBookingsQuery,
  //
  useArtistAddServicesMutation,
  useLazyArtistGetMyServicesQuery,
  //
  useLazyGetCategoryListQuery,
  //
  useLazyGetArtistsForServiceQuery,
  useLazyGetArtistsDetailsQuery,
  useLazyGetArtistsProfileQuery,
  useUpdateArtistsProfileMutation,
  useUpdateArtistAboutUsMutation,
  useUpdateArtistImageMutation,
  useAddGalleryMutation,
  useAddArtistWorkingHoursMutation,
  useUpdateArtistTravelCostMutation,
  useAddSocialLinksMutation,
  useAddBannerPictureMutation,
  useLazyGetArtistsStatusQuery,
  useArtistAvailablityMutation,
  useLazyGetArtistsHomeDataQuery,
  useLazyDeleteServiceTypeQuery,
  useLazyArtistEarningsQuery,
  useLazyArtistPendingEarningsQuery,
  useLazyGetArtistAvailablityQuery,
  useDayOffAddMutation,
  useLazyGetDayOffQuery,
  useLazyDeleteDayOffQuery

} = AppApi;

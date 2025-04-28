import {Endpoints} from '../../../config/Endpoints';
import {apiMethods, baseApi} from '../api';

const signUp = (body: Object) => {
  return {
    url: Endpoints.signUp,
    method: apiMethods.post,
    body,
    // headers: {
    //   'Content-type': 'application/json',
    // },
  };
};
const signUpArtist = (body: Object) => {
  return {
    url: Endpoints.signUpArtist,
    method: apiMethods.post,
    body,
    // headers: {
    //   'Content-type': 'application/json',
    // },
  };
};
const signUpArtistGoogle = (body: Object) => {
  return {
    url: Endpoints.signUpArtistGoogle,
    method: apiMethods.post,
    body,
    // headers: {
    //   'Content-type': 'application/json',
    // },
  };
};
const signUpStore = (body: Object) => {
  return {
    url: Endpoints.signUpStore,
    method: apiMethods.post,
    body,
    // headers: {
    //   'Content-type': 'application/json',
    // },
  };
};
const login = (body: Object) => {
  return {
    url: Endpoints.login,
    method: apiMethods.post,
    body,
  };
};
const googleLogin = (body: Object) => {
  return {
    url: Endpoints.googleLogin,
    method: apiMethods.post,
    body,
  };
};
const uploadArtistDocument = (body: Object) => {
  return {
    url: Endpoints.documents,
    method: apiMethods.post,
    body,
  };
};
const addLocation = (body: Object) => {
  return {
    url: Endpoints.addLocation,
    method: apiMethods.post,
    body,
  };
};
export const AuthApi = baseApi.injectEndpoints({
  endpoints: build => ({
    signUp: build.mutation({
      query: signUp,
    }),
    signUpArtist: build.mutation({
      query: signUpArtist,
    }),
    signUpArtistGoogle: build.mutation({
      query: signUpArtistGoogle,
    }),
    signUpStore: build.mutation({
      query: signUpStore,
    }),
    login: build.mutation({
      query: login,
    }),
    googleLogin: build.mutation({
      query: googleLogin,
    }),
    uploadArtistDocument: build.mutation({
      query: uploadArtistDocument,
    }),
    addLocation: build.mutation({
      query: addLocation,
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignUpStoreMutation,
  useSignUpArtistMutation,
  useSignUpArtistGoogleMutation,
  useLoginMutation,
  useGoogleLoginMutation,
  useUploadArtistDocumentMutation,
  useAddLocationMutation,
} = AuthApi;

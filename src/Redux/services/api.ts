import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import api from '../../constants/Api.constants';

const baseQuery = fetchBaseQuery({
  baseUrl: api.baseUrl,
  prepareHeaders: (headers, {getState}) => {
    const token = getState()?.user?.token;
    console.log(token, 'AccessToken::  ');
    // const header = null;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    }
  },
});

const baseQueryWithInterceptor = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
  }
  // console.log(result, 'KDKFJDKFJRRRƒ');
  return result;
};
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
});
//Methods
export const apiMethods = {
  get: 'GET',
  post: 'POST',
  patch: 'PATCH',
  put: 'PUT',
  delete: 'DELETE',
};

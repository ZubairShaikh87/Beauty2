import {combineReducers} from '@reduxjs/toolkit';
import {baseApi} from '../services/api';
import UserSlice from './UserSlice';
import {Type_Reducer} from './TypeReducer';
import UserTypeSlice from './UserTypeSlice';

const IndexReducer = combineReducers({
  user: UserSlice.reducer,
  userType: UserTypeSlice.reducer,
  Type_Reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export default IndexReducer;

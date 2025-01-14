import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  currentUserType: null,
};
const userTypeSlice = createSlice({
  name: 'userType',
  initialState,
  reducers: {
    setUserType: (state, action) => {
      state.currentUserType = action.payload;
    },
  },
});
export const {setUserType} = userTypeSlice.actions;
export const getUserType = (state: any) => state.userType.currentUserType;
export default {initialState, reducer: userTypeSlice.reducer};

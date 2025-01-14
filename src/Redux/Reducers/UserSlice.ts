import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      console.log(action, 'skdfjkdsfjkACTION');
      state.token = action.payload;
    },
    setUser: (state, action) => {
      console.log(action, 'skdfjkdsfjkACTION');
      state.user = action.payload;
    },
  },
});

export const {setToken, setUser} = userSlice?.actions;

export const getUser = (state: any) => state.user.user;
export const getToken = (state: any) => state.user.token;

// export default authSlice?.re
export default {initialState, reducer: userSlice?.reducer};

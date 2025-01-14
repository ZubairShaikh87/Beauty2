import {ActionsTypes} from '../ActionsTypes';

const initialState = null;

export const Type_Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionsTypes.TYPESTORE:
      return action.payload;
    case ActionsTypes.REMOVETYPE:
      return null;
    default:
      return state;
  }
};

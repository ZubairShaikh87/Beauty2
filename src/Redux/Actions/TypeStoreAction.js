import {ActionsTypes} from '../ActionsTypes';

export function typeStore(payload) {
  return {
    type: ActionsTypes.TYPESTORE,
    payload,
  };
}
export function typeStoreRemove() {
  return {
    type: ActionsTypes.REMOVETYPE,
    payload: null,
  };
}

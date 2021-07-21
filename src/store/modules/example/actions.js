import * as types from '../types';

export function btnSuccess() {
  return {
    type: types.BTN_CLICK_SUCCESS,
  }
}

export function btnFailure() {
  return {
    type: types.BTN_CLICK_FAILURE,
  }
}

export function btnRequest() {
  return {
    type: types.BTN_CLICK_REQUEST,
  }
}


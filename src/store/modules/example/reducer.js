import * as types from '../types';

const initialState = {
  btnClick: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.BTN_CLICK_SUCCESS: {
      console.log('Im a success')
      const newState = { ...state };
      newState.btnClick = !newState.btnClick;
      return newState
    }
    case types.BTN_CLICK_FAILURE: {
      console.log('Im a failure')
      return state
    }
    case types.BTN_CLICK_REQUEST: {
      console.log('Im doing a request!')
      return state
    }
    default:
      return state;
  }
}

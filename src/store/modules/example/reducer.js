const initialState = {
  btnClick: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'BTN_CLICK': {
      const newState = { ...state };
      newState.btnClick = !newState.btnClick;
      return newState;
    }

    default:
      return state;
  }
}

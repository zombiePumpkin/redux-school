import { createStore } from "redux";

const initialState = {
  btnClick: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'BOTAO_CLICADO': {
      console.log('Im listenning the mouse click');
      const newState = { ...state };
      newState.btnClick = !newState.btnClick;
      return newState;
    }

    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;

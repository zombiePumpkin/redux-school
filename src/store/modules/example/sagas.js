import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actions from './actions';
import * as types from '../types';

const requisition = () => new Promise((res) => {
  setTimeout(() => {
    res();
  }, 800)
});

function* request() {
  try {
    yield call(requisition);
    yield put(actions.btnSuccess());
  } catch {
    toast.error('Somethings is not right...')
    yield put(actions.btnFailure());
  }
}

export default all([
  takeLatest(types.BTN_CLICK_REQUEST, request),
]);

import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import history from '../../../services/history';
import * as actions from './actions';
import axios from '../../../services/axios';

import * as types from '../types';

function* loginRequest({ payload }) {
  try {
    const resp = yield call(axios.post, '/tokens', payload);
    yield put(actions.loginSuccess({ ...resp.data }));
    toast.success('logged with success');
    axios.defaults.headers.Authorization = `Bearer ${resp.data.token}`;
    history.push(payload.prevPath);
  } catch (error) {
    const errors = get(error, "response.data.errors", []);
    errors.map(err => toast.error(err));
    yield put(actions.loginFailure());
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

function* registerRequest({ payload }) {
  const { id, name, email, password } = payload;

  try {
    if (id) {
      yield call(axios.put, '/users', {
        name,
        email,
        password: password || undefined,
      })

      toast.success('Conta alterada com sucesso')
      yield put(actions.registerUpdatedSuccesss({ name, email, password }))
    } else {
      yield call(axios.post, '/users', {
        name,
        email,
        password,
      })

      toast.success('Conta criada com sucesso')
      yield put(actions.registerCreatedSuccesss({ name, email, password }))
      history.push('/login');
    }
  } catch (error) {
    const errors = get(error, 'response.data.error', []);
    const status = get(error, 'response.data.error', 0);

    if (status === 401) {
      toast.warning('Você precisa realizar login novamente.');
      yield put(actions.loginFailure());
      history.push('/login')
    } else {
      if (errors.length > 0) {
        errors.map(err => toast.error(err));
      } else {
        toast.error('Erro desconhecido');
      }

      yield put(actions.registerFailure());
    }
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default function persistedReducers(reducers) {
  return persistReducer(
    {
      key: 'REDUX-SCHOOL',
      storage,
      whitelist: ['auth'],
    },
    reducers
  );
}

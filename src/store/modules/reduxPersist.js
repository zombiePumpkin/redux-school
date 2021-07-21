import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default function persistedReducers(reducers) {
  return persistReducer(
    {
      key: 'REACT_BASE',
      storage,
      whitelist: ['example'],
    },
    reducers
  );
}

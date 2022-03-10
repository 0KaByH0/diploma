import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas/root.saga';
import { rooms } from './slices/rooms.slice';
import { user } from './slices/user.slice';

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

export const store = configureStore({
  reducer: { user, rooms },
  middleware,
});

sagaMiddleware.run(rootSaga);

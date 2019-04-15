import { applyMiddleware, createStore } from 'redux';
import reducer from './reducer';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory as createHistory } from 'history';
import rootSaga from './sagas/saga';

export const history = createHistory();

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

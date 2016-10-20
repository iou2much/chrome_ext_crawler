import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
// import thunk from 'redux-thunk';
import storage from '../utils/storage';
import rootSaga from '../sagas/sagas'

// const middlewares = applyMiddleware(thunk);
// const enhancer = compose(
  // middlewares,
  // storage()
// );

const sagaMiddleware = createSagaMiddleware()
const enhancer = compose(
    applyMiddleware(sagaMiddleware),
    storage()
);


export default function (initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga);
  return store;
}


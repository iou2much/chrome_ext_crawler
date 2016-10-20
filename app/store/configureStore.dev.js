import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
// import thunk from 'redux-thunk';
import storage from '../utils/storage';
import rootSaga from '../sagas/sagas';


const sagaMiddleware = createSagaMiddleware()
const enhancer = compose(
    applyMiddleware(sagaMiddleware),
    storage()
);

export default function (initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  sagaMiddleware.run(rootSaga);
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}


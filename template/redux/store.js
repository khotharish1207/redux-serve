import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import reducer from "./reducers/rootReducer";
import saga from './sagas/rootSaga'

const sagaMiddleware = createSagaMiddleware();

export default function(initialState = {}) {
  console.log('configureStore')
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(saga);

  return store;
}

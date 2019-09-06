import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import thunk from 'redux-thunk'
import reducers from "./redux/reducers";

export function initializeStore() {
  return createStore(
    reducers,
    applyMiddleware(thunk, promiseMiddleware()),
  )
}
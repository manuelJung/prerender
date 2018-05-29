import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import productsReducer from 'modules/products'

export default function makeRootReducer (asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    products: productsReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

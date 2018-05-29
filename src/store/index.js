import createStore from './createStore'
import { createBrowserHistory } from 'history'

// ========================================================
// Store & History Instantiation
// ========================================================
const history = createBrowserHistory()
const initialState = window.___INITIAL_STATE__
const store = createStore(initialState, history)

export { history, store }
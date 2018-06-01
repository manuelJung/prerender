import React from 'react'
import registerServiceWorker from 'registerServiceWorker'
import App from 'containers/App'
import {store, history} from 'store'
import {render as prerender} from 'prerender'

import {
 FETCH_PRODUCTS_REQUEST,
 FETCH_PRODUCTS_SUCCESS,
 FETCH_PRODUCTS_FAILURE
} from './modules/products'


// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

const render = Container => prerender(() => <Container history={history} store={store} />, MOUNT_NODE, {
  store,
  incrementers: [FETCH_PRODUCTS_REQUEST],
  decrementers: [FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_SUCCESS]
})

render(App)

// ========================================================
// HMR Setup
// ========================================================
if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App').default
    render(NextApp)
  })
}

registerServiceWorker()

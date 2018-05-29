import React from 'react'
import registerServiceWorker from 'registerServiceWorker'
import App from 'containers/App'
import {store, history} from 'store'
import {render as prerender} from 'prerender'


// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

const render = Container => prerender(<Container history={history} store={store} />, MOUNT_NODE)

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

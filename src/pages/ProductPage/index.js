import React from 'react'
import Loadable from 'react-loadable'
import pt from 'prop-types'
import {loadComponent} from 'prerender/LoadableCapture'

export default loadComponent({
  namespace: 'pages-ProductPage', 
  loader: () => import(/* webpackChunkName: "pages-ProductPage" */ `./ProductPage`),
  loading: () => <div>loading</div>
})
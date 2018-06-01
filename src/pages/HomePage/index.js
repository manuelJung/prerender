import React from 'react'
import Loadable from 'react-loadable'
import pt from 'prop-types'
import {loadComponent} from 'prerender/LoadableCapture'

export default loadComponent({
  namespace: 'pages-HomePage', 
  loader: () => import(/* webpackChunkName: "pages-HomePage" */ `./HomePage`),
  loading: () => <div>loading</div>
})

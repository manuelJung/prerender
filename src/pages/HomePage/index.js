import React from 'react'

export {default} from './HomePage'

// export const HomePage = Loadable({
//   loader: () => import(/* webpackChunkName: "page-home" */ `./HomePage`),
//   loading: () => <div>Loading...</div> 
// })

export const loadHomePage = () => import(/* webpackChunkName: "page-home" */ `./HomePage`)

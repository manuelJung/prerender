import React from 'react'

export {default} from './ProductPage'

// export const ProductPage = Loadable({
//   loader: () => import(/* webpackChunkName: "page-products" */ `./ProductPage`),
//   loading: () => <div>Loading...</div> 
// })

export const loadProductPage = () => import(/* webpackChunkName: "page-products" */ `./ProductPage`)
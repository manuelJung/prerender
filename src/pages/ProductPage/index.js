import React from 'react'

export {default} from './ProductPage'


export const loadProductPage = () => import(/* webpackChunkName: "page-products" */ `./ProductPage`)
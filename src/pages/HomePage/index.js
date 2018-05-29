import React from 'react'

export {default} from './HomePage'


export const loadHomePage = () => import(/* webpackChunkName: "page-home" */ `./HomePage`)

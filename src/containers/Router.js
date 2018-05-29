import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'


// import universal from 'react-universal-component'
// const HomePage = universal(props => import(`../pages/HomePage`))
// const ProductPage = universal(props => import(`../pages/ProductPage`))


// import {loadProductPage} from 'pages/ProductPage'
// import {loadHomePage} from 'pages/HomePage'
import Loadable from 'react-loadable'

const HomePage = Loadable({
  loader: () => import(/* webpackChunkName: "page-home" */ `../pages/HomePage`),
  loading: () => <div>Loading...</div> 
})

const ProductPage = Loadable({
  loader: () => import(/* webpackChunkName: "page-products" */ `../pages/ProductPage`),
  loading: () => <div>Loading...</div> 
})


const paths = {
  HOME: '/',
  PRODUCTS: '/products'
}

export default class Router extends React.Component {

  render(){
    return (
      <div>
        <header>
          <Link to={paths.HOME}>Home</Link><span> - </span>
          <Link to={paths.PRODUCTS}>Products</Link>
        </header>

        <Switch>
          <Route exact sensitive strict path={paths.PRODUCTS} component={ProductPage} />
          <Route exact sensitive strict path={paths.HOME} component={HomePage} />
        </Switch>
      </div>
    )
  }
}
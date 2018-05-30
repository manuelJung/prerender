import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'


import HomePage from 'pages/HomePage'
import ProductPage from 'pages/ProductPage'


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
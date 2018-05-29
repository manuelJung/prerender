import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct, getProducts, shouldFetch} from 'modules/products'

class ProductPage extends React.Component {
  number = '12345678'
  componentWillMount(){
    let {shouldFetch} = this.props
    if(shouldFetch(this.number)){
      this.props.fetchProduct(this.number)
    }
  }
  render(){
    let {products} = this.props
    return (
      <div>
        <h1>Product Page</h1>
        {products.map(o => (
          <h3 key={o.number}>{o.number} <small>{o.price.toFixed(2)}</small></h3>
        ))}
      </div>
    )
  }
}

export default connect(
  state => ({
    shouldFetch: n => shouldFetch(state.products, n),
    products: getProducts(state.products)
  }),
  {fetchProduct}
)(ProductPage)
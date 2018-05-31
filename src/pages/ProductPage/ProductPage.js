import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct, getProducts, shouldFetch} from 'modules/products'
import styled from 'styled-components'

class ProductPage extends React.Component {
  
  componentWillMount(){
    let {shouldFetch} = this.props
    if(shouldFetch('componentWillMount')){
      this.props.fetchProduct('componentWillMount')
    }
  }

  componentDidMount(){
    let {shouldFetch} = this.props
    if(shouldFetch('componentDidMount')){
      this.props.fetchProduct('componentDidMount')
    }
  }
  
  render(){
    let {products} = this.props
    return (
      <Wrapper active={Boolean(products.length)}>
        <Headline>Product Page</Headline>
        {products.map(o => (
          <h3 key={o.number}>{o.number} <small>{o.price.toFixed(2)}</small></h3>
        ))}
      </Wrapper>
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

const Wrapper = styled.section`
  padding: 20px;
  border: 1px solid grey;
  background: ${props => props.active ? 'steelblue' : null};
`

const Headline = styled.h1`
  color: lightgrey;
  font-weight: bold;
`
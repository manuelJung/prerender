import React from 'react'
import Loadable from 'react-loadable'
import pt from 'prop-types'

const ProductPage = Loadable({
  loader: () => import(/* webpackChunkName: "pages-ProductPage" */ `./ProductPage`),
  loading: () => <div>Loading...</div> 
})

let Loader = props => <ProductPage {...props}/>

if(navigator.userAgent.match(/Node\.js/i) && window && window.reactSnapshotRender){
  Loader = class extends React.Component {
    static contextTypes = {
      prerender: pt.shape({
        report: pt.func.isRequired,
      })
    }
    componentWillMount = () => this.context.prerender && this.context.prerender.report('pages-ProductPage')
    render = () => (<ProductPage {...this.props}/>)
  }
}

export default Loader
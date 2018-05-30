import React from 'react'
import Loadable from 'react-loadable'
import pt from 'prop-types'

const HomePage = Loadable({
  loader: () => import(/* webpackChunkName: "pages-HomePage" */ `./HomePage`),
  loading: () => <div>Loading...</div> 
})

let Loader = props => <HomePage {...props}/>

if(navigator.userAgent.match(/Node\.js/i) && window && window.reactSnapshotRender){
  Loader = class extends React.Component {
    static contextTypes = {
      prerender: pt.shape({
        report: pt.func.isRequired,
      })
    }
    componentWillMount = () => this.context.prerender && this.context.prerender.report('pages-HomePage')
    render = () => (<HomePage {...this.props}/>)
  }
}

export default Loader
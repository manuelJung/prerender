import React from 'react'
import pt from 'prop-types'
import Loadable from 'react-loadable'
import {IS_CRAWLER} from './const'

export default class LoadableCapture extends React.Component {
  static propTypes = {
    report: pt.func.isRequired
  };

  static childContextTypes = {
    prerender: pt.shape({
      report: pt.func.isRequired
    }).isRequired
  }

  getChildContext() {
    return {
      prerender: {
        report: this.props.report
      }
    }
  }

  render() {
    return React.Children.only(this.props.children)
  }
}

export function loadComponent ({namespace, ...loadableArgs}) {
  const Component = Loadable({ ...loadableArgs })
  if(!IS_CRAWLER) return (props => <Component {...props}/>)

  return class extends React.Component {
    static contextTypes = {
      prerender: pt.shape({ report: pt.func.isRequired })
    }
    componentWillMount = () => this.context.prerender && this.context.prerender.report(namespace)
    render = () => (<Component {...this.props}/>)
  }
}
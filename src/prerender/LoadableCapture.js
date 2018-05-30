import React from 'react'
import pt from 'prop-types'

export default class LoadableCapture extends React.Component {
  static propTypes = {
    report: pt.func.isRequired
  };

  static childContextTypes = {
    prerender: pt.shape({
      report: pt.func.isRequired
    }).isRequired
  };

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
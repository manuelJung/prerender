import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import Router from 'containers/Router'

export default class App extends React.Component {

  shouldComponentUpdate () { return false }

  render() {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Router/>
        </ConnectedRouter>
      </Provider>
    )
  }
}

import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import Loadable from 'react-loadable'
import LoadableCapture from './LoadableCapture'

export const render = (RootComponent, domElement) => {
  if (navigator.userAgent.match(/Node\.js/i) && window && window.reactSnapshotRender) {
    window.reactSnapshotRender(Loadable.preloadAll().then(() => {
      let modules = []
      domElement.innerHTML = ReactDOMServer.renderToString(
        <LoadableCapture report={name => modules.push(name)}>
          <RootComponent/>
        </LoadableCapture>
      )
      console.log('extracted modules', modules)
    }))
  } else {
    ReactDOM.render(<RootComponent/>, domElement)
  }
}
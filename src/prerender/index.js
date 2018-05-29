import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import Loadable from 'react-loadable'

export const render = (rootComponent, domElement) => {
  if (navigator.userAgent.match(/Node\.js/i) && window && window.reactSnapshotRender) {
    window.reactSnapshotRender(Loadable.preloadAll().then(() => {
      domElement.innerHTML = ReactDOMServer.renderToString(rootComponent)
    }))
  } else {
    ReactDOM.render(rootComponent, domElement)
  }
}
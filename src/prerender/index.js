import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import Loadable from 'react-loadable'
import LoadableCapture from './LoadableCapture'
import { addMiddleware } from 'redux-dynamic-middlewares'
import { ServerStyleSheet, __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS } from 'styled-components'
 

export const render = (RootComponent, domElement, store) => {
  if (navigator.userAgent.match(/Node\.js/i) && window && window.reactSnapshotRender) {
    window.reactSnapshotRender(
      Loadable.preloadAll()
      .then(() => collectStoreData(RootComponent, store))
      .then(() => {
        let modules = []
        const { StyleSheet } = __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS
        StyleSheet.reset(true)
        const sheet = new ServerStyleSheet()
        domElement.innerHTML = ReactDOMServer.renderToString(sheet.collectStyles(
          <LoadableCapture report={name => modules.push(name)}>
            <RootComponent/>
          </LoadableCapture>
        ))
        // console.log('modules', modules)
        // console.log('state', JSON.stringify(store.getState(), null, 2))
        console.log('styles', sheet.getStyleTags())
      })
      .catch(console.log)
  )
  } else {
    ReactDOM.render(<RootComponent/>, domElement)
  }
}


async function collectStoreData(RootComponent, store){
  let asyncCounter = 0
  let asyncCounterCalled = false
  addMiddleware(store => next => action => {
    if(action.type === 'products/FETCH_PRODUCTS_REQUEST') asyncCounter++
    if(action.type === 'products/FETCH_PRODUCTS_SUCCESS') asyncCounter--
    if(action.type === 'products/FETCH_PRODUCTS_FAILURE') asyncCounter--
    return next(action)
  })
  ReactDOMServer.renderToString(<RootComponent/>)
  await wait(100) 
  while(asyncCounter > 0){ 
    asyncCounterCalled = true
    await wait(100) 
  }
  return asyncCounterCalled ? collectStoreData(RootComponent, store) : 'done'
}

const wait = ms => new Promise(resolve => setTimeout(() => resolve()), ms)


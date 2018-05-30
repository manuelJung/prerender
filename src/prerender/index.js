import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import Loadable from 'react-loadable'
import LoadableCapture from './LoadableCapture'
import { addMiddleware } from 'redux-dynamic-middlewares'
 

export const render = (RootComponent, domElement, store) => {
  if (navigator.userAgent.match(/Node\.js/i) && window && window.reactSnapshotRender) {
    window.reactSnapshotRender(
      Loadable.preloadAll()
      .then(() => collectStoreData(RootComponent, store))
      .then(() => {
        let modules = []
        domElement.innerHTML = ReactDOMServer.renderToString(
          <LoadableCapture report={name => modules.push(name)}>
            <RootComponent/>
          </LoadableCapture>
        )
        console.log('extracted modules', modules)
        console.log(JSON.stringify(store.getState(), null, 2))
      })
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


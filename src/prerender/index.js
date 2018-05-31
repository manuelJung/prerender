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
        const sheet = createSheet()
        domElement.innerHTML = ReactDOMServer.renderToString(sheet.collectStyles(
          <LoadableCapture report={name => modules.push(name)}>
            <RootComponent/>
          </LoadableCapture>
        ))
        insertModules(modules)
        createDefaultState(store)
        createdStyleTags(sheet)
      })
      .catch(console.log)
  )
  } else {
    if(process.env.NODE_ENV === 'production'){
      Loadable.preloadReady().then(() => {
        console.log('Preload ready')
        ReactDOM.hydrate(<RootComponent/>, domElement)  
      })
    }
    if(process.env.NODE_ENV !== 'production'){
      ReactDOM.render(<RootComponent/>, domElement)
    }
  }
}

function createdStyleTags(sheet){
  const styleTags = sheet.getStyleTags()
  document.head.innerHTML += styleTags
}

function createDefaultState (store) {
  const script = document.createElement('script')
  const state = JSON.stringify(store.getState())
  script.type = 'text/javascript'
  script.text = `window.___INITIAL_STATE__=${state}`
  document.head.appendChild(script)
}

function insertModules(modules){
  const allLoadableScripts = Array.from(document.getElementsByTagName('script'))
    .filter(script => script.src && script.src.includes('/static/js/'))
    .filter(script => !script.src.includes('/js/main.'))
  const usedLoadableScripts = modules.map(name => allLoadableScripts.find(script => script.src.includes(name)))
  const mainScript = Array.from(document.getElementsByTagName('script'))
    .filter(script => script.src && script.src.includes('/static/js/'))
    .find(script => script.src.includes('/js/main.'))

  allLoadableScripts.forEach(script => script.remove())
  usedLoadableScripts.forEach(script => mainScript.parentNode.insertBefore(script, mainScript))
}

function createSheet(){
  const { StyleSheet } = __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS
  StyleSheet.reset(true)
  return new ServerStyleSheet()
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


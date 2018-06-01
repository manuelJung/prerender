require("babel-register")({
  presets: ['env', 'react-app'],
  plugins: ['add-module-exports', 'react-loadable/babel']
})
var cli = require('./cli')
cli(process.argv)
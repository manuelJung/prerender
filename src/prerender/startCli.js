require("babel-register")({
  presets: ['env', 'react-app'],
  plugins: ['add-module-exports']
})
var cli = require('./cli')
cli(process.argv)
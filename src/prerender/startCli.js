require("babel-register")({
  presets: ['env'],
  plugins: ['add-module-exports']
})
var cli = require('./cli')
cli(process.argv)
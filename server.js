var express = require('express')
var app = express()
var fs = require('fs')


var publicdir = __dirname + '/build'

app.use((req, res, next) => {
  if (req.path.indexOf('.') === -1) {
    var file = publicdir + req.path + '.html'
    fs.exists(file, exists => {
      if (exists) req.url += '.html'
      next()
    })
  }
  else
    next()
});
app.use(express.static(publicdir));

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
})
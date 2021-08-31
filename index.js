const express = require('express');
const compression = require('compression');
const app = express();
const http = require('http').createServer(app);

app.use(express.json())
app.use(compression());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept')
  if (req.url.lastIndexOf('wasm.br') != -1) {
    res.header('Content-Type', 'application/wasm')
    res.header('Content-Encoding', 'br')
  }
  else if (req.url.lastIndexOf('.br') != -1) {
    res.header('Content-Encoding', 'br')
  }
  else if (req.url.lastIndexOf('.gz') != -1) {
    res.header('Content-Encoding', 'gzip')
  }
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

app.use(express.static('public'))

http.listen(process.env.PORT || 8020, async (err) => {
  console.log('start v2');
  console.log('server started', process.env.PORT || 8020)
});
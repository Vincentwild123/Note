const app = require('express')();
const http = require('http')
app.get('/', function (req, res, next) {
    res.end('server1');
})
const server = http.createServer(app);
server.listen(8080);
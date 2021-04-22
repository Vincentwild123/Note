const app = require('express')();
const http = require('http')
app.get('/', function (req, res, next) {
    res.end('server2');
})
const server =  http.createServer(app);
server.listen(8081);
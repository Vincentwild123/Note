const http = require('http')
http.createServer((req,res)=>{
   if(req.headers.cookie){
       console.log("cookie:"+req.headers.cookie);
       res.end('got cookie');
   }
   else{
       res.writeHead(200,{
          'Set-Cookie':'name=vincent;domain=localhost;Max-Age=10;path=/;httpOnly;',
       })
       res.end('set cookie finish');
   }
}).listen(8888);
console.log('server run in port 8888')
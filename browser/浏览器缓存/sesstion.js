const http = require('http')
http.createServer((req,res)=>{
   if(req.headers.cookie){
       console.log("sesstion:"+req.headers.cookie);
       res.end('got sesstion');
   }
   else{
       res.writeHead(200,{
          'Set-Cookie':'sesstionID=1234567;domain=localhost;path=/;httpOnly;',
       })
       res.end('set sesstion finish');
   }
}).listen(8888);
console.log('server run in port 8888')
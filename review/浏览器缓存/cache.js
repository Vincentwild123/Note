const http = require("http");
const fs = require("fs");
const crypto = require("crypto");
//设置http1.0协商缓存过期时间
let LastModified = new Date(Date.now() + 20000).toGMTString().toString();
var Etag;
http
  .createServer((req, res) => {
    if (req.url == "/") {
      res.writeHead(200, {
        "Content-type": "text/html;charset=utf-8",
      });
      fs.readFile("./cache.html", function (err, data) {
        if (err) throw err;
        else res.end(data);
      });
    } else if (req.url == "/cache.css") {
      // 生成文件hash
      let newData = fs.readFileSync("./cache.css").toString();
      let newEtag = crypto.createHash("sha1").update(newData).digest("base64");
      //第一次访问
      if (!req.headers["if-none-match"] && !req.headers["if-modified-since"]) {
        res.setHeader("Content-type", "text/css");
        res.setHeader("Cache-Control", "max-age=10,public");
        res.setHeader(
          "Expires",
          new Date(Date.now() + 10).toGMTString().toString()
        );
        //设置协商缓存时间
        res.setHeader("Last-Modified", LastModified);
        res.setHeader("Etag", newEtag);
        res.statusCode = 200;
        res.end(newData);
      }
      // 文件资源未修改
      else if (
        req.headers["if-none-match"] === newEtag ||
        Date.parse(req.headers["if-modified-since"]) >= Date.parse(new Date())
      ) {
        console.log("返回304")
        res.statusCode = 304;
        res.end("OK");
      }
      // 文件资源被修改且Last-modified过期
      else {
        //更新协商缓存时间
        res.setHeader("Last-Modified", LastModified);
        res.setHeader("Etag", newEtag);
        res.statusCode = 200;
        res.end(newData);
      }
    }
  })
  .listen(8000);
console.log("server run in port 8000");

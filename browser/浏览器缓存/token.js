const jwt = require("jsonwebtoken");
//生成token  jwt.sign()
//签名方法:jwt.sign(payload, secretOrPrivateKey, [options, callback])
let secretOrPrivateKey = "vincent";

let info = {
  name: "vincent",
};
let stringify = JSON.stringify(info);
console.table(info);

let Max_Age = 60 * 60;

let token = jwt.sign(info, secretOrPrivateKey, {
  expiresIn: Max_Age,
});

//验证token  jwt.verify()
console.log(token);
jwt.verify(token, secretOrPrivateKey, function (err, data) {
  if (err) throw err;
  console.log(data);
});

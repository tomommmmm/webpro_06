"use strict"; 
const express = require("express");
const app = express();

let bbs = [];  

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));


// これより下はBBS関係
app.post("/check", (req, res) => {
  // 本来はここでDBMSに問い合わせる 
  res.json( {number: bbs.length });    //今，何個分あるかチェック
});

app.post("/read", (req, res) => {
  // 本来はここでDBMSに問い合わせる
  const start = Number( req.body.start ); 
  //req.body.startーここでブラウザから送られてくるstartっていうパラメータを数字として受け取る
  console.log( "read -> " + start ); //startをターミナルに表示
  if( start==0 ) res.json( {messages: bbs });  //0なら全部送る
  else res.json( {messages: bbs.slice( start )});  
  //sliceとは，配列を区切る作業．slice(50)とすると，配列の50番以降を読み込む
});

app.post("/post", (req, res) => {
  const name = req.body.name; //投稿者の名前
  const message = req.body.message; //投稿内容
  console.log( [name, message] ); //内容表示
  // 本来はここでDBMSに保存する
  bbs.push( { name: name, message: message } ); //bbs.pushでデータを追加
  res.json( {number: bbs.length } );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
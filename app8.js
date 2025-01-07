"use strict";
const express = require("express");
const app = express();

let bbs = [];  // 本来はDBMSを使用するが，今回はこの変数にデータを蓄える

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1: message1, greet2: message2 });
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1: "Hello world", greet2: "Bon jour" });
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename: "./public/Apple_logo_black.svg", alt: "Apple Logo" });
});

app.get("/luck", (req, res) => {
  const num = Math.floor(Math.random() * 6 + 1);
  let luck = '';
  if (num == 1) luck = '大吉';
  else if (num == 2) luck = '中吉';
  console.log('あなたの運勢は' + luck + 'です');
  res.render('luck', { number: num, luck: luck });
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number(req.query.win);
  let total = Number(req.query.total);
  console.log({ hand, win, total });
  const num = Math.floor(Math.random() * 3 + 1);
  let cpu = '';
  if (num == 1) cpu = 'グー';
  else if (num == 2) cpu = 'チョキ';
  else cpu = 'パー';
  let judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render('janken', display);
});

app.get("/get_test", (req, res) => {
  res.json({
    answer: 0
  })
});

app.get("/add", (req, res) => {
  console.log("GET");
  console.log(req.query);
  const num1 = Number(req.query.num1);
  const num2 = Number(req.query.num2);
  console.log(num1);
  console.log(num2);
  res.json({ answer: num1 + num2 });
});

app.post("/add", (req, res) => {
  console.log("POST");
  console.log(req.body);
  const num1 = Number(req.body.num1);
  const num2 = Number(req.body.num2);
  console.log(num1);
  console.log(num2);
  res.json({ answer: num1 + num2 });
});

// これより下はBBS関係
app.post("/check", (req, res) => {
  res.json({ number: bbs.length });
});

app.post("/read", (req, res) => {
  const start = Number(req.body.start);
  console.log("read -> " + start);
  if (start == 0) res.json({ messages: bbs });
  else res.json({ messages: bbs.slice(start) });
});

app.post("/post", (req, res) => {
  const name = req.body.name;
  const message = req.body.message;
  console.log([name, message]);
  bbs.push({ name: name, message: message });
  res.json({ number: bbs.length });
});

// 投稿の更新
app.put("/bbs/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, message } = req.body;

  if (bbs[id]) {
    bbs[id].name = name;
    bbs[id].message = message;
    res.json({ success: true, message: "更新しました" });
  } else {
    res.status(404).json({ success: false, message: "投稿が見つかりません" });
  }
});

// 投稿の削除
app.delete("/bbs/:id", (req, res) => {
  const id = Number(req.params.id);
  
  if (bbs[id]) {
    bbs.splice(id, 1);  // 指定されたIDの投稿を削除
    res.json({ success: true, message: "削除しました" });
  } else {
    res.status(404).json({ success: false, message: "投稿が見つかりません" });
  }
});

// 返信の追加
app.post("/reply", (req, res) => {
  const { parentId, name, message } = req.body;
  const parentPost = bbs[Number(parentId)];

  if (parentPost) {
    const reply = { name, message, replies: [] }; // 返信内容
    if (!parentPost.replies) {
      parentPost.replies = []; // 親投稿が返信を持っていない場合、初期化
    }
    parentPost.replies.push(reply); // 親投稿に返信を追加
    res.json({ success: true, message: "返信が追加されました" });
  } else {
    res.status(404).json({ success: false, message: "親投稿が見つかりません" });
  }
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));

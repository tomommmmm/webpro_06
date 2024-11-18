const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  else if( num==3 ) luck = '小吉';
  else if( num==4 ) luck = '吉';
  else if( num==5 ) luck = '末吉';
  else if( num==6 ) luck = '凶';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});


let win = 0;   //ユーザーが勝った回数を保持する変数。初期値は0.
let total = 0;  //総試行回数（ユーザーがプレイした回数）を保持する変数. 初期値は 0.


app.get("/janken", (req, res) => {                //Expressのルートハンドラで、/jankenというパスにGETリクエストが送られると、このコールバック関数が実行される．
  let hand = req.query.hand;                      //ユーザーがクエリパラメータとして送信した「手」（グー、チョキ、パー）をhandという変数に格納しています。
  console.log( {hand, win, total});
  
  const num = Math.floor( Math.random() * 3 + 1 );            //Math.random()を使ってランダムに数値を生成し、その数値に基づいてCPUの手を決定しています。
                                                              //Math.random()は0以上1未満のランダムな数を返します。
                                                               //Math.floor(Math.random() * 3 + 1)により、1から3の整数が生成され、それを使ってcpuの手を決定しています。
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる

  let judgement = '';
  if (hand === cpu) {
    judgement = 'あいこ'; // Tie                               //あいこ（引き分け）の場合：ユーザーとCPUの手が同じなら、judgementに「あいこ」と設定します。
  } else if (
    (hand === 'グー' && cpu === 'チョキ') ||
    (hand === 'チョキ' && cpu === 'パー') ||                   //勝ちの場合：ユーザーの手がCPUの手に勝っている場合 
    (hand === 'パー' && cpu === 'グー')
  ) {
    judgement = '勝ち';                                          //judgementに「勝ち」と設定し、win（勝利回数）を1増やします。
    win += 1; 
  } else {
    judgement = '負け';                                     //負けの場合：それ以外の場合、judgementに「負け」と設定します
  }

  total += 1;                                           //total（総試行回数）を1増やします。これにより、ユーザーが何回じゃんけんをしたかをカウントします。

  const display = {                               //displayというオブジェクトを作成して、ユーザーが出した手、CPUの手、勝敗の結果、勝ち数、総試行回数を格納しています。
    your: hand, 
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  };
  res.render( 'janken', display );                      //'janken'というテンプレートをレンダリングして、その結果をレスポンスとして返します。
                                                        //displayオブジェクトの内容がテンプレートに渡され、ユーザーに結果が表示されます。
});




// 初期化
let won = 0;
let zenbu = 0;


app.get("/atti", (req, res) => {
  let charenge = req.query.charenge;  // ユーザーの入力


  const num = Math.floor(Math.random() * 4 + 1);  // ランダムな数字を生成
  let cpu = '';                                        
  if (num === 1) cpu = '上';
  else if (num === 2) cpu = '下';
  else if (num === 3) cpu = '左';
  else cpu = '右';

  let judgement = '';  // judgementを初期化

  
  if (charenge === cpu) {
    judgement = '負け'; 
    
  } else {
    judgement = '勝ち';
    won += 1;
  }

  zenbu += 1;  // 総回数を増やす

  // 画面に表示するデータ
  const display = {                 
    me: charenge,  // ユーザーの答え
    cpu: cpu,    // CPUが出題したクイズ
    judgement: judgement,  // 結果
    win: won,  // 正解回数
    total: zenbu  // 総回数
  };

  res.render('atti', display);  // kuizuテンプレートにデータを渡して表示
});


// 初期化
let kati = 0;
let all = 0;

// クイズのルート
app.get("/cointosu", (req, res) => {
  let predict = req.query.predict;  // ユーザーの入力

  //console.log({ ball: charenge, zenbu });

  const num = Math.floor(Math.random() * 2 + 1);  // ランダムな数字を生成
  let cpu = '';                                        
  if (num === 1) cpu = '表';
  else cpu = '裏';

  let judgement = '';  // judgementを初期化

  // クイズの答えを判定
  if (predict === cpu) {
    judgement = 'あって'; 
    kati += 1;  
  } else {
    judgement = 'はずれて';
  }

  all += 1;  // 総回数を増やす

  // 画面に表示するデータ
  const display = {                 
    me: predict,  // ユーザーの答え
    cpu: cpu,    // CPUが出題したクイズ
    judgement: judgement,  // 結果
    win: kati,  // 正解回数
    total: all  // 総回数
  };

  res.render('cointosu', display);  // kuizuテンプレートにデータを渡して表示
});


app.listen(8080, () => console.log("Example app listening on port 8080!"));

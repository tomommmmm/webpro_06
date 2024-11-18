# webpro_06
#### 清吾 友美  (24G1082)
<br>

## 目次

#### はじめに
1. [WebブラウザとWebサーバ](#anchor1)
1. [HTMLとEJS](#anchor2)
1. [バージョン管理方法](#anchor3)
1. [ファイルと説明](#anchor4)

#### プログラム
5. [テンプレートエンジンの設定](#anchor5)
6. [文字を表示するプログラム](#anchor6)
7. [画像を表示プログラム](#anchor7)
8. [おみくじのプログラム](#anchor8)
9. [じゃんけんのプログラム](#anchor9)
10. [あっち向いてホイのプログラム](#anchor10)
11. [コイントスのプログラム](#anchor11)
<br>

<a id="anchor1"></a>

1. Web ブラウザと Web サーバ<br>
    Web ブラウザと Web サーバ間の通信は，HTTP と呼ばれるプロトコルに基づいて行われており，クライアントである Web ブラウザからユーザの指示に従い，サーバに要求するプログラムが実行され，サーバ側は要求が来るまでずっと待ち続け，要求に合う応答を返すプログラムが実行されている．これらは静的なファイル転送である．しかし，現代の Web では，静的なファイル転送だけでなく，動的な Web システムを開発することが求められている．

<br>
<a id="anchor2"></a>

2. HTMLとEJS<br>
    HTML と EJS はどちらも Web ページを構築する際に使用されるが、役割や使い方が異なる．まず，HTML は Web ページの構造を記述するためのマークアップ言語であり，静的コンテンツを作成するのに適している．そのため，動的なデータを取り扱うことはできない．<br>一方，EJS は HTML を中に埋め込み JavaScript コードを使うことができ，サーバーサイドで動的コンテンツを生成するために使用される．EJS は Node.js と組み合わせることで、動的な Web ページの生成を行うことができるが、静的なページの生成は HTML だけで可能である．

<br>
<a id="anchor3"></a>

3. バージョン管理方法
    - バージョン管理の必要性
    通常，プログラムを書き換えた際，どこをどのような目的で変更したかをすべて覚えておくことは難しい．また，変更するたびに新規ファイルを作っておくことも出来るが，管理が困難である．このような場合に，変更履歴をすべて記憶しておき必要に応じて遡れる,バージョン管理システムが必要である．
    - Githubでの管理方法
    分散型バージョン管理システムの一つに Git があり，Git リポジトリをオンラインでホスティングするサービスとして Github が挙げられる．Git で管理する際，誰が変更したかを明らかにするために，以下のコマンドでユーザ名とメールアドレスを設定する．この作業は1度だけ実行する必要がある．
    `git config --global user.name "ユーザ名"`
    `git config --global user.email "メールアドレス"`
    上記コマンドの"ユーザ名"，"メールアドレス"部分をそれそれ入力することによって設定することが出来る．<br>また，プログラムを書き換えた記録を残しておくために，以下にコマンドをターミナルで実行する．この時，コメントの部分を修正内容が分かるように設定することで，過去のプログラムに遡りやすくなる．
    `git add .`
    `git commit -am 'コメント'`
    `git push`
<br>
<a id="anchor4"></a>

4. ファイル名と説明<br>

    ファイル名 | 説明
    -|-
    app5.js | プログラムの本体
    views\show.ejs | 文字表示のテンプレートファイル
    views\icon.ejs | 画像表示のテンプレートファイル
    views\luck.ejs | おみくじのテンプレートファイル
    views\janken.ejs | じゃんけんのテンプレートファイル
    views\atti.ejs | あっち向いてほいのテンプレートファイル
    views\cointosu.ejs | コイントスのテンプレートファイル
<br>
<a id="anchor5"></a>

5. テンプレートエンジンの設定<br>
    `app5.js`の始めに以下のコードで，EJS のテンプレートエンジンと静的ファイルを設定した．
    ```javascript
    app.set('view engine', 'ejs');
    app.use("/public", express.static(__dirname + "/public"));
    ``` 
<br>
<a id="anchor6"></a>

6. 文字を表示するプログラム
    - 機能
    下記に示すプログラムは，どちらも show.ejs を使用して Web ページに表示する点では同じであるが，表示するメッセージをどのように定義するかに違いがある．
        ```javascript
        app.get("/hello1", (req, res) => {
        const message1 = "Hello world";
        const message2 = "Bon jour";
        res.render('show', { greet1:message1, greet2:message2});
        });

        app.get("/hello2", (req, res) => {
        res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
        });
        ```
        hello1 のプログラムでは，message1 と message2 という2つの変数にそれぞれ文字列を格納し， greet1 と greet2 という名前でEJSテンプレートに渡した．<br>一方，hello2 のプログラムでは，greet1 と greet2 に直接文字列を設定し，そのままEJSテンプレートに渡した．<br>
    - 使用方法
    1. `node app5.js`をターミナルで実行し， `app5.js`を起動した．
    これによりサーバがポート番号 8080 で通信を受け付ける状態になる．
    1. Web ブラウザで http://localhost:8080/hello1 を表示した．
    1. Web ブラウザで http://localhost:8080/hello2 を表示した．

<br>
<a id="anchor7"></a>

7. 画像を表示するプログラム
    - 機能
    下記に示すプログラムは，/icon という URL にアクセスした時に呼び出され，icon.ejs というテンプレートがレンダリングされ、ページに Apple のロゴ画像が表示される処理である．
        ``` javascript
        app.get("/icon", (req, res) => {
        res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
        });
        ```
    - 使用方法
    1. `node app5.js`をターミナルで実行し， `app5.js`を起動した．
    これによりサーバがポート番号 8080 で通信を受け付ける状態になる．
    1. Web ブラウザで http://localhost:8080/show を表示した．
<br>
<a id="anchor8"></a>

8. おみくじのプログラム
    - 機能
このプログラムは，1 から 6 の整数の乱数を用いておみくじを引くことが可能になるプログラムである．
まず，おみくじの結果を格納するための変数，luck を初期値を空文字として定義した．その後，発生させた乱数に大吉，中吉，小吉，吉，末吉，凶の文字列を順に定義した．
      ``` javascript
      app.get("/luck", (req, res) => {
      const num = Math.floor( Math.random() * 6 + 1 );
      let luck = '';
      if( num==1 ) luck = '大吉';
      else if( num==2 ) luck = '中吉';
      else if( num==3 ) luck = '小吉';
      else if( num==4 ) luck = '吉';
      else if( num==5 ) luck = '末吉';
      else if( num==6 ) luck = '凶';
      ```
      最後に，以下のコードにより `views/luck.ejs` を使用して表示することを示した．
      ``` javascript
      res.render( 'luck', {number:num, luck:luck} );
      ```

    - 使用手順
    1. `node app5.js`をターミナルで実行し， `app5.js`を起動した．
    これによりサーバがポート番号 8080 で通信を受け付ける状態になる．
    1. Web ブラウザで http://localhost:8080/luck を表示した．

<a id="anchor9"></a>

9. じゃんけんのプログラム
   - 機能
   このプログラムは，cpu に乱数で得た数字からグー，チョキ，パーの文字列を代入し，いずれかを出力させ，プレーヤーが選択したものと処理し，勝ち，負け，あいこの判断をするプログラムである．
   
   - プログラム
   まず，下記に示すようにユーザーが勝った回数を保持する変数である win と，総試行回数を保持する変数である total を初期値を 0 にして定義した. 
       ```javascript
        let win = 0;  
        let total = 0; 
       ``` 
     次に，Express のルートハンドラで、 /janken というパスに GET リクエストが送られると、このコールバック関数が実行されるよう設定した．これにより，Web ブラウザで開く際，/janken と指定することでアクセスすることが可能になる．
     ```javascript
     app.get("/janken", (req, res) => {   
     ```
     let 関数を用いてプレーヤーが出す手を示す変数である hand を定義した．この時，hand はプレーヤーが入力するので，`req.query` に Web ページの入力欄を作成するための HTML タグの form の名前を加えた． 
     ```javascript
     let hand = req.query.hand;
     ```
     Math.random メソッドを使用し乱数を生成させ，その数値に基づいて cpu の手を決定した．この時，実数だと扱いづらいので Math.floor を使って整数にし，1 から 3 の整数を生成した．また，cpu の手は，1 ならばグー，2 ならばチョキ，3 ならばパーと定義した．
     ```javascript
     const num = Math.floor( Math.random() * 3 + 1 ); 

     let cpu = '';
     if( num==1 ) cpu = 'グー';
     else if( num==2 ) cpu = 'チョキ';
     else cpu = 'パー';
     ```
     この変数を用いて if 関数を使用することにより，勝ち，あいこ，負けを判断するプログラムを作成した．
     <br>
    - 使用手順
    1. `node app5.js`をターミナルで実行し， `app5.js`を起動した．これによりサーバがポート番号 8080 で通信を受け付ける状態になる．
    1. Web ブラウザで http://localhost:8080/janken を表示した.
    1. Web ページの入力欄にプレーヤーの手を入力する．
    <br>
    - フローチャート
    ```mermaid
    flowchart TD;

    start["開始"];
    finish["終了"]
    player[プレーヤーの手を入手]
    let1[1から3の整数の乱数を生成]
    let2[cpuの手を乱数で決める]
    if1{"cpuとプレーヤーぼ手が同じであるか"}
    if2{"プレーヤーの勝ちか"}
    aiko[あいこ]
    win[勝ち]
    loose[負け]


    start --> player
    player --> let1
    let1 --> let2
    let2 --> if1
    if1 -->|Yes| aiko
    if1 -->|No| if2
    if2 -->|Yes| win
    if2 -->|No| loose
    aiko --> finish
    win --> finish
    loose --> finish
    ```


<a id="anchor10"></a>

10. あっち向いてほいのプログラム
    - 機能
    このプログラムは，cpu に乱数で得た数字から上，下，右，左の文字列を代入し，いずれかを出力させ，プレーヤーが選択したものと処理し，勝敗をつけるプログラムである．
    cpu の手がゲームにおいて，矢印を指す方でプレーヤーが出す向きが首を振る向きである．プレーヤーが cpu と違う向きを向ければプレーヤーの勝ちとなり，同じ向きを向いてしまうと負けになる．
    - プログラム
    始めに，勝ち数と総試合数を格納する変数，won，zenbu を定義する.
        ``` javascript
        let won = 0;
        let zenbu = 0;
        ```
        次に，Express のルートハンドラで、 /atti というパスに GET リクエストが送られると、このコールバック関数が実行されるよう設定した．これにより，Web ブラウザで開く際，/atti と指定することでアクセスすることが可能になる．
        ``` javascript
        app.get("/atti", (req, res) => {
        ```
        その後， Math.random メソッドを使用し乱数を生成させ，その数値に基づいて cpu の指の向きを決定した．
        この時，実数だと扱いづらいので Math.floor を使って整数にし，1 から 4 の整数を生成した．また，cpu の指の向きは，1 ならば上，2 ならば下，3 ならば左，4 ならば右と定義した．
        ```javascript
        const num = Math.floor(Math.random() * 4 + 1);  
        let cpu ='';                                        
        if (num === 1) cpu = '上';
        else if (num === 2) cpu = '下';
        else if (num === 3) cpu = '左';
        else cpu = '右';
        ```
        最後に if 関数を用いて，勝ち負けを判断するプログラムを作成した．<br>また，views/cointosu.ejs には Web ページの構成が書かれている．ここで，以下のコードによりプレーヤーの選択肢をWeb上でボタン選択出来るようにした．
        ``` javascript
       input type="radio" name="charenge" id="up" value="上">
       <label for="up">上</label>

       <input type="radio" name="charenge" id="down" value="下">
       <label for="down">下</label>

       <input type="radio" name="charenge" id="left" value="左">
       <label for="left">左</label>

       <input type="radio" name="charenge" id="right" value="右">
       <label for="right">右</label>
       </div>
       ```
    
    - 使用手順
    1. `node app5.js`をターミナルで実行し， `app5.js`を起動した．これによりサーバがポート番号 8080 で通信を受け付ける状態になる．
    1. Web ブラウザで http://localhost:8080/atti を表示した.
    1. Web ページの入力欄に cpu の向きを予想し，向きを選択した．

    - フローチャート
    ```mermaid
    flowchart TD;

    start["開始"];
    finish["終了"]
    player[プレーヤーの向きを入手]
    let1[1から4の整数の乱数を生成]
    let2[cpuの手の向きを乱数で決める]
    if{"cpuとプレーヤーの向きが同じであるか"}
    win[勝ち]
    loose[負け]


    start --> player
    player --> let1
    let1 --> let2
    let2 --> if
    if -->|Yes| loose
    if -->|No| win
    win --> finish
    loose --> finish
    ```
    
<br>
<a id="anchor11"></a>

11. コイントスのプログラム
   - 機能
   このプログラムは，cpu の投げたコインの向きを乱数で決め，プレーヤーが予想し，当たった場合プレーヤーの勝ち，はずれた場合，負けとなるプログラムである．また，views/cointosu.ejs には Web ページの構成が書かれている．ここで，以下のコードによりプレーヤーの選択肢をWeb上でボタン選択出来るようにした．
    ``` javascript
    <div class="predict-group">
    <input type="radio" name="predict" id="head" value="表">
    <label for="head">表</label>
    <input type="radio" name="predict" id="tail" value="裏">
    label for="tail">裏</label>
    </div>
    ```
   - プログラム
       始めに，勝数と総試合数を格納するための変数，kati，all を以下のコードで定義した．
       ``` javascript
       let kati = 0;
       let all = 0;
       ```
       次に， Express のルートハンドラで、 /cointosu というパスに GET リクエストが送られると、このコールバック関数が実行されるよう設定した．これにより，Web ブラウザで開く際，/cointosu と指定することでアクセスすることが可能になる．
       ``` javascript
       app.get("/cointosu", (req, res) => {
       ```
       その後， Math.random メソッドを使用し乱数を生成させ，その数値に基づいて cpu のコインの向きを決定した．この時，実数だと扱いづらいので Math.floor を使って整数にし，1 から2 の整数を生成した．また，cpu のコインの向きは，1 ならば表，2 ならば裏，3 と定義した．
       ``` javascript
       const num = Math.floor(Math.random() * 2 + 1);  
       let cpu = '';                                        
       if (num === 1) cpu = '表';
       else cpu = '裏';
       ```
       最後に，if 関数を使用して，cpuのコインの向きとプレーヤーが予想したコインの向きが一致していた場合は勝ち，はずれていた場合は負けとなるプログラムを作成した．<br>また，views/cointosu.ejs には Web ページの構成が書かれている．ここで，以下のコードによりプレーヤーの選択肢をWeb上でボタン選択出来るようにした．
       ``` javascript
       <div class="predict-group">
       <input type="radio" name="predict" id="head" value="表">
       <label for="head">表</label>
       <input type="radio" name="predict" id="tail" value="裏">
       label for="tail">裏</label>
       </div>
       ```

- 使用手順
    1. `node app5.js`をターミナルで実行し， `app5.js`を起動した．これによりサーバがポート番号 8080 で通信を受け付ける状態になる．
    1. Web ブラウザで http://localhost:8080/cointosu を表示した.
    1. Web ページの入力欄に cpu のコインの向きを予想し，向きを選択した．

- フローチャート
    ```mermaid
    flowchart TD;

    start["開始"];
    finish["終了"]
    player[プレーヤーの予想した向きを入手]
    let1[1から2の整数の乱数を生成]
    let2[cpuのコインの向きを乱数で決める]
    if{"プレーヤーの予想した向きと同じであるか"}
    win[勝ち]
    loose[負け]


    start --> player
    player --> let1
    let1 --> let2
    let2 --> if
    if -->|Yes| win
    if -->|No| loose
    win --> finish
    loose --> finish
    ```








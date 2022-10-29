// 起動されたときに呼ばれる関数を登録する
window.addEventListener("load", () => {
  // まずステージを整える
  initialize();
  // ゲームを開始する
  loop();
});

let mode; // ゲームの現在の状況
let frame; // ゲームの現在フレーム（1/60秒ごとに1追加される）
let combinationCount = 0; // 何連鎖かどうか

// 各jsファイルの初期化関数を発動させる
function initialize() {
  // 画像を準備する
  PuyoImage.initialize();
  // ステージを準備する
  Stage.initialize();
  // ユーザー操作の準備をする
  Player.initialize();
  // スコア表示の準備をする
  Score.initialize();
  // シーンを初期状態にセットする
  mode = 'start';
  // フレームを初期化する
  frame = 0;
}

// ゲームの処理の全て
function loop() {
  switch(mode) {
      case 'start':
          // 最初は、もしかしたら空中にあるかもしれないぷよを自由落下させるところからスタート
          // (仕様では最初存在しないのでstart→checkFall→checkErase→newPuyoの流れとなり初めのぷよが作成される)
          mode = 'checkFall';
          break;
      case 'checkFall':
          // 落ちるかどうか判定する
          if(Stage.checkFall()) {
              mode = 'fall'
          }
          else {
              // 落ちないならば、ぷよを消せるかどうか判定する
              mode = 'checkErase';
          }
          break;
      case 'fall':
          if(!Stage.fall()) {
              // すべて落ちきったら、ぷよを消せるかどうか判定する
              mode = 'checkErase';
          }
          break;
      case 'checkErase':
          // checkErase→erasing→checkFall→checkErase
          // 消せるかどうか判定する、連鎖が終わるまでここを通り続けるので連鎖が終わった時elseの連鎖カウントも0になる
          const eraseInfo = Stage.checkErase(frame);
          if(eraseInfo) {
              mode = 'erasing';
              combinationCount++;
              // 得点を計算し加算
              Score.calculateScore(combinationCount, eraseInfo.piece, eraseInfo.color);
              // 全消しの表示を削除
              Stage.hideZenkeshi();
          } 
          else {
              if(Stage.puyoCount === 0 && combinationCount > 0) {
                  // 全消しの処理をする
                  Stage.showZenkeshi();
                  Score.addScore(2100);
              }
              combinationCount = 0;
              // 消せなかったら、新しいぷよを登場させる
              mode = 'newPuyo'
          }
          break;
      case 'erasing':
          if(!Stage.erasing(frame)) {
              // 消し終わったら、再度落ちるかどうか判定する
              mode = 'checkFall';
          }
          break;
      case 'newPuyo':
          if(!Player.createNewPuyo()) {
              // 新しい操作用ぷよを作成出来なかったら、ゲームオーバー
              mode = 'gameOver';
          } else {
              // プレイヤーが操作可能
              mode = 'playing';
          }
          break;

      case 'playing':
          // プレイヤーが操作する
          console.log('playing')
          console.log(frame)
          const action = Player.playing(frame);
          mode = action; // 'playing' 'moving' 'rotating' 'fix' のどれかが帰ってくる
          break;
      case 'moving':
          if(!Player.moving(frame)) {
              // 移動が終わったので操作可能にする
              mode = 'playing';
          }
          break;
      case 'rotating':
          console.log("回転")
          if(!Player.rotating(frame)) {
              // 回転が終わったので操作可能にする
              mode = 'playing';
          }
          break;
      case 'fix':
          console.log('fix')
          // 現在の位置でぷよを固定する
          Player.fix();
          // 固定したら、まず自由落下を確認する
          console.log('fixed')
          mode = 'checkFall'
          break;

      case 'gameOver':
          // ばたんきゅーの準備をする
          PuyoImage.prepareBatankyu(frame);
          mode = 'batankyu';
          break;
      case 'batankyu':
          PuyoImage.batankyu(frame);
          Player.batankyu();
          break;
  }
  frame++;
  requestAnimationFrame(loop); // 1/60秒後にもう一度呼び出す
}

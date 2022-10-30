Vue.createApp({
  data(){
    // 画像データの取得
    let ojama_shou_list = new Array()
    let ojama_dai_list = new Array()
    let ojama_iwa_list = new Array()
    let ojama_hoshi_list = new Array()
    let ojama_tsuki_list = new Array()
    let ojama_oukan_list = new Array()
    let ojama_suisei_list = new Array()

    for (i=0; i < 50; i++){
      ojama_shou_list.push(document.getElementById(`ojama_${i+1}`))
    }

    for (i=50; i < 100; i++){
      ojama_dai_list.push(document.getElementById(`ojama_${i+1}`))
    }

    for (i=100; i < 130; i++){
      ojama_iwa_list.push(document.getElementById(`ojama_${i+1}`))
    }

    for (i=130; i < 160; i++){
      ojama_hoshi_list.push(document.getElementById(`ojama_${i+1}`))
    }

    for (i=160; i < 170; i++){
      ojama_tsuki_list.push(document.getElementById(`ojama_${i+1}`))
    }

    for (i=170; i < 180; i++){
      ojama_oukan_list.push(document.getElementById(`ojama_${i+1}`))
    }

    for (i=180; i < 190; i++){
      ojama_suisei_list.push(document.getElementById(`ojama_${i+1}`))
    }

    // 計算式の表示用div要素取得
    let formula_list = new Array()

    // for (i=0; i < 2; i++){
    //   formula_list.push(document.getElementById(`formula_${i+1}`))
    // }

    // console.log(document.getElementById(`ojama_1`))
    // console.log(document.getElementById(`ojama_result`))
    // console.log(document.getElementById(`formula_1`))

    return{
      // 消した個数、計算している対象連鎖数、色数、最大連結数、消した総数
      num:0,
      chain:0,
      color:0,
      link:0,
      fall_bonus:0,// 落下ボーナス
      sum_linkbonus:0, // 連結ボーナスの合計
      allNum:0, // その連鎖で消した個数
      entireNum:0, // 全ての連鎖で消した個数
      // 各種ボーナスの配列
      chainBonus:[0,8,16,32,64,96,128,160,192,224,256,288,320,352,384,416,448,480,512],
      colorBonus:[0,0,3,6,12,24],
      linkingBonus:[0,0,0,0,2,3,4,5,6,7,10,10,10,10,10,10,10,10,10,10,],
      // ボーナス集計
      bonus:0,
      // 各連鎖の消した個数管理とポイント集計
      chainLayers:{1:{red:0,blue:0,green:0,yellow:0,purple:0},2:{red:0,blue:0,green:0,yellow:0,purple:0},3:{red:0,blue:0,green:0,yellow:0,purple:0},
      4:{red:0,blue:0,green:0,yellow:0,purple:0},5:{red:0,blue:0,green:0,yellow:0,purple:0},6:{red:0,blue:0,green:0,yellow:0,purple:0},
      7:{red:0,blue:0,green:0,yellow:0,purple:0},8:{red:0,blue:0,green:0,yellow:0,purple:0},9:{red:0,blue:0,green:0,yellow:0,purple:0},
      10:{red:0,blue:0,green:0,yellow:0,purple:0},11:{red:0,blue:0,green:0,yellow:0,purple:0},12:{red:0,blue:0,green:0,yellow:0,purple:0},
      13:{red:0,blue:0,green:0,yellow:0,purple:0},14:{red:0,blue:0,green:0,yellow:0,purple:0},15:{red:0,blue:0,green:0,yellow:0,purple:0},
      16:{red:0,blue:0,green:0,yellow:0,purple:0},17:{red:0,blue:0,green:0,yellow:0,purple:0},18:{red:0,blue:0,green:0,yellow:0,purple:0},
      19:{red:0,blue:0,green:0,yellow:0,purple:0},},
      points:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      pointSingle:0, // 単体連鎖のポイントの変数
      ojamaSingle:0,
      // 点数、お邪魔の個数
      point:0,
      ojama:0,
      ojamaAll:0,
      // お邪魔表示のDOM取得、お邪魔管理辞書の作成
      chainOjamas:{1:{suisei:0,oukan:0,tsuki:0,hoshi:0,iwa:0,dai:0,shou:0},2:{suisei:0,oukan:0,tsuki:0,hoshi:0,iwa:0,dai:0,shou:0},3:{suisei:0,oukan:0,tsuki:0,hoshi:0,iwa:0,dai:0,shou:0},
      4:{suisei:0,oukan:0,tsuki:0,hoshi:0,iwa:0,dai:0,shou:0},5:{suisei:0,oukan:0,tsuki:0,hoshi:0,iwa:0,dai:0,shou:0},6:{suisei:0,oukan:0,tsuki:0,hoshi:0,iwa:0,dai:0,shou:0},
      7:{suisei:0,oukan:0,tsuki:0,hoshi:0,iwa:0,dai:0,shou:0},8:{suisei:0,oukan:0,tsuki:0,hoshi:0,iwa:0,dai:0,shou:0},9:{suisei:0,oukan:0,tsuki:0,hoshi:0,iwa:0,dai:0,shou:0},
      10:{suisei:0,oukan:0,tsuki:0,hoshi:0,iwa:0,dai:0,shou:0},11:{suisei:0,oukan:0,tsuki:0,hoshi:0,iwa:0,dai:0,shou:0},12:{suisei:0,oukan:0,tsuki:0,hoshi:0,iwa:0,dai:0,shou:0},
      13:{suisei:0,oukan:0,tsuki:0,hoshi:0,iwa:0,dai:0,shou:0},14:{suisei:0,oukan:0,tsuki:0,hoshi:0,iwa:0,dai:0,shou:0},15:{suisei:0,oukan:0,tsuki:0,hoshi:0,iwa:0,dai:0,shou:0},
      16:{suisei:0,oukan:0,tsuki:0,hoshi:0,iwa:0,dai:0,shou:0},17:{suisei:0,oukan:0,tsuki:0,hoshi:0,iwa:0,dai:0,shou:0},18:{suisei:0,oukan:0,tsuki:0,hoshi:0,iwa:0,dai:0,shou:0},
      19:{suisei:0,oukan:0,tsuki:0,hoshi:0,iwa:0,dai:0,shou:0},all:{suisei:0,oukan:0,tsuki:0,hoshi:0,iwa:0,dai:0,shou:0}},

      ojama_result:document.getElementById('ojama_result'),
      // ojama_shou_list:this.ojama_shou_list

      ojama_shou_list:ojama_shou_list,
      ojama_dai_list:ojama_dai_list,
      ojama_iwa_list:ojama_iwa_list,
      ojama_hoshi_list:ojama_hoshi_list,
      ojama_tsuki_list:ojama_tsuki_list,
      ojama_oukan_list:ojama_oukan_list,
      ojama_suisei_list:ojama_suisei_list,

      formula_list:formula_list,

    };
  },
  methods:{
    onplus(arg) {
      // 変化対象の連鎖数と消した個数、色を取り出す
      this.chain = arg['chain']
      this.num = arg['num']
      this.color = arg['color']
      // 情報の整理
      this.chainLayers[this.chain][this.color] = this.num
      // 情報の更新
      this.link = 0
      this.color = 0
      this.sum_linkbonus = 0
      for (let key in this.chainLayers[this.chain]) {
        // 色数の更新
        if (this.chainLayers[this.chain][key] >= 4){
          this.color += 1
        }
        // 連結ボーナスの更新
        this.link = this.chainLayers[this.chain][key]
        if(this.link > 0){
          this.sum_linkbonus += this.linkingBonus[this.link-1]
        }
      }

      // ボーナスの集計
      this.bonus = (this.chainBonus[this.chain-1]+this.colorBonus[this.color]+this.sum_linkbonus)
      if (this.bonus === 0) {
        this.bonus = 1
      }
      // その連鎖の点数計算
      this.allNum = 0
      for (let key in this.chainLayers[this.chain]){
        if (this.chainLayers[this.chain][key] >= 4){
          this.allNum += this.chainLayers[this.chain][key]
        }
      }
      this.points[this.chain] = this.allNum*10*this.bonus

      this.point = 0
      this.points.forEach((elem,index) => {
        this.point += Number(elem)
      });
      // 落下ボーナスの加算
      this.point += this.fall_bonus
      // console.log(this.points)
      this.ojama = Math.floor(this.point/70)

      // お邪魔の結果表示処理

      // その連鎖で発生するのお邪魔の処理
      this.pointSingle = this.points[this.chain]
      this.ojamaSingle = Math.floor(this.pointSingle/70)
      this.chainOjamas[this.chain]['suisei'] = Math.floor(this.ojamaSingle/1440)
      this.ojamaSingle -= 1440*this.chainOjamas[this.chain]['suisei']
      this.chainOjamas[this.chain]['oukan'] = Math.floor(this.ojamaSingle/720)
      this.ojamaSingle -= 720*this.chainOjamas[this.chain]['oukan']
      this.chainOjamas[this.chain]['tsuki'] = Math.floor(this.ojamaSingle/360)
      this.ojamaSingle -= 360*this.chainOjamas[this.chain]['tsuki']
      this.chainOjamas[this.chain]['hoshi'] = Math.floor(this.ojamaSingle/180)
      this.ojamaSingle -= 180*this.chainOjamas[this.chain]['hoshi']
      this.chainOjamas[this.chain]['iwa'] = Math.floor(this.ojamaSingle/30)
      this.ojamaSingle -= 30*this.chainOjamas[this.chain]['iwa']
      this.chainOjamas[this.chain]['dai'] = Math.floor(this.ojamaSingle/6)
      this.ojamaSingle -= 6*this.chainOjamas[this.chain]['dai']
      this.chainOjamas[this.chain]['shou'] = this.ojamaSingle

      // 全体で発生するお邪魔の処理
      this.ojamaAll = Math.floor(this.point/70)
      this.chainOjamas['all']['suisei'] = Math.floor(this.ojamaAll/1440)
      this.ojamaAll -= 1440*this.chainOjamas['all']['suisei']
      this.chainOjamas['all']['oukan'] = Math.floor(this.ojamaAll/720)
      this.ojamaAll -= 720*this.chainOjamas['all']['oukan']
      this.chainOjamas['all']['tsuki'] = Math.floor(this.ojamaAll/360)
      this.ojamaAll -= 360*this.chainOjamas['all']['tsuki']
      this.chainOjamas['all']['hoshi'] = Math.floor(this.ojamaAll/180)
      this.ojamaAll -= 180*this.chainOjamas['all']['hoshi']
      this.chainOjamas['all']['iwa'] = Math.floor(this.ojamaAll/30)
      this.ojamaAll -= 30*this.chainOjamas['all']['iwa']
      this.chainOjamas['all']['dai'] = Math.floor(this.ojamaAll/6)
      this.ojamaAll -= 6*this.chainOjamas['all']['dai']
      this.chainOjamas['all']['shou'] = this.ojamaAll

      // 毎度表示されたお邪魔をリストに戻してから全て削除
      while(ojama_result.lastChild){
        // 戻す場所を決める
        let id = ojama_result.lastChild.getAttribute('id')
        let id_num = id.slice(6,id.length)
        if (0 < id_num & id_num <= 50){
          this.ojama_shou_list.push(ojama_result.lastChild)
        }
        else if (50 < id_num & id_num <= 100){
          this.ojama_dai_list.push(ojama_result.lastChild)
        }
        else if (100 < id_num & id_num <= 130){
          this.ojama_iwa_list.push(ojama_result.lastChild)
        }
        else if (130 < id_num & id_num <= 160){
          this.ojama_hoshi_list.push(ojama_result.lastChild)
        }
        else if (160 < id_num & id_num <= 170){
          this.ojama_tsuki_list.push(ojama_result.lastChild)
        }
        else if (170 < id_num & id_num <= 180){
          this.ojama_oukan_list.push(ojama_result.lastChild)
        }
        else if (180 < id_num & id_num <= 190){
          this.ojama_suisei_list.push(ojama_result.lastChild)
        }
        // 要素の削除
        ojama_result.removeChild(ojama_result.lastChild);
      }

      // console.log(this.ojama_shou_list)

      for (let key in this.chainOjamas['all']) {
        if (key === 'suisei' & this.chainOjamas['all'][key] != 0){
          for (i=0; i < this.chainOjamas['all'][key]; i++){
            ojama_result.appendChild(this.ojama_suisei_list[0])
            this.ojama_suisei_list.shift()
          }
        }
        if (key === 'oukan' & this.chainOjamas['all'][key] != 0){
          for (i=0; i < this.chainOjamas['all'][key]; i++){
            ojama_result.appendChild(this.ojama_oukan_list[0])
            this.ojama_oukan_list.shift()
          }
        }
        if (key === 'tsuki' & this.chainOjamas['all'][key] != 0){
          for (i=0; i < this.chainOjamas['all'][key]; i++){
            ojama_result.appendChild(this.ojama_tsuki_list[0])
            this.ojama_tsuki_list.shift()
          }
        }
        if (key === 'hoshi' & this.chainOjamas['all'][key] != 0){
          for (i=0; i < this.chainOjamas['all'][key]; i++){
            ojama_result.appendChild(this.ojama_hoshi_list[0])
            this.ojama_hoshi_list.shift()
          }
        }
        if (key === 'iwa' & this.chainOjamas['all'][key] != 0){
          for (i=0; i < this.chainOjamas['all'][key]; i++){
            ojama_result.appendChild(this.ojama_iwa_list[0])
            this.ojama_iwa_list.shift()
          }
        }
        if (key === 'dai' & this.chainOjamas['all'][key] != 0){
          for (i=0; i < this.chainOjamas['all'][key]; i++){
            ojama_result.appendChild(this.ojama_dai_list[0])
            this.ojama_dai_list.shift()
          }
        }
        if (key === 'shou' & this.chainOjamas['all'][key] != 0){
          for (i=0; i < this.chainOjamas['all'][key]; i++){
            ojama_result.appendChild(this.ojama_shou_list[0])
            this.ojama_shou_list.shift()
          }
        }
      }

      // 対象連鎖のおじゃま式表示
      for (i=0; i < 19; i++){
        this.formula_list.push(document.getElementById(`formula_${i+1}`))
      }
      while(this.formula_list[this.chain-1].lastChild){
        this.formula_list[this.chain-1].removeChild(this.formula_list[this.chain-1].lastChild);
      }
      
      var formula = document.createElement('div')
      if (this.chainBonus[this.chain-1]+this.colorBonus[this.color]+this.sum_linkbonus === 0){
        formula.textContent = `${this.allNum} × 10 × 1 ÷ 70 = ${this.ojama}個`
      }
      else {
        formula.textContent = `${this.allNum} × 10 × (${this.chainBonus[this.chain-1]}+${this.colorBonus[this.color]}+${this.sum_linkbonus})
        ÷ 70 = ${Math.floor(this.points[this.chain]/70)}個`
      }
      
      this.formula_list[this.chain-1].appendChild(formula);

      // 全体で消した個数の表示
      this.entireNum = 0

      for (let keyChain in this.chainLayers){
        for (let keyColor in this.chainLayers[keyChain]){
          if (this.chainLayers[keyChain][keyColor] >= 4){
            this.entireNum += this.chainLayers[keyChain][keyColor]
          }
        }
      }

    },

    fallbonus(arg) {
      this.fall_bonus = arg['point']
      this.point = 0
      this.points.forEach((elem,index) => {
        this.point += Number(elem)
      });
      // 落下ボーナスの加算
      this.point += this.fall_bonus
      // console.log(this.points)
      this.ojama = Math.floor(this.point/70)

      // お邪魔の結果表示処理

      // その連鎖で発生するのお邪魔の処理
      this.pointSingle = this.points[this.chain]
      this.ojamaSingle = Math.floor(this.pointSingle/70)
      this.chainOjamas[this.chain]['suisei'] = Math.floor(this.ojamaSingle/1440)
      this.ojamaSingle -= 1440*this.chainOjamas[this.chain]['suisei']
      this.chainOjamas[this.chain]['oukan'] = Math.floor(this.ojamaSingle/720)
      this.ojamaSingle -= 720*this.chainOjamas[this.chain]['oukan']
      this.chainOjamas[this.chain]['tsuki'] = Math.floor(this.ojamaSingle/360)
      this.ojamaSingle -= 360*this.chainOjamas[this.chain]['tsuki']
      this.chainOjamas[this.chain]['hoshi'] = Math.floor(this.ojamaSingle/180)
      this.ojamaSingle -= 180*this.chainOjamas[this.chain]['hoshi']
      this.chainOjamas[this.chain]['iwa'] = Math.floor(this.ojamaSingle/30)
      this.ojamaSingle -= 30*this.chainOjamas[this.chain]['iwa']
      this.chainOjamas[this.chain]['dai'] = Math.floor(this.ojamaSingle/6)
      this.ojamaSingle -= 6*this.chainOjamas[this.chain]['dai']
      this.chainOjamas[this.chain]['shou'] = this.ojamaSingle

      // 全体で発生するお邪魔の処理
      this.ojamaAll = Math.floor(this.point/70)
      this.chainOjamas['all']['suisei'] = Math.floor(this.ojamaAll/1440)
      this.ojamaAll -= 1440*this.chainOjamas['all']['suisei']
      this.chainOjamas['all']['oukan'] = Math.floor(this.ojamaAll/720)
      this.ojamaAll -= 720*this.chainOjamas['all']['oukan']
      this.chainOjamas['all']['tsuki'] = Math.floor(this.ojamaAll/360)
      this.ojamaAll -= 360*this.chainOjamas['all']['tsuki']
      this.chainOjamas['all']['hoshi'] = Math.floor(this.ojamaAll/180)
      this.ojamaAll -= 180*this.chainOjamas['all']['hoshi']
      this.chainOjamas['all']['iwa'] = Math.floor(this.ojamaAll/30)
      this.ojamaAll -= 30*this.chainOjamas['all']['iwa']
      this.chainOjamas['all']['dai'] = Math.floor(this.ojamaAll/6)
      this.ojamaAll -= 6*this.chainOjamas['all']['dai']
      this.chainOjamas['all']['shou'] = this.ojamaAll

      // 毎度表示されたお邪魔をリストに戻してから全て削除
      while(ojama_result.lastChild){
        // 戻す場所を決める
        let id = ojama_result.lastChild.getAttribute('id')
        let id_num = id.slice(6,id.length)
        if (0 < id_num & id_num <= 50){
          this.ojama_shou_list.push(ojama_result.lastChild)
        }
        else if (50 < id_num & id_num <= 100){
          this.ojama_dai_list.push(ojama_result.lastChild)
        }
        else if (100 < id_num & id_num <= 130){
          this.ojama_iwa_list.push(ojama_result.lastChild)
        }
        else if (130 < id_num & id_num <= 160){
          this.ojama_hoshi_list.push(ojama_result.lastChild)
        }
        else if (160 < id_num & id_num <= 170){
          this.ojama_tsuki_list.push(ojama_result.lastChild)
        }
        else if (170 < id_num & id_num <= 180){
          this.ojama_oukan_list.push(ojama_result.lastChild)
        }
        else if (180 < id_num & id_num <= 190){
          this.ojama_suisei_list.push(ojama_result.lastChild)
        }
        // 要素の削除
        ojama_result.removeChild(ojama_result.lastChild);
      }

      // console.log(this.ojama_shou_list)

      for (let key in this.chainOjamas['all']) {
        if (key === 'suisei' & this.chainOjamas['all'][key] != 0){
          for (i=0; i < this.chainOjamas['all'][key]; i++){
            ojama_result.appendChild(this.ojama_suisei_list[0])
            this.ojama_suisei_list.shift()
          }
        }
        if (key === 'oukan' & this.chainOjamas['all'][key] != 0){
          for (i=0; i < this.chainOjamas['all'][key]; i++){
            ojama_result.appendChild(this.ojama_oukan_list[0])
            this.ojama_oukan_list.shift()
          }
        }
        if (key === 'tsuki' & this.chainOjamas['all'][key] != 0){
          for (i=0; i < this.chainOjamas['all'][key]; i++){
            ojama_result.appendChild(this.ojama_tsuki_list[0])
            this.ojama_tsuki_list.shift()
          }
        }
        if (key === 'hoshi' & this.chainOjamas['all'][key] != 0){
          for (i=0; i < this.chainOjamas['all'][key]; i++){
            ojama_result.appendChild(this.ojama_hoshi_list[0])
            this.ojama_hoshi_list.shift()
          }
        }
        if (key === 'iwa' & this.chainOjamas['all'][key] != 0){
          for (i=0; i < this.chainOjamas['all'][key]; i++){
            ojama_result.appendChild(this.ojama_iwa_list[0])
            this.ojama_iwa_list.shift()
          }
        }
        if (key === 'dai' & this.chainOjamas['all'][key] != 0){
          for (i=0; i < this.chainOjamas['all'][key]; i++){
            ojama_result.appendChild(this.ojama_dai_list[0])
            this.ojama_dai_list.shift()
          }
        }
        if (key === 'shou' & this.chainOjamas['all'][key] != 0){
          for (i=0; i < this.chainOjamas['all'][key]; i++){
            ojama_result.appendChild(this.ojama_shou_list[0])
            this.ojama_shou_list.shift()
          }
        }
      }

    }
  }
  })


  // 消す個数の選択フォーム
  .component('clear-block',{
    props: ['chain','color'],
    emits:['plusMinus'],
    // 消す個数の選択フォーム、0個〜20個が選択可能
    template: `<input type='number' min='0' max='20' step='1' v-on:change='clearPuyo' v-model='clearNum'>`,
    methods:{
      clearPuyo() {
        this.$emit('plusMinus',{num:Number(this.clearNum),chain:Number(this.chain),color:this.color});
      }
    },
  })
  // 落下ボーナスの選択フォーム
  .component('fall-bonus',{
    emits:['fallBonus'],
    template: `<input type='number' min='0' step='1' v-on:change='fallBonus' v-model='fallPoint'>`,
    methods:{
      fallBonus() {
        this.$emit('fallBonus',{point:Number(this.fallPoint),});
      }
    },
  })

  .mount('#app')
class PuyoImage {

  static initialize() {
      this.puyoImages = [];
      // 各種ぷよの画像の設定
      for(let i = 0; i < 5; i++) {
          const image = document.getElementById(`puyo_${i + 1}`);
          image.removeAttribute('id');
          image.width = Config.puyoImgWidth;
          image.height = Config.puyoImgHeight;
          image.style.position = 'absolute';
          this.puyoImages[i] = image;
      }
      // バタンキューの画像の設定
      this.batankyuImage = document.getElementById('batankyu');
      this.batankyuImage.width = Config.puyoImgWidth * 6;
      this.batankyuImage.style.position = 'absolute';
  }

  // 指定色のぷよの画像取得、html要素で
  static getPuyo(index) {
      const image = this.puyoImages[index - 1].cloneNode(true);
      return image;
  }

  static prepareBatankyu(frame) {
      this.gameOverFrame = frame;
      Stage.stageElement.appendChild(this.batankyuImage);
      this.batankyuImage.style.top = -this.batankyuImage.height + 'px';
  }

  static batankyu(frame) {
      const ratio = (frame - this.gameOverFrame) / Config.gameOverFrame;
      const x = Math.cos(Math.PI / 2 + ratio * Math.PI * 2 * 10) * Config.puyoImgWidth;
      const y = Math.cos(Math.PI + ratio * Math.PI * 2) * Config.puyoImgHeight * Config.stageRows / 4 + Config.puyoImgHeight * Config.stageRows / 2;
      this.batankyuImage.style.left = x + 'px';
      this.batankyuImage.style.top = y + 'px';
  }
}

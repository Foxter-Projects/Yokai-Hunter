class Layer {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = 960;
    this.height = 540;
    this.image = image;
    this.speedModifier = speedModifier;
  }

  draw(ctx, offsetX) {
    let x = -offsetX * this.speedModifier;
    ctx.drawImage(this.image, x, this.y, this.width, this.height);
    ctx.drawImage(this.image, x + this.width, this.y, this.width, this.height);
  }
}

class Background {
  constructor() {
    this.layer1 = new Layer(this.loadImage("assets/bg/bg_1.png"), 0.2);
    this.layer2 = new Layer(this.loadImage("assets/bg/bg_2.png"), 0.4);
    this.layer3 = new Layer(this.loadImage("assets/bg/bg_3.png"), 0.6);
    this.layers = [this.layer1, this.layer2, this.layer3];
    this.offset = 0; // total horizontal offset
  }

  loadImage(src) {
    const img = new Image();
    img.src = src;
    return img;
  }

  move(amount) {
    this.offset += amount;
    if (this.offset < 0) this.offset = 0;
  }

  draw(ctx) {
    this.layers.forEach(layer => layer.draw(ctx, this.offset));
  }
}

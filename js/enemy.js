class Enemy {
  constructor() {
    this.x = 1200;
    this.y = 360;
    this.width = 128;
    this.height = 128;
    this.speed = 1.5;
    this.frame = 0;
    this.frameTimer = 0;
    this.frameInterval = 200;

    this.idleImage = new Image();
    this.idleImage.src = "assets/enemy/idle.png";

    this.walkImages = [
      "assets/enemy/walk_1.png",
      "assets/enemy/walk_2.png",
      "assets/enemy/walk_3.png"
    ].map(src => { const img = new Image(); img.src = src; return img; });

    this.attackImages = [
      "assets/enemy/attack_1.png",
      "assets/enemy/attack_2.png"
    ].map(src => { const img = new Image(); img.src = src; return img; });

    this.currentAction = "walk";
  }

  update() {
    if (this.currentAction === "walk") {
      this.x -= this.speed;
      if (this.x < -this.width) this.x = 960;
    }

    this.frameTimer += 16;
    if (this.frameTimer > this.frameInterval) {
      this.frame = (this.frame + 1) % 3;
      this.frameTimer = 0;
    }
  }

  draw(ctx) {
    if (this.currentAction === "walk") {
      ctx.drawImage(
        this.walkImages[this.frame],
        this.x,
        this.y,
        this.width,
        this.height
      );
    } else if (this.currentAction === "attack") {
      const img =
        this.attackImages[Math.floor(Date.now() / 200) % this.attackImages.length];
      ctx.drawImage(img, this.x, this.y, this.width, this.height);
    } else {
      ctx.drawImage(this.idleImage, this.x, this.y, this.width, this.height);
    }
  }
}

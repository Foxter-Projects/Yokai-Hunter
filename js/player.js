class Player {
  constructor(input, canvasWidth, background) {
    this.input = input;
    this.canvasWidth = canvasWidth;
    this.background = background;

    this.x = 200; // player screen position
    this.y = 360;
    this.width = 128;
    this.height = 128;
    this.speed = 3;
    this.frame = 0;
    this.imageIdle = new Image();
    this.imageIdle.src = "assets/player/idle.png";

    this.runImages = [
      "assets/player/running_1.png",
      "assets/player/running_2.png",
      "assets/player/running_3.png"
    ].map(src => { const img = new Image(); img.src = src; return img; });

    this.attackImages = [
      "assets/player/attack_1.png",
      "assets/player/attack_2.png"
    ].map(src => { const img = new Image(); img.src = src; return img; });

    this.currentAction = "idle"; 
    this.frameTimer = 0;
    this.frameInterval = 150;

    this.worldX = 200; // actual player world position
  }

  update(deltaTime) {
    this.frameTimer += deltaTime;

    let moving = false;
    if (this.input.keys.includes("ArrowRight")) {
      this.worldX += this.speed;
      moving = true;
      this.currentAction = "run";
    } else if (this.input.keys.includes("ArrowLeft")) {
      this.worldX -= this.speed;
      moving = true;
      this.currentAction = "run";
    } else if (this.input.keys.includes("KeyA")) {
      this.currentAction = "attack";
    } else {
      this.currentAction = "idle";
    }

    // Screen boundary and background scrolling
    const centerLeft = 300;  // player stays around this range
    const centerRight = 660;

    if (this.worldX - this.background.offset < centerLeft) {
      this.x = centerLeft;
      this.background.move(-this.speed); 
    } else if (this.worldX - this.background.offset > centerRight) {
      this.x = centerRight;
      this.background.move(this.speed);
    } else {
      this.x = this.worldX - this.background.offset;
    }

    if (this.frameTimer > this.frameInterval) {
      this.frame = (this.frame + 1) % 3;
      this.frameTimer = 0;
    }
  }

  draw(ctx) {
    if (this.currentAction === "idle") {
      ctx.drawImage(this.imageIdle, this.x, this.y, this.width, this.height);
    } else if (this.currentAction === "run") {
      ctx.drawImage(
        this.runImages[this.frame],
        this.x,
        this.y,
        this.width,
        this.height
      );
    } else if (this.currentAction === "attack") {
      const img =
        this.attackImages[Math.floor(Date.now() / 150) % this.attackImages.length];
      ctx.drawImage(img, this.x, this.y, this.width, this.height);
    }
  }
}

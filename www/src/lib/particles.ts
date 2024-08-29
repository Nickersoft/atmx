interface ParticleArgs {
  width: number;
  height: number;
  x: number;
  y: number;
  color: string;
  ctx: CanvasRenderingContext2D;
  particleSize: number;
}

export class Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  baseX: number;
  baseY: number;
  density: number;
  ctx: CanvasRenderingContext2D;

  constructor({ color, width, particleSize, height, x, y, ctx }: ParticleArgs) {
    this.x = Math.random() * width; // Random initial x position
    this.y = Math.random() * height; // Random initial y position
    this.size = particleSize;
    this.color = color;
    this.baseX = x;
    this.baseY = y;
    this.density = Math.random() * 30 + 1;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.shadowColor = this.color;
    this.ctx.shadowBlur = 15;
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
  }

  update(x: number | null, y: number | null, radius: number) {
    if (x === null || y === null) return;
    let dx = x - this.x;
    let dy = y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance = radius;
    let force = (maxDistance - distance) / maxDistance;
    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;

    if (distance < radius) {
      this.x -= directionX;
      this.y -= directionY;
      return;
    }

    if (this.x !== this.baseX) {
      let dx = this.x - this.baseX;
      this.x -= dx / 10;
    }

    if (this.y !== this.baseY) {
      let dy = this.y - this.baseY;
      this.y -= dy / 10;
    }
  }
}

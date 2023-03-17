const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const requestAnimationFrame = window.requestAnimationFrame;

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

class StarryBackground {
  constructor(starCount) {
    this.starArray = [];
    for (let i = 0; i < starCount; i++) {
      this.starArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
      });
    }
  }

  draw() {
    for (let star of this.starArray) {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
    }
  }

  update(speed) {
    this.starArray.forEach((star) => {
      star.x -= speed;
      if (star.x < 0) {
        star.x = canvas.width;
      }
    });
  }
}

const slowStars = new StarryBackground(225);
const mediumSpeedStars = new StarryBackground(125);
const fastStars = new StarryBackground(125);

export {slowStars, mediumSpeedStars, fastStars, ctx, canvas}
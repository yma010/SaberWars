class Map {

  constructor(opts){
  this.fps = 30;
  this.canvas = null;
  this.width = 0;
  this.minVel = 15;
  this.maxVel = 30;
  this.stars = 200;
  this.intID = 0;
  }

  init (div) {
    const self = this;

    this.containerDiv = div;

    self.width = window.innerWidth;
    self.height = window.innerHeight;

    window.onresize = e => {
      self.width = window.innerWidth;
      self.height = window.innerHeight;
      self.canvas.width = self.width;
      self.canvas.height = self.height;
      self.draw();
    }

    let canvas = document.createElement('canvas');
    div.appendChild(canvas);

    this.canvas = canvas;
    self.canvas.width = self.width;
    self.canvas.height = self.height;

  };

  start () {
    const stars = [];

    for(let i = 0; i < this.stars; i++) {
      stars[i] = new Star(Math.random() * this.width, Math.random() * this.height, Math.random() * 3 + 1, 
      (Math.random() * (this.maxVel - this.minVel)) + this.minVel);
    }

    this.stars = stars;
    let self = this;

    this.intID = setInterval(function(){
      self.update();
      self.draw();
    }, 1000 / this.fps)
  }

  stop () {
    clearInterval(this.intID);
  };

  update () {
    let dT = 1 / this.fps;

    for(let i = 0; i < this.stars.length; i++) {
      let star = this.stars[i];

      star.y += dT * star.vel;

      if (star.y > this.height) {
        this.stars[i] = new Star(Math.random() * this.width, 0, Math.random() * 3 + 1,
          (Math.random() * (this.maxVel - this.minVel)) + this.minVel);
      }
    }
  };

  draw() {
    const ctx = this.canvas.getContext("2d");

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, this.width, this.height);

    ctx.fillStyle = '#ffffff';
    for(var i = 0; i < this.stars.length; i++) {
      let star = this.stars[i]
      ctx.fillRect(star.x, star.y, star.size, star.size);
    }
  };

  Star(x, y, size, vel) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.vel = vel;
  };

}

export default Map;




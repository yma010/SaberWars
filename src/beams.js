const Beams = function(x, y, spd, type){

  this.pos = {
    "x" : x,
    "y" : y
  }

  const speed = spd;
  const self = this;

  const create = function() {
    self.ele = document.createElement("div");
    self.ele.classList.add(type);

    self.ele.style.top = self.pos.y = "px";
    self.ele.style.left = self.pos.x + "px";

    const board = document.getElementById("board");
    board.appendChild(self.ele);
  }

  this.render = function() {
    self.pos.y -= speed;
    self.ele.style.top = self.pos.y + "px";
  }

  create();

}
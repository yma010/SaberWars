
const Rock = function(x,y) {

    this.health = 4;

    this.position = {
        "x": x,
        "y": y
    }

    const self = this;

    const createRock = function () {

            self.element = document.createElement("div");
            self.element.classList.add("rock");

            self.element.style.top = self.position.y + "px";
            self.element.style.left = self.position.x + "px";

            const board = document.getElementById("board");
            board.appendChild(self.element);
    	
    }

    this.hit = function(index){
      
        self.health--;
        board.explodefx.play();
        switch (self.health){
            case 3:
            self.element.style.opacity = 0.75;
            break;
            case 2:
            self.element.style.opacity = 0.50;
            break;
            case 1:
            self.element.style.opacity = 0.25;
            default:
            gameBoard.rocks[index].element.remove();
            gameBoard.rocks.splice(index,1);
        }

    }

    this.render = function(){
        self.element.style.top = self.position.y + "px";
       
    }

    createRock();
}
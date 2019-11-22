/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Alien = function (aType, aLine, aCol) {\n  this.type = aType;\n  this.points = 40 - 10 * aType;\n  this.line = aLine;\n  this.column = aCol;\n  this.alive = true;\n  this.height = 20;\n  this.width = 28;\n  this.positionX = 100 + this.width * this.column;\n  this.positionY = 100 + 30 * this.line;\n  this.direction = 1;\n  this.state = 0;\n\n  this.changeState = function () { //change the state (2 different images for each alien)\n    this.state = !this.state ? 20 : 0;\n  };\n\n  this.down = function () { //down the alien after changing direction\n    this.positionY = this.positionY + 10;\n\n  };\n\n  this.move = function () { //set new position after moving and draw the alien\n    if (this.positionY >= Game.height - 50) {\n      Game.over();\n    }\n    this.positionX = this.positionX + 5 * Game.direction;\n    this.changeState();\n    if (this.alive) this.draw();\n  };\n\n  this.checkCollision = function () { //Check if the alien is killed by gun ray\n    if (Gun.ray.active == true && this.alive == true) {\n      if ((Gun.ray.positionX >= this.positionX && Gun.ray.positionX <= (this.positionX + this.width)) && (Gun.ray.positionY >= this.positionY && Gun.ray.positionY <= (this.positionY + this.height))) {\n        this.kill();\n        Gun.ray.destroy();\n      }\n    }\n  };\n\n  this.draw = function () { //draw the alien to his new position\n    if (this.alive) { //draw the alien\n      canvas.drawImage(\n        pic,\n        this.width * (this.type - 1),\n        this.state,\n        this.width,\n        this.height,\n        this.positionX,\n        this.positionY,\n        this.width,\n        this.height);\n    } else if (this.alive == null) { //draw the explosion\n      canvas.drawImage(\n        pic,\n        85,\n        20,\n        28,\n        20,\n        this.positionX,\n        this.positionY,\n        this.width,\n        this.height);\n      this.alive = false; //alien won't be displayed any more\n    }\n  };\n\n  this.kill = function () { //kill the alien\n    this.alive = null;\n    canvas.clearRect(this.positionX, this.positionY, this.width, this.height);\n    Game.refreshScore(this.points);\n  }\n};\n\nGun = {\n  position: 220,\n  toleft: false,\n  toright: false,\n\n  init: function () { //initialize the gun and his move\n    this.draw();\n    this.toLeft();\n    this.toRight();\n    setInterval(\"Gun.toLeft()\", 30);\n    setInterval(\"Gun.toRight()\", 30);\n  },\n\n  draw: function () { //draws the gun\n    canvas.drawImage(pic, 85, 0, 28, 20, this.position, 470, 28, 20);\n  },\n\n  fire: function () { //shot\n    this.ray.create();\n  },\n\n  toLeft: function () { //moves the gun to left\n    if (this.toleft) {\n      if (this.position - 5 > 0) {\n        canvas.clearRect(0, 472, Game.width, 28);\n        this.position -= 5;\n        this.draw();\n      }\n    }\n  },\n\n  toRight: function () { //moves the gun to right\n    if (this.toright) {\n      if (this.position + 30 < Game.width) {\n        canvas.clearRect(0, 472, Game.width, 28);\n        this.position += 5;\n        this.draw();\n      }\n    }\n  },\n\n  ray: { //gun ray\n    positionX: 0,\n    positionY: 465,\n    length: 5,\n    speed: 15,\n    animation: null,\n    active: false,\n    create: function () { //created the ray if it does not exist\n      if (!this.active) {\n        this.positionX = Gun.position + 14;\n        this.active = true;\n        this.animation = setInterval(\"Gun.ray.animate()\", this.speed);\n      }\n\n    },\n    animate: function () { //animate the ray\n      this.positionY -= this.length;\n      if (this.positionY <= 5) this.destroy();\n      else {\n        Game.drawAliens();\n        this.draw();\n      }\n    },\n    draw: function () { //draw the ray and check collision with aliens\n      if (this.active) {\n        canvas.beginPath();\n        canvas.strokeStyle = 'white';\n        canvas.lineWidth = 2;\n        canvas.moveTo(this.positionX, this.positionY);\n        canvas.lineTo(this.positionX, this.positionY + this.length);\n        canvas.stroke();\n\n        for (i = 0; i < 5; i++) {\n          for (j = 0; j < 11; j++) {\n            Game.aliens[i][j].checkCollision();\n          }\n        }\n      }\n    },\n    destroy: function () { //destroy the ray\n      this.positionY = 465;\n      this.active = false;\n      clearInterval(this.animation);\n      this.animation = null;\n      Game.drawAliens();\n    },\n  }\n\n};\n\nGame = {\n  types: [1, 2, 2, 3, 3], //define kinds of aliens\n  aliens: [\n    [11],\n    [11],\n    [11],\n    [11],\n    [11]\n  ],\n  height: 0,\n  width: 0,\n  interval: 0,\n  intervalDefault: 1000,\n  direction: 1,\n  animation: null,\n  alives: 1,\n  score: 0,\n  level: 1,\n\n  init: function (aWidth, aHeight) { //initialize default position and behaviour\n    for (i = 0; i < 5; i++) {\n      for (j = 0; j < 11; j++) {\n        this.aliens[i][j] = new Alien(this.types[i], i, j);\n        this.alives++;\n        this.aliens[i][j].draw();\n      }\n    }\n    this.width = aWidth;\n    this.height = aHeight;\n    this.play();\n    Gun.init();\n    this.refreshScore(0);\n    document.getElementById('level').innerHTML = this.level;\n    document.getElementById('inter').innerHTML = this.interval;\n  },\n\n  changeDirection: function () { //change the direction (left or right)\n    if (this.direction == 1) {\n      this.direction = -1;\n    } else {\n      this.direction = 1;\n    }\n  },\n  clearCanvas: function () { //clear the canvas (but not the gun)\n    canvas.clearRect(0, 0, this.width, this.height - 28);\n  },\n  closeToLeft: function () { //check if the aliens reach the left border\n    return (this.aliens[0][0].positionX - 10 < 0) ? true : false;\n  },\n  closeToRight: function () { //check if the aliens reach the right border\n    return (this.aliens[4][10].positionX + 35 > this.width) ? true : false;\n  },\n  drawAliens: function () { //draw the aliens\n    this.clearCanvas();\n    for (i = 0; i < 5; i++) {\n      for (j = 0; j < 11; j++) {\n        this.aliens[i][j].draw();\n      }\n    }\n  },\n  animate: function () { //move the aliens\t\t\n    this.clearCanvas();\n    Gun.ray.draw();\n    this.checkAliens();\n    for (i = 0; i < 5; i++) {\n      for (j = 0; j < 11; j++) {\n        this.aliens[i][j].move();\n      }\n    }\n    if (this.closeToLeft() || this.closeToRight()) {\n      this.changeDirection();\n      for (i = 0; i < 5; i++) {\n        for (j = 0; j < 11; j++) {\n          this.aliens[i][j].down();\n        }\n      }\n      this.increaseSpeed();\n    }\n  },\n  play: function () { //play the game\t\n    this.interval = this.intervalDefault;\n    this.interval = this.interval - (this.level * 20);\n    this.animation = setInterval(\"Game.animate()\", this.interval);\n  },\n  increaseSpeed: function (newInterval) { //increase the speed\n    clearInterval(this.animation);\n    if (newInterval === undefined) this.interval = this.interval - 10;\n    else this.interval = newInterval;\n\n    this.animation = setInterval(\"Game.animate()\", this.interval);\n    document.getElementById('inter').innerHTML = this.interval;\n  },\n  onkeydown: function (ev) { //key down event\n    if (ev.keyCode == 37) Gun.toleft = true;\n    else if (ev.keyCode == 39) Gun.toright = true;\n    else if (ev.keyCode == 32) Gun.fire();\n    else return;\n  },\n  onkeyup: function (ev) { //key up event\n    if (ev.keyCode == 37) Gun.toleft = false;\n    else if (ev.keyCode == 39) Gun.toright = false;\n    else return;\n  },\n  over: function () { //ends the game\n    clearInterval(this.animation);\n    canvas.clearRect(0, 0, this.width, this.height);\n    canvas.font = \"40pt Calibri,Geneva,Arial\";\n    canvas.strokeStyle = \"rgb(FF,0,0)\";\n    canvas.fillStyle = \"rgb(0,20,180)\";\n    canvas.strokeText(\"Game Over\", this.width / 2 - 150, this.height / 2 - 10);\n  },\n  checkAliens: function () { //check number of aliens\n    if (this.alives == 0) this.nextLevel();\n    else if (this.alives == 1) this.increaseSpeed(150 - (this.level * 10));\n    else if (this.alives <= 10) this.increaseSpeed(200 - (this.level * 10));\n    else if (this.alives <= 10) this.increaseSpeed(300 - (this.level * 10));\n    else if (this.alives <= 25) this.increaseSpeed(500 - (this.level * 10));\n  },\n  refreshScore: function (points) { //display the score\n    this.alives--;\n    this.score += points;\n    document.getElementById('score').innerHTML = this.score;\n    document.getElementById('alives').innerHTML = this.alives;\n  },\n  nextLevel: function () {\n    //resurect aliens\n    for (i = 0; i < 5; i++) {\n      for (j = 0; j < 11; j++) {\n        this.aliens[i][j].alive = true;\n        this.alives++;\n      }\n    }\n    clearInterval(this.animation);\n    this.level++;\n    document.getElementById('level').innerHTML = this.level;\n    this.play();\n    this.increaseSpeed(this.interval);\n    document.getElementById('inter').innerHTML = this.interval;\n  }\n};\n\n//define the global context of the game\nconst element = document.getElementById('aliensCanvas');\nif (element.getContext) {\n  const canvas = element.getContext('2d');\n\n  let pic = new Image();\n  pic.src = 'https://github.com/gregquat/inbeda/raw/master/sprite.png';\n\n  Game.init(530, 500);\n\n  document.body.onkeydown = function (ev) {\n    Game.onkeydown(ev);\n  };\n  document.body.onkeyup = function (ev) {\n    Game.onkeyup(ev);\n  };\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });
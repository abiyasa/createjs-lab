var myLab = myLab || {};

(function (ns) {

  var stage;
  var canvas;

  var sphere;
  var hero;

  // Init the stage
  var initStage = function (canvasId) {
    canvas = document.getElementById(canvasId);
    if (canvas) {
      stage = new createjs.Stage(canvas);
    }
  };

  // init  the application
  ns.init = function () {
    initStage('canvas-main');

    var baseUrl = 'assets/spaceGodzilla/';

    // create bg box
    var bg = new createjs.Bitmap(baseUrl + 'bg.png');
    bg.width = canvas.width;
    bg.height = canvas.height;
    stage.addChild(bg);

    // create sphere
    sphere = new ns.Sphere();
    stage.addChild(sphere);

    // create hero
    hero = new ns.Hero();
    stage.addChild(hero);

    resetGame();
    startGame();
  };

  // reset all game properties
  var resetGame = function () {
    sphere.reset(canvas);
    hero.reset(canvas);
  };

  // start game
  var startGame = function () {
    // register event handler for input
    document.onkeydown = onKeyDown;
    document.onkeyup = onKeyUp;

    // start the animation
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener('tick', onTick);
    createjs.Ticker.useRAF = true;
  };

  // Handle key pressed down event
  var onKeyDown = function (event) {
    switch (event.keyCode) {
    case 37: // LEFT
      hero.move(-1);
      break;

    case 39: // RIGHT
      hero.move(1);
      break;
    }
  };

  // Handle key release event
  var onKeyUp = function (event) {
    switch (event.keyCode) {
    case 38: // UP
    case 37: // LEFT
    case 39: // RIGHT
    case 40: // DOWN
      hero.move(0);
      break;
    }
  };

  // update all game objects
  var onTick = function (event) {
    var delta = event.delta * 0.001;

    sphere.update(delta);
    hero.update(delta);

    // draw stage
    stage.update();
  };

})(myLab);

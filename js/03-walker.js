var myLab = myLab || {};

// The main application for walker game
(function (ns) {

  // the main canvas & stage
  var canvas;
  var stage;

  //main bg
  var bg;

  // main hero
  var Hero = ns.Hero; // shortcut for the class
  var hero;

  // Init the stage using the given canvas id
  var initStage = function (canvasId) {
    canvas = document.getElementById(canvasId);
    if (canvas) {
      stage = new createjs.Stage(canvas);
    }
  };

  //  init all assets
  var initAssets = function () {
    // create bg box
    bg = new createjs.Bitmap('assets/TheLight-raw/background.png');
    stage.addChild(bg);

    // create hero
    hero = new Hero();

    // register event handler for input
    document.onkeydown = onKeyDown;
    document.onkeyup = onKeyUp;

    stage.addChild(hero);
  };

  // start the game
  var start = function () {
    // clear & reset
    hero.reset(canvas);

    // start the animation
    var ticker = createjs.Ticker;
    ticker.setFPS(15);
    ticker.useRAF = true;
    if (!ticker.hasEventListener('tick')) {
      ticker.addEventListener('tick', onTick);
    }
  };

  // Handle key pressed down event
  var onKeyDown = function (event) {
    switch (event.keyCode) {
    case 38: // UP
      hero.setStatus(Hero.STATUS_MOVE_NORTH);
      break;

    case 37: // LEFT
      hero.setStatus(Hero.STATUS_MOVE_WEST);
      break;

    case 39: // RIGHT
      hero.setStatus(Hero.STATUS_MOVE_EAST);
      break;

    case 40: // DOWN
      hero.setStatus(Hero.STATUS_MOVE_SOUTH);
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
      hero.setStatus(Hero.STATUS_MOVE_NONE);
      break;
    }
  };

  // handle the game tick
  var onTick = function (event) {

    // draw stage
    stage.update();
  };

  // init  the application
  ns.init = function () {
    initStage('canvas-main');
    initAssets();
    start();
  };

})(myLab);

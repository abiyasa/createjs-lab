var myLab = myLab || {};

// The main application for walker game
(function (ns) {

  // the main canvas & stage
  var canvas;
  var stage;

  //main bg
  var bg;

  // main hero
  var hero;

  // Init the stage using the given canvas id
  initStage = function (canvasId) {
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
    hero = new ns.Hero();

    stage.addChild(hero);
  };

  // start the game
  var start = function () {
    // clear & reset
    hero.reset(canvas);

    hero.walk();

    // start the animation
    createjs.Ticker.setFPS(15);
    createjs.Ticker.addEventListener('tick', onTick);
    createjs.Ticker.useRAF = true;
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

var myLab = myLab || {};

(function (ns) {

  var stage;
  var canvas;

  var sphere;

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

    resetGame();
    startGame();
  };

  // reset all game properties
  var resetGame = function () {
    sphere.reset(canvas);
  };

  // start game
  var startGame = function () {

    // start the animation
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener('tick', onTick);
    createjs.Ticker.useRAF = true;
  };

  // update all game objects
  var onTick = function (event) {
    var delta = event.delta * 0.001;

    sphere.update(delta);

    // draw stage
    stage.update();
  };

})(myLab);

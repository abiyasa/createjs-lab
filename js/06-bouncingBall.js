var myLab = myLab || {};

(function (ns) {

  var stage;
  var canvas;

  var sphere;
  var SPHERE_WIDTH = 15;
  var SPHERE_HEIGHT = 15;

  var moveSpeedX;
  var moveSpeedY;
  var minPosX;
  var maxPosX;
  var minPosY;
  var maxPosY;

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

    // create bg box
    var bg = new createjs.Bitmap('assets/TheLight-raw/background.png');
    bg.width = canvas.width;
    bg.height = canvas.height;
    stage.addChild(bg);

    // create sphere
    var baseUrl = 'assets/spaceGodzilla/';
    sphere = new createjs.Bitmap(baseUrl + 'sphere.png');
    stage.addChild(sphere);

    resetGame();
    startGame();
  };

  // reset all game properties
  var resetGame = function () {
    minPosX = 0;
    maxPosX = canvas.width - SPHERE_WIDTH;
    minPosY = 0;
    maxPosY = canvas.height - SPHERE_HEIGHT;

    moveSpeedX = 150;  // pixel per second
    moveSpeedY = -150;  // pixel per second

    // put sphere in the middle
    sphere.x = canvas.width / 2;
    sphere.y = canvas.height / 2;
  };

  // start game
  var startGame = function () {

    // start the animation
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener('tick', onTick);
    createjs.Ticker.useRAF = true;
  };

  // update the sphere position
  var updateSphere = function (delta) {
    // update position
    var newPosX = sphere.x + (moveSpeedX * delta);
    var newPosY = sphere.y + (moveSpeedY * delta);

    // check new position and bounce
    if ((newPosX >= maxPosX) || (newPosX <=  minPosX)) {
      // bounce
      moveSpeedX *= -1;
    }
    if ((newPosY >= maxPosY) || (newPosY <=  minPosY)) {
      // bounce
      moveSpeedY *= -1;
    }
    sphere.x = newPosX;
    sphere.y = newPosY;
  };

  // handle the animation
  var onTick = function (event) {
    var delta = event.delta * 0.001;

    updateSphere(delta);

    // draw stage
    stage.update();
  };


})(myLab);

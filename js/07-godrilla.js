var myLab = myLab || {};

(function (ns) {

  var stage;
  var canvas;

  var sphere;
  var hero;
  var buildings;

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

    createBuildings();

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

  // create buildings to be destroyed
  var createBuildings = function () {
    // create sprite sheet
    var spriteSheet = new createjs.SpriteSheet({
      images: [ 'assets/spaceGodzilla/buildings.png' ],
      frames: [
        [ 33, 0, 27, 62, 0, 13, 42 ],
        [ 96, 0, 15, 62, 0, 8, 42 ],
        [ 79, 0, 15, 62, 0, 8, 42 ],
        [ 62, 0, 15, 64, 0, 8, 42 ],
        [ 0, 0, 31, 59, 0, 15, 39 ]
      ],
      animations: {
        // dummy animations
        tilemap: [ 0, 4 ]
      }
    });

    // generate several buildings using the same spritesheet
    buildings = [];
    var numOfCols = 15;
    var numOfRows = 8;
    var padding = 10;
    var col, row, posX, posY = 100, frameNum;
    var building;
    for (row = 0; row < numOfRows; row++) {
      posX = 25;
      for (col = 0; col < numOfCols; col++) {
        building = new createjs.BitmapAnimation(spriteSheet);
        building.x = posX;
        building.y = posY;
        building.hitRadius = 20;  // for sphere.hitTest()
        stage.addChild(building);

        // show different frame, randomly
        building.gotoAndStop(Math.floor(Math.random() * 5));

        buildings.push(building);

        posX += 20 + padding;
      }
      posY += 20 + padding;
    }
  };

  // handle collision between sphere and the building
  var handleBuildingCollision = function () {
    var sphereHit = false;
    var numOfBuildings = buildings.length;
    var i = 0;
    var building;
    while (!sphereHit && (i < numOfBuildings)) {
      building = buildings[i];

      if (sphere.hitTest(building)) {
        sphereHit = true;

        // remove the building
        buildings.splice(i, 1);
        stage.removeChild(building);

        // TODO bounce the ball
        sphere.moveSpeedY *= -1;
        sphere.moveSpeedX *= -1;
      }

      // next building
      i++;
    }
  };

  // update all game objects
  var onTick = function (event) {
    var delta = event.delta * 0.001;

    sphere.update(delta);
    hero.update(delta);

    // detect collision between hero and the sphere
    if (sphere.hitTest(hero)) {
      if (sphere.moveSpeedY > 0) {
        // only bounce if ball is moving downward
        sphere.moveSpeedY *= -1;
      }
    }

    // detect collision between sphere and the buildings
    handleBuildingCollision();

    // draw stage
    stage.update();
  };

})(myLab);

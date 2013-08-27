var myLab = myLab || {};

(function (ns) {

  var stage;
  var canvas;

  var godzilla;

  var moveSpeedX;
  var minPosX;
  var maxPosX;

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
    stage.addChild(bg);

    // create sprite sheet
    var frameFrequency = 1;  // the bigger the 'slower'
    var baseUrl = 'assets/spaceGodzilla/';
    var spriteSheet = new createjs.SpriteSheet({
      images: [ baseUrl + 'walk_sprites.png' ],
      frames: [
        [ 137, 62, 59, 62, 0, 29, 62 ],
        [ 74, 65, 61, 58, 0, 30, 58 ],
        [ 71, 126, 66, 59, 0, 33, 59 ],
        [ 0, 126, 69, 61, 0, 34, 61 ],
        [ 0, 0, 74, 63, 0, 37, 63 ],
        [ 0, 65, 72, 59, 0, 36, 59 ],
        [ 76, 0, 62, 60, 0, 31, 60 ],
        [ 139, 126, 57, 62, 0, 28, 62 ]
      ],
      animations: {
        walk: [ 0, 7, true, frameFrequency ]
      }
    });

    godzilla = new createjs.BitmapAnimation(spriteSheet);
    godzilla.x = 120;
    godzilla.y = 100;

    minPosX = 30;
    maxPosX = canvas.width - 30;

    stage.addChild(godzilla);

    moveSpeedX = 50;  // pixel per second
    godzilla.gotoAndPlay('walk');

    // start the animation
    createjs.Ticker.setFPS(15);
    createjs.Ticker.addEventListener('tick', this.animate);
    createjs.Ticker.useRAF = true;
  };

  // handle the animation
  ns.animate = function (event) {
    // update position
    var newPos = godzilla.x + (moveSpeedX * event.delta * 0.001);

    // check new position
    if ((newPos >= maxPosX) || (newPos <=  minPosX)) {
      // change direction
      moveSpeedX *= -1;
    }
    godzilla.x = newPos;

    // draw stage
    stage.update();
  };


})(myLab);

var myLab = myLab || {};

(function (ns) {

  // the main stage
  var stage;

  // Init the stage
  initStage = function (canvasId) {
    var canvas = document.getElementById(canvasId);
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
    var baseUrl = 'assets/TheLight-raw/';
    var spriteSheet = new createjs.SpriteSheet({
      images: [
        baseUrl + 'char_e1.png',
        baseUrl + 'char_e2.png',
        baseUrl + 'char_e3.png'
      ],
      frames: {
        'height': 32,
        'width': 32
      },
      animations: {
        walk: {
          frames: [ 0, 1, 0, 2 ],
          frequency: 3  // the bigger the 'slower'
        }
      }
    });

    var walkingDude = new createjs.BitmapAnimation(spriteSheet);
    walkingDude.x = 120;
    walkingDude.y = 100;

    walkingDude.gotoAndPlay('walk');
    stage.addChild(walkingDude);

    // start the animation
    createjs.Ticker.setFPS(15);
    createjs.Ticker.addEventListener('tick', this.animate);
    createjs.Ticker.useRAF = true;
  };

  // handle the animation
  ns.animate = function (event) {

    // draw stage
    stage.update();
  };


})(myLab);

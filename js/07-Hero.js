/**
* game object used in 07-godrilla.js
*/
var myLab = myLab || {};

(function (ns) {

  var Hero = function () {
    this.initialize();
  };

  ns.Hero = Hero;
  var Proto = Hero.prototype = new createjs.Container();

  // Static
  Hero.HIT_RADIUS = 37;

  Hero.MAX_SPEED = 250;

  // properties
  Proto.moveSpeedX = 0;
  Proto.minPosX = 0;
  Proto.maxPosX = 0;
  Proto.hitRadius = 0;

  Proto.initialize = function () {
    this.hitRadius = Hero.HIT_RADIUS;

    // create sprite sheet
    var frameFrequency = 5;  // the bigger the 'slower'
    var baseUrl = 'assets/spaceGodzilla/';
    var spriteSheet = new createjs.SpriteSheet({
      images: [ baseUrl + 'sprite-walk-74px.png' ],
      frames: {
        width: 74,
        height: 64,
        count: 8,
        regX: 37,
        regY: 32
      },
      animations: {
        walk: [ 0, 7, true, frameFrequency ]
      }
    });

    this._asset = new createjs.BitmapAnimation(spriteSheet);

    this.addChild(this._asset);
  };

  // reset all properties
  Proto.reset = function (canvas) {
    this.minPosX = this.hitRadius;
    this.maxPosX = canvas.width - this.hitRadius;

    this.moveSpeedX = 0;  // pixel per second

    // initial position
    this.x = canvas.width / 2;
    this.y = canvas.height - 100;

    // start animation
    this._asset.gotoAndPlay('walk');
  };

  // Sets the movement direction.
  // Direction < 0 means left,
  // Direction > 0 means right,
  // Direction = 0 means stop moving.
  Proto.move = function (direction) {
    if (direction < 0) {
      this.moveSpeedX = -Hero.MAX_SPEED;

      // face left
      this._asset.scaleX = -1;
    } else if (direction > 0) {
      this.moveSpeedX = Hero.MAX_SPEED;

      // face right
      this._asset.scaleX = 1;
    } else {
      this.moveSpeedX = 0;
    }
  };

  // update position
  Proto.update = function (delta) {
    // update position
    var newPosX = this.x + (this.moveSpeedX * delta);

    // limit the movement
    if (newPosX < this.minPosX) {
      newPosX = this.minPosX;
    } else if (newPosX > this.maxPosX) {
      newPosX = this.maxPosX;
    }

    // update position
    this.x = newPosX;
  };

})(myLab);

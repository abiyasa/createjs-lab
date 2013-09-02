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
  Hero.HIT_WIDTH = 70;
  Hero.HIT_HEIGHT = 60;

  Hero.MAX_SPEED = 250;

  // properties
  Proto.moveSpeedX = 0;
  Proto.minPosX = 0;
  Proto.maxPosX = 0;

  Proto.initialize = function () {

    // create sprite sheet
    var frameFrequency = 5;  // the bigger the 'slower'
    var baseUrl = 'assets/spaceGodzilla/';
    var spriteSheet = new createjs.SpriteSheet({
      images: [ baseUrl + 'sprite-walk-74px.png' ],
      frames: {
        width: 74,
        height: 64,
        count: 8
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
    this.minPosX = 0;
    this.maxPosX = canvas.width - Hero.HIT_WIDTH;

    this.moveSpeedX = 0;  // pixel per second

    // initial position
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;

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
      this._asset.x = 74;  // since the regX is 0, need to readjust
    } else if (direction > 0) {
      this.moveSpeedX = Hero.MAX_SPEED;

      // face right
      this._asset.scaleX = 1;
      this._asset.x = 0;
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

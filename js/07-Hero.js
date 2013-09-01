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

  // properties
  Proto.moveSpeedX = 0;
  Proto.minPosX = 0;
  Proto.maxPosX = 0;

  Proto.initialize = function () {

    // create sprite sheet
    var frameFrequency = 5;  // the bigger the 'slower'
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

  // update position
  Proto.update = function (delta) {
    // update position
    var newPosX = this.x + (this.moveSpeedX * delta);

    // TODO check new position

    // update position
    this.x = newPosX;
  };

})(myLab);

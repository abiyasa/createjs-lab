/**
* game object used in 07-godrilla.js
*/
var myLab = myLab || {};

(function (ns) {

  var Sphere = function () {
    this.initialize();
  };

  ns.Sphere = Sphere;
  var Proto = Sphere.prototype = new createjs.Container();

  // Static
  Sphere.HIT_WIDTH = 15;
  Sphere.HIT_HEIGHT = 15;

  // properties
  Proto.moveSpeedX = 0;
  Proto.moveSpeedY = 0;
  Proto.minPosX = 0;
  Proto.maxPosX = 0;
  Proto.minPosY = 0;
  Proto.maxPosY = 0;

  Proto.initialize = function () {
    var baseUrl = 'assets/spaceGodzilla/';

    // create asset
    var asset = new createjs.Bitmap(baseUrl + 'sphere.png');
    this.addChild(asset);
  };

  // reset all properties
  Proto.reset = function (canvas) {
    this.minPosX = 0;
    this.maxPosX = canvas.width - Sphere.HIT_WIDTH;
    this.minPosY = 0;
    this.maxPosY = canvas.height - Sphere.HIT_HEIGHT;

    this.moveSpeedX = 150;  // pixel per second
    this.moveSpeedY = -150;  // pixel per second

    // put sphere in the middle
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
  };

  // update the sphere position
  Proto.update = function (delta) {
    // update position
    var newPosX = this.x + (this.moveSpeedX * delta);
    var newPosY = this.y + (this.moveSpeedY * delta);

    // check new position and bounce
    var dist = newPosX - this.maxPosX;
    if (dist > 0) {
      // bounce
      this.moveSpeedX *= -1;
      newPosX = this.maxPosX - dist;
    }
    if (newPosX < 0) {
      // bounce
      this.moveSpeedX *= -1;
      newPosX = newPosX * -1;
    }
    dist = newPosY - this.maxPosY;
    if (dist > 0) {
      // bounce
      this.moveSpeedY *= -1;
      newPosY = this.maxPosY - dist;
    }
    if (newPosY < 0) {
      // bounce
      this.moveSpeedY *= -1;
      newPosY = newPosY * -1;
    }

    // update position
    this.x = newPosX;
    this.y = newPosY;
  };

})(myLab);

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
  Sphere.HIT_RADIUS = 8;

  // properties
  Proto.moveSpeedX = 0;
  Proto.moveSpeedY = 0;
  Proto.minPosX = 0;
  Proto.maxPosX = 0;
  Proto.minPosY = 0;
  Proto.maxPosY = 0;

  Proto.initialize = function () {
    this.hitRadius = Sphere.HIT_RADIUS;

    var baseUrl = 'assets/spaceGodzilla/';

    // create asset
    var asset = new createjs.Bitmap(baseUrl + 'sphere.png');
    asset.regX = 8;
    asset.regY = 8;
    this.addChild(asset);
  };

  // reset all properties
  Proto.reset = function (canvas) {
    var hitRadius = this.hitRadius;
    this.minPosX = hitRadius;
    this.maxPosX = canvas.width - hitRadius;
    this.minPosY = hitRadius;
    this.maxPosY = canvas.height - hitRadius;

    this.moveSpeedX = 150;  // pixel per second
    this.moveSpeedY = -150;  // pixel per second

    // put sphere in the middle
    this.x = canvas.width / 2;
    this.y = canvas.height - 200;
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

      // TODO handle sphere pass the bottom of screen
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

  // Do circular hit test with the target Object
  // Returns true if this sphere is collide the given object
  Proto.hitTest = function (targetObject) {
    var tempValue = false;
    var targetRadius = targetObject.hitRadius;
    if (targetRadius) {
      var squareDistance = ((this.x - targetObject.x) * (this.x - targetObject.x)) +
        ((this.y - targetObject.y) * (this.y - targetObject.y));
      tempValue = squareDistance <= ((this.hitRadius + targetRadius) * (this.hitRadius + targetRadius));
    }

    return tempValue;
  };

})(myLab);

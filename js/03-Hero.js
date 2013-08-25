var myLab = myLab || {};

(function (ns) {

  var Hero = function () {
    this.initialize();
  };

  var HeroProto = Hero.prototype = new createjs.Container();

  // publis 'static' properties
  Hero.WIDTH = 32;
  Hero.HEIGHT = 32;

  // status of hero movement. For its value, see variables Hero.HERO_MOVE_*
  HeroProto.currentStatus = Hero.HERO_STATUS_MOVE_NONE;
  Hero.HERO_STATUS_MOVE_NONE = 0;
  Hero.HERO_STATUS_MOVE_NORTH = 10;
  Hero.HERO_STATUS_MOVE_EAST = 20;
  Hero.HERO_STATUS_MOVE_SOUTH = 30;
  Hero.HERO_STATUS_MOVE_WEST = 40;

  HeroProto.initialize = function() {
    // create sprite sheet
    var baseUrl = 'assets/TheLight-raw/';
    var spriteSheet = new createjs.SpriteSheet({
      images: [
        baseUrl + 'char_e1.png',
        baseUrl + 'char_e2.png',
        baseUrl + 'char_e3.png'
      ],
      frames: {
        'height': Hero.WIDTH,
        'width': Hero.HEIGHT
      },
      animations: {
        walk: {
          frames: [ 0, 1, 0, 2 ],
          frequency: 3  // the bigger the 'slower'
        },
        stand: {
          frames: [ 0 ]
        }
      }
    });

    // create hero assets
    this._animation = new createjs.BitmapAnimation(spriteSheet);
    this.addChild(this._animation);
  };

  // Reset the hero position before the game begins
  HeroProto.reset = function (canvas) {
    // centerize the hero in the middle of screen
    this.x = (canvas.width / 2) - (Hero.WIDTH / 2);
    this.y = (canvas.height / 2) - (Hero.HEIGHT / 2);

    // force status
    this.setStatus(Hero.HERO_STATUS_MOVE_NONE, true);
  };

  // Change the hero status. This will handle animation and movement
  // For parameter newStatus, see Hero.
  HeroProto.setStatus = function (newStatus, force) {
    var oldStatus = this._currentStatus;
    if ((oldStatus === newStatus) && !force) {
      // nothing happen
      return;
    }

    // TODO validate new status
    this._currentStatus = newStatus;
    console.log('Cngaing hero status to ', newStatus);

    this._updateAnimation();
  };

  // update and play new animation based on new current status
  HeroProto._updateAnimation = function () {
    // TODO mapping between status and animation name
    var animationName;
    switch (this._currentStatus) {
    case Hero.HERO_STATUS_MOVE_NONE:
      // nothing happen
      animationName = 'stand';
      break;

    case Hero.HERO_STATUS_MOVE_WEST:
    case Hero.HERO_STATUS_MOVE_SOUTH:
    case Hero.HERO_STATUS_MOVE_EAST:
    case Hero.HERO_STATUS_MOVE_NORTH:
      animationName = 'walk';
      break;
    }

    if (animationName) {
      this._animation.gotoAndPlay(animationName);
      console.log('Playing animation', animationName);
    }
  };

  ns.Hero = Hero;
})(myLab);

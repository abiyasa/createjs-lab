var myLab = myLab || {};

(function (ns) {

  var Hero = function () {
    this.initialize();
  };

  var HeroProto = Hero.prototype = new createjs.Container();

  // publis 'static' properties
  Hero.WIDTH = 32;
  Hero.HEIGHT = 32;

  // status of hero movement. For its value, see variables Hero.MOVE_*
  HeroProto.currentStatus = Hero.STATUS_MOVE_NONE;
  Hero.STATUS_MOVE_NONE = 0;
  Hero.STATUS_MOVE_NORTH = 10;
  Hero.STATUS_MOVE_EAST = 20;
  Hero.STATUS_MOVE_SOUTH = 30;
  Hero.STATUS_MOVE_WEST = 40;

  // Hero movement speed
  HeroProto.speedX = 0;
  HeroProto.speedY = 0;
  Hero.HEROspeedY = 0;

  HeroProto.initialize = function() {
    // create sprite sheet
    var frameFrequency = 3;  // the bigger the 'slower'
    var baseUrl = 'assets/TheLight-raw/';
    var spriteSheet = new createjs.SpriteSheet({
      images: [
        baseUrl + 'char_e1.png',
        baseUrl + 'char_e2.png',
        baseUrl + 'char_e3.png',

        baseUrl + 'char_s1.png',
        baseUrl + 'char_s2.png',
        baseUrl + 'char_s3.png',

        baseUrl + 'char_w1.png',
        baseUrl + 'char_w2.png',
        baseUrl + 'char_w3.png',

        baseUrl + 'char_n1.png',
        baseUrl + 'char_n2.png',
        baseUrl + 'char_n3.png',
      ],
      frames: {
        'height': Hero.WIDTH,
        'width': Hero.HEIGHT
      },
      animations: {
        walk_e: {
          frames: [ 0, 1, 0, 2 ],
          frequency: frameFrequency
        },
        stand_e: {
          frames: [ 0 ]
        },

        walk_s: {
          frames: [ 3, 4, 3, 5 ],
          frequency: frameFrequency
        },
        stand_s: {
          frames: [ 3 ]
        },

        walk_w: {
          frames: [ 6, 7, 6, 8 ],
          frequency: frameFrequency
        },
        stand_w: {
          frames: [ 6 ]
        },

        walk_n: {
          frames: [ 9, 10, 9, 11 ],
          frequency: frameFrequency
        },
        stand_n: {
          frames: [ 9 ]
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

    // store movement limit
    this.minX = 0;
    this.minY = 0;
    this.maxX = canvas.width - Hero.WIDTH;
    this.maxY = canvas.height - Hero.HEIGHT;

    // force status
    this.setStatus(Hero.STATUS_MOVE_NONE, true);
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
    // mapping between status and animation name
    var animationName;
    switch (this._currentStatus) {
    case Hero.STATUS_MOVE_NONE:
      // always stand facing south
      animationName = 'stand_s';
      break;

    case Hero.STATUS_MOVE_WEST:
      animationName = 'walk_w';
      break;

    case Hero.STATUS_MOVE_SOUTH:
      animationName = 'walk_s';
      break;

    case Hero.STATUS_MOVE_EAST:
      animationName = 'walk_e';
      break;

    case Hero.STATUS_MOVE_NORTH:
      animationName = 'walk_n';
      break;
    }

    if (animationName) {
      this._animation.gotoAndPlay(animationName);
      console.log('Playing animation', animationName);
    }
  };

  ns.Hero = Hero;
})(myLab);

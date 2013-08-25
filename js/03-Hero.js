var myLab = myLab || {};

(function (ns) {

  var Hero = function () {
    this.initialize();
  };

  var HeroProto = Hero.prototype = new createjs.Container();

  // publis 'static' properties
  Hero.WIDTH = 32;
  Hero.HEIGHT = 32;

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
  };

  // play walking animation
  HeroProto.walk = function () {
    this._animation.gotoAndPlay('walk');
  };

  ns.Hero = Hero;
})(myLab);

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

    // create container box
    var containerBox = new createjs.Container();
    this.containerBox = containerBox;

    // add rectangular shape
    var bgShape = new createjs.Shape();
    var g = bgShape.graphics;
    g.beginFill('#009eef');
    g.drawRect(0, 0, 100, 100);
    g.endFill();
    containerBox.addChild(bgShape);

    // add text into container
    var theText = new createjs.Text('Hello World!', 'bold 16px Metal,Arial', '#FFFFFF');
    theText.x = 10;
    theText.y = 30;
    theText.lineWidth = 80;
    containerBox.addChild(theText);

    // add to main stage
    stage.addChild(containerBox);
    containerBox.x = 50;
    containerBox.y = 20;
    containerBox.regX = 50;
    containerBox.regY = 50;

    // start the animation
    createjs.Ticker.addEventListener('tick', this.animate);
    createjs.Ticker.useRAF = true;
  };

  // handle the animation
  ns.animate = function (event) {
    ns.containerBox.rotation += 5;

    // draw stage
    stage.update();
  };


})(myLab);

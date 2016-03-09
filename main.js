var $ = require('jquery');
var _ = require('underscore');

var game = new Phaser.Game(1100, 650, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

  game.load.image('background', './assets/space.jpg');
  game.load.image('blob', './assets/blob.jpg');
  game.load.image('star', './assets/star.jpg');

};

var background;
var blobSprite;
// var starSprite;
var stars;
// var bonusFood;
var nextMovedStar;
var randomSelection;
var interval = 3500/20;

// CREATING SCORES
var score = 0;
var scoreText;

function create() {

  //  This will run in Canvas mode, so let's gain a little speed and display
  game.renderer.clearBeforeRender = false;
  game.renderer.roundPixels = true;

  //  We need arcade physics
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //  A spacey background
  game.add.tileSprite(0, 0, game.width, game.height, 'background');

  //  Our player ship
  blobSprite = game.add.sprite(300, 300, 'blob');
  blobSprite.anchor.set(0.5);

  //  and its physics settings
  game.physics.enable(blobSprite, Phaser.Physics.ARCADE);

  // asteroid style movement
  blobSprite.body.drag.set(100);
  blobSprite.body.maxVelocity.set(200);

  //  Finally some stars to collect
  stars = game.add.group();
  stars.enableBody = true;
  // game.physics.enable(stars, Phaser.Physics.ARCADE);

  nextMovedStar = 0;

  //  Here we'll create 12 of them evenly spaced apart
  for (var i = 0; i < 15; i++) {
    //  Create a star inside of the 'stars' group
    // var star = stars.create(game.world.randomX, game.world.randomX, 'star');

    var star = stars.create(game.world.randomX, game.world.randomY, 'star');
  }

    game.time.events.loop(interval, function() {        
      nextMovedStar = game.rnd.integerInRange(0, 15);
      this.game.add.tween(stars.getAt(nextMovedStar)).to({x: this.game.world.randomX, y: this.game.world.randomY}, 19000, Phaser.Easing.Linear.InOut, true);
    }, this);
    game.physics.enable(stars, Phaser.Physics.ARCADE);

  // SCORES
  scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

  //  Game input
  cursors = game.input.keyboard.createCursorKeys();

};


function update() {

  game.physics.arcade.overlap(blobSprite, stars, collectStar, null, this);

  if (cursors.up.isDown) {
    game.physics.arcade.accelerationFromRotation(blobSprite.rotation, 200, blobSprite.body.acceleration);
  }
  else {
    blobSprite.body.acceleration.set(0);
  }

  if (cursors.left.isDown) {
    blobSprite.body.angularVelocity = -300;
  }
  else if (cursors.right.isDown) {
    blobSprite.body.angularVelocity = 300;
  }
  else {
    blobSprite.body.angularVelocity = 0;
  }

  screenWrap(blobSprite);

  if (score % 150 === 0) {
    for (var i = 0; i < 15; i++) {
      //  Create a star inside of the 'stars' group
      // var star = stars.create(game.world.randomX, game.world.randomX, 'star');

      var star = stars.create(game.world.randomX, game.world.randomY, 'star');
    }

  game.time.events.loop(interval, function() {        
    nextMovedStar = game.rnd.integerInRange(16, 30);
    this.game.add.tween(stars.getAt(nextMovedStar)).to({x: this.game.world.randomX, y: this.game.world.randomY},        19000, Phaser.Easing.Linear.InOut, true);
  }, this);
  };
}

function screenWrap(blobSprite) {

  if (blobSprite.x < 0) {
    blobSprite.x = game.width;
  }
  else if (blobSprite.x > game.width) {
    blobSprite.x = 0;
  }

  if (blobSprite.y < 0) {
    blobSprite.y = game.height;
  }
  else if (blobSprite.y > game.height) {
    blobSprite.y = 0;
  }

}

// have to pass in which star
function collectStar (player, star) {    

  star.kill();
  //  Add and update the score
  score += 10;
  scoreText.text = 'Score: ' + score;

}

// var collectStars = function() {

//   for (var i = 0; i < 15; i++) {
//     //  Create a star inside of the 'stars' group
//     // var star = stars.create(game.world.randomX, game.world.randomX, 'star');

//     var star = stars.create(game.world.randomX, game.world.randomY, 'star');
//   }

//   game.time.events.loop(interval, function() {        
//     nextMovedStar = game.rnd.integerInRange(0, 15);
//     this.game.add.tween(stars.getAt(nextMovedStar)).to({x: this.game.world.randomX, y: this.game.world.randomY},        19000, Phaser.Easing.Linear.InOut, true);
//   }, this);
// }


function render() {

  // Sprite debug info
  game.debug.spriteInfo(blobSprite, 32, 32);

}




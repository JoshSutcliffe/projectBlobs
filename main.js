var $ = require('jquery');
var _ = require('underscore');

var game = new Phaser.Game(1100, 650, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

  game.load.image('background', './assets/space.jpg');
  game.load.image('blob', './assets/blob.jpg');
  game.load.image('star', './assets/star.jpg');
  game.load.image('asteroid1', './assets/asteroids.jpg');
  game.load.image('asteroid2', './assets/Asteroids-icon.jpg');
  game.load.image('asteroid2', './assets/Asteroids-icon.jpg');
  game.load.image('ufo', './assets/UFO-icon.jpg');

};

var background;
var blobSprite;
var asteroids1;
var asteroids2;
var stars;
// var bonusFood;

var nextMovedStar;
var nextMovedAsteroid1;
var nextMovedAsteroid2;
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

  // background
  game.add.tileSprite(0, 0, game.width, game.height, 'background');

  //  player sprite
  blobSprite = game.add.sprite(300, 300, 'blob');
  blobSprite.anchor.set(0.5);
  game.physics.enable(blobSprite, Phaser.Physics.ARCADE);

  // asteroid style movement
  blobSprite.body.drag.set(300);
  blobSprite.body.maxVelocity.set(600);

  //  Creating stars group
  stars = game.add.group();
  stars.enableBody = true;

  nextMovedStar = 0;

  //  Creating Stars
  for (var i = 0; i < 2; i++) {
    //  Create a star inside of the 'stars' group
    var star = stars.create(game.world.randomX, game.world.randomY, 'star');
  }

  // Make the little buggers move about
  game.time.events.loop(interval, function() {        
    nextMovedStar = game.rnd.integerInRange(0, stars.length);
    this.game.add.tween(stars.getAt(nextMovedStar)).to({x: this.game.world.randomX, y: this.game.world.randomY}, 19000, Phaser.Easing.Linear.InOut, true);
  }, this);

  game.physics.enable(stars, Phaser.Physics.ARCADE);

  // Creating asteroids1 timer
  game.time.events.repeat(Phaser.Timer.SECOND * 5, 10, createAsteroids1, this);
  // Creating asteroids2 timer
  game.time.events.repeat(Phaser.Timer.SECOND * 5, 10, createAsteroids2, this);

  // SCORES
  scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

  // Enable keys to work
  cursors = game.input.keyboard.createCursorKeys();

};


function update() {

  game.physics.arcade.overlap(blobSprite, stars, collectStar, null, this);
  game.physics.arcade.overlap(blobSprite, asteroids1, gameOver, null, this);
  game.physics.arcade.overlap(blobSprite, asteroids2, gameOver, null, this);

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

  if (stars.length === 0) {
    for (var i = 0; i < 2; i++) {

      stars.create(game.world.randomX, game.world.randomY, 'star');
    }
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

  // Now that the individual star is passed in and not a group, 
  // destroy will now work and remove star from the collection
  // Better than .kill() which keeps it in the collection
  star.destroy();
  //  Add and update the score
  score += 10;
  scoreText.text = 'Score: ' + score;

}

function createAsteroids1() {
  asteroids1 = game.add.group();
  console.log('creating asteroid1');
  var asteroid1 = asteroids1.create(game.world.randomX, game.world.randomY, 'asteroid1');

  // Make the little buggers move about
  game.time.events.loop(interval, function() {        
    nextMovedAsteroid1 = game.rnd.integerInRange(0, asteroids1.length);
    this.game.add.tween(asteroids1.getAt(nextMovedAsteroid1)).to({x: this.game.world.randomX, y: this.game.world.randomY}, 19000, Phaser.Easing.Linear.InOut, true);
  }, this);

  game.physics.enable(asteroids1, Phaser.Physics.ARCADE);
};

function createAsteroids2() {
  asteroids2 = game.add.group();
  console.log('creating asteroid2');
  var asteroid2 = asteroids2.create(game.world.randomX, game.world.randomY, 'asteroid2');

  // Make the little buggers move about
  game.time.events.loop(interval, function() {        
    nextMovedAsteroid2 = game.rnd.integerInRange(0, asteroids2.length);
    this.game.add.tween(asteroids2.getAt(nextMovedAsteroid2)).to({x: this.game.world.randomX, y: this.game.world.randomY}, 19000, Phaser.Easing.Linear.InOut, true);
  }, this);

  game.physics.enable(asteroids2, Phaser.Physics.ARCADE);
};

function gameOver() {
  console.log('game over')
}




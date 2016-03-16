var $ = require('jquery');
var _ = require('underscore');

var game = new Phaser.Game(1100, 650, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

  game.load.image('background', './assets/images/space.jpg');
  game.load.image('blob', './assets/images/spaceship1_final.jpg');
  game.load.image('star', './assets/images/star.jpg');
  game.load.image('asteroid1', './assets/images/asteroids.jpg');
  game.load.image('asteroid2', './assets/images/Asteroids-icon.jpg');
  game.load.image('ufo', './assets/images/UFO-icon.jpg');
  game.load.image('start', './assets/images/diggonaut-start.png');
  game.load.image('bullet', './assets/images/missile-alien.jpg');

};

// Creating sprites and groups
var background;
var blobSprite;
var asteroids1;
var asteroids2;
var stars;
var ufos;
// var bonusFood;

// Bullets
var bullets;
var bulletTime = 0;

// controlling game start
var startButton;
var playing = false;
var fireRate = 100;
var nextFire = 0;

// To control movement of asteroids and stars
var nextMovedStar;
var nextMovedAsteroid1;
var randomSelection;
var interval = 3500/20;

// CREATING SCORES
var score = 0;
var scoreText;

function create() {

  //  Canvas display
  game.renderer.clearBeforeRender = false;
  game.renderer.roundPixels = true;

  //  arcade physics
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // background
  game.add.tileSprite(0, 0, game.width, game.height, 'background');

  // ============= PLAYER SPRITE =========== // 
  blobSprite = game.add.sprite(300, 300, 'blob');
  blobSprite.anchor.set(0.5);
  game.physics.enable(blobSprite, Phaser.Physics.ARCADE);

  // asteroid style movement
  blobSprite.body.drag.set(300);
  blobSprite.body.maxVelocity.set(600);

  //  ========= STARS ========== //
  stars = game.add.group();
  stars.enableBody = true;

  nextMovedStar = 0;

  //  Creating Stars
  for (var i = 0; i < 5; i++) {
    //  Create a star inside of the 'stars' group
    var star = stars.create(game.world.randomX, game.world.randomY, 'star');
  };

  // Make the little buggers move about
  game.time.events.loop(interval, function() {        
    nextMovedStar = game.rnd.integerInRange(0, stars.length);
    this.game.add.tween(stars.getAt(nextMovedStar)).to({x: this.game.world.randomX, y: this.game.world.randomY}, 19000, Phaser.Easing.Linear.InOut, true);
  }, this);

  game.physics.enable(stars, Phaser.Physics.ARCADE);

  // =========== ASTEROIDS =============
  // Creating asteroids1 timer
  game.time.events.loop(Phaser.Timer.SECOND * 2.5, createAsteroids1, this);
  asteroids1 = game.add.group();
  // Creating asteroids2 timer
  game.time.events.loop(Phaser.Timer.SECOND * 3.2, createAsteroids2, this);
  asteroids2 = game.add.group();

  game.time.events.loop(Phaser.Timer.SECOND * 5.6, createUfos, this);
  ufos = game.add.group();

  // ============== BULLETS ===============
  bullets = game.add.group();
  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.ARCADE;

  bullets.createMultiple(40, 'bullet');
  bullets.setAll('anchor.x', 0.5);
  bullets.setAll('anchor.y', 0.5);

  // SCORES
  scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#FFFFFF' });

  // Enable keys to work
  cursors = game.input.keyboard.createCursorKeys();
  game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

  // Game start 
  startButton = game.add.button(game.world.width*0.5, game.world.height*0.5, 'start', startGame, this, 1, 0, 2);
  startButton.anchor.set(0.5);

};


function update() {

  // Checking for overlaps
  game.physics.arcade.overlap(blobSprite, stars, collectStar, null, this);
  game.physics.arcade.overlap(blobSprite, asteroids1, gameOver, null, this);
  game.physics.arcade.overlap(blobSprite, asteroids2, gameOver, null, this);
  game.physics.arcade.overlap(blobSprite, ufos, gameOver, null, this);

  // overlaps with bullets
  game.physics.arcade.overlap(bullets, asteroids1, destroyAsteroid1, null, this);
  game.physics.arcade.overlap(bullets, asteroids2, destroyAsteroid2, null, this);
  game.physics.arcade.overlap(bullets, ufos, destroyUfos, null, this);

  if (playing) {
    // Controlling movements
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

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      fireBullet();
    }

    // Screen wrapping sprite and bullets
    screenWrap(blobSprite);
    bullets.forEachExists(screenWrap, this);

    // Regenerating stars
    if (stars.length === 0) {
      for (var i = 0; i < 5; i++) {

        stars.create(game.world.randomX, game.world.randomY, 'star');
      }
    };
  };
};

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

};

// Bullet firing function
function fireBullet () {

  if (game.time.now > bulletTime) {
    var bullet = bullets.getFirstExists(false);

    if (bullet) {
      bullet.reset(blobSprite.body.x + 16, blobSprite.body.y + 16);
      bullet.lifespan = 2000;
      bullet.rotation = blobSprite.rotation;
      game.physics.arcade.velocityFromRotation(blobSprite.rotation, 400, bullet.body.velocity);
      bulletTime = game.time.now + 50;
    }
  }
};

// creating the floating asteroids
function createAsteroids1() {
  var asteroid1 = asteroids1.create(game.world.randomX, game.world.randomY, 'asteroid1');

  // Make the little buggers move about
  game.time.events.loop(interval, function() {        
    nextMovedAsteroid1 = game.rnd.integerInRange(0, asteroids1.length);
    this.game.add.tween(asteroids1.getAt(nextMovedAsteroid1)).to({x: this.game.world.randomX, y: this.game.world.randomY}, 19000, Phaser.Easing.Linear.InOut, true);
  }, this);

  game.physics.enable(asteroids1, Phaser.Physics.ARCADE);
};

// Creating the shooting asteroids
function createAsteroids2() {
  var asteroid2 = asteroids2.create(game.world.randomX, game.world.randomY, 'asteroid2');

  game.physics.enable(asteroids2, Phaser.Physics.ARCADE);

  // This shoots the object at the blob
  asteroids2.forEachAlive(function(shoot) {
    game.physics.arcade.moveToObject(shoot, {x: blobSprite.x, y: blobSprite.y}, 200, this);
  }, this);

};

// Creating the shooting ufos
function createUfos() {
  var ufo = ufos.create(game.world.randomX, game.world.randomY, 'ufo');

  game.physics.enable(ufos, Phaser.Physics.ARCADE);

  // This shoots the object at the blob
  ufos.forEachAlive(function(shoot) {
    game.physics.arcade.moveToObject(shoot, {x: blobSprite.x, y: blobSprite.y}, 200, this);
  }, this);

};


function destroyAsteroid1(bullet, asteroid) {

  console.log('destroy function called');
  asteroid.destroy();

};

function destroyAsteroid2(bullet, asteroid) {

  asteroid.destroy();

};

function destroyUfos(bullet, ufo) {

  ufo.destroy();

};

function gameOver() {
  console.log('game over');
  alert('You lost, game over!');
  location.reload();
  playing = false;
};

function startGame() {
  startButton.destroy();
  playing = true;
};






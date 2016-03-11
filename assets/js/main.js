var $ = require('jquery');
var _ = require('underscore');

var game = new Phaser.Game(1100, 650, Phaser.AUTO, '', { preload: preload, create: create, update: update });

// game.state.add('Menu', Menu);

// game.state.start('Menu');

function preload() {

  game.load.image('background', './assets/images/space.jpg');
  game.load.image('blob', './assets/images/spaceship1_final.jpg');
  game.load.image('star', './assets/images/star.jpg');
  game.load.image('asteroid1', './assets/images/asteroids.jpg');
  game.load.image('asteroid2', './assets/images/Asteroids-icon.jpg');
  game.load.image('ufo', './assets/images/UFO-icon.jpg');
  game.load.image('start', './assets/images/diggonaut-start.png');

};

// Creating sprites and groups
var background;
var blobSprite;
var asteroids1;
var asteroids2;
var stars;
// var bonusFood;

// controlling game start
var startButton;
var playing = false;

// Controlling the evil chasing ufos
var ufosAmount = 3;
var ufos = []; 

// To control movement of asteroids and stars
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
  for (var i = 0; i < 5; i++) {
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
  game.time.events.repeat(Phaser.Timer.SECOND * 38, 10, createAsteroids1, this);
  // Creating asteroids2 timer
  game.time.events.loop(Phaser.Timer.SECOND * 15, createAsteroids2, this);

  // Creating the UFO's
  for (var i = 0; i < ufosAmount; i++) {
    ufos[i] = game.add.sprite(game.world.randomX, game.world.randomY, 'ufo');
    ufos[i].anchor.set(0.5);
    ufos[i].speed = game.rnd.between(50, 150);
    ufos[i].force = game.rnd.between(5, 25);
    game.physics.enable(ufos[i], Phaser.Physics.ARCADE);
    ufos[i].body.allowRotation = false; 
  };

  // SCORES
  scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: 'white' });

  // Enable keys to work
  cursors = game.input.keyboard.createCursorKeys();

  startButton = game.add.button(game.world.width*0.5, game.world.height*0.5, 'start', startGame, this, 1, 0, 2);
  startButton.anchor.set(0.5);

};


function update() {

  // Checking for overlaps
  game.physics.arcade.overlap(blobSprite, stars, collectStar, null, this);
  game.physics.arcade.overlap(blobSprite, asteroids1, gameOver, null, this);
  game.physics.arcade.overlap(blobSprite, asteroids2, gameOver, null, this);
  game.physics.arcade.overlap(blobSprite, ufos, gameOver, null, this);

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

    screenWrap(blobSprite);

    // Regenerating stars
    if (stars.length === 0) {
      for (var i = 0; i < 5; i++) {

        stars.create(game.world.randomX, game.world.randomY, 'star');
      }
    };

    // Directing my evil ufos at their target
    for(var i = 0; i < ufosAmount; i++){
      // direction vector is the straight direction from the boid to the target
      var direction = new Phaser.Point(blobSprite.x, blobSprite.y);
      // now we subtract the current boid position
      direction.subtract(ufos[i].x, ufos[i].y);
      // then we normalize it. A normalized vector has its length is 1, but it retains the same direction
      direction.normalize();
      // time to set magnitude (length) to boid speed
      direction.setMagnitude(ufos[i].speed);
      // now we subtract the current boid velocity
      direction.subtract(ufos[i].body.velocity.x, ufos[i].body.velocity.y);
      // normalizing again
      direction.normalize();
      // finally we set the magnitude to boid force, which should be WAY lower than its velocity
      direction.setMagnitude(ufos[i].force); 
      // Now we add boid direction to current boid velocity
      ufos[i].body.velocity.add(direction.x, direction.y);
      // we normalize the velocity
      ufos[i].body.velocity.normalize();
      // we set the magnitue to boid speed
      ufos[i].body.velocity.setMagnitude(ufos[i].speed);
      ufos[i].angle = 180 + Phaser.Math.radToDeg(Phaser.Point.angle(ufos[i].position, new Phaser.Point(ufos[i].x + ufos[i].body.velocity.x, ufos[i].y + ufos[i].body.velocity.y)));
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
  var asteroid2 = asteroids2.create(game.world.randomX, game.world.randomY, 'asteroid2');

  game.physics.enable(asteroids2, Phaser.Physics.ARCADE);

  // This shoots the object at the blob
  asteroids2.forEachAlive(function(chase) {
    game.physics.arcade.moveToObject(chase, {x: blobSprite.x, y: blobSprite.y}, 200, this);
  }, this);

};

function gameOver() {
  // game.state.start('Game_Over');
  alert('You lost, game over!');
  location.reload();
};

function startGame() {
  startButton.destroy();
  // ball.body.velocity.set(150, -150);
  playing = true;
};

// game.state.add('Game_Over', game_over);




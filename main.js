var $ = require('jquery');
var _ = require('underscore');

// CREATING SCORES
var score = 0;
var scoreText;

// GAME WINDOW DIMENSIONS - EMPTY STRING SELECTS THE DIV TO ATTATCH THE GAME TO, DEFAULT IS BODY
var game = new Phaser.Game(1100, 650, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('background', './assets/space.jpg');
  game.load.image('blob', './assets/blob.jpg');
  game.load.image('stars', './assets/star.jpg');

  // SCORES
  scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
};

var background;
var blobSprite;
var starSprite;
var stars;
var bonusFood;

function create() {

  // Making the background size
  game.world.setBounds(0, 0, 2560, 1600);

  // Enable physics here
  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.defaultRestitution = 0.9;

  // Keeping background in place and fit window
  background = game.add.tileSprite(0, 0, 1100, 650, 'background');
  background.fixedToCamera = true;

  // TO FIX
  // Starting position
  // blobSprite = game.add.sprite(game.world.centerX, game.world.centerY, 'blob');
  // Changing this to the above breaks background image
  // find a new way to start in the centre
  blobSprite = game.add.sprite(0, 0, 'blob');
  // applying pysics to blob
  game.physics.p2.enable(blobSprite, false);

  game.camera.follow(blobSprite);

  // Creating something for the player to collect
  // stars = game.add.group();

  // game.physics.startSystem(Phaser.Physics.ARCADE);

  // stars.enableBody = true;

  // //  Here we'll create 12 of them evenly backgroundd apart
  // for (var i = 0; i < 12; i++) {
  //   //  Create a star inside of the 'stars' group
  //   var star = stars.create(i * 70, 0, 'stars');

  //   //  Let gravity do its thing
  //   star.body.gravity.y = 6;

  //   //  This just gives each star a slightly random bounce value
  //   star.body.bounce.y = 0.7 + Math.random() * 0.2;
  //   debugger
  // };

  // // CHECK IF THE ICONS ARE OVERLAPPING
  // game.physics.arcade.overlap(blobSprite, stars, collectStar, null, this);

  // // REMOVE STAR AFTER ITS BEEN COLLECTED
  // function collectStar (blobSprite, star) {

  //   // Removes the star from the screen
  //   star.kill();

  //   // Add and update the score
  //   score += 10;
  //   scoreText.text = 'Score: ' + score;
  // };

  cursors = game.input.keyboard.createCursorKeys();

};


function update() {

  blobSprite.body.setZeroVelocity();

  if (cursors.left.isDown)
  {
    blobSprite.body.moveLeft(200);
  }
  else if (cursors.right.isDown)
  {
    blobSprite.body.moveRight(200);
  }

  if (cursors.up.isDown)
  {
    blobSprite.body.moveUp(200);
  }
  else if (cursors.down.isDown)
  {
    blobSprite.body.moveDown(200);
  }

  if (!game.camera.atLimit.x)
  {
    background.tilePosition.x -= (blobSprite.body.velocity.x * game.time.physicsElapsed);
  }

  if (!game.camera.atLimit.y)
  {
    background.tilePosition.y -= (blobSprite.body.velocity.y * game.time.physicsElapsed);
  }
};

// function render() {
//     game.debug.spriteInfo(s, 20, 32);

// }


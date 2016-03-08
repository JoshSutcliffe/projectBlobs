var $ = require('jquery');
var _ = require('underscore');

// CREATING SCORES
// var score = 0;
// var scoreText;

// GAME WINDOW DIMENSIONS - EMPTY STRING SELECTS THE DIV TO ATTATCH THE GAME TO, DEFAULT IS BODY
var game = new Phaser.Game(1100, 650, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('space', './assets/space.jpg');
  game.load.image('blob', './assets/blob.jpg');
  game.load.image('star', './assets/star.jpg');

  // SCORES
  // scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
};

var space;
var blobSprite;
var starSprite;

function create() {

  // Making the background size
  game.world.setBounds(0, 0, 2560, 1600);

  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.defaultRestitution = 0.9;

  space = game.add.tileSprite(0, 0, 1100, 650, 'space');
  space.fixedToCamera = true;

  // To fix
  // Starting position
  // blobSprite = game.add.sprite(game.world.centerX, game.world.centerY, 'blob');
  // Changing this to the above breaks background image
  // find a new way to start in the centre
  blobSprite = game.add.sprite(0, 0, 'blob');
  // applying pysics to blob
  game.physics.p2.enable(blobSprite, false);

  game.camera.follow(blobSprite);

  // blobSprite.anchor.setTo(0.5, 0.5);
  // blobSprite.scale.setTo(2, 2);

  // moving blob animations
  // blobSprite.animations.add('run');
  // blobSprite.animations.play('run', 10, true);

  // // Creating something for the player to collect
  // stars = game.add.group();

  // stars.enableBody = true;

  // //  Here we'll create 12 of them evenly spaced apart
  // for (var i = 0; i < 12; i++) {
  //   //  Create a star inside of the 'stars' group
  //   var star = stars.create(i * 70, 0, 'star');

  //   //  Let gravity do its thing
  //   star.body.gravity.y = 6;

  //   //  This just gives each star a slightly random bounce value
  //   star.body.bounce.y = 0.7 + Math.random() * 0.2;
  // }

  // CHECK IF THE ICONS ARE OVERLAPPING
  // game.physics.arcade.overlap(player, stars, collectStar, null, this);

  // REMOVE STAR AFTER ITS BEEN COLLECTED
  // function collectStar (player, star) {

  //     // Removes the star from the screen
  //     star.kill();

    //  Add and update the score
    // score += 10;
    // scoreText.text = 'Score: ' + score;

  // }

  cursors = game.input.keyboard.createCursorKeys();


};


function update() {

  // I didn't create platforms from the tutorial - create a variable of something for it to collide into
  //  Collide the player and the stars with the platforms
  // game.physics.arcade.collide(player, platforms);

  // Moving the player
  // cursors = game.input.keyboard.createCursorKeys();

  // //  Reset the players velocity (movement)
  // player.body.velocity.x = 0;

  // if (cursors.left.isDown) {
  //   //  Move to the left
  //   player.body.velocity.x = -150;

  //   player.animations.play('left');
  // }
  // else if (cursors.right.isDown) {
  //   //  Move to the right
  //   player.body.velocity.x = 150;

  //   player.animations.play('right');
  // }
  // else {
  //   //  Stand still
  //   player.animations.stop();

  //   player.frame = 4;
  // }

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
    space.tilePosition.x -= (blobSprite.body.velocity.x * game.time.physicsElapsed);
  }

  if (!game.camera.atLimit.y)
  {
    space.tilePosition.y -= (blobSprite.body.velocity.y * game.time.physicsElapsed);
  }
};

// function render() {
//     game.debug.spriteInfo(s, 20, 32);

// }


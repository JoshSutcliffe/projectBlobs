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

  // backgrouND
  game.add.tileSprite(0, 0, 1100, 650, 'space');
  
  // enable game physics
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // Starting position
  blobSprite = game.add.sprite(game.world.centerX, game.world.centerY, 'blob');
  // applying pysics to blob
  game.physics.enable([blobSprite], Phaser.Physics.ARCADE);
  // Don't let the little bugger off the screen
  blobSprite.body.collideWorldBounds = true;

  blobSprite.anchor.setTo(0.5, 0.5);
  blobSprite.scale.setTo(2, 2);

  // moving blob animations
  blobSprite.animations.add('run');
  blobSprite.animations.play('run', 10, true);

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

  if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
    blobSprite.x -= 4;
  }
  else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
    blobSprite.x += 4;
  }

  if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
    blobSprite.y -= 4;
  }
  else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
    blobSprite.y += 4;
  }
};

function render() {
    game.debug.spriteInfo(s, 20, 32);

}


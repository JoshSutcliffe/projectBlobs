var $ = require('jquery');
var _ = require('underscore');

// CREATING SCORES
var score = 0;
var scoreText;

// GAME WINDOW DIMENSIONS - EMPTY STRING SELECTS THE DIV TO ATTATCH THE GAME TO, DEFAULT IS BODY
var game = new Phaser.Game(1100, 650, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('space', './assets/space.jpg');
  game.load.image('blob', './assets/blob.jpg');
  game.load.image('star', './assets/star.jpg');

  // SCORES
  scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
};

function create() {
  // backgrouND
  game.add.sprite(0, 0, 'space');

  // // Creating a user token
  // token = game.add.sprite(0, 0, 'blob');
  // The player and its settings
  player = game.add.sprite(0, 0, 'blob');

  // // enable game physics
  // game.physics.startSystem(Phaser.Physics.ARCADE);

  // //  We need to enable physics on the player
  // game.physics.arcade.enable(player);

  // //  Player physics properties. Give the little guy a slight bounce.
  // player.body.bounce.y = 0.2;
  // player.body.gravity.y = 300;
  // player.body.collideWorldBounds = true;

  // //  Our two animations, walking left and right.
  // player.animations.add('left', [0, 1, 2, 3], 10, true);
  // player.animations.add('right', [5, 6, 7, 8], 10, true);

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
};



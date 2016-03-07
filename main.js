var $ = require('jquery');
var _ = require('underscore');

console.log('hello');

// GAME WINDOW DIMENSIONS -EMPTY STRING SELECTS THE DIV TO ATTATCH THE GAME TO, DEFAULT IS BODY
var game = new Phaser.Game(1100, 650, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('space', './assets/space.jpg');
  game.load.image('blob', './assets/blob.jpg');
}

var platforms;

function create() {
  // background
  game.add.sprite(0, 0, 'space');

  // // Creating a user token
  // token = game.add.sprite(0, 0, 'blob');
  // The player and its settings
  player = game.add.sprite(0, 0, 'blob');

  // enable game physics
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //  We need to enable physics on the player
  game.physics.arcade.enable(player);

  //  Player physics properties. Give the little guy a slight bounce.
  player.body.bounce.y = 0.2;
  player.body.gravity.y = 300;
  player.body.collideWorldBounds = true;

  //  Our two animations, walking left and right.
  player.animations.add('left', [0, 1, 2, 3], 10, true);
  player.animations.add('right', [5, 6, 7, 8], 10, true);


}


function update() {
}
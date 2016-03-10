(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// var Game_Over = {

//     preload : function() {
//         // Load the needed image for this game screen.
//         // game.load.image('gameover', './assets/images/gameover.png');
//     },

//     create : function() {

//         // Create button to start game like in Menu.
//         this.add.button(0, 0, 'gameover', this.startGame, this);

//         // Add text with information about the score from last game.
//         game.add.text(235, 350, "LAST SCORE", { font: "bold 16px sans-serif", fill: "#46c0f9", align: "center"});
//         game.add.text(350, 348, score.toString(), { font: "bold 20px sans-serif", fill: "#fff", align: "center" });

//     },

//     startGame: function () {

//         // Change the state back to Game.
//         this.state.start('Game');

//     }

// };
},{}]},{},[1]);

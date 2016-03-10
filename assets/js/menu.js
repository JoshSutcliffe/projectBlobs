var Menu = {

  preload : function() {
    game.load.image('menu', './assets/images/diggonaut-start.png');
  },
  
  create: function () {
    this.add.sprite(0, 0, 'menu');
  }

};


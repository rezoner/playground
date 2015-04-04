var app = new PLAYGROUND.Application({

  paths: {
    base: "../assets/"
  },

  scale: 2,

  smoothing: false,

  create: function() {

    this.loadFoo(1);
    this.loadAtlas("planet");
    this.loadImages("stars", "starsBackground", "sun");
    this.loadData("animations");
    this.loadSound("playground2", "slideOut");

  },

  render: function() {

  },

  ready: function() {

    this.setState(ENGINE.Game);

  }

});

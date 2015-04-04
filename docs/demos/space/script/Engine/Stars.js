ENGINE.Stars = function(parent, args) {

  Utils.extend(this, {
    xSpeed: 100,
    ySpeed: 0,
    color: false
  }, args);

  this.parent = parent;

  this.count = app.width / 12 | 0;

  this.populate();

  this.image = app.images.stars;


};

ENGINE.Stars.prototype = {

  images: {},

  starsSprites: [
    [10, 0, 6, 6],
    [0, 0, 5, 5],
    [17, 0, 7, 7],
    [30, 4, 16, 3],
    [29, 12, 19, 2]
  ],

  populate: function() {
    this.stars = [];
    for (var i = 0; i < this.count; i++) {
      this.spawnStar();
    }
  },

  spawnStar: function() {
    var scale = 0.5 + Math.random() * 4;
    var star = [
      Math.random() * app.width | 0,
      Math.random() * app.height | 0,
      Math.random() * this.starsSprites.length | 0, scale
    ];
    star.random = Math.random();
    star.random2 = Math.random();
    this.stars.push(star);

  },

  render: function(delta) {

    if (delta > 1) return;

    for (var i = 0; i < this.stars.length; i++) {
      var star = this.stars[i];

      var x = star[0];
      var y = star[1] + this.parent.sinmod(10) * 200 * star.random;

      var sprite = this.starsSprites[star[2]];

      star[0] = star[0] > app.width ? -sprite[2] : star[0] + this.xSpeed * star[3] * delta;
      star[1] = star[1] > app.height ? -sprite[3] : star[1] + this.ySpeed * star[3] * delta;

      app.layer.a(this.parent.sinmod(2 + star.random2 * 2, 1, star.random));
      app.layer.drawImage(this.image, sprite[0], sprite[1], sprite[2], sprite[3], x, y, sprite[2], sprite[3]);
      app.layer.ra();

    }
  }

};
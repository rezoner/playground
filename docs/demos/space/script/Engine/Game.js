ENGINE = {};

ENGINE.Game = {

  enter: function() {

    this.stars = new ENGINE.Stars(this);

    var music = app.music.play("playground2", true);

    app.music.fadeIn(music);

    app.sound.play("slideOut");

    this.sun = new ENGINE.Animation({
      x: 0,
      y: 0,
      scale: 2
    });

    this.sun.set("sun");

    this.createScanlines();

  },

  render: function(delta) {

    this.app.layer.clear("#002");

    this.app.layer.imageFill(this.app.images.starsBackground, app.width, app.height);

    this.stars.render(delta);

    this.sun.step(delta);
    this.sun.render(delta);

    var atlas = this.app.atlases.planet;
    var current = (this.app.lifetime % 2 / 2) * atlas.frames.length | 0;

    this.app.layer.stars(app.center.x, app.center.y, 0.5, 0.5, 1.5, 1);
    this.app.layer.drawAtlasFrame(atlas, current, 0, 0);
    this.app.layer.restore();

    this.app.layer.save();
    this.app.layer.globalCompositeOperation("color-burn").a(0.5);
    this.app.layer.clear("#008");
    //this.app.layer.drawImage(this.scanlines, 0, 0)
    this.app.layer.globalCompositeOperation("color").a(0.4 * this.sinmod(4));
    this.app.layer.clear("#00f");
    this.app.layer.restore();
  },

  sinmod: function(period, max, offset) {
    offset = offset || 0;

    if (!max) max = 1;
    return Math.sin((max * Math.PI) * ((offset + this.app.lifetime) % period / period));
  },

  createScanlines: function() {

    this.scanlines = cq(this.app.width, this.app.height);
    this.scanlines.globalAlpha(0);
    this.scanlines.fillStyle("#224");

    for (var i = 0; i < this.scanlines.canvas.height; i += 4) {
      this.scanlines.fillRect(0, i, this.scanlines.canvas.width, 2);
    }

    this.scanlines.globalAlpha(0.3);
    this.scanlines.fillStyle("#048");

    for (var i = 1; i < this.scanlines.canvas.height; i += 4) {
      this.scanlines.fillRect(0, i, this.scanlines.canvas.width, 2);
    }

    this.scanlines = this.scanlines.cache();

  }

};
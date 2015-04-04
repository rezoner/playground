ENGINE.Animation = function(args) {

  Utils.extend(this, {
    rotation: 0,
    scale: 1,
    scaleX: 1,
    scaleY: 1,
    attachedTo: false,
    alpha: 1,
    frameSkip: 0,
    loop: 0,
    offsetX: 0,
    offsetY: 0
  }, args);

  this.delta = 0;

};

ENGINE.Animation.prototype = {

  zIndex: 5,

  constructor: ENGINE.Animation,

  clone: function(args) {
    var animation = new ENGINE.Animation(this);

    animation.set(this.key, Utils.extend({
      duration: this.duration
    }, args));

    return animation;
  },

  set: function(key, more) {

    var args = app.data.animations[key];

    this.key = key;

    console.log("ANIAMTON IS", args)

    Utils.extend(this, {
      delta: 0,
      finished: false,
      alignX: 0.5,
      alignY: 0.5
    }, args, more);


    this.image = app.images[args.image];

    if (this.color) {
      this.image = app.getImage(this.image, this.color);
    }

    this.framesX = this.image.width / this.width | 0;
    this.region = [0, 0, this.width, this.height];

    this.absAlignX = this.width * this.alignX | 0;
    this.absAlignY = this.height * this.alignY | 0;

  },

  stop: function() {
    this.next = false;
    this.loop = false;
    this.delta = this.duration - 0.05;
  },


  step: function(delta) {

    this.delta += delta;

    if (this.loop === false) {
      this.finished = this.delta >= this.duration;
      this.frame = Math.min(this.frames - 1, this.delta / this.duration * this.frames | 0);

      if (this.finished) {
        if (this.next) {
          this.set(this.next.key, this.next);
          this.next = false;
        } else if (this.end) {
          this.set(this.end.key, this.end);
          this.end = false;
        } else {
          this.collection.remove(this);
        }
      }

    } else {
      this.frame = this.delta % this.duration / this.duration * this.frames | 0;
    }

    if (this.frameSkip) this.frame = (this.frame / this.frameSkip | 0) * this.frameSkip;


    this.region[0] = (this.frame % this.framesX) * this.width;
    this.region[1] = (this.frame / this.framesX | 0) * this.height;

    if (this.attachedTo) {
      this.x = this.attachedTo.x + this.offsetX;
      this.y = this.attachedTo.y + this.offsetY;
    }
  },

  render: function(delta) {

    app.layer.save();
    app.layer.translate(this.x | 0, this.y | 0);
    if (this.alpha < 1) app.layer.a(this.alpha);
    if (this.rotation) app.layer.rotate(this.rotation);
    if (this.blending) app.layer.globalCompositeOperation(this.blending);
    // app.layer.globalCompositeOperation("color-dodge").a(1.0);


    if (this.scaleX !== 1 || this.scaleY !== 1) {
      app.layer.scale(this.scaleX, this.scaleY);
    } else
    if (this.scale !== 1) app.layer.scale(this.scale, this.scale);



    app.layer.drawRegion(this.image, this.region, -this.absAlignX | 0, -this.absAlignY | 0);
    app.layer.restore();

  },

  dropShadow: function() {

    var clone = this.clone({
      color: "#000",
      zIndex: this.zIndex - 1,
      y: this.y + 32,
      alpha: 0.25
    });

    clone.delta = this.delta;

    this.collection.add(clone);

  }


};
{

}

# Easing

Easing is an easy way to add some dynamics to otherwise linear animation.

In the example below the value over time is going from **0** to **1** but in a bouncy way.

silent
```javascript
app = playground({
  
  width: 320,
  height: 240,
  

  container: exampleContainer,

  create: function() {

    this.loadImage("oscheart");
  },

  ready: function() {

    this.reset();

  },

  reset: function() {
    
    this.easingDelta = 0;

    this.foo = 0;
    this.points = [ ];

  },

  step: function(delta) {


  },

  render: function(delta) {

    if(!this.loader.ready) return;

    this.layer.a(0.2).clear("#022").a(1.0);

    this.easingDelta += delta;

    var progress = Math.min(1, this.easingDelta / 2);

    if(progress >= 1) {
      this.reset();
      progress = 0;
    }

    var value = this.ease(progress, "outBounce");

    this.points.push([progress, value]);

    this.layer.beginPath().a(0.5);

    for(var i = 1; i < this.points.length; i++) {
      var point = this.points[i];
      var prev = this.points[i - 1];

      var y0 = this.height / 2 - (prev[1] * this.height) * 0.5;
      var y = this.height / 2 - (point[1] * this.height) * 0.5;

      this.layer.strokeStyle(point[1] > 0 ? "#0fa" : "#c05")
      this.layer.strokeLine(
        prev[0] * this.width, y0,
        point[0] * this.width, y
      );
    }

    this.layer.stroke().a(1.0);
    
    this.layer.fillStyle("#0fa").font("20px Arial");

    var teasing = ease.translateEasing("outBounce");

    var a = 0;


    /*
    var speed = (1 / this.tween.benchmark).toFixed() + " ops/sec";
    
    this.layer.font("16px arial").fillStyle("#fff").textWithBackground(speed, this.center.x, 16, "#000", 2);
    */
    var scale = 0.15 + 0.4 * value;
    this.layer.stars(this.center.x, this.center.y, 0.5, 0.5, 0, scale).a(0.1);
    this.layer.drawImage(this.images.oscheart, 0, 0);

    this.layer.restore();

  }

});

exampleContainer.style.height = "300px";
```

What's going on there?

```javascript
var mod = this.ease(time, "outBounce");
  
hearth.scale = hearth.maxScale * mod;
```

Playground implements all [basic easing equations](http://easings.net/) as well as its own human readable notation.

The time variable is really a progress from **0** to **1**
So it most often will be `time / duration`

```javascript
var value = this.ease(progress, easing);
```

# Thomas

Click mouse to restart animation.

run
```javascript
app = playground({

  create: function() {

    this.delta = 0;
    this.duration = 1;    

  },

  step: function(dt) {

    this.delta = Math.min(this.duration, this.delta + dt);

  },

  render: function(dt) {

    this.layer.clear("#222");

    var mod = this.ease(this.delta / this.duration, "outBounce");

    this.layer.save();

    this.layer.fillStyle("#e2543e");

    this.layer.translate(this.center.x, this.center.y);
    this.layer.scale(1 - mod * 0.5, 1 + mod);
    this.layer.fillRect(-50, -50, 100, 100);

    this.layer.restore();
    
  },

  mousedown: function() {
    
    this.delta = 0;

  },

  container: exampleContainer

});
```

[Read more](<?=cms::url('playground-ease')?>) about easing in playground.

[Watch a video](https://www.youtube.com/watch?v=Fy0aCDmgnxg) by Grapfrukt about why the easing is SO important.

[Watch a video](https://vimeo.com/93206523) about 12 princples of animation.

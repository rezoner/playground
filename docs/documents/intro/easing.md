{

}

# Easing

We use easing to define dynamics of a value change. It's a cheap simulation of physics and essential of any good looking animation. You might want to watch [this video by Grapefrukt](https://www.youtube.com/watch?v=Fy0aCDmgnxg) and [12 princples of animation](https://vimeo.com/93206523).

Playground implements all [basic easing equations](http://easings.net/) as well as its own human readable notation.

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

    var scale = this.ease(this.delta / this.duration, "outBounce");

    this.layer.save();

    this.layer.fillStyle("#e2543e");

    this.layer.translate(this.center.x, this.center.y);
    this.layer.scale(1.0 - scale * 0.5, 1 + scale);
    this.layer.fillRect(-50, -50, 100, 100);

    this.layer.restore();
    
  },

  mousedown: function() {
    
    this.delta = 0;

  },

  container: exampleContainer

});
```

[Read more](<?=cms::url('playground-ease')?>) about easings in playground.
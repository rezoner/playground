{

}

# Tween

A tween is an animation of a value from A to B using given easing equation.

There is a simple tweening engine in playground.

# Thomas

Click mouse to restart animation.

run
```javascript
app = playground({

  resetThomas: function() {

    this.thomas = {
      x: this.center.x,
      y: this.center.y,
      width: 64,
      height: 64
    };

  },

  mousedown: function() {
    
    this.resetThomas();
    
    this.tween(this.thomas).to({
      width: 32,
      height: 128
    }, 1.5, "outBounce");

  },

  create: function() {

   this.resetThomas();

  },

  render: function(dt) {
    
    var thomas = this.thomas;

    this.layer.clear("#222");

    this.layer.fillStyle("#e2543e");
    this.layer.align(0.5, 0.5);
    this.layer.fillRect(thomas.x, thomas.y, thomas.width, thomas.height);
    this.layer.restore();

  },

  container: exampleContainer

});
```

[Read more](<?=cms::url('playground-tween')?>) about tweening in playground.
{

}

# Playground

It creates a friendly box with canvas, mouse, keyboard, game loop, images loader and other basic game elements.

## Example

Mash keyboard, click here and there.

[run]
playground({

  preventKeyboardDefault: true,

  container: exampleContainer,

  width: 800,
  height: 320,

  create: function() {
    this.message = "Hello world!";
  },

  mousedown: function(e) {
    this.message = e.button + " button at " + e.x + ", " + e.y;
  },

  keydown: function(e) {
    this.message = e.key + " key has beeen pressed";
  },

  render: function() {
    
    this.layer
      .clear("#006")
      .fillStyle("#fff")
      .font("32px Arial")
      .fillText(this.message, 16, 64);    

  }

});
[/run]

## Reference

```javascript
playground({

  /* properties */
  
  container: HTMLElement,

  width: Number,
  height: Number,

  scaleToFit: false,
  roundScale: false,
  smoothing: true,

  preventContextMenu: false,
  preventKeyboardDefault: false,

  /* flow */

  create: function() { },
  ready: function() { },

  /* assets */

  loadImages: function() { },
  loadSounds: function() { },
  playSound: function(key, loop) { },
  stopSound: function(key | sound) { },

  /* loops */

  render: function(delta) { },
  step: function(delta) { },

  /* mouse */

  mousedown: function(data) { },
  mouseup: function(data) { },
  mousemove: function(data) { },

  /* touch */

  touchstart: function(data) { },
  touchend: function(data) { },
  touchmove: function(data) { },

  /* keyboard */

  keydown: function(data) { },
  keyup: function(data) { },

  resize: function() { }


});
```
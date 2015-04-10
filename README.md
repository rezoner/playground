# playground

Out-of-box access to essentials like mouse, keyboard, sound and well designed architecture that you can expand to your needs.

## Core feature

Playground lets you establish a new application and bind essential events in one shot.

```javascript
var app = playground({

  width: 640,           /* force width */
  height: 480,          /* force height */
  scale: 2,             /* force scale */
  smoothing: false,     /* antialiasing */

  /* silently preload assets before main loader */

  preload: function() { },

  /* assets from preloader available, push some more for main loader */

  create: function() { },

  /* called when main loader has finished  - you want to setState here */

  ready: function() { },

  /* called after container/window has been resized */

  resize: function() { },

  /* called each frame to update logic */

  step: function(dt) { },

  /* called each frame to update rendering */

  render: function(dt) { },

  /* states related events (called only for application */

  createstate: function() { },
  enterstate: function() { },
  leavestate: function() { },

  /* keyboard events */

  keydown: function(data) { },
  keyup: function(data) { },

  /* mouse trap */
  
  mousedown: function(data) { },
  mouseup: function(data) { },
  mousemove: function(data) { },

  /* finger trap - ouch */

  touchstart: function(data) { },
  touchend: function(data) { },
  touchmove: function(data) { },

  /* gamepad events */

  gamepaddown: function(data) { },
  gamepadup: function(data) { },
  gamepadmove: function(data) { }

});
```

## Loaders

```javascript
create: function() {
  this.loadData("maps", "units");
  this.loadImages("soldier", "tank", "base");
  this.loadSounds("fire", "medikit", "music");
}
```

## States

```javascript
ready: function() {
  this.setState(Game);
}
```

Read more in [documentation](http://playgroundjs.com).
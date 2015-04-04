{

}

# Playground - Video recorder

<div class="experimental">This feature is experimental</div>

PRESS F8 TO START/STOP RECORDING

run
```javascript
playground({

  container: exampleContainer, // just a div below this code

  width: 640,
  height: 480,

  render: function() {
    
    this.layer.clear("#006");

    this.layer      
      .fillStyle("#f08")
      .fillCircle(this.mouse.x, this.mouse.y, 32);
  },

  keydown: function(event) {

    if(event.key === "f8") this.record({

    });

  }

});
```

# Touch

```javascript
playground({
  
  touchmove: function(event) {

  },

  touchstart: function(event) {

    event.x         /* touchX */
    event.y         /* touchY */
    event.original  /* original DOM event */

  },

  touchend: function(event) {

  }

});
```

Touch coordinates are always relative to the canvas element (layer) + offset if your application uses scaling.

# Touch object

You also have access to *this.touch* which holds current touch status.

```
this.touch.x
this.touch.y
this.touch.pressed
```

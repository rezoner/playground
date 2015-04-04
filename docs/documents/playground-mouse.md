{

}

# Mouse and touch

```javascript
playground({
  
  mousemove: function(event) {

    event.x         /* mouseX */
    event.y         /* mouseY */
    event.original  /* original DOM event */

  },

  mousedown: function(event) {

    event.x         /* mouseX */
    event.y         /* mouseY */
    event.button    /* button "left", "right", "middle" */
    event.original  /* original DOM event */

  },

  mouseup: function(event) {

    event.x         /* mouseX */
    event.y         /* mouseY */
    event.button    /* button "left", "right", "middle" */
    event.original  /* original DOM event */

  },

  mousewheel: function(event) {

    event.x         /* mouseX */
    event.y         /* mouseY */
    event.delta     /* -1 or 1 */
    event.original  /* original DOM event */

  }

});
```

You also have access to *this.mouse* which holds current mouse status.

```
this.mouse.x
this.mouse.y
this.mouse.left
this.mouse.middle
this.mouse.right
```

# Touch

```javascript
playground({
  
  touchmove: function(event) {

    event.x           /* touchX */
    event.y           /* touchY */
    event.identifier  /* touch identifier */
    event.original    /* original DOM event */

  },

  touchstart: function(event) {

    event.x           /* touchX */
    event.y           /* touchY */
    event.identifier  /* touch identifier */
    event.original    /* original DOM event */

  },

  touchend: function(event) {

    event.x           /* touchX */
    event.y           /* touchY */
    event.identifier  /* touch identifier */
    event.original    /* original DOM event */

  }

});
```

You also have access to *this.touch* which holds current touch status.

```
this.touch.x
this.touch.y
this.touch.pressed
this.touch.touches
```

# Mouse to touch

This sets mouse to emit `touch events` instead of `mouse events` with `touch.identitfier = 0;` The pressed button information stays intact. Pretty helpful if you are targeting mobiles and desktops.

```javascript
playground({

  mouseToTouch: true

}
```

# Multi Touch example

You need to run it on a mobile device.

run
```javascript
var app = playground({

  render: function() {

    this.layer.clear("#024");

    for(var id in this.touch.touches) {

      var touch = this.touch.touches[id];

      this.layer.fillStyle("#fff").fillCircle(touch.x, touch.y, 48);

    }

  },

  container: exampleContainer

});
```

<script>
exampleContainer.style.width = 800 + "px";
exampleContainer.style.height = 400 + "px";
</script>

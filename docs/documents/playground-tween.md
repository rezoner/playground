{


}

# Playground - Tween

Playground has a simple tween engine that will let you animate objects or variables. To get a list of applicable easings check [easing](<?=cms::url("playground-ease")?>) documentation.

Below is a little example pretending to be Blizzard's [Hearthstone](http://eu.battle.net/hearthstone/).

run
```javascript
 app = playground({ 

  create: function() {

    /* load images */

    this.loadImages("hearthstoneBoard", "hearthstoneCard");

    /* card position */

    this.card = { 
      x: 0, 
      y: 0, 
      scale: 1.0,
      rotation: 0
    };

    /* card tween */

    this.tween(this.card)
      
      /* card animation */

      .to({ rotation: -0.3 }, 0.5, "01")
      .to({ x: 400, y: 240, rotation: 0, scale: 1.0 }).wait(1.5)
      .to({ x: 400, y: 300, scale: 0.5 }, 0.5, "outBounce").wait(2)
      .to({ x: 400, y: 540, scale: 0.6 }, 1).wait(1)

      /* make it go forever */

      .loop();

  },

  render: function(delta) {

    this.layer.drawImage(this.images.hearthstoneBoard, 0, 0);

    this.layer
      .save()
      .translate(this.card.x, this.card.y)
      .align(0.5, 0.5)
      .rotate(this.card.rotation)
      .scale(this.card.scale, this.card.scale)
      .drawImage(this.images.hearthstoneCard, 0, 0)
      .restore();

  },

  width: 800,
  height: 562,
  scale: 1,

  container: exampleContainer

});

exampleContainer.style.height = "562px";

```

## Methods

```javascript
  /* add new tween - context is the object that will be animated */

  this.tween(context)

  /* add properties to animate */

  .to(properties, duration, easing)

  /* delay animation for x seconds */

  .wait(seconds)
  .delay(seconds)

  /* tell tween to loop at the end */

  .loop()

  /* skip to the end of current action */

  .forward()

  /* replay current action */

  .rewind()

  /* skip to the end of a whole tween */

  .end()

  /* stop tweening */

  .stop()

  /* resume tweening */

  .play()


```

## Color

Yes. Playground can also tween colors. Whatever proper form of [color](<?=cms::url("color");?>) is supported.

run
```javascript
app = playground({ 

  background: "#002",

  create: function() {

    this.tween(this)
      .to({ background: "#af0" })
      .to({ background: "#002" })
      .to({ background: "#c08" })
      .loop();

  },

  render: function() {

    this.layer.clear(this.background);

  },

  container: exampleContainer

});

```

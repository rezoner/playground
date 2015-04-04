{

}

# Playground - Assets

Assets should be loaded at *create* time

run
```javascript
var app = playground({

  container: exampleContainer,

  create: function() {

    this.loadImages("planet", "earth", "ship");

  },

  ready: function() {

    /* called when all assets gets loaded */

    this.layer.clear("#000");

    this.layer.drawImage(this.images.ship, 0, 0);
  },

  mousedown: function() {

    this.playSound("click");
  }

});
```

<script>
exampleContainer.style.height = "200px";
</script>

## Images

```javascript
this.loadImages("ship");
```

Will look for *images/ship.png* and will store the image as *this.images["ship"]*

```javascript
this.loadImages("units/tank");
```

Will look for *images/units/tank.png* and will store the image as *this.images["units/tank"]*

## Sounds

```javascript
this.loadSounds("click");
```

Will look for *sounds/click.ogg* or *sounds/click.mp3* and will store the sound as *this.sounds["click"]*

Sounds are stored as *Audio* objects

To play sound you can use 

```javascript
this.playSound("click");
```

## Playing a loop (music)

```javascript
var song = this.playSound("music", true)

/* if you decide to stop it */

this.stopSound(song);
```
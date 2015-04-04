{

}

# Playground - Recording video

Record short *webm* clips for quick promotion on sites like [/r/indiegaming](http://reddit.com/r/indiegaming) or posting progress on twitter.

Put your video on [gfycat](http://gfycat.com) to get extra compression and GIF output.

```javascript
/* this command starts and stop recording when called again*/

this.record();
```

<p class="experimental">This feature works in chrome only</p>
<p class="experimental">For longer clips use external software</p>

<p></p>

## PRESS F8 TO START/STOP RECORDING

run
```javascript
playground({

  container: exampleContainer,

  create: function() {

    this.loadAtlases("planet");

  },

  render: function() {

    var atlas = this.atlases.planet;
    var current = (this.lifetime % 2 / 2) * atlas.frames.length | 0;

    this.layer
      .clear()
      .align(0.5, 0.5)
      .drawAtlasFrame(atlas, current, this.center.x, this.center.y); 

  },

  keydown: function(event) {

    if(event.key === "f8") this.record({

    });

  }

});

  exampleContainer.style.width = "640px";
  exampleContainer.style.height = "480px";
```

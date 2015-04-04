{

}

# Playground - Atlases

Playground supports loading `texture atlas` format (JSON Array) used by software like Flash or [TexturePacker](https://www.codeandweb.com/texturepacker)

<iframe src="https://player.vimeo.com/video/44440528" width="800" height="450" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>


```javascript
this.loadAtlases("hero", "explosion", "...");
```

This will look for an image and atlas definition:

* atlases/hero.png
* atlases/hero.json

## Access

```javascript
this.atlases.hero.image
this.atlases.hero.frames

/* then for each frame */

var frame = this.atlases.hero.frames[0];

frame.region  /* source region [x, y, w, h] */
frame.offset  /* trim position [x, y] */
frame.width   /* original width of a frame */
frame.height  /* original height of a frame */
```

## Example

If you are using default renderer (layer) - you can utilize `layer.drawAtlasFrame(atlas, frame, x, y)` to draw a certain frame from an atlas.

run
```javascript
var app = playground({

  create: function() {

    this.loadAtlases("planet");

  },

  render: function() {

    var atlas = this.atlases.planet;
    var current = (this.lifetime % 2 / 2) * atlas.frames.length | 0;

    this.layer
      .clear() 
      .drawAtlasFrame(atlas, current, 0, 0); 

  },

  container: exampleContainer

});
```

<script>
exampleContainer.style.height = "200px";
</script>

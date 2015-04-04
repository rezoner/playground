{

}

# Playground - Scaling

With no arguments provided. Playground  *width* and *height* will be set and updated according to the *window*.

```javascript
playground({ 

});
```

## Custom

With width and height provided playground size will be fixed to provided dimensions.

[run]
playground({ 
  width: 160,
  height: 100,

  render: function() {
    this.layer.clear("#04a");
  },

  container: exampleContainer

});
[/run]

## scaleToFit

With *scaleToFit* marked as *true* playground will adapt itself to the provided *container* or *window*.

It will also properly offset and scale mouse/touch position.

[run]
playground({ 
  width: 160,
  height: 100,
  scaleToFit: true,

  render: function() {
    this.layer.clear("#04a");
  },

  container: exampleContainer
});
[/run]

<script>
  exampleContainer.style.width = 800 + "px";
  exampleContainer.style.height = 200 + "px";
</script>

## smoothing, antialiasing, resampling

Is something you probably do not want in a pixelart game when scaling an image.

```
smoothing: true
```

silent
```javascript
/* smoothing false */

playground({ 
  smoothing: true,
  width: 128,
  height: 128,
  
  create: function() {
    this.loadImages("axe");        
  },

  ready: function() {
  cq.smoothing = true;
  this.layer.update();
  this.layer
      .save()
      .scale(4, 4)
      .drawImage(this.images.axe, 0, 0)
      .restore();
      },

  container: exampleContainer
});
```

```
smoothing: false
```

silent
```javascript
/* smoothing false */

playground({ 
  smoothing: false,
  width: 128,
  height: 128,
  
  create: function() {
    this.loadImages("axe");        
  },

  ready: function() {
  this.layer
      .save()
      .scale(4, 4)
      .drawImage(this.images.axe, 0, 0)
      .restore();
      },

  container: exampleContainer
});
```


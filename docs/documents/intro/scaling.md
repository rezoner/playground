{

}

# Size and scaling

Playground application takes three variables to describe window dimensions.

`width`, `height` and `scale`.

The short story is that you can provide all - just one - or none - and playground will figure out the rest.

## All the cases

Container dimensions are 800x300.

<script>
var TEMP = {};

TEMP.loadImage = function() {

  this.loadImage("axe");
};

TEMP.renderImage = function() {

  this.layer.clear("#007");
  this.layer.imageFill(this.images['axe'], this.width, this.height);

};


TEMP.showDimensions = function() {
  this.container.style.background = "#000";
  this.layer.clear("#026");

  this.layer.fillStyle("#fff").font("16px Arial");
  this.layer.textAlign("center");
  
  this.layer.stars(16, this.center.y, 0.5, 0.5, Math.PI/2, 1.0)
  this.layer.fillText(this.height +" px", 0, 0);
  this.layer.restore();

  this.layer.stars(this.center.x, this.height - 8, 0.5, 0.5, 0, 1.0)
  this.layer.fillText(this.width +" px", 0, 0);
  this.layer.restore();

  this.layer.stars(this.center.x, this.center.y, 0.5, 0.5, 0, 1.0)
  this.layer.fillText("x " + this.scale.toFixed(2), 0, 0);
  this.layer.restore();
}
</script>

Generic rule: if scaled viewport is to small it will get centered.

`0) Nothing - fullscreen`

run
```javascript
playground({
  render: TEMP.showDimensions,
  container: exampleContainer
});
```


`1) All dimensions and scale provided`

run
```javascript
playground({
  width: 200,  
  height: 100,  
  scale: 2,
  render: TEMP.showDimensions,
  container: exampleContainer
});
```

`2) One dimension`

run
```javascript
playground({
  width: 640,      
  render: TEMP.showDimensions,
  container: exampleContainer
});
```

`3) Two dimensions no scale`

run
```javascript
playground({
  width: 300,      
  height: 200,      
  render: TEMP.showDimensions,
  container: exampleContainer
});
```

`4) One dimensions and scale`

run
```javascript
playground({
  width: 300,      
  scale: 1,
  render: TEMP.showDimensions,
  container: exampleContainer
});
```

`4) Scale only`

run
```javascript
playground({
  scale: 2,
  render: TEMP.showDimensions,
  container: exampleContainer
});
```


`Pixelated`

run
```javascript
playground({
  smoothing: false,
  scale: 2,
  create: TEMP.loadImage,
  render: TEMP.renderImage,
  container: exampleContainer
});
```


`Interpolated`

run
```javascript
playground({
  scale: 2,
  create: TEMP.loadImage,
  render: TEMP.renderImage,
  container: exampleContainer
});
```

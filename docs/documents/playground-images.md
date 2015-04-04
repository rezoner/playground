{

}

# Playground - Images

Loading images in playground is as simple as

```javascript
this.loadImages("one", "two", "three");
```

It will search for into `images/one.png`, `images/two.png`, `images/three.png`

Then you can use the image like

```javascript
this.layer.drawImage(this.images.one, 0, 0);
```



run
```javascript
var app = playground({

  create: function() {

    this.loadImages("planet", "earth", "ship");

  },

  render: function() {

    this.layer.clear("#000");

    this.layer.drawImage(this.images.ship, 0, 0);
  
  },

  container: exampleContainer

});
```

<script>
exampleContainer.style.height = "200px";
</script>

## Grouping

You can also use folders to group your images.

```javascript
this.loadImages(
  "units/tank", 
  "units/soldier",
  ...
);
```

It will search for images into `images/units/tank.png`, `images/units/soldier.png`, `...`

Then you can use the image like

```javascrtipt
this.images["units/tank"];
this.images["units/soldier"];
...
```

## Default extension

Playground defaults to `.png` but you can override it:

```javascript
this.loadImages("background.jpg");
```

And still use it like:

```javascrtipt
this.images.background;
```

Caveat is that you cannot have `background.png` and `background.jpg` at the same time.
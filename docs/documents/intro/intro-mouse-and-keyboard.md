{

}

## Mouse and keyboard

To load an image simply use `.loadImage` ar `create` stage.

run
```javascript
 app = playground({

  create: function() {

    this.loadImages("ship");

  },

  ready: function() {

    console.log("Hello - everything has been loaded!");

  },

  render: function() {

    this.layer.clear("#004");

    this.layer.drawImage(this.images.ship, this.mouse.x, this.mouse.y);

  },

  container: exampleContainer

});
```

# API

```javascript
this.loadImages("one", "two", "three");
```

It will search for images into `images/one.png`, `images/two.png`, `images/three.png`

Then you can access the images like this:

```javascrtipt
this.images.one;
this.images.two;
this.images.three;
```

[Read more](<?=cms::url('images')?>) about loading images in playground.
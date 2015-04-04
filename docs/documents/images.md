# API

```javascript
this.loadImages("one", "two", "three");
```

It will search for images into `images/one.png`, `images/two.png`, `images/three.png`

Then you can use the image like

```javascrtipt
this.images.one;
this.images.two;
this.images.three;
```

You can also use folders to group your images.

```javascript
this.loadImages("units/tank", "units/soldier", ...);
```

It will search for images into `images/units/tank.png`, `images/units/soldier.png`, `...`

Then you can use the image like

```javascrtipt
this.images["units/tank"];
this.images["units/soldier"];
...
```

You can also explicitly provide the extension:

```javascript
this.loadImages("background.jpg");
```

And still use it like:

```javascrtipt
this.images.background;
```

Caveat is that you cannot have `background.png` and `background.jpg` at the same time.
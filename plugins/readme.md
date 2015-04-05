# Plugins

Naming conventions:

file: `playground.pluginname.js`

code: `PLAYGROUND.PluginName = function() { }`

## Extending application functionality

If you simply want to add a functionality that works the same way as `this.tween` or `this.loadImage` (application wise) just extend its prototype.

```javascript
PLAYGROUND.Application.prototype.getRandomNumber = function(max) {

  return Math.random() * max;

};
```

## Automated plugins

Plugins are constructors that get automatically instantiated at application creation time. Plugins are event driven - in particular they listen to PLAYGROUND.Application events.

*TODO: provide list of events*

## Basic plugin

```javascript
PLAYGROUND.MyPlugin = function(app) {

  this.app = app;

  /* listen to the events of choice */

  app.on("postrender", this.postrender.bind(this));
  app.on("enterstate", this.enterstate.bind(this));
  
};

/* tell playground to automatically call new PLAYGROUND.MyPlugin when application is being created */

PLAYGROUND.MyPlugin.plugin = true;

/* put the functionality in prototype */

PLAYGROUND.MyPlugin.prototype = {

  /* triggered every time application enters certain state */

  enterstate: function(data) {

    data.state.bunny = new MYLIBRARY.Bunny;

  },

  /* triggered after everything has been rendered */  

  postrender: function() {

    this.app.layer.clear("rgba(0, 0, 255, 0.5)");

  }

};
```

## Integrating loaders

Unfortunately every library/renderer has its own objects and loaders that you will need to adapt to playground's workflow (if you care about consistency - that is).

Let's assume there is no `loadImage` method and we want to add one that will be used this way:

```javascript
playground({

  create: function() {
    
    this.loadImage("candy");

  },

  ready: function() {

    console.log(this.images.candy);

  }

});
```

First of all you must obey user's preference of assets path. To do so you can utilize 

```javascript
this.getAssetEntry(key, folder, defaultExtension);
```

That I will explained after the example.

```javascript
PLAYGROUND.Application.prototype.loadImage = function(name) {

  /* ensure there is a container for what we load */

  if(!this.images) this.images = { };

  /* get asset key and url */

  var entry = this.getAssetEntry(name, "images", "png");

  /* tell the loader that we are adding another item to the queue  */

  this.loader.add();

  /* standard image loading */

  var image = new Image;

  image.addEventListener("load", function() {
    
    loader.success();

  });

  image.addEventListener("error", function() {
    
    loader.error("give user some meaningful error");

  });

  image.src = entry.url;

};
```

## getAssetEntry

At first it might look like unnecessary overhead but getAssetPath takes a lot of work from you and introduces consistency in assets naming.

Consider that user can change prefered folder for assets by overriding `this.paths.base`. Also he may want to load a different extension than default:

Consider `soldier.png`, `soldier.jpg` for both the key is `this.images.soldier`

At least user may want to group their assets `units/tank` or `units/tank.png`

Without `getAssetPath` you would have to manage all these cases by yourself.

Let's see some examples:

```javascript
var entry = this.getAssetEntry("candy", "images", "png");
```

Regarding `this.paths.base` the value of entry will be as following:

```javascript
{

  /* the key that you should use to store the asset */

  key: "candy",

  /* by a rule of thumb just use to url to load file */

  url: "images/candy.png",

  /* if it requires more than one file - here is url without extension
     for example texture atlas consists of atlas.png + atlas.json */

  path: "images/candy",

  /* extension dedicted from key vs defaultExtension */

  ext: "png"
}
```

Because in playground user can override it and use folders to group keys.

```javascript
var entry = this.getAssetEntry("candies/red.jpg", "images", "png");
```

```javascript
{
  key: "sweets/red",
  url: "images/sweets/red.jpg",
  path: "images/sweets/red",
  ext: "jpg"
}
```

## TODO

* Define a convention for providing user-desired configs for plugins. For both state and application.

For example (a config in state):

```
ENGINE.Game = {

  MyPluginName: {
    color: "#f00"
  }

};
```

For global Usage:
 
* Way to describe dependancies (no no package managers, just verbal information for end-user)
* Resolve conflicts - for example two renderers make no sense
* Resolve naming conflicts - everyone wants to call his plugin PLAYGROUND.Renderer
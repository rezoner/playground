# Plugins

Plugins are functions called when PLAYGROUND.Aplication is instantiated.

## Basic plugin

```javascript
PLAYGROUND.MyPlugin = function(app) {

  /* and that's it */
  /* you get the newly instantiated application 
     and you can listen to some events */

  app.on("postrender", function() { });
  app.on("enterstate", function() { });

};

/* you have to tell playground that this function is a plugin 
   otherwise it will not get called */

PLAYGROUND.MyPlugin.plugin = true;
```

## In fact plugins are constructors

What playground really does is `new PLAYGROUND.MyPlugin` so you can perform some encapsulation without further noise.

```javascript
PLAYGROUND.MyPlugin = function(app) {

  this.app = app;

  /* listen to the events of choice */

  app.on("postrender", this.postrender.bind(this));
  app.on("enterstate", this.enterstate.bind(this));
  
};

PLAYGROUND.MyPlugin.plugin = true;

PLAYGROUND.MyPlugin.prototype = {

  /* triggered every time application enters certain state */

  enterstate: function(data) {

    data.state.bunny = new MYLIBRARY.Bunny;

    /* let's forget the bunny - maybe you are using THREE.js
       and you want a separate camera for each state? 
       This is where you can automate it */

  },

  /* triggered after everything has been rendered */  

  postrender: function() {

    this.app.layer.clear("rgba(0, 0, 255, 0.5)");

  }

};
```

## Extending Application

If you want to extend the application itself - for example provide a new loader `this.loadMyCoolThing` extend its prototype.

```javascript
PLAYGROUND.Application.prototoype.loadMyCoolThing = function() {

}
```

## Integrating loaders

Integration with playground's loader is very simple.

```javascript
/* tell the loader that something has been added 
   the loader doesn't care what it is */

this.loader.add();

/* tell the loader that your thing has been sucessfully loaded */

this.load.success();

/* tell the loader that your thing has failed */

this.loader.error("provide some meaningful error to the user");
```

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

And here we are adding loadImage method to PLAYGROUND.Application instances:

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

Is a helper for resolving path to asset with regards to what user provided in paths: { } variable.

```javascript
var entry = this.getAssetEntry(path, folder, defaultExtension);
```

Let's see some examples:

```javascript
var entry = this.getAssetEntry("candy", "images", "png");
```

Regarding `this.paths.base` the value of entry will be as following:

```javascript
{

  /* normalized key that you can use to store the asset */

  key: "candy",

  /* by a rule of thumb is to use the url to load a file */

  url: "images/candy.png",

  /* if it requires more than one file - here is url without extension
     for example texture atlas consists of atlas.png + atlas.json */

  path: "images/candy",

  /* extension matched from key - otherwise defaultExtension */

  ext: "png"

}
```

Another example with more complex key provided by user.

```javascript
var entry = this.getAssetEntry("candies/red.jpg", "images", "png");
```

```javascript
{
  key: "candies/red",
  url: "images/candies/red.jpg",
  path: "images/candies/red",
  ext: "jpg"
}
```

## Naming conventions

Let filename reflect the variable you provide

file: `playground.PluginName.js`
code: `PLAYGROUND.PluginName = function() { }`

file: `playground.pluginName.js`
code: `PLAYGROUND.pluginName = function() { }`

## TODO

* Establish a convention for providing user-desired configs for plugins. For both state and application.

For example (a config in state):

```
ENGINE.Game = {

  MyPluginName: {
    color: "#f00"
  }

};
```
 
* Way to describe dependancies (no no package managers, just verbal information for end-user)
* Resolve conflicts - for example two renderers make no sense
* Resolve naming conflicts - everyone wants to call his plugin PLAYGROUND.Renderer
## Naming conventions 


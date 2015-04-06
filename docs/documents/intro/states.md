{

}

# States

Use Q W E to switch states

silent
```javascript
var TEMP = { };

TEMP.renderName = function(state) {
    
  state.app.layer
    .font("64px Arial")
    .textAlign("center")
    .fillStyle("#fff")
    .fillText(state.name, state.app.center.x, state.app.center.y);

};

TEMP.Game = {

  name: "GAME",
  
  render: function(delta) { 
  
    this.app.layer.clear("#084"); 
    TEMP.renderName(this);

  }

};

TEMP.Menu = {

  name: "MENU",
  
  render: function(delta) { 

    this.app.layer.clear("#804"); 
    TEMP.renderName(this);

  }

};

TEMP.Options = {
    
  name: "OPTIONS",

  render: function(delta) { 

    this.app.layer.clear("#c80"); 
    TEMP.renderName(this);

  }

};

app = playground({

  ready: function() {

    this.setState(TEMP.Game);

  },
  
  keydown: function(data) {

    switch(data.key) {
      case "q": this.setState(TEMP.Menu); break;
      case "w": this.setState(TEMP.Game); break;
      case "e": this.setState(TEMP.Options); break;
    }

  },

  container: exampleContainer

});
```

States are easy way to split application in smaller logical divisions like:

`Intro`, `Menu`, `Game`, `Options`, `Credits`, `Loading screen`.

## States in playground

```javascript
var ENGINE = {};
```

```javascript
ENGINE.Game = {
  
  create: function() {

    /* this is called when the state is entered for the very first time */

  },

  step: function(delta) {

  },

  render: function(delta) {

    this.app.layer.clear("#008");

  }

};
```

Yesh. That's it. The interface is pretty much the same as you are already familiar with. 

Use `this.setState` to set the state when application is ready.

```javascript
app = playground({

  create: function() {

    /* load some stuff */

  },

  ready: function() {

    /* when finished loading - enter the game state */

    this.setState(ENGINE.Game);

  }

});
```

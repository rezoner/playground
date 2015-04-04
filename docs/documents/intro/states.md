{

}

# States

The approach of putting everything within `app` is straightforward and ok for quick and dirty experiments.

However this is not how you structure a real game. This approach doesn't scale - which means sooner or later you would run into unmaintainable spaghetti of **ifs** and **switches**.

Thankfully we don't need to quote any definitions because a `state` is best described by counting a few examples:

`Intro`, `Menu`, `Game`, `Options`, `Credits`, `Loading screen`...

## States in playground

First of all - start keeping your stuff in some box - a namespace. I call my `ENGINE`.

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

Use `this.setState` to do what the name says.

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

## Transitions

To encourage you to use this marvelous technique I have recently added  transition effects that will add some visual transition between states.

Try it out using Q W E

run
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
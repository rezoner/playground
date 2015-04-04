{

}

# Playground - States

States are easy way to split application in smaller bits such as `menu`, `game`, `options`.

```javascript
MyState = {

  create: function() {

    /* application enters this state for the first time */

  },

  enter: function() {

    /* application enters this state */

  },

  leave: function() {

    /* application leaves this state */

  },

  /* state can handle events in the same way as application */

  step: function(dt) {

  },

  render: function(dt) {

  },

  mousedown: function() {

  }

};
```

To switch application state use

```javascript
playground({

  ready: function() {

    this.setState(NAMESPACE.MyState);

  }

});
```

To access application from inside the state (without using globals) one can use `this.app` reference.

Also there are two types of state in playground.

## Persistent

```javascript
MyState = { 

  /* properties */

};
```

## Temporary

Such state will get instantiated every time application enters it.

```javascript
MyState = function() {

};

MyState.protoype = {

  /* properties */

};
```
{

}

# Keyboard

Playground translates key codes into human readable strings `a`, `b`, `c`, `f1`, `comma`...

```javascript
playground({

  keydown: function(event) {

    event.key  /* pressed key name */

  },

  keyup: function(event) {

    event.key  /* pressed key name */

  }

});
```

You also have access to *this.keyboard* which can be used to check pressed keys.

```javascript
if (this.keyboard.keys.ctrl) { }
if (this.keyboard.keys.a) { }
```

## Test the keyboard

silent
```javascript
playground({

  preventKeyboardDefault: true,
  
  keydown: function(event) {

    this.key = event.key;
  },

  render: function() {
    
    this.layer.clear("#0af");

    var text = "last pressed key is " + this.key;

    this.layer
      .font("32px 'arial'")
      .fillStyle("#fff")
      .fillText(text, 16, 32);

  },

  container: exampleContainer, // just a div below this code

});

```
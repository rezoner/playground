{

}

# Playground - Gamepads

<div class="experimental">This feature is experimental - it for sure is missing mappings for different gamepads</div>

```javascript
playground({
  
  gamepaddown: function(event) {

    event.button;     /* button as a string */
    event.gamepad;    /* gamepad number */

  },

  gamepadup: function(event) {

  }

})
```

## Button names

For convenience *event.button* is a string

```javascript
["1", "2", "3", "4", "l1", "r1", "l2", "r2", "select", "start", "up", "down", "left", "right"]
```

The left stick and DPAD both triggers "left", "up", "down", "right" buttons

## Gamepads object

You also have access to *this.gamepads* which holds current gamepads status.

```javascript
this.gamepads[0].buttons
this.gamepads[0].sticks
```

## Sticks

If you need to access precise stick data

```javascript
this.gamepads[0].sticks[0] /* is */ {
  x: 0.0,
  y: 0.0
}
```

## Test

run
```javascript
playground({

  container: exampleContainer,

  gamepaddown: function(data) {

    this.button = data.button;
    this.gamepad = data.gamepad;

  },

  render: function() {

    this.layer.clear("#0af");

    var text = 
      "last pressed button is " + this.button + 
      " on gamepad " + this.gamepad;

    this.layer
      .font("24px 'arial'")
      .fillStyle("#fff")
      .fillText(text, 16, 32);

  }

});
```

<script>
exampleContainer.style.height = "96px";
</script>
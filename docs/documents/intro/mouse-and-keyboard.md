{

}

## Mouse and Keyboard

Mash the keyboard, move the mouse.

run
```javascript
 app = playground({

  render: function() {

    this.layer
      .clear("#000")
      .font("32px Arial")      
      .fillStyle("#fff")
      .fillText(this.text, 16, 32);

  },

  keydown: function(data) {
    
    this.text = "key down " + data.key;

  },

  keyup: function(data) {

    this.text = "key up " + data.key;    

  },

  mousemove: function(data) {
    
    this.text = "mouse move " + data.x +  " , " + data.y;    

  },

  mousedown: function(data) {

    this.text = "mouse down " + data.button + " " + data.x +  " , " + data.y;

  },

  mouseup: function(data) {

    this.text = "mouse up " + data.button + " " + data.x +  " , " + data.y;  

  },

  container: exampleContainer

});
```

Read more about [Mouse and Touch](<?=cms::url('playground-mouse')?>)

Read more about [Keyboard](<?=cms::url('playground-keyboard')?>)
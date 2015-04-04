{

}

# Playground - Basics

Playground gives you out of box access to normalized input events such as mouse or keyboard. It also provides `layer` which is `canvas` object wrapped with new functions and chaining ability.

run
```javascript
var app = playground({ 

  step: function(delta) {

  },
  
  render: function() {

    this.layer.clear("#0af");
    this.layer.fillStyle("#fff");
    this.layer.fillRect(this.mouse.x, this.mouse.y, 32, 32);
  
  },

  mousedown: function(event) {

  },

  keydown: function(event) {

  },

  /* container defaults to document.body */

  container: exampleContainer

});
```

<script>
exampleContainer.style.width = 400 + "px";
exampleContainer.style.height = 200 + "px";
</script>

## Layer

`this.layer` is an instance of [CanvasQuery](http://localhost/canvasquery/basics). Apart from [standard canvas properties](http://www.html5canvastutorials.com/) it provides a few more methods that can be useful for gamedevelopers.
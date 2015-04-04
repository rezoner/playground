{

}

## Rendering

A default renderer of playground is built on top of __&lt;Canvas&gt;__ element in a wrapper that gives you some [extra features](http://canvasquery.com) that canvas doesn't have.

run
```javascript
var app = playground({

  render: function() {

    this.layer.clear("#004");
    this.layer.fillStyle("#0fa");
    this.layer.fillRect(this.mouse.x, this.mouse.y, 32, 32);

  },

  /* you don't need to provide the container - it defaults to document.body */

  container: exampleContainer

});
```

Once you run playground it will perpetually call `render` function where you can update your game's graphics.

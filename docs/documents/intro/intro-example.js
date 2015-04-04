{

}

silent
```javascript
var app = playground({
  
  container: exampleContainer,

  smoothing: false,

  mouseSprites: {
    body: [0, 0, 38, 68],
    buttonDown: [55, 35, 10, 17],
    buttonUp: [43, 35, 10, 17]
  },

  keyboardSprites: {
    down: [0, 0, 38, 42],
    up: [41, 0, 38, 42]
  },

  scale: 2,

  keys: ["q", "w", "e", "r"],
  
  create: function() {

    this.loadImage("mouse", "keys");
    this.loadSounds("mouse", "keyboard");

    this.grad = this.layer.createLinearGradient(0, 0, 0, 20);
    this.grad.addColorStop(0, "#000")
    this.grad.addColorStop(1.0, "transparent");

  },

  ready: function() {

    this.sound.alias("mousedown", "mouse", 0.7, 1.8);
    this.sound.alias("mouseup", "mouse", 0.5, 1.5);
    this.sound.alias("keyboard", "keyboard", 0.5, 1.5);

  },

  keydown: function(data) {

    if(["q", "w", "e", "r"].indexOf(data.key) === -1) return;

    this.playSound("keyboard");

  },

  mousedown: function() {
    
    this.playSound("mousedown");

  },

  mouseup: function() {
    
    this.playSound("mouseup");

  },

  render: function() {

    this.layer.clear("#1f201a");

    /* keys */

      app.layer.font("16px Arial").fillStyle("#888").textAlign("center");

    for(var i = 0; i < this.keys.length; i++) {
      var key = this.keys[i];
      var pressed = this.keyboard.keys[key];
      var x = 16  + i * 40;
      var y = this.height - 40

      app.layer.drawRegion(this.images.keys, this.keyboardSprites[pressed ? "down" : "up"], x, y);
      app.layer.fillText(key.toUpperCase(), x + 19, y + (pressed ? 28 : 24));

    }

    /* mouse */

    var offsetX = (this.mouse.x < this.center.x ? -20 : 20) * Math.abs(this.mouse.x - this.center.x) / this.center.x;

    this.layer
      .beginPath()
      .moveTo(this.center.x, 0)
      .bezierCurveTo(this.center.x, 40, this.mouse.x, this.mouse.y-100, this.mouse.x, this.mouse.y - 40)
      .lineWidth(3)
      .strokeStyle("#222")
      .stroke()
      .lineWidth(2)
      .strokeStyle("#888")
      .stroke()

    this.layer.save();
    
    this.layer.translate(this.mouse.x, this.mouse.y);
    this.layer.align(0.5, 0.6);
    this.layer.drawRegion(this.images.mouse, this.mouseSprites.body, 0, 0);
    this.layer.realign();
    this.layer.drawRegion(this.images.mouse, this.mouse.left ? this.mouseSprites.buttonDown : this.mouseSprites.buttonUp, -12, -22);
    this.layer.drawRegion(this.images.mouse, this.mouse.right ? this.mouseSprites.buttonDown : this.mouseSprites.buttonUp, 2, -22);

    this.layer.restore();
    this.layer.fillStyle(this.grad).fillRect(0,0,this.width, this.height)




  }

});

exampleContainer.style.cursor = "none";
```
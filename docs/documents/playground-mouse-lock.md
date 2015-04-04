{

}

# Playground - Mouse lock

Use the mouse Luke. All images come from [Orion by Feiss](http://ludumdare.com/compo/ludum-dare-31/?action=preview&uid=8733)

silent
```javascript
app = playground({

  container: exampleContainer,
  width: 320,
  height: 200,  
  scaleToFit: true,
  smoothing: false,

  create: function() {

    this.shipRotation = 0;
    this.shipX = 0;
    this.shipY = 0;

    this.loadImages("orion-cockpit", "orion-sky");

  },

  step: function() {

  },

  render: function() {

    this.layer.clear("#001");

    /* render skybox */

    this.layer.save();

    var sky = this.images["orion-sky"];

    this.layer.translate(app.center.x, app.center.y);
    this.layer.rotate(this.shipRotation);
    this.layer.translate(this.shipX, -this.shipY);
    this.layer.scale(2,2);

    this.layer.drawImage(sky, -sky.width / 2, -sky.height * 0.6);


    this.layer.restore();

    /* render cockpit */

    this.layer.drawImage(this.images["orion-cockpit"], 0 ,0);

    /* render hud */

    this.layer.save();
    this.layer.a(0.3 + Math.random() * 0.4);
    this.layer.translate(this.center.x, this.center.y + 22);
    this.layer.rotate(this.shipRotation);    
    this.layer.fillStyle("#af0").fillRect(-this.shipX / 30, this.shipY / 30, 4, 4);
    this.layer.fillStyle("#0ff").fillRect(-14, -1, 28, 2);
    this.layer.restore();

  },


  mousedown: function(e) {

    this.mouse.lock();

  },

  mouseup: function(e) {

    this.mouse.unlock();

  },

  mousemove: function(e) {

    if(this.mouse.locked) {
      this.shipRotation += e.movementX / 100;
      
       this.shipX += Math.cos(this.shipRotation - Math.PI / 2) * e.movementY;
       this.shipY += Math.sin(this.shipRotation - Math.PI / 2) * e.movementY;
      // this.shipY -= e.movementY;
    }

  }

});
```

<script>
exampleContainer.style.width = "640px";
exampleContainer.style.height = "400px";
</script>

## Usage 

```javascript
app.mouse.lock();
app.mouse.unlock();
```

When the mouse is locked `mousemove` event will provide changes against x and y axis:

```javascript
{
  mousemove: function(e) {   
      
    e.movementX; /* delta X */
    e.movementY; /* delta Y */

  }
}
```

Mouse lock comes in handy whenever the pointer should stay in place while moving the mouse. A few examples:

* Moving the map in RTS
* Crosshair in a FPS shooter
* Crisis-like ability pick menu



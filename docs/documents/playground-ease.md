{

}

<style>

#content { padding-left: 80px; }

#easing { background: #222; padding: 8px; color: #0fa; font-size: 16px; border-radius: 6px; border: 2px solid #0a8; }

#predefinedEquations { width: 800px; }

#predefinedEquations span {

  background: #043;
  padding: 1px 8px;
  border-radius: 5px;
  color: #afc;
  border: 2px solid #0ca;
  margin: 4px;
  display: inline-block;
  cursor: pointer;

}

</style>

## Human readable easing notation

<script src="<?=cms::url('script/ease.js')?>"></script>

silent
```javascript
app = playground({
  
  width: 320,
  height: 240,
  

  container: exampleContainer,

  create: function() {

    this.paths.images = "<?=cms::url('images/')?>";
    
    this.loadImage("oscheart");

    this.input = document.querySelector("#easing");
    this.input.addEventListener("keyup", this.reset.bind(this));

    if(window.location.hash) {
      this.input.value = window.location.hash.substr(1);
    }

  },

  ready: function() {

    this.reset();

  },

  reset: function() {

    var easing = this.input.value;

    window.location.hash = "#" + easing;
    this.easingDelta = 0;

    this.foo = 0;
    this.points = [ ];

  },

  step: function(delta) {


  },

  render: function(delta) {

    if(!this.loader.ready) return;

    this.layer.a(0.2).clear("#022").a(1.0);

    this.easingDelta += delta;

    var progress = Math.min(1, this.easingDelta / 2);

    if(progress >= 1) {
      this.reset();
      progress = 0;
    }

    var value = this.ease(progress, this.input.value);

    this.points.push([progress, value]);

    this.layer.beginPath().a(0.5);

    for(var i = 1; i < this.points.length; i++) {
      var point = this.points[i];
      var prev = this.points[i - 1];

      var y0 = this.height / 2 - (prev[1] * this.height) * 0.5;
      var y = this.height / 2 - (point[1] * this.height) * 0.5;

      this.layer.strokeStyle(point[1] > 0 ? "#0fa" : "#c05")
      this.layer.strokeLine(
        prev[0] * this.width, y0,
        point[0] * this.width, y
      );
    }

    this.layer.stroke().a(1.0);
    
    this.layer.fillStyle("#0fa").font("20px Arial");

    var teasing = ease.translateEasing(this.input.value);

    var a = 0;

    for(var i in this.input.value) {

      if(this.input.value[i] === "-" ||this.input.value[i] === "+" ) continue;

      var x = a * ((this.width-24) / (teasing.length-1));
      var y =  this.height / 2 - (0.5 * teasing[a] / 1) * (this.height-28) - 4;

      var v = teasing[a];

      this.layer.fillStyle(v >= 0 ? "#0fa" : "#c05");

      this.layer.fillText(this.input.value[i], x, y);

      a++;
    }
    /*
    var speed = (1 / this.tween.benchmark).toFixed() + " ops/sec";
    
    this.layer.font("16px arial").fillStyle("#fff").textWithBackground(speed, this.center.x, 16, "#000", 2);
    */
    var scale = 0.15 + 0.4 * value;
    this.layer.stars(this.center.x, this.center.y, 0.5, 0.5, 0, scale).a(0.1);
    this.layer.drawImage(this.images.oscheart, 0, 0);

    this.layer.restore();

  }

});

exampleContainer.style.height = "300px";

```

<input value="0140" id="easing">

* Use characters from 0 to F (hex)

* Use +/- to switch between signs

* You can still use [predefined equations](http://easings.net/);
 
<div id="predefinedEquations"></div>

<script type="text/javascript">
var container = document.querySelector("#predefinedEquations");

for(var key in ease.cache) {

  var span = document.createElement("span");

  span.innerHTML = key;

  container.appendChild(span);

  span.foo = key;

  span.addEventListener("click", function() {

    document.querySelector("#easing").value = this.foo;
    app.reset();

  });

}

</script>

# API

Also available as a separate [library on github](https://github.com/rezoner/ease)

If you need to perform manual easing rather than use built-in tween engine this is a one liner to cover all your needs:

```javascript
var value = this.ease(progress, easing);
```

*progress* is progress from 0.0 to 1.0

Usually progress will be a ratio of elapsed time to duration.

```javascript
var value = this.ease(elapsed / duration, "inOutBounce");

medusa.height = 16 + value * 32;
```

## Authors

* Concept/code - [Rezoner](https://twitter.com/rezoner)

* Cubic-spline interpolation [Ivan Kuckir](https://twitter.com/ivankuckir)
/ tweaks by [Morgan Herlocker](https://github.com/morganherlocker)

* Simplified easing equations idea by [GreWeb](https://twitter.com/greweb)

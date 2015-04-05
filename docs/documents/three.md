{
  "thumb": "files/thumbs/three-car.png",
  "title": "LOW-RES with Three.js"
}

<script src="script/three.min.js"></script>
<script src="script/playground.raw.js"></script>
<script src="script/playground.Three.js"></script>

# PLAYGROUND.js + THREE.js

First of all I am still working on wrapping variety of Three.JS for Playground workflow.

Currently you can load a Texture and Object (JSON).

```javascript
var app = new PLAYGROUND.Application({

  create: function() {
   
    this.loadTexture("wall");
    this.loadObject("ship");

  },

  ready: function() {

    /* access */

    this.textures.wall
    this.objects.ship

  }

});
```

### 1. Files

Of course we are replacing renderer so we gonna need raw version of Playground.

* Download [three.js](https://github.com/mrdoob/three.js/tree/master/build)
* Download [playground.raw.js](https://github.com/rezoner/playground/blob/master/build/playground.raw.js) `playground without renderer`
* Download [playground.Three.js](https://github.com/rezoner/playground/blob/master/plugins/playground.Three.js) `three loaders`
* I've used [this car](https://clara.io/view/2aafff64-2305-4d66-98ff-ab51cb51a3b9/image) from Clara.io `rename it to car.json and put in objects/ folder`
### 2. Setup

IN MY OPINION. What you want to have is one Three.js renderer for the whole application - and separate camera and scenes for each state.

Have you ever played Interstate 76 by the way?

run
```javascript
/* main.js */

app = new PLAYGROUND.Application({

  pixelate: 4,

  create: function() {

    this.renderer = new THREE.WebGLRenderer({ 
      antialiasing: false
    });

    this.container.appendChild(this.renderer.domElement);
        
    this.container.style.imageRendering = "pixelated";

    this.renderer.setClearColor(0x552200);

    /* load a car object */

    this.loadObject("car");
    this.loadSound("midnight");

  },

  resize: function() {

    this.renderer.setSize(
      this.width / this.pixelate, 
      this.height / this.pixelate
    );
    this.renderer.domElement.style.width = this.width + "px";
    this.renderer.domElement.style.height = this.height + "px";

  },

  ready: function() {

    this.setState(ENGINE.Game);

    var music = this.music.play("midnight", true);
    this.music.fadeIn(music);

  },

  /* you can ignore container part - it defaults to document.body */

  container: exampleContainer

});

/* game.js */

var ENGINE = { };

ENGINE.Game = {

  create: function() {

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, 0, 0.1, 1000);

    this.camera.position.y = 2;

    this.camera.aspect = this.app.width / this.app.height;
    this.camera.updateProjectionMatrix();

    /* insert loaded car to current scene */

    this.car = this.app.objects.car.clone();

    this.scene.add(this.car);
    this.scene.add(new THREE.AmbientLight(0xffcc88));

    /* and a bit of a road */

    var geometry = new THREE.PlaneGeometry(5, 100, 32);
    var material = new THREE.MeshBasicMaterial({ 
      color: 0x885511, side: THREE.DoubleSide 
    });
    var road = new THREE.Mesh(geometry, material);
    road.rotation.x = Math.PI / 2;
    this.scene.add(road);

  },

  step: function(dt) {

    this.camera.position.x = Math.cos(this.app.lifetime) * 3;
    this.camera.position.z = Math.sin(this.app.lifetime) * 3;
    this.camera.lookAt(this.car.position);

  },

  render: function() {
      
    this.app.renderer.render(this.scene, this.camera);

  }

};
```

### 3. TODO

* Current implementation does not respect [application scale](http://localhost/playground/docs/intro/scaling). Not sure if that's an issue for 3d tho.

* Most loaders are missing.
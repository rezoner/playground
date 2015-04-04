{

}

<script src="script/three.min.js"></script>
<script src="script/playground.raw.js"></script>
<script src="script/playground.Three.js"></script>

# PLAYGROUND.js + THREE.js

I am working on wrapping variety of Three.JS loaders to Playground-ish way.

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
* Download [playground.raw.js]() `playground without renderer`
* Download [playground.Three.js]() `three loaders`
* I've used [this car](https://clara.io/view/2aafff64-2305-4d66-98ff-ab51cb51a3b9/image) from Clara.io
### 2. Setup

IN MY OPINION. What you want to have is one Three.js renderer for the whole application - and separate camera and scenes for each state.

run
```javascript
/* main.js */

app = new PLAYGROUND.Application({

  create: function() {

    this.renderer = new THREE.WebGLRenderer({ });

    this.container.appendChild(this.renderer.domElement);

    this.renderer.setClearColor(0x000044);

    /* load a car object */

    this.loadObject("car");

  },

  resize: function() {

    this.renderer.setSize(this.width, this.height);
    this.renderer.domElement.style.width = this.width + "px";
    this.renderer.domElement.style.height = this.height + "px";

  },

  ready: function() {

    this.setState(ENGINE.Game);

  },

  container: exampleContainer

});

/* game.js */

var ENGINE = { };

ENGINE.Game = {

  create: function() {

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, 0, 0.1, 1000);

    this.camera.position.z = 5;
    this.camera.position.y = 2;

    this.camera.aspect = this.app.width / this.app.height;
    this.camera.updateProjectionMatrix();

    /* insert loaded car to current scene */

    this.car = this.app.objects.car.clone();

    this.scene.add(this.car);
    this.scene.add(new THREE.AmbientLight(0xcccccc));

  },

  step: function(dt) {
    this.car.rotation.y += dt;
  },

  render: function() {
      
    this.app.renderer.render(this.scene, this.camera);

  }

};
```
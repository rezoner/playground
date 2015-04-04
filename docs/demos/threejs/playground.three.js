/*
  ThreeJS bootstrap plugin

  Sets up three.js render for an application

  Sets up separate camera and scene for each state

*/
(function() {

  /* texture loader */

  PLAYGROUND.Application.prototype.loadTexture = function(path) {

    if (!this.textures) this.textures = {};

    var resourceName = "texture " + path;

    var app = this;

    var assetPath = this.getAssetEntry(path, "textures", "png");

    if (this.textures[assetPath.key]) return;

    this.loader.add(name);

    var loader = new THREE.TextureLoader();

    loader.load(

      assetPath.url,

      function(texture) {

        app.textures[assetPath.key] = texture;

        app.loader.success(resourceName);

      }
    );

  };

  /* object loader */

  PLAYGROUND.Application.prototype.loadObject = function(path) {

    var app = this;

    if (!this.objects) this.objects = {};

    var loaderID = "object " + path;

    var assetPath = this.getAssetEntry(path, "objects", "json");

    if (this.objects[assetPath.key]) return;

    this.loader.add(name);

    var loader = new THREE.ObjectLoader();

    loader.load(

      assetPath.url,

      function(object) {

        app.objects[assetPath.key] = object;

        app.loader.success(loaderID);

      }
    );

  };

  PLAYGROUND.Three = function(app) {

    console.log("NO CO JEST KURWA")

    this.app = app;

    app.on("create", this.create.bind(this));
    app.on("resize", this.resize.bind(this));
    app.on("createstate", this.createstate.bind(this));

  };

  PLAYGROUND.Three.plugin = true;

  PLAYGROUND.Three.prototype = {

    create: function() {

      this.app.renderer = new THREE.WebGLRenderer({
        antialiasing: true
      });

      document.body.appendChild(this.app.renderer.domElement);

    },

    resize: function() {

      this.app.renderer.setSize(this.app.width / this.app.pixelate, this.app.height / this.app.pixelate);
      this.app.renderer.domElement.style.width = window.innerWidth + "px";
      this.app.renderer.domElement.style.height = window.innerHeight + "px";

      this.updateViewport(this.app.state);

    },

    updateViewport: function(state) {

      state.camera.aspect = this.app.width / this.app.height;
      state.camera.updateProjectionMatrix();

    },


    createstate: function(data) {

      var state = data.state;

      state.scene = new THREE.Scene();

      state.camera = new THREE.PerspectiveCamera(75, 0, 0.1, 1000);

      state.camera.position.z = 5;

      this.updateViewport(state);

    },

    render: function() {

      // app.renderer.render(this.scene, this.camera);

    }

  };

})();
/*
  ThreeJS bootstrap plugin

  Sets up three.js render for an application

  Sets up separate camera and scene for each state

*/
(function() {

  var appProperties = {};

  /* texture loader */

  appProperties.loadTexture = function(path) {

    if (!this.textures) this.textures = {};

    var resourceName = "texture " + path;

    var app = this;

    var assetPath = this.assetPath(path, "textures", "png");

    if (this.textures[assetPath.key]) return;

    this.loader.add(name);

    var loader = new THREE.TextureLoader();

    loader.load(

      assetPath.path,

      function(texture) {

        app.textures[assetPath.key] = texture;

        app.loader.ready(resourceName);

      }
    );

  };

  /* object loader */

  appProperties.loadObject = function(path) {

    var app = this;

    if (!this.objects) this.objects = {};

    var loaderID = "object " + path;

    var assetPath = this.assetPath(path, "objects", "json");

    if (this.objects[assetPath.key]) return;

    this.loader.add(name);

    var loader = new THREE.ObjectLoader();

    loader.load(

      assetPath.path,

      function(object) {

        app.objects[assetPath.key] = object;

        app.loader.ready(loaderID);

      }
    );

  };

  playground.plugins.three = {

    /* called once when application object is instantiated */

    app: function(app, config) {

      playground.extend(app, appProperties);

      /* plugin means simply listening to some events */

      app.on({

        create: function() {

          this.renderer = new THREE.WebGLRenderer({
            antialiasing: true
          });

          document.body.appendChild(app.renderer.domElement);

        },

        resize: function() {

          this.renderer.setSize(this.width / this.pixelate, this.height / this.pixelate);
          this.renderer.domElement.style.width = window.innerWidth + "px";
          this.renderer.domElement.style.height = window.innerHeight + "px";
        }

      });

    },

    /* called once on a state when apllication enters it for the first time */

    state: function(state, config) {

      state._updateViewport = function() {

        this.camera.aspect = this.app.width / this.app.height;
        this.camera.updateProjectionMatrix();

      };

      /* plugin means simply listening to some events */

      state.on({

        create: function() {

          this.scene = new THREE.Scene();

          this.camera = new THREE.PerspectiveCamera(75, 0, 0.1, 1000);

          this.camera.position.z = 5;

          this._updateViewport();

        },

        resize: function() {

          this._updateViewport();

        },

        render: function() {

          // app.renderer.render(this.scene, this.camera);

        }

      });

    }

  };

})();
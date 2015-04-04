  PLAYGROUND.ThreeStarter = function(app) {

    this.app = app;

    app.on("create", this.create.bind(this));
    app.on("resize", this.resize.bind(this));
    app.on("createstate", this.createstate.bind(this));

  };

  PLAYGROUND.ThreeStarter.plugin = true;

  PLAYGROUND.ThreeStarter.prototype = {

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
/*
  ThreeJS bootstrap plugin

  Sets up three.js render for an application

  Sets up separate camera and scene for each state

*/

playground.plugins.three = {

  /* called once when application object is instantiated */

  app: function(app, config) {

    /* plugin means simply listening to some events */

    app.on({

      create: function() {

        this.renderer = new THREE.WebGLRenderer();

        document.body.appendChild(app.renderer.domElement);

      },

      resize: function() {

        this.renderer.setSize(this.width / 2, this.height / 2);

      }

    });

  },

  /* called once on a state when apllication enters it for the first time */

  state: function(state, config) {

    /* plugin means simply listening to some events */

    state.on({

      create: function() {

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, 0, 0.1, 1000);

        this.camera.position.z = 5;

      },

      resize: function() {

        this.camera.aspect = app.width / app.height;
        this.camera.updateProjectionMatrix();

      },

      render: function() {

        app.renderer.render(this.scene, this.camera);

      }

    });

  }

};
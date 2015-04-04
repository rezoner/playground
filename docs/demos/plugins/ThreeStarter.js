PLAYGROUND.Renderer = {

  plugin: true,

  app: {

    create: function(app, data) {

      app.renderer = new THREE.WebGLRenderer({
        antialiasing: true
      });

      app.container.appendChild(app.renderer.domElement);

      app.renderer.setClearColor(0x000044);

    },

    resize: function(app, data) {

      app.renderer.setSize(app.width / 4, app.height / 4);
      app.renderer.domElement.style.width = app.width + "px";
      app.renderer.domElement.style.height = app.height + "px";

    }

  },

  state: {

    updateViewport: function(state) {

      state.camera.aspect = state.app.width / state.app.height;
      state.camera.updateProjectionMatrix();

    },

    create: function(state) {

      state.scene = new THREE.Scene();

      state.camera = new THREE.PerspectiveCamera(75, 0, 0.1, 1000);

      state.camera.position.z = 5;
      
      this.updateViewport(state);

    },

    resize: function(state) {

      this.updateViewport(state);

    },

    render: function(state) {

      state.app.renderer.render(state.scene, state.camera);

    }

  }

};
var app = playground({

  use: {
    "three": {

    }
  },

  create: function() {

    this.renderer = new THREE.WebGLRenderer();

    document.body.appendChild(app.renderer.domElement);

  },

  resize: function() {

    this.renderer.setSize(this.width, this.height);

  },

  ready: function() {

    this.setState(this.game);

  }

});

app.game = {

  create: function() {

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.camera.position.z = 5;

    /* add simple box */

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    
    var material = new THREE.MeshBasicMaterial({
      color: 0x00ff00
    });

    var cube = new THREE.Mesh(geometry, material);
    
    this.scene.add(cube);


  },

  resize: function() {

    this.camera.aspect = app.width / app.height;
    this.camera.updateProjectionMatrix();

  },

  render: function() {

    app.renderer.render(this.scene, this.camera);

  }

};

/*

app.on("resize", function() {

});

playground.components.three = function(app, config) {

  app.on("boot", function() {

    app.scene = new THREE.Scene();

    app.camera = new THREE.PerspectiveCamera(75, app.width / app.height, 0.1, 1000);


  });

  app.on("resize", function() {

    app.renderer.setSize(app.width, app.height);
    app.camera.aspect = app.width / app.height;
    app.camera.updateProjectionMatrix();

  });

};

*/
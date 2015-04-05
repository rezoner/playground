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

var app = playground({

  pixelate: 8,

  paths: {

    base: "../assets/"

  },

  create: function() {

    this.loadObject("pirateShip");

    this.loadSounds("armada");

    this.loadImage("seaHeightMap");

    this.loadTexture("trail");
    this.loadTexture("sea");
    this.loadTexture("seaShadow");
    this.loadTexture("seaBumpMap");
    this.loadTexture("seaDeep");

  },

  ready: function() {

    this.setState(app.game);
    var music = this.music.play("armada", true);
    this.music.fadeIn(music);

  }

});

app.game = {

  createTerrain: function() {
    
    var data = cq(app.images.seaHeightMap).getImageData(0, 0, 256, 256).data;

    var normPixels = []

    for (var i = 0, n = data.length; i < n; i += 4) {
      normPixels.push((data[i] + data[i + 1] + data[i + 2]) / 3);
    }
    var numSegments = 32;

    var geometry = new THREE.PlaneGeometry(100, 100, numSegments, numSegments);

    for (var i = 0, l = geometry.vertices.length; i < l; i++) {
      geometry.vertices[i].z = geometry.vertices[i].z + (normPixels[i] / 255) * 2;
    }

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    var material = new THREE.MeshLambertMaterial({
      color: 0x884400,
      shading: THREE.FlatShading,
      map: app.textures.seaShadow
    });

    var plane = new THREE.Mesh(geometry, material);

    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -6;

    this.scene.add(plane);

    app.renderer.setClearColor(0x00ccff, 1);

  },

  create: function() {


    /* universal light */

    this.scene.add(new THREE.AmbientLight(0x444444));

    /* hemisphere light */

    //this.scene.add(new THREE.HemisphereLight(0xff4400, 0x000088, 0.8));

    // White directional light at half intensity shining from the top.

    var directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(0, 10, -10);
    this.scene.add(directionalLight);

    /* let's make a height map thing */

    this.createTerrain();

    /* ship */

    this.ship = app.objects.pirateShip.clone();

    this.scene.add(this.ship);

    /* sea */

    /* Do I really have to setup interpolation mode for each texture? */

    app.textures.sea.repeat.x = 3;
    app.textures.sea.repeat.y = 3;
    app.textures.sea.wrapS = THREE.RepeatWrapping;
    app.textures.sea.wrapT = THREE.RepeatWrapping;
    app.textures.sea.magFilter = THREE.NearestFilter;
    app.textures.sea.minFilter = THREE.NearestFilter;

    app.textures.seaShadow.repeat.x = 3;
    app.textures.seaShadow.repeat.y = 3;
    app.textures.seaShadow.wrapS = THREE.RepeatWrapping;
    app.textures.seaShadow.wrapT = THREE.RepeatWrapping;
    app.textures.seaShadow.magFilter = THREE.NearestFilter;
    app.textures.seaShadow.minFilter = THREE.NearestFilter;

    app.textures.seaBumpMap.wrapS = THREE.RepeatWrapping;
    app.textures.seaBumpMap.wrapT = THREE.RepeatWrapping;
    app.textures.seaBumpMap.magFilter = THREE.NearestFilter;
    app.textures.seaBumpMap.minFilter = THREE.NearestFilter;

    app.textures.seaDeep.repeat.x = 2;
    app.textures.seaDeep.repeat.y = 2;
    app.textures.seaDeep.wrapS = THREE.RepeatWrapping;
    app.textures.seaDeep.wrapT = THREE.RepeatWrapping;
    app.textures.seaDeep.magFilter = THREE.NearestFilter;
    app.textures.seaDeep.minFilter = THREE.NearestFilter;

    /* sea plane */

    this.sea = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshBasicMaterial({
      map: app.textures.sea,
      opacity: 0.8,
      color: 0xffaa00,
      color: 0x00aa88,
      transparent: true
    }));

    this.sea.rotation.x = -Math.PI / 2;
    this.scene.add(this.sea);

    /* underwater */

    this.seaDeep = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshPhongMaterial({
      map: app.textures.seaDeep,
      opacity: 0,
      transparent: true
    }));

    this.seaDeep.rotation.x = -Math.PI / 2;
    this.seaDeep.position.y = -2;
    this.scene.add(this.seaDeep);

    /* picking objects */

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.camera.position.y = 20;

    this.postProcessing();

  },

  postProcessing: function() {
    
    this.composer = new THREE.EffectComposer(app.renderer);
    this.composer.addPass(new THREE.RenderPass(this.scene, this.camera));

    var effect = new THREE.ShaderPass(THREE.DotScreenShader);
    effect.uniforms['scale'].value = 1;
    effect.uniforms['screenCenter'].value = new THREE.Vector2(app.width / app.pixelate / 2, app.height / app.pixelate / 2);
    effect.renderToScreen = true;
    this.composer.addPass(effect);

    
  },

  step: function(delta) {

    /* logic */

    if (this.actions.forward) {
      this.ship.position.x += Math.sin(this.ship.rotation.y + Math.PI / 2) * delta * 4;
      this.ship.position.z += Math.cos(this.ship.rotation.y + Math.PI / 2) * delta * 4;
    }

    if (this.actions.left) {
      this.ship.rotation.y += delta;
    }


    if (this.actions.right) {
      this.ship.rotation.y -= delta;
    }

    /* camera */

    this.camera.position.x = this.ship.position.x;
    this.camera.position.z = this.ship.position.z - 6;

    this.camera.lookAt(this.ship.position);

    /* move water */

    app.textures.seaDeep.offset.x += 0.01 * delta;
    app.textures.sea.offset.y -= 0.02 * delta;
    app.textures.seaShadow.offset.y -= 0.02 * delta;

    /* bounce water level */

    this.sea.position.y = 0.01 + 0.2 * Math.sin(Math.PI * (app.lifetime % 5 / 5));

    /* pivot ship */

    this.ship.rotation.x = 0.25 * Math.sin(2 * Math.PI * (app.lifetime % 5 / 5));


    /* picking objects */

    this.raycaster.setFromCamera(this.mouse, this.camera);

    var intersects = this.raycaster.intersectObjects(this.scene.children, true);

    for (var i = 0; i < intersects.length; i++) {

      var intersection = intersects[i],
        obj = intersection.object;

      //  obj.material.color.set(0xff0000);
    }

    /* trail */

    /*

    var material = new THREE.SpriteMaterial({
      map: app.textures.trail,
      color: 0xffffff
    });

    var sprite = new THREE.Sprite(material);
    sprite.position = this.ship.position;
    this.scene.add(sprite);
    */

  },

  postrender: function() {

    this.composer.render();

  },

  mousemove: function(data) {

    this.mouse.x = (data.x / app.width) * 2 - 1;
    this.mouse.y = -(data.y / app.height) * 2 + 1;
    this.camera.position.y = Math.max(1, 8 * data.y / app.height);

  },

  controls: {
    "left": ["left", "a"],
    "right": ["right", "d"],
    "forward": ["up", "w"],
    "backward": ["down", "s"]
  },

  actions: {},

  keydown: function(data) {

    for (var action in this.controls) {
      if (this.controls[action].indexOf(data.key) > -1) {
        this.actions[action] = true;
        return;
      }
    }

  },

  keyup: function(data) {

    for (var action in this.controls) {
      if (this.controls[action].indexOf(data.key) > -1) {
        this.actions[action] = false;
        return;
      }
    }

  }


};
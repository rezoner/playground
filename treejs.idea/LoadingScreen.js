 var default_ls = PLAYGROUND.LoadingScreen;

 /** Basic loading screen using Tree.js
 *
 * In playground-three.js build this file will be appended after
 * `src/LoadingScreen.js` and, thus, will override it.
 *
 * There is no way to set a loading screen except to define a variable with
 * same name later in the code.
 *
 * You can use this module as a guide for building your own load screen.
 * Create three objects in `createElements()` and update their apparence
 * in `step()`.
 */
 PLAYGROUND.LoadingScreen = {

 	create: function() {
 		var self = this;
 		self.ready = false;
 		self.createElements();
 		if (!self.thrend) {
 			var err = new Error('This Loading Screen can only be used '+
 				'with ThRend renderer.');
 			throw err;
 		}
 	},

 	enter: function() {
 		this.current = 0;
 	},

 	/** We're ready to switch to user-defined state.
 	 *
 	 * The rest of the road towards 1.0 is a nice animation.
 	 * We set the `lock` so to prevent the change for now.
 	 */
 	leave: function() {
 		this.locked = true;
 		this.animation = this.app.tween(this)
 		.to({
 			current: 1
 		}, 0.5);
 	},

 	/** A logical step.
 	 *
 	 * We're updating the progress based on our app's loader. When that's
 	 * finished we wait for the animation that drives the `current` value
 	 * to 0 to finish and we release the lock.
 	 *
 	 * @param  delta - progress since last time
 	 */
 	step: function(delta) {
 		if (this.locked) {
 			if (this.animation.finished) {
 				this.locked = false;
 				return;
 			}
 		} else {
 			this.current = this.current +
 			  Math.abs(this.app.loader.progress - this.current) * delta;
 		}
 		// update apparence
 		this.progressBar.scale.set(this.current+0.000001, 1.0, 1.0);
 	},

 	/** Create nodejs objects.
 	 *
 	 * We use two rectangles of same size and play with the scale of one
 	 * of them. We also load the logo from build-in loading screen as
 	 * a texture.
 	 */
 	createElements: function() {

 		var scene = this.scene;
 		this.camera.position.z = 200;

 		/*
 		this.logo = new Image;
 		var self = this;
 		this.logo.addEventListener("load", function() {
 			console.log(self.logo.width);
 			console.log(self.logo.height);
 		});
 		this.logo.src = this.prototype.logoRaw;
		*/
		var logo = {width: 218, height: 18};

		// the logo image is loaded as a texture
 		var img = new THREE.MeshBasicMaterial({
 			map: THREE.ImageUtils.loadTexture(
 				this.prototype.logoRaw,
 				undefined,
 				function() {
 					this.ready = true;
 				})
 		});
 		img.map.minFilter = THREE.NearestFilter;

	    // plane that holds the image
	    var plane = new THREE.Mesh(new THREE.PlaneGeometry(
	      logo.width, logo.height), img);
	    plane.overdraw = true;
	    scene.add(plane);

	    // slim bar
		var rectShape = this.centerBar(
		  {x: 0.0, y: -logo.height},
		  {width: logo.width, height: logo.height/4});
		var rectGeom = new THREE.ShapeGeometry(rectShape);
		var slimBar = new THREE.Mesh(
		  rectGeom, new THREE.MeshBasicMaterial({ color: 0xffffff }) ) ;
		scene.add(slimBar);

		// fat bar
		rectShape = this.centerBar(
		  {x: 0.0, y: -logo.height},
		  {width: logo.width, height: logo.height/2});
		rectGeom = new THREE.ShapeGeometry(rectShape);
		this.progressBar = new THREE.Mesh(
		  rectGeom, new THREE.MeshBasicMaterial({ color: 0xffffff }) ) ;
		scene.add(this.progressBar);
		this.progressBar.scale.set(0.000001, 1.0, 1.0);

	    // add subtle ambient lighting
	    var ambientLight = new THREE.AmbientLight(0x555555);
	    scene.add(ambientLight);

	    // add directional light source
	    var directionalLight = new THREE.DirectionalLight(0xffffff);
	    directionalLight.position.set(logo.width, logo.height, 1).normalize();
	    scene.add(directionalLight);
	},

	/** Create a rectangle aligned with axes, with given center and size.
	 *
	 * @param  {center} an object with a `x` and a `y` property;
	 * @param  {size} an object with a `width` and a `height` property;
	 * @return a THREE.Shape
	 */
	centerBar: function(center, size) {
		var rectShape = new THREE.Shape();
		var w2 = size.width / 2;
		var h2 = size.height / 2;
		rectShape.moveTo(center.x - w2, center.y - h2);
		rectShape.lineTo(center.x + w2, center.y - h2);
		rectShape.lineTo(center.x + w2, center.y + h2);
		rectShape.lineTo(center.x - w2, center.y + h2);
		rectShape.lineTo(center.x - w2, center.y - h2);
		return rectShape;
	}
};

PLAYGROUND.LoadingScreen.prototype = default_ls;

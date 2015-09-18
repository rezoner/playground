/** A very basic three.js renderer.
 *
 * There's one renderer per application and
 * one camera and scene for every state.
 *
 * The application object is ehanced with two
 * functions: `loadTexture()` and `loadObject()` that
 * will store their objects in `textures` and `objects`.
 *
 */
PLAYGROUND.ThRend = function(app) {

  this.app = app;

  app.on("create", this.create.bind(this));
  app.on("resize", this.resize.bind(this));
  app.on("createstate", this.createstate.bind(this));
  app.on("render", this.render.bind(this));

};

PLAYGROUND.ThRend.prototype = {

  /** Event handler for `create`.
   *
   */
  create: function() {

    this.app.renderer = new THREE.WebGLRenderer({
      antialiasing: true
    });
    this.app.container.appendChild(this.app.renderer.domElement);
  },

  /** Event handler for `resize`.
   *
   */
  resize: function() {
    var pix = this.app.pixelate ? this.app.pixelate : 1;
    this.app.renderer.setSize(
      this.app.width / pix,
      this.app.height / pix);
    this.updateViewport(this.app.state);

  },

  /** Event handler for `createstate`.
   *
   */
  createstate: function(data) {

    var state = data.state;
    state.thrend = this;
    this.app.thrend = this;
    state.scene = new THREE.Scene();
    state.camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  },

  /** Updates threejs representation based on current size.
   *
   */
  updateViewport: function(state) {
    if (state.camera) {
      state.camera.aspect = this.app.width / this.app.height;
      state.camera.updateProjectionMatrix();
    }
  },

  /** Draw a frame.
   *
   */
  render: function() {
    var state = app.state;
    app.renderer.render(state.scene, state.camera);

    if (this.__get_screenshot && this.__get_screenshot.length > 0) {
      var imgData = app.renderer.domElement.toDataURL();
      this.__get_screenshot.forEach(function (cb) {
        cb(imgData, this);
      });
      this.__get_screenshot = [];
    }
  },

  /** Take a screenshot of the current screen.
   *
   * Example:
   * ```js
   * var state; // a state previously obtained
   * state.thrend.toImage(function(dataURL, thrend) {
   *   var img = new Image;
   *   img.src = dataURL;
   *   // ...
   * });
   * ```
   *
   * @param  cb the callback to be invoked with resulted dataURL.
   * @param  type A DOMString indicating the image format.
   *              The default type is image/png.
   * @param  encoderOptions A Number between 0 and 1 indicating image quality.
   *
   * References:
   * - https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
   * - http://stackoverflow.com/questions/15558418/how-do-you-save-an-image-from-a-three-js-canvas
   */
  toImage: function(cb, type, encoderOptions) {
    if (!this.__get_screenshot) this.__get_screenshot = [];
    this.__get_screenshot.push(cb);
  }

};

/** Texture loader method for Application object.
 *
 * The testures accumulate in app's `textures` property.
 * Use `textures` in `paths` config to indicate where the texture
 * files are located.
 */
 PLAYGROUND.Application.prototype.loadTexture = function(path) {

  if (!this.textures) this.textures = {};
  var resourceName = "texture " + path;
  var app = this;
  var assetPath = this.getAssetEntry(path, "textures", "png");
  if (this.textures[assetPath.key]) return;
  this.loader.add(resourceName);
  var loader = new THREE.TextureLoader();
  loader.load(
    assetPath.url,
    function(texture) {
      app.textures[assetPath.key] = texture;
      app.loader.success(resourceName);
    });
};

/** Object loader method for Application object.
 *
 * The objects accumulate in app's `objects` property.
 * Use `objects` in `paths` config to indicate where the objects
 * files are located.
 */
 PLAYGROUND.Application.prototype.loadObject = function(path) {
  var app = this;
  if (!this.objects) this.objects = {};
  var loaderID = "object " + path;
  var assetPath = this.getAssetEntry(path, "objects", "json");
  if (this.objects[assetPath.key]) return;
  this.loader.add(loaderID);
  var loader = new THREE.ObjectLoader();
  loader.load(
    assetPath.url,
    function(object) {
      app.objects[assetPath.key] = object;
      app.loader.success(loaderID);
    });
};

PLAYGROUND.ThRend.plugin = true;

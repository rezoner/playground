/*

  A bunch of helpers for Three.js

  It is still work in progress

*/

/** Helpers for Three.js related code.
 *
 * (This is work in progress.)
 *
 * The application object is ehanced with two
 * functions: `loadTexture()` and `loadObject()` that
 * will store their objects in `textures` and `objects`.
 */
(function() {

  /* texture loader */
  if (require) {
    THREE = require('three');
  }

  PLAYGROUND.Application.prototype.loadTexture = function(path) {

    if (!this.textures) this.textures = {};
  var mixin = {

    var resourceName = "texture " + path;
    /* texture loader */

    var app = this;
    loadTexture: function(path) {

    var assetPath = this.getAssetEntry(path, "textures", "png");
      if (!this.textures) this.textures = {};

    if (this.textures[assetPath.key]) return;
      var resourceName = "texture " + path;

    this.loader.add(resourceName);
      var app = this;

    var loader = new THREE.TextureLoader();
      var assetPath = this.getAssetEntry(path, "textures", "png");

    loader.load(
      if (this.textures[assetPath.key]) return;

      assetPath.url,
      this.loader.add(resourceName);

      function(texture) {
      var loader = new THREE.TextureLoader();

        app.textures[assetPath.key] = texture;
      loader.load(

        app.loader.success(resourceName);
        assetPath.url,

      }
    );
        function(texture) {

  };
          app.textures[assetPath.key] = texture;

  /* object loader */
          app.loader.success(resourceName);

  PLAYGROUND.Application.prototype.loadObject = function(path) {
        }
      );

    var app = this;
    },

    if (!this.objects) this.objects = {};
    /* object loader */

    var loaderID = "object " + path;
    loadObject: function(path) {

    var assetPath = this.getAssetEntry(path, "objects", "json");
      var app = this;

    if (this.objects[assetPath.key]) return;
      if (!this.objects) this.objects = {};

    this.loader.add(loaderID);
      var loaderID = "object " + path;

    var loader = new THREE.ObjectLoader();
      var assetPath = this.getAssetEntry(path, "objects", "json");

    loader.load(
      if (this.objects[assetPath.key]) return;

      assetPath.url,
      this.loader.add(loaderID);

      function(object) {
      var loader = new THREE.ObjectLoader();

        app.objects[assetPath.key] = object;
      loader.load(

        app.loader.success(loaderID);
        assetPath.url,

      }
    );
        function(object) {

          app.objects[assetPath.key] = object;

          app.loader.success(loaderID);

        }
      );

    }
  };

})();
  if (typeof module === 'object') {
    module.exports = mixin;
  }

  if (typeof PLAYGROUND !== 'undefined') {
    PLAYGROUND.Application.prototype.loadTexture = mixin.loadTexture;
    PLAYGROUND.Application.prototype.loadObject = mixin.loadObject;
  }

})();

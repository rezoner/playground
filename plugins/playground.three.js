/*
  A bunch of helpers for Three.js
  It is still work in progress
*/

(function() {

  if (require) {
    THREE = require('three');
  }


  var mixin = {

    /* texture loader */

    loadTexture: function(path) {

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

        }
      );

    },

    /* object loader */

    loadObject: function(path) {

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

        }
      );

    }
  };

  if (typeof module === 'object') {
    module.exports = mixin;
  }

  if (typeof PLAYGROUND !== 'undefined') {
    PLAYGROUND.Application.prototype.loadTexture = mixin.loadTexture;
    PLAYGROUND.Application.prototype.loadObject = mixin.loadObject;
  }

})();
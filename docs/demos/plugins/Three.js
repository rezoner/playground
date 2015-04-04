PLAYGROUND.Application.prototype.loadTexture = function(path) {

  if (!this.textures) this.textures = {};

  var resourceName = "texture " + path;

  var app = this;

  var assetPath = this.assetPath(path, "textures", "png");

  if (this.textures[assetPath.key]) return;

  this.loader.add(name);

  var loader = new THREE.TextureLoader();

  loader.load(

    assetPath.path,

    function(texture) {

      app.textures[assetPath.key] = texture;

      app.loader.success(resourceName);

    }
  );

};

/* object loader */

PLAYGROUND.Application.prototype.loadObject = function(path) {

  var app = this;

  if (!this.objects) this.objects = {};

  var loaderID = "object " + path;

  var assetPath = this.assetPath(path, "objects", "json");

  if (this.objects[assetPath.key]) return;

  this.loader.add(name);

  var loader = new THREE.ObjectLoader();

  loader.load(

    assetPath.path,

    function(object) {

      app.objects[assetPath.key] = object;

      app.loader.success(loaderID);

    }
  );

};
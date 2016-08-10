/** 
  
  Renderer build on top of CanvasQuery library.
 
  The application is enhanced with a `layer` member that
  provides access to the canvas.
 
  Reference: http://playgroundjs.com/playground-layer

*/

PLAYGROUND.Canvas = function(app) {

  this.app = app;

  app.on("create", this.create.bind(this));
  app.on("resize", this.resize.bind(this));
  app.on("kill", this.kill.bind(this));

};

PLAYGROUND.Canvas.plugin = true;

PLAYGROUND.Canvas.prototype = {

  kill: function() {

    this.app.layer.canvas.parentNode.removeChild(this.app.layer.canvas);

  },

  create: function(data) {

    this.app.layer = cq().appendTo(this.app.container);

    if (!this.app.customContainer) {
      this.app.container.style.margin = "0px";
      this.app.container.style.overflow = "hidden";
    }

  },

  resize: function(data) {

    var app = this.app;

    var layer = app.layer;

    layer.useAlpha = false;

    if (!layer) return;

    layer.width = app.width;
    layer.height = app.height;

    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    ) {

      layer.canvas.style.transformOrigin = "center";
      layer.canvas.style.webkitTransformOrigin = "center";

    } else {

      layer.canvas.style.transformOrigin = "0 0";
      layer.canvas.style.webkitTransformOrigin = "0 0";

    }
    layer.canvas.style.transform = "translate(" + app.offsetX + "px," + app.offsetY + "px) scale(" + app.scale + ", " + app.scale + ")";
    layer.canvas.style.transformStyle = "preserve-3d";

    layer.canvas.style.webkitTransform = "translate(" + app.offsetX + "px," + app.offsetY + "px) scale(" + app.scale + ", " + app.scale + ")";
    layer.canvas.style.webkitTransformStyle = "preserve-3d";

    cq.smoothing = this.app.smoothing;

    layer.update();

    if ('WebkitAppearance' in document.documentElement.style) {

      layer.canvas.style.imageRendering = this.app.smoothing ? "auto" : "pixelated";

    } else {

      layer.canvas.style.imageRendering = this.app.smoothing ? "auto" : "-moz-crisp-edges";

    }

    layer.canvas.addEventListener("mousedown", function() {

      this.focus();

    });

  }

};
PLAYGROUND.Layer = {

  plugin: true,

  app: {

    create: function(app, data) {

      app.layer = cq().appendTo(app.container);

    },

    resize: function(app, data) {

      var layer = app.layer;

      layer.width = app.width;
      layer.height = app.height;

      layer.canvas.style.transformOrigin = "0 0";
      layer.canvas.style.transform = "translate(" + app.offsetX + "px," + app.offsetY + "px) scale(" + app.scale + ", " + app.scale + ")";

    }

  }

};